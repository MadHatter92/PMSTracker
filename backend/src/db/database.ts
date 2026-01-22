import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', '..', '..', 'data', 'pms.db');

let db: SqlJsDatabase | null = null;

export async function initDatabase(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
    console.log(`Database loaded from ${DB_PATH}`);
  } else {
    db = new SQL.Database();
    console.log('Created new in-memory database');
  }

  return db;
}

export function getDatabase(): SqlJsDatabase {
  if (!db) throw new Error('Database not initialized');
  return db;
}

export interface PMSRecord {
  id: number;
  sebi_id: string;
  name: string;
  created_at: string;
}

export interface MonthlyReportRecord {
  id: number;
  pms_id: number;
  year: number;
  month: number;
  report_date: string;
  total_aum: number | null;
  discretionary_aum: number | null;
  total_clients: number | null;
  inflow: number | null;
  outflow: number | null;
  net_flow: number | null;
  return_1m: number | null;
  return_1y: number | null;
  purchases: number | null;
  sales: number | null;
  turnover_ratio: number | null;
}

export interface InvestmentApproachRecord {
  id: number;
  report_id: number;
  name: string;
  aum: number | null;
  return_1m: number | null;
  return_1y: number | null;
  benchmark: string | null;
}

// Query functions
export function getAllPMS(): PMSRecord[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM pms ORDER BY name');
  if (result.length === 0) return [];

  return result[0].values.map(row => ({
    id: row[0] as number,
    sebi_id: row[1] as string,
    name: row[2] as string,
    created_at: row[3] as string,
  }));
}

export function getPMSById(id: number): PMSRecord | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM pms WHERE id = ?', [id]);
  if (result.length === 0 || result[0].values.length === 0) return null;

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    sebi_id: row[1] as string,
    name: row[2] as string,
    created_at: row[3] as string,
  };
}

export function searchPMS(query: string): PMSRecord[] {
  const db = getDatabase();
  const result = db.exec(
    'SELECT * FROM pms WHERE name LIKE ? ORDER BY name LIMIT 50',
    [`%${query}%`]
  );
  if (result.length === 0) return [];

  return result[0].values.map(row => ({
    id: row[0] as number,
    sebi_id: row[1] as string,
    name: row[2] as string,
    created_at: row[3] as string,
  }));
}

export function getLatestReportsForPMS(pmsId: number, limit: number = 12): MonthlyReportRecord[] {
  const db = getDatabase();
  const result = db.exec(
    `SELECT * FROM monthly_reports
     WHERE pms_id = ?
     ORDER BY year DESC, month DESC
     LIMIT ?`,
    [pmsId, limit]
  );
  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map(row => {
    const record: any = {};
    columns.forEach((col, i) => {
      record[col] = row[i];
    });
    return record as MonthlyReportRecord;
  });
}

export function getReportsByPeriod(
  pmsId: number,
  fromYear: number,
  fromMonth: number,
  toYear: number,
  toMonth: number
): MonthlyReportRecord[] {
  const db = getDatabase();
  const result = db.exec(
    `SELECT * FROM monthly_reports
     WHERE pms_id = ?
     AND (year > ? OR (year = ? AND month >= ?))
     AND (year < ? OR (year = ? AND month <= ?))
     ORDER BY year, month`,
    [pmsId, fromYear, fromYear, fromMonth, toYear, toYear, toMonth]
  );
  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map(row => {
    const record: any = {};
    columns.forEach((col, i) => {
      record[col] = row[i];
    });
    return record as MonthlyReportRecord;
  });
}

export function getInvestmentApproaches(reportId: number): InvestmentApproachRecord[] {
  const db = getDatabase();
  const result = db.exec(
    'SELECT * FROM investment_approaches WHERE report_id = ?',
    [reportId]
  );
  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map(row => {
    const record: any = {};
    columns.forEach((col, i) => {
      record[col] = row[i];
    });
    return record as InvestmentApproachRecord;
  });
}

export function getTopPMSByAUM(year: number, month: number, limit: number = 10): Array<{
  pms: PMSRecord;
  aum: number;
}> {
  const db = getDatabase();
  const result = db.exec(
    `SELECT p.*, mr.total_aum
     FROM pms p
     JOIN monthly_reports mr ON p.id = mr.pms_id
     WHERE mr.year = ? AND mr.month = ?
     AND mr.total_aum IS NOT NULL
     ORDER BY mr.total_aum DESC
     LIMIT ?`,
    [year, month, limit]
  );
  if (result.length === 0) return [];

  return result[0].values.map(row => ({
    pms: {
      id: row[0] as number,
      sebi_id: row[1] as string,
      name: row[2] as string,
      created_at: row[3] as string,
    },
    aum: row[4] as number,
  }));
}

export function getIndustryStats(year: number, month: number): {
  totalPMS: number;
  totalAUM: number;
  totalClients: number;
  totalNetFlow: number;
} | null {
  const db = getDatabase();
  const result = db.exec(
    `SELECT
       COUNT(DISTINCT pms_id) as total_pms,
       SUM(total_aum) as total_aum,
       SUM(total_clients) as total_clients,
       SUM(net_flow) as total_net_flow
     FROM monthly_reports
     WHERE year = ? AND month = ?`,
    [year, month]
  );

  if (result.length === 0 || result[0].values.length === 0) return null;

  const row = result[0].values[0];
  return {
    totalPMS: (row[0] as number) || 0,
    totalAUM: (row[1] as number) || 0,
    totalClients: (row[2] as number) || 0,
    totalNetFlow: (row[3] as number) || 0,
  };
}
