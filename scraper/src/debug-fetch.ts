import { BrowserClient } from './browser-client.js';
import fs from 'fs';
import path from 'path';

async function debugFetch() {
  const client = new BrowserClient();

  console.log('Debug: Fetching sample report...\n');

  try {
    await client.init();

    const pmsList = await client.fetchPMSList();
    console.log(`Found ${pmsList.length} PMSes`);

    // Find AXIS PMS
    const axisPms = pmsList.find(p =>
      p.name.toLowerCase().includes('axis asset')
    );

    if (!axisPms) {
      console.log('AXIS PMS not found');
      return;
    }

    console.log(`Testing with: ${axisPms.name}`);
    const html = await client.fetchMonthlyReport(axisPms.id, 2024, 11);

    if (html) {
      // Save HTML for analysis
      const outputPath = path.join(process.cwd(), 'debug-output.html');
      fs.writeFileSync(outputPath, html);
      console.log(`\nSaved HTML to: ${outputPath}`);
      console.log(`HTML length: ${html.length} characters`);

      // Show key sections
      console.log('\n--- Looking for tables ---');
      const tableMatches = html.match(/<table[^>]*>/gi);
      console.log(`Found ${tableMatches?.length || 0} tables`);

      // Look for specific keywords
      const keywords = ['AUM', 'Client', 'Inflow', 'Outflow', 'Investment Approach', 'Performance', 'Return'];
      console.log('\n--- Keyword search ---');
      for (const kw of keywords) {
        const count = (html.match(new RegExp(kw, 'gi')) || []).length;
        console.log(`"${kw}": ${count} occurrences`);
      }
    } else {
      console.log('No HTML returned');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugFetch();
