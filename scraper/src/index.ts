import { BrowserClient } from './browser-client.js';
import { parsePMSReport } from './parser.js';
import { PMSDatabase } from './database.js';

interface ScrapeOptions {
  pmsFilter?: string;
  startYear?: number;
  endYear?: number;
  limit?: number;
  singleMonth?: { year: number; month: number };
  resume?: boolean; // Skip already-scraped months
  skipExistingPMS?: boolean; // Skip PMSes that already have any data
}

async function scrapeAllPMS(options: ScrapeOptions = {}): Promise<void> {
  const client = new BrowserClient();
  const db = new PMSDatabase();

  await client.init();
  await db.init();

  const {
    pmsFilter,
    startYear = 2018,
    endYear = new Date().getFullYear(),
    limit,
    singleMonth,
    resume = true, // Default to resume mode
    skipExistingPMS = false, // Skip PMSes that have any data
  } = options;

  console.log('='.repeat(60));
  console.log('PMS Tracker - SEBI Data Scraper');
  console.log('='.repeat(60));

  // Show existing progress
  const progress = db.getScrapingProgress();
  console.log(`\nExisting data in database:`);
  console.log(`  PMSes: ${progress.totalPMS}`);
  console.log(`  PMSes with data: ${progress.pmsWithData}`);
  console.log(`  Total reports: ${progress.totalReports}`);
  if (progress.latestMonth) {
    console.log(`  Latest data: ${progress.latestMonth.year}-${String(progress.latestMonth.month).padStart(2, '0')}`);
  }
  console.log(`\nResume mode: ${resume ? 'ON (skipping existing)' : 'OFF (re-scraping all)'}`);
  console.log(`Skip existing PMS: ${skipExistingPMS ? 'ON (skipping PMSes with any data)' : 'OFF'}`);

  try {
    // Fetch list of all PMSes
    console.log('\nFetching PMS list from SEBI...');
    let pmsList = await client.fetchPMSList();

    // Filter if specified
    if (pmsFilter) {
      const filterLower = pmsFilter.toLowerCase();
      pmsList = pmsList.filter(pms =>
        pms.name.toLowerCase().includes(filterLower) ||
        pms.id.toLowerCase().includes(filterLower)
      );
      console.log(`Filtered to ${pmsList.length} PMSes matching "${pmsFilter}"`);
    }

    // Limit if specified
    if (limit) {
      pmsList = pmsList.slice(0, limit);
      console.log(`Limited to first ${limit} PMSes`);
    }

    console.log(`\nProcessing ${pmsList.length} PMSes from ${startYear} to ${endYear}...`);

    let totalReports = 0;
    let successfulReports = 0;
    let failedReports = 0;

    for (let i = 0; i < pmsList.length; i++) {
      const pms = pmsList[i];
      console.log(`\n[${i + 1}/${pmsList.length}] Processing: ${pms.name}`);

      // Skip PMS entirely if it already has any data
      if (skipExistingPMS) {
        const existingMonths = db.getScrapedMonths(pms.id);
        if (existingMonths.length > 0) {
          console.log(`  ⏭ Skipping (already has ${existingMonths.length} months of data)`);
          continue;
        }
      }

      if (singleMonth) {
        // Check if already scraped in resume mode
        if (resume && db.hasReport(pms.id, singleMonth.year, singleMonth.month)) {
          console.log(`  ⏭ Skipping ${singleMonth.year}-${singleMonth.month} (already exists)`);
          continue;
        }

        // Fetch single month
        const html = await client.fetchMonthlyReport(pms.id, singleMonth.year, singleMonth.month);
        totalReports++;

        if (html) {
          const report = parsePMSReport(html, pms.id, pms.name, singleMonth.year, singleMonth.month);
          if (report) {
            db.saveReport(report);
            successfulReports++;
            console.log(`  ✓ Saved report for ${singleMonth.year}-${singleMonth.month}`);
          } else {
            failedReports++;
            console.log(`  ✗ Failed to parse report`);
          }
        } else {
          failedReports++;
          console.log(`  - No data found`);
        }
      } else {
        // Get already scraped months for this PMS
        const existingMonths = resume
          ? new Set(db.getScrapedMonths(pms.id).map(m => `${m.year}-${m.month}`))
          : new Set<string>();

        if (resume && existingMonths.size > 0) {
          console.log(`  ⏭ Already has ${existingMonths.size} months, scraping missing only`);
        }

        // Fetch all months, skipping existing ones
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        let newReports = 0;
        let skippedReports = 0;

        for (let year = startYear; year <= endYear; year++) {
          const maxMonth = year === currentYear ? currentMonth - 1 : 12;

          for (let month = 1; month <= maxMonth; month++) {
            const monthKey = `${year}-${month}`;

            // Skip if already exists in resume mode
            if (existingMonths.has(monthKey)) {
              skippedReports++;
              continue;
            }

            console.log(`  Fetching ${year}-${month.toString().padStart(2, '0')}`);
            const html = await client.fetchMonthlyReport(pms.id, year, month);
            totalReports++;

            if (html) {
              const report = parsePMSReport(html, pms.id, pms.name, year, month);
              if (report) {
                db.saveReport(report);
                successfulReports++;
                newReports++;
              } else {
                failedReports++;
              }
            } else {
              failedReports++;
            }
          }
        }

        if (skippedReports > 0) {
          console.log(`  ✓ Added ${newReports} new reports (skipped ${skippedReports} existing)`);
        } else {
          console.log(`  ✓ Processed ${newReports} reports`);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Scraping Complete!');
    console.log('='.repeat(60));
    console.log(`Total PMSes processed: ${pmsList.length}`);
    console.log(`Total reports attempted: ${totalReports}`);
    console.log(`Successful: ${successfulReports}`);
    console.log(`Failed/Empty: ${failedReports}`);
    console.log(`\nDatabase stats:`);
    console.log(`  PMSes in DB: ${db.getPMSCount()}`);
    console.log(`  Reports in DB: ${db.getReportCount()}`);

  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    await client.close();
    db.close();
  }
}

// Parse command line arguments
function parseArgs(): ScrapeOptions {
  const args = process.argv.slice(2);
  const options: ScrapeOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--pms' || arg === '-p') {
      options.pmsFilter = args[++i];
    } else if (arg === '--start-year' || arg === '-s') {
      options.startYear = parseInt(args[++i], 10);
    } else if (arg === '--end-year' || arg === '-e') {
      options.endYear = parseInt(args[++i], 10);
    } else if (arg === '--limit' || arg === '-l') {
      options.limit = parseInt(args[++i], 10);
    } else if (arg === '--month' || arg === '-m') {
      const [year, month] = args[++i].split('-').map(Number);
      options.singleMonth = { year, month };
    } else if (arg === '--resume' || arg === '-r') {
      options.resume = true;
    } else if (arg === '--no-resume') {
      options.resume = false;
    } else if (arg === '--skip-existing-pms' || arg === '--skip-existing') {
      options.skipExistingPMS = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
PMS Tracker Scraper

Usage: npm run scrape [options]

Options:
  --pms, -p <filter>      Filter PMSes by name (case-insensitive)
  --start-year, -s <year> Start year (default: 2018)
  --end-year, -e <year>   End year (default: current year)
  --limit, -l <count>     Limit number of PMSes to process
  --month, -m <YYYY-MM>   Scrape only a specific month
  --resume, -r            Resume mode - skip already scraped months (default: ON)
  --no-resume             Force re-scrape all data
  --skip-existing-pms     Skip PMSes that already have any data
  --help, -h              Show this help

Examples:
  npm run scrape                           # Scrape all PMSes, resume mode
  npm run scrape -- --pms hdfc             # Scrape PMSes matching "hdfc"
  npm run scrape -- --limit 10             # Scrape first 10 PMSes
  npm run scrape -- --month 2024-12        # Scrape December 2024 only
  npm run scrape -- -p axis -m 2024-06     # Scrape Axis PMS for June 2024
  npm run scrape -- --no-resume            # Re-scrape everything from scratch
`);
      process.exit(0);
    }
  }

  return options;
}

// Main execution
const options = parseArgs();
scrapeAllPMS(options).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
