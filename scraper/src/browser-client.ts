import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';

const SEBI_PMR_URL = 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doPmr=yes';

interface PMSOption {
  id: string;
  name: string;
}

export class BrowserClient {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private lastRequestTime: number = 0;
  private minRequestInterval: number = 2000; // 2 seconds between requests

  async init(): Promise<void> {
    if (this.browser) return;

    console.log('Launching browser...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
      ],
    });

    this.page = await this.browser.newPage();

    // Set viewport and user agent
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Navigate to the page first to get cookies
    console.log('Loading SEBI PMR page...');
    await this.page.goto(SEBI_PMR_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Handle language modal if present
    console.log('Checking for language modal...');
    try {
      await this.page.waitForSelector('#btnEnglish', { timeout: 5000 });
      console.log('Dismissing language modal...');
      await this.page.click('#btnEnglish');
      await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch {
      console.log('No language modal found, continuing...');
    }

    // Now navigate to the PMR page
    console.log('Navigating to PMR page...');
    await this.page.goto(SEBI_PMR_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    // Check for language modal again
    try {
      const englishBtn = await this.page.$('#btnEnglish');
      if (englishBtn) {
        await englishBtn.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch {
      // Modal not present
    }

    console.log('Browser initialized');
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve =>
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
  }

  async fetchPMSList(): Promise<PMSOption[]> {
    if (!this.page) throw new Error('Browser not initialized');

    const content = await this.page.content();
    const $ = cheerio.load(content);
    const pmsList: PMSOption[] = [];

    $('select[name="pmrId"] option').each((_, element) => {
      const id = $(element).attr('value');
      const name = $(element).text().trim();

      if (id && id !== '' && name && name !== 'Select') {
        pmsList.push({ id, name });
      }
    });

    console.log(`Found ${pmsList.length} PMSes`);
    return pmsList;
  }

  async fetchMonthlyReport(
    pmrId: string,
    year: number,
    month: number
  ): Promise<string | null> {
    if (!this.page) throw new Error('Browser not initialized');

    await this.rateLimit();

    try {
      // Select the PMS from dropdown
      await this.page.select('select[name="pmrId"]', pmrId);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Select year
      await this.page.select('select[name="year"]', year.toString());
      await new Promise(resolve => setTimeout(resolve, 500));

      // Select month
      await this.page.select('select[name="month"]', month.toString());
      await new Promise(resolve => setTimeout(resolve, 500));

      // Submit form using getPMR() JavaScript function
      await this.page.evaluate(() => {
        // @ts-ignore - getPMR is defined on the page
        if (typeof getPMR === 'function') {
          // @ts-ignore
          getPMR();
        } else {
          const form = document.querySelector('form[name="otherForm"]') as HTMLFormElement;
          if (form) form.submit();
        }
      });

      // Wait for navigation
      await this.page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 2000));

      const content = await this.page.content();

      // Check for "No Records Found"
      if (content.includes('No Records Found') || content.includes('No Data Found')) {
        return null;
      }

      return content;
    } catch (error) {
      console.error(`Error fetching report for ${pmrId} ${year}-${month}:`, error);

      // Navigate back to the main page
      try {
        await this.page.goto(SEBI_PMR_URL, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });
      } catch {
        // Ignore navigation errors
      }

      return null;
    }
  }

  async fetchAllMonthlyReports(
    pmrId: string,
    startYear: number = 2018,
    endYear: number = new Date().getFullYear()
  ): Promise<Array<{ year: number; month: number; html: string }>> {
    const reports: Array<{ year: number; month: number; html: string }> = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    for (let year = startYear; year <= endYear; year++) {
      const maxMonth = year === currentYear ? currentMonth - 1 : 12;

      for (let month = 1; month <= maxMonth; month++) {
        console.log(`  Fetching ${year}-${month.toString().padStart(2, '0')}`);

        const html = await this.fetchMonthlyReport(pmrId, year, month);

        if (html) {
          reports.push({ year, month, html });
        }
      }
    }

    return reports;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

export const browserClient = new BrowserClient();
