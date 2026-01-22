import { BrowserClient } from './browser-client.js';
import { parsePMSReport, extractSummaryFromReport } from './parser.js';

async function testFetch() {
  const client = new BrowserClient();

  console.log('Testing SEBI connection with browser automation...\n');

  try {
    await client.init();

    // Test 1: Fetch PMS list
    console.log('1. Fetching PMS list...');
    const pmsList = await client.fetchPMSList();
    console.log(`   Found ${pmsList.length} PMSes`);
    console.log(`   First 5: ${pmsList.slice(0, 5).map(p => p.name).join(', ')}`);

    // Test 2: Fetch a single report - try a well-known PMS
    console.log('\n2. Fetching a sample report...');

    // Find HDFC or another well-known PMS
    const samplePms = pmsList.find(p =>
      p.name.toLowerCase().includes('hdfc') ||
      p.name.toLowerCase().includes('icici') ||
      p.name.toLowerCase().includes('axis')
    ) || pmsList[10]; // Fallback to 11th PMS

    console.log(`   Testing with: ${samplePms.name}`);
    console.log(`   PMS ID: ${samplePms.id}`);

    const html = await client.fetchMonthlyReport(samplePms.id, 2024, 11);

    if (html) {
      console.log(`   Got HTML response: ${html.length} characters`);

      // Try to parse it
      const report = parsePMSReport(html, samplePms.id, samplePms.name, 2024, 11);

      if (report) {
        const summary = extractSummaryFromReport(report);
        console.log('\n   Parsed Report Summary:');
        console.log(`   - Total AUM: ${summary.totalAum.toLocaleString()} Cr`);
        console.log(`   - Total Clients: ${summary.totalClients}`);
        console.log(`   - Net Flow: ${summary.netFlow.toLocaleString()} Cr`);
        console.log(`   - Avg 1M Return: ${summary.avgReturn1m.toFixed(2)}%`);
        console.log(`   - Avg 1Y Return: ${summary.avgReturn1y.toFixed(2)}%`);
        console.log(`   - Investment Approaches: ${report.discretionary.investmentApproaches.length}`);

        if (report.discretionary.investmentApproaches.length > 0) {
          console.log('\n   Investment Approaches:');
          report.discretionary.investmentApproaches.forEach(a => {
            console.log(`   - ${a.name}: AUM ${a.aum} Cr, 1Y Return ${a.return1y}%`);
          });
        }
      } else {
        console.log('   Could not parse report data');
        // Show a snippet of the HTML for debugging
        console.log('\n   HTML Preview (first 2000 chars):');
        console.log(html.substring(0, 2000));
      }
    } else {
      console.log('   No data returned for this period');
    }

    console.log('\n✓ Test completed!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

testFetch();
