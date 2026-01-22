import * as cheerio from 'cheerio';
import type { ScrapedPMSReport, ClientBreakdown } from '../../shared/types.js';

function parseNumber(text: string | undefined): number {
  if (!text) return 0;
  const cleaned = text.replace(/,/g, '').replace(/\s/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parsePercentage(text: string | undefined): number {
  if (!text) return 0;
  const cleaned = text.replace(/%/g, '').replace(/,/g, '').replace(/\s/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function parsePMSReport(
  html: string,
  pmsId: string,
  pmsName: string,
  year: number,
  month: number
): ScrapedPMSReport | null {
  const $ = cheerio.load(html);

  // Check for "No Records Found"
  const bodyText = $('body').text().toLowerCase();
  if (bodyText.includes('no records found') || bodyText.includes('no data found')) {
    return null;
  }

  // Check if we have actual data tables
  const dataTables = $('table.statistics-table');
  if (dataTables.length === 0) {
    return null;
  }

  const report: ScrapedPMSReport = {
    pmsName,
    pmsId,
    year,
    month,
    discretionary: {
      clients: {
        pfEpfo: 0,
        corporates: 0,
        nonCorporates: 0,
        nonResidents: 0,
        fpi: 0,
        others: 0,
      },
      totalClients: 0,
      aum: 0,
      assetAllocation: {
        equity: { listed: 0, unlisted: 0 },
        debt: { listed: 0, unlisted: 0 },
        derivatives: { equity: 0, commodity: 0, other: 0 },
        mutualFunds: 0,
        other: 0,
      },
      fundFlows: {
        monthlyInflow: 0,
        monthlyOutflow: 0,
        yearlyInflow: 0,
        yearlyOutflow: 0,
      },
      transactions: {
        purchases: 0,
        sales: 0,
        turnoverRatio: 0,
      },
      investmentApproaches: [],
    },
    nonDiscretionary: null,
    advisory: null,
  };

  // Find all statistics tables
  dataTables.each((_, table) => {
    const $table = $(table);
    const tableHtml = $table.html() || '';
    const tableText = $table.text().toLowerCase();
    const prevHeader = $table.closest('.portlet').prev('.org-strong').text().toLowerCase();

    // Performance Data table (has TWRR Returns)
    if (tableText.includes('investment approach') && tableText.includes('aum')) {
      parsePerformanceTable($, $table, report);
    }
    // Transaction Data table
    else if (tableText.includes('sales in the month') || tableText.includes('purchase in the month')) {
      parseTransactionTable($, $table, report);
    }
    // Client breakdown table (has PF/EPFO)
    else if (tableText.includes('pf/epfo') || tableText.includes('non-corporates')) {
      // Check if discretionary or non-discretionary section
      const sectionText = $table.closest('.portlet').prevAll('.org-strong').first().text().toLowerCase();
      if (sectionText.includes('non-discretionary')) {
        parseClientTable($, $table, report, 'non-discretionary');
      } else {
        parseClientTable($, $table, report, 'discretionary');
      }
    }
    // Asset allocation table (has Equity, Debt columns with Listed/Unlisted)
    else if (tableText.includes('equity') && tableText.includes('listed') && tableText.includes('unlisted')) {
      parseAssetAllocationTable($, $table, report);
    }
    // Fund flows table (has Inflow/Outflow)
    else if (tableText.includes('inflow') && tableText.includes('outflow')) {
      const sectionText = $table.closest('.portlet').prevAll('.org-strong').first().text().toLowerCase();
      if (sectionText.includes('non-discretionary')) {
        parseFundFlowsTable($, $table, report, 'non-discretionary');
      } else {
        parseFundFlowsTable($, $table, report, 'discretionary');
      }
    }
  });

  return report;
}

function parsePerformanceTable(
  $: cheerio.CheerioAPI,
  $table: cheerio.Cheerio<cheerio.Element>,
  report: ScrapedPMSReport
): void {
  const rows = $table.find('tbody tr');
  let currentStrategy = '';

  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length === 0) return;

    // Check if this is a strategy row (has rowspan)
    const firstCell = $(cells[0]);
    if (firstCell.attr('rowspan')) {
      currentStrategy = firstCell.text().trim();
      return;
    }

    // Check if this is a benchmark row
    const firstCellText = firstCell.text().trim().toLowerCase();
    if (firstCellText.includes('benchmark')) {
      // This is benchmark data for the previous approach
      return;
    }

    // This is an investment approach row
    const approachName = firstCell.text().trim();
    if (!approachName || approachName.length === 0) return;

    const approach = {
      name: approachName,
      aum: 0,
      return1m: 0,
      return1y: 0,
      benchmark: '',
      benchmarkReturn1m: 0,
      benchmarkReturn1y: 0,
    };

    // Parse values based on column position
    // Columns: Investment Approach, AUM, 1M, 3M, 6M, 1Y, 2Y, 3Y, 4Y, 5Y, Since Inception
    if (cells.length >= 2) approach.aum = parseNumber($(cells[1]).text());
    if (cells.length >= 3) approach.return1m = parsePercentage($(cells[2]).text());
    if (cells.length >= 6) approach.return1y = parsePercentage($(cells[5]).text()); // 1Y is 6th column (index 5)

    if (approach.name && approach.name !== 'Total') {
      report.discretionary.investmentApproaches.push(approach);
      // Add AUM to total
      report.discretionary.aum += approach.aum;
    }
  });
}

function parseTransactionTable(
  $: cheerio.CheerioAPI,
  $table: cheerio.Cheerio<cheerio.Element>,
  report: ScrapedPMSReport
): void {
  const rows = $table.find('tbody tr');

  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;

    const label = $(cells[1]).text().toLowerCase().trim();
    const value = parseNumber($(cells[2]).text());

    if (label.includes('sales') && label.includes('month')) {
      report.discretionary.transactions.sales = value;
    } else if (label.includes('purchase') && label.includes('month')) {
      report.discretionary.transactions.purchases = value;
    } else if (label.includes('turnover')) {
      report.discretionary.transactions.turnoverRatio = value;
    }
  });
}

function parseClientTable(
  $: cheerio.CheerioAPI,
  $table: cheerio.Cheerio<cheerio.Element>,
  report: ScrapedPMSReport,
  serviceType: 'discretionary' | 'non-discretionary'
): void {
  const rows = $table.find('tbody tr');

  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 7) return;

    const label = $(cells[0]).text().toLowerCase().trim();

    // Parse client counts or AUM based on row label
    if (label.includes('unique client') || label.includes('no. of')) {
      if (serviceType === 'discretionary') {
        report.discretionary.clients.pfEpfo = parseNumber($(cells[1]).text());
        report.discretionary.clients.corporates = parseNumber($(cells[2]).text());
        report.discretionary.clients.nonCorporates = parseNumber($(cells[3]).text());
        report.discretionary.clients.nonResidents = parseNumber($(cells[4]).text());
        report.discretionary.clients.fpi = parseNumber($(cells[5]).text());
        report.discretionary.clients.others = parseNumber($(cells[6]).text());
        if (cells.length >= 8) {
          report.discretionary.totalClients = parseNumber($(cells[7]).text());
        }
      }
    }
  });
}

function parseAssetAllocationTable(
  $: cheerio.CheerioAPI,
  $table: cheerio.Cheerio<cheerio.Element>,
  report: ScrapedPMSReport
): void {
  const rows = $table.find('tbody tr');

  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;

    const label = $(cells[0]).text().toLowerCase().trim();
    const listed = parseNumber($(cells[1]).text());
    const unlisted = cells.length >= 3 ? parseNumber($(cells[2]).text()) : 0;

    if (label.includes('equity')) {
      report.discretionary.assetAllocation.equity = { listed, unlisted };
    } else if (label.includes('plain debt')) {
      report.discretionary.assetAllocation.debt = { listed, unlisted };
    } else if (label.includes('mutual fund')) {
      report.discretionary.assetAllocation.mutualFunds = listed + unlisted;
    } else if (label.includes('derivative')) {
      if (label.includes('equity')) {
        report.discretionary.assetAllocation.derivatives.equity = listed;
      } else if (label.includes('commodity')) {
        report.discretionary.assetAllocation.derivatives.commodity = listed;
      }
    }
  });
}

function parseFundFlowsTable(
  $: cheerio.CheerioAPI,
  $table: cheerio.Cheerio<cheerio.Element>,
  report: ScrapedPMSReport,
  serviceType: 'discretionary' | 'non-discretionary'
): void {
  // Find the Total row which has the aggregated data
  const rows = $table.find('tbody tr');

  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 6) return;

    const label = $(cells[0]).text().toLowerCase().trim();

    if (label.includes('total')) {
      // Columns: Label, Monthly Inflow, Monthly Outflow, Monthly Net, Yearly Inflow, Yearly Outflow, Yearly Net
      if (serviceType === 'discretionary') {
        report.discretionary.fundFlows.monthlyInflow = parseNumber($(cells[1]).text());
        report.discretionary.fundFlows.monthlyOutflow = parseNumber($(cells[2]).text());
        report.discretionary.fundFlows.yearlyInflow = parseNumber($(cells[4]).text());
        report.discretionary.fundFlows.yearlyOutflow = parseNumber($(cells[5]).text());
      }
    }
  });
}

export function extractSummaryFromReport(report: ScrapedPMSReport): {
  totalAum: number;
  totalClients: number;
  netFlow: number;
  avgReturn1m: number;
  avgReturn1y: number;
} {
  const totalAum = report.discretionary.aum +
    (report.nonDiscretionary?.aum || 0) +
    (report.advisory?.aum || 0);

  const totalClients = report.discretionary.totalClients +
    (report.nonDiscretionary?.totalClients || 0) +
    (report.advisory?.totalClients || 0);

  const netFlow = report.discretionary.fundFlows.monthlyInflow -
    report.discretionary.fundFlows.monthlyOutflow;

  // Calculate average returns from investment approaches
  const approaches = report.discretionary.investmentApproaches;
  const avgReturn1m = approaches.length > 0
    ? approaches.reduce((sum, a) => sum + a.return1m, 0) / approaches.length
    : 0;
  const avgReturn1y = approaches.length > 0
    ? approaches.reduce((sum, a) => sum + a.return1y, 0) / approaches.length
    : 0;

  return { totalAum, totalClients, netFlow, avgReturn1m, avgReturn1y };
}
