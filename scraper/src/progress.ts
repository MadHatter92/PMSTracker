import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', '..', 'data', 'pms.db');

async function showProgress() {
  const SQL = await initSqlJs();

  if (!fs.existsSync(DB_PATH)) {
    console.log('Database not found. Run the scraper first.');
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(fileBuffer);

  // Get stats
  const totalPMS = db.exec('SELECT COUNT(*) FROM pms')[0]?.values[0][0] as number || 0;
  const totalReports = db.exec('SELECT COUNT(*) FROM monthly_reports')[0]?.values[0][0] as number || 0;
  const pmsWithData = db.exec('SELECT COUNT(DISTINCT pms_id) FROM monthly_reports')[0]?.values[0][0] as number || 0;

  // Get latest report date
  const latestResult = db.exec('SELECT year, month FROM monthly_reports ORDER BY year DESC, month DESC LIMIT 1');
  const latestDate = latestResult.length > 0 && latestResult[0].values.length > 0
    ? `${latestResult[0].values[0][0]}-${String(latestResult[0].values[0][1]).padStart(2, '0')}`
    : 'N/A';

  // Get oldest report date
  const oldestResult = db.exec('SELECT year, month FROM monthly_reports ORDER BY year ASC, month ASC LIMIT 1');
  const oldestDate = oldestResult.length > 0 && oldestResult[0].values.length > 0
    ? `${oldestResult[0].values[0][0]}-${String(oldestResult[0].values[0][1]).padStart(2, '0')}`
    : 'N/A';

  // Get top 5 PMSes by report count
  const topPMSResult = db.exec(`
    SELECT p.name, COUNT(*) as report_count
    FROM monthly_reports mr
    JOIN pms p ON mr.pms_id = p.id
    GROUP BY mr.pms_id
    ORDER BY report_count DESC
    LIMIT 5
  `);

  // Calculate progress
  const totalTarget = 599; // Total PMSes from SEBI
  const monthsPerPMS = 84; // 2018-2025 = ~84 months
  const totalPossibleReports = totalTarget * monthsPerPMS;

  const pmsProgress = (pmsWithData / totalTarget * 100).toFixed(1);
  const reportProgress = (totalReports / totalPossibleReports * 100).toFixed(2);

  // Create progress bars
  const barWidth = 40;
  const pmsFilled = Math.round(pmsWithData / totalTarget * barWidth);
  const pmsBar = '█'.repeat(pmsFilled) + '░'.repeat(barWidth - pmsFilled);

  const reportFilled = Math.round(totalReports / totalPossibleReports * barWidth);
  const reportBar = '█'.repeat(reportFilled) + '░'.repeat(barWidth - reportFilled);

  // Display
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║            PMS TRACKER - SCRAPING PROGRESS                   ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║                                                              ║');
  console.log(`║  PMSes with Data:  ${String(pmsWithData).padStart(4)} / ${String(totalTarget).padStart(4)}  (${pmsProgress.padStart(5)}%)               ║`);
  console.log(`║  [${pmsBar}]    ║`);
  console.log('║                                                              ║');
  console.log(`║  Total Reports:   ${String(totalReports).padStart(5)} / ~${String(totalPossibleReports).padStart(5)}  (${reportProgress.padStart(5)}%)            ║`);
  console.log(`║  [${reportBar}]    ║`);
  console.log('║                                                              ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log(`║  Data Range:      ${oldestDate} to ${latestDate}                        ║`);
  console.log(`║  PMSes in DB:     ${String(totalPMS).padStart(4)}                                        ║`);
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║  Top 5 PMSes by Reports:                                     ║');

  if (topPMSResult.length > 0) {
    for (const row of topPMSResult[0].values) {
      const name = (row[0] as string).substring(0, 40).padEnd(40);
      const count = String(row[1]).padStart(3);
      console.log(`║    ${name}  ${count}  ║`);
    }
  }

  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  db.close();
}

showProgress().catch(console.error);
