import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

const SEBI_BASE_URL = 'https://www.sebi.gov.in';
const PMR_ENDPOINT = '/sebiweb/other/OtherAction.do?doPmr=yes';

interface PMSOption {
  id: string;
  name: string;
}

export class SEBIClient {
  private client: AxiosInstance;
  private lastRequestTime: number = 0;
  private minRequestInterval: number = 1000; // 1 second between requests

  constructor() {
    this.client = axios.create({
      baseURL: SEBI_BASE_URL,
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
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

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  async fetchPMSList(): Promise<PMSOption[]> {
    await this.rateLimit();

    const response = await this.retryWithBackoff(async () => {
      return this.client.get(PMR_ENDPOINT);
    });

    const $ = cheerio.load(response.data);
    const pmsList: PMSOption[] = [];

    // Parse the dropdown options
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
    await this.rateLimit();

    const formData = new URLSearchParams();
    formData.append('pmrId', pmrId);
    formData.append('year', year.toString());
    formData.append('month', month.toString());

    try {
      const response = await this.retryWithBackoff(async () => {
        return this.client.post(PMR_ENDPOINT, formData.toString());
      });

      // Check if there's actual data
      if (response.data.includes('No Records Found')) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching report for ${pmrId} ${year}-${month}:`, error);
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
        console.log(`Fetching ${pmrId} for ${year}-${month.toString().padStart(2, '0')}`);

        const html = await this.fetchMonthlyReport(pmrId, year, month);

        if (html) {
          reports.push({ year, month, html });
        }
      }
    }

    return reports;
  }
}

export const sebiClient = new SEBIClient();
