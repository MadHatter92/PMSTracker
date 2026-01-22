import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import type { ScrapedPMSReport } from '../../shared/types.js';

const DB_PATH = path.join(process.cwd(), '..', 'data', 'pms.db');

export class PMSDatabase {
  private db: SqlJsDatabase | null = null;
  private dbPath: string;
  private initialized: boolean = false;

  constructor(dbPath: string = DB_PATH) {
    this.dbPath = dbPath;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    const SQL = await initSqlJs();

    // Ensure data directory exists
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Load existing database or create new one
    if (fs.existsSync(this.dbPath)) {
      const fileBuffer = fs.readFileSync(this.dbPath);
      this.db = new SQL.Database(fileBuffer);
    } else {
      this.db = new SQL.Database();
    }

    this.initSchema();
    this.initialized = true;
  }

  private initSchema(): void {
    if (!this.db) throw new Error('Database not initialized');

    this.db.run(`
      CREATE TABLE IF NOT EXISTS pms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sebi_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS monthly_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pms_id INTEGER NOT NULL,
        year INTEGER NOT NULL,
        month INTEGER NOT NULL,
        report_date TEXT NOT NULL,

        total_aum REAL,
        discretionary_aum REAL,
        non_discretionary_aum REAL,
        advisory_aum REAL,

        total_clients INTEGER,
        domestic_clients INTEGER,
        foreign_clients INTEGER,
        pf_epfo_clients INTEGER,
        corporate_clients INTEGER,
        non_corporate_clients INTEGER,

        inflow REAL,
        outflow REAL,
        net_flow REAL,
        yearly_inflow REAL,
        yearly_outflow REAL,

        return_1m REAL,
        return_1y REAL,
        benchmark_return_1m REAL,
        benchmark_return_1y REAL,

        purchases REAL,
        sales REAL,
        turnover_ratio REAL,

        equity_listed REAL,
        equity_unlisted REAL,
        debt_listed REAL,
        debt_unlisted REAL,
        derivatives REAL,
        mutual_funds REAL,
        other_assets REAL,

        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(pms_id, year, month),
        FOREIGN KEY (pms_id) REFERENCES pms(id)
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS investment_approaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        report_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        aum REAL,
        return_1m REAL,
        return_1y REAL,
        benchmark TEXT,
        benchmark_return_1m REAL,
        benchmark_return_1y REAL,
        FOREIGN KEY (report_id) REFERENCES monthly_reports(id)
      )
    `);

    this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_reports_pms_date ON monthly_reports(pms_id, year, month)
    `);
    this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_reports_date ON monthly_reports(year, month)
    `);
    this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_approaches_report ON investment_approaches(report_id)
    `);
  }

  private saveToFile(): void {
    if (!this.db) return;
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(this.dbPath, buffer);
  }

  upsertPMS(sebiId: string, name: string): number {
    if (!this.db) throw new Error('Database not initialized');

    // Try to get existing
    const existing = this.db.exec(
      `SELECT id FROM pms WHERE sebi_id = ?`,
      [sebiId]
    );

    if (existing.length > 0 && existing[0].values.length > 0) {
      const id = existing[0].values[0][0] as number;
      this.db.run(`UPDATE pms SET name = ? WHERE id = ?`, [name, id]);
      return id;
    }

    // Insert new
    this.db.run(
      `INSERT INTO pms (sebi_id, name) VALUES (?, ?)`,
      [sebiId, name]
    );

    const result = this.db.exec(`SELECT last_insert_rowid()`);
    return result[0].values[0][0] as number;
  }

  getPMSBySebiId(sebiId: string): { id: number; name: string } | null {
    if (!this.db) throw new Error('Database not initialized');

    const result = this.db.exec(
      `SELECT id, name FROM pms WHERE sebi_id = ?`,
      [sebiId]
    );

    if (result.length === 0 || result[0].values.length === 0) {
      return null;
    }

    const [id, name] = result[0].values[0];
    return { id: id as number, name: name as string };
  }

  getAllPMS(): Array<{ id: number; sebiId: string; name: string }> {
    if (!this.db) throw new Error('Database not initialized');

    const result = this.db.exec(
      `SELECT id, sebi_id, name FROM pms ORDER BY name`
    );

    if (result.length === 0) return [];

    return result[0].values.map(row => ({
      id: row[0] as number,
      sebiId: row[1] as string,
      name: row[2] as string,
    }));
  }

  saveReport(report: ScrapedPMSReport): number {
    if (!this.db) throw new Error('Database not initialized');

    const pmsId = this.upsertPMS(report.pmsId, report.pmsName);
    const reportDate = `${report.year}-${report.month.toString().padStart(2, '0')}-01`;

    const totalAum = report.discretionary.aum +
      (report.nonDiscretionary?.aum || 0) +
      (report.advisory?.aum || 0);

    const domesticClients = report.discretionary.clients.pfEpfo +
      report.discretionary.clients.corporates +
      report.discretionary.clients.nonCorporates;

    const foreignClients = report.discretionary.clients.nonResidents +
      report.discretionary.clients.fpi +
      report.discretionary.clients.others;

    const netFlow = report.discretionary.fundFlows.monthlyInflow -
      report.discretionary.fundFlows.monthlyOutflow;

    const approaches = report.discretionary.investmentApproaches;
    const avgReturn1m = approaches.length > 0
      ? approaches.reduce((sum, a) => sum + a.return1m, 0) / approaches.length
      : null;
    const avgReturn1y = approaches.length > 0
      ? approaches.reduce((sum, a) => sum + a.return1y, 0) / approaches.length
      : null;
    const avgBenchmark1m = approaches.length > 0
      ? approaches.reduce((sum, a) => sum + a.benchmarkReturn1m, 0) / approaches.length
      : null;
    const avgBenchmark1y = approaches.length > 0
      ? approaches.reduce((sum, a) => sum + a.benchmarkReturn1y, 0) / approaches.length
      : null;

    const derivatives = report.discretionary.assetAllocation.derivatives.equity +
      report.discretionary.assetAllocation.derivatives.commodity +
      report.discretionary.assetAllocation.derivatives.other;

    // Delete existing report for this pms/year/month
    this.db.run(
      `DELETE FROM monthly_reports WHERE pms_id = ? AND year = ? AND month = ?`,
      [pmsId, report.year, report.month]
    );

    this.db.run(`
      INSERT INTO monthly_reports (
        pms_id, year, month, report_date,
        total_aum, discretionary_aum, non_discretionary_aum, advisory_aum,
        total_clients, domestic_clients, foreign_clients,
        pf_epfo_clients, corporate_clients, non_corporate_clients,
        inflow, outflow, net_flow, yearly_inflow, yearly_outflow,
        return_1m, return_1y, benchmark_return_1m, benchmark_return_1y,
        purchases, sales, turnover_ratio,
        equity_listed, equity_unlisted, debt_listed, debt_unlisted,
        derivatives, mutual_funds, other_assets
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      pmsId, report.year, report.month, reportDate,
      totalAum || null, report.discretionary.aum || null,
      report.nonDiscretionary?.aum || null, report.advisory?.aum || null,
      report.discretionary.totalClients || null, domesticClients || null, foreignClients || null,
      report.discretionary.clients.pfEpfo || null,
      report.discretionary.clients.corporates || null,
      report.discretionary.clients.nonCorporates || null,
      report.discretionary.fundFlows.monthlyInflow || null,
      report.discretionary.fundFlows.monthlyOutflow || null,
      netFlow || null,
      report.discretionary.fundFlows.yearlyInflow || null,
      report.discretionary.fundFlows.yearlyOutflow || null,
      avgReturn1m, avgReturn1y, avgBenchmark1m, avgBenchmark1y,
      report.discretionary.transactions.purchases || null,
      report.discretionary.transactions.sales || null,
      report.discretionary.transactions.turnoverRatio || null,
      report.discretionary.assetAllocation.equity.listed || null,
      report.discretionary.assetAllocation.equity.unlisted || null,
      report.discretionary.assetAllocation.debt.listed || null,
      report.discretionary.assetAllocation.debt.unlisted || null,
      derivatives || null,
      report.discretionary.assetAllocation.mutualFunds || null,
      report.discretionary.assetAllocation.other || null
    ]);

    const result = this.db.exec(`SELECT last_insert_rowid()`);
    const reportId = result[0].values[0][0] as number;

    // Save investment approaches
    for (const approach of report.discretionary.investmentApproaches) {
      this.db.run(`
        INSERT INTO investment_approaches (
          report_id, name, aum, return_1m, return_1y,
          benchmark, benchmark_return_1m, benchmark_return_1y
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        reportId,
        approach.name,
        approach.aum || null,
        approach.return1m || null,
        approach.return1y || null,
        approach.benchmark || null,
        approach.benchmarkReturn1m || null,
        approach.benchmarkReturn1y || null
      ]);
    }

    // Auto-save to file
    this.saveToFile();

    return reportId;
  }

  getReportCount(): number {
    if (!this.db) throw new Error('Database not initialized');
    const result = this.db.exec(`SELECT COUNT(*) FROM monthly_reports`);
    return result[0].values[0][0] as number;
  }

  getPMSCount(): number {
    if (!this.db) throw new Error('Database not initialized');
    const result = this.db.exec(`SELECT COUNT(*) FROM pms`);
    return result[0].values[0][0] as number;
  }

  // Check if a report already exists for a given PMS and month
  hasReport(sebiId: string, year: number, month: number): boolean {
    if (!this.db) throw new Error('Database not initialized');

    const result = this.db.exec(`
      SELECT 1 FROM monthly_reports mr
      JOIN pms p ON mr.pms_id = p.id
      WHERE p.sebi_id = ? AND mr.year = ? AND mr.month = ?
      LIMIT 1
    `, [sebiId, year, month]);

    return result.length > 0 && result[0].values.length > 0;
  }

  // Get all scraped months for a given PMS (for resume tracking)
  getScrapedMonths(sebiId: string): Array<{ year: number; month: number }> {
    if (!this.db) throw new Error('Database not initialized');

    const result = this.db.exec(`
      SELECT mr.year, mr.month FROM monthly_reports mr
      JOIN pms p ON mr.pms_id = p.id
      WHERE p.sebi_id = ?
      ORDER BY mr.year, mr.month
    `, [sebiId]);

    if (result.length === 0) return [];

    return result[0].values.map(row => ({
      year: row[0] as number,
      month: row[1] as number,
    }));
  }

  // Get scraping progress summary
  getScrapingProgress(): {
    totalPMS: number;
    pmsWithData: number;
    totalReports: number;
    latestMonth: { year: number; month: number } | null;
  } {
    if (!this.db) throw new Error('Database not initialized');

    const totalPMS = this.getPMSCount();
    const totalReports = this.getReportCount();

    const pmsWithDataResult = this.db.exec(`
      SELECT COUNT(DISTINCT pms_id) FROM monthly_reports
    `);
    const pmsWithData = pmsWithDataResult[0]?.values[0]?.[0] as number || 0;

    const latestResult = this.db.exec(`
      SELECT year, month FROM monthly_reports
      ORDER BY year DESC, month DESC LIMIT 1
    `);

    const latestMonth = latestResult.length > 0 && latestResult[0].values.length > 0
      ? { year: latestResult[0].values[0][0] as number, month: latestResult[0].values[0][1] as number }
      : null;

    return { totalPMS, pmsWithData, totalReports, latestMonth };
  }

  close(): void {
    if (this.db) {
      this.saveToFile();
      this.db.close();
      this.db = null;
    }
  }
}
