import puppeteer from 'puppeteer';
import fs from 'fs';

const SEBI_PMR_URL = 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doPmr=yes';

async function debugScreenshot() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false, // Show the browser
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  console.log('Navigating to PMR page...');
  await page.goto(SEBI_PMR_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // Handle language modal
  try {
    await page.waitForSelector('#btnEnglish', { timeout: 5000 });
    console.log('Clicking English button...');
    await page.click('#btnEnglish');
    await new Promise(r => setTimeout(r, 3000));
  } catch {
    console.log('No language modal');
  }

  // Take screenshot of initial page
  await page.screenshot({ path: 'screenshot-1-initial.png', fullPage: true });
  console.log('Screenshot 1 saved');

  // Check what form elements exist
  const formInfo = await page.evaluate(() => {
    const form = document.querySelector('form[name="otherForm"]');
    const pmsSelect = document.querySelector('select[name="pmrId"]') as HTMLSelectElement;
    const yearSelect = document.querySelector('select[name="year"]') as HTMLSelectElement;
    const monthSelect = document.querySelector('select[name="month"]') as HTMLSelectElement;

    return {
      formExists: !!form,
      formAction: form?.getAttribute('action'),
      pmsOptions: pmsSelect ? Array.from(pmsSelect.options).slice(0, 5).map(o => ({ value: o.value, text: o.text })) : [],
      yearOptions: yearSelect ? Array.from(yearSelect.options).map(o => o.value) : [],
      monthOptions: monthSelect ? Array.from(monthSelect.options).map(o => o.value) : [],
      buttons: Array.from(document.querySelectorAll('input[type="button"], input[type="submit"], button')).map(b => ({
        type: (b as HTMLInputElement).type,
        value: (b as HTMLInputElement).value,
        text: b.textContent,
        onclick: b.getAttribute('onclick')
      }))
    };
  });

  console.log('\nForm info:', JSON.stringify(formInfo, null, 2));

  if (formInfo.pmsOptions.length > 1) {
    // Select a PMS (use Axis)
    const axisPms = formInfo.pmsOptions.find(p => p.text.toLowerCase().includes('axis'));
    const pmsToUse = axisPms || formInfo.pmsOptions[1];
    console.log(`\nSelecting PMS: ${pmsToUse.text}`);

    await page.select('select[name="pmrId"]', pmsToUse.value);
    await page.select('select[name="year"]', '2024');
    await page.select('select[name="month"]', '11');

    await page.screenshot({ path: 'screenshot-2-filled.png', fullPage: true });
    console.log('Screenshot 2 saved');

    // Try to submit via JavaScript function
    console.log('\nSubmitting form via getPMR()...');
    try {
      await page.evaluate(() => {
        // @ts-ignore
        if (typeof getPMR === 'function') {
          // @ts-ignore
          getPMR();
        } else {
          const form = document.querySelector('form[name="otherForm"]') as HTMLFormElement;
          if (form) form.submit();
        }
      });

      // Wait for navigation or content change
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 3000));

      await page.screenshot({ path: 'screenshot-3-result.png', fullPage: true });
      console.log('Screenshot 3 saved');

      // Get page content
      const content = await page.content();
      fs.writeFileSync('debug-output-2.html', content);
      console.log(`\nSaved HTML: ${content.length} characters`);

      // Check for data
      const hasData = await page.evaluate(() => {
        const text = document.body.innerText;
        return {
          hasNoRecords: text.includes('No Records Found'),
          hasAUM: text.includes('AUM') || text.includes('Assets'),
          hasDiscretionary: text.includes('Discretionary') || text.includes('discretionary'),
          bodyTextLength: text.length
        };
      });

      console.log('Page content check:', hasData);

    } catch (error) {
      console.error('Error during submission:', error);
    }
  }

  console.log('\nClosing browser in 10 seconds...');
  await new Promise(r => setTimeout(r, 10000));
  await browser.close();
}

debugScreenshot().catch(console.error);
