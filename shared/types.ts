// Portfolio Manager Service
export interface PMS {
  id: number;
  sebiId: string;
  name: string;
  createdAt: Date;
}

// Monthly Report Data
export interface MonthlyReport {
  id: number;
  pmsId: number;
  year: number;
  month: number;
  reportDate: Date;

  // AUM (in crores)
  totalAum: number | null;
  discretionaryAum: number | null;
  nonDiscretionaryAum: number | null;
  advisoryAum: number | null;

  // Client Counts
  totalClients: number | null;
  domesticClients: number | null;
  foreignClients: number | null;

  // Fund Flows (in crores)
  inflow: number | null;
  outflow: number | null;
  netFlow: number | null;

  // Performance (percentage)
  return1m: number | null;
  return1y: number | null;
  benchmarkReturn1m: number | null;
  benchmarkReturn1y: number | null;

  // Transactions (in crores)
  purchases: number | null;
  sales: number | null;
  turnoverRatio: number | null;

  createdAt: Date;
}

// Investment Approach within a PMS
export interface InvestmentApproach {
  id: number;
  reportId: number;
  name: string;
  aum: number | null;
  return1m: number | null;
  return1y: number | null;
  benchmark: string | null;
  benchmarkReturn1m: number | null;
  benchmarkReturn1y: number | null;
}

// Asset Allocation breakdown
export interface AssetAllocation {
  id: number;
  reportId: number;
  assetType: 'equity' | 'debt' | 'derivatives' | 'mutual_funds' | 'other';
  listedAmount: number | null;
  unlistedAmount: number | null;
}

// Client breakdown by type
export interface ClientBreakdown {
  pfEpfo: number;
  corporates: number;
  nonCorporates: number;
  nonResidents: number;
  fpi: number;
  others: number;
}

// Scraped data structure from SEBI
export interface ScrapedPMSReport {
  pmsName: string;
  pmsId: string;
  year: number;
  month: number;

  // Discretionary Service Data
  discretionary: {
    clients: ClientBreakdown;
    totalClients: number;
    aum: number;
    assetAllocation: {
      equity: { listed: number; unlisted: number };
      debt: { listed: number; unlisted: number };
      derivatives: { equity: number; commodity: number; other: number };
      mutualFunds: number;
      other: number;
    };
    fundFlows: {
      monthlyInflow: number;
      monthlyOutflow: number;
      yearlyInflow: number;
      yearlyOutflow: number;
    };
    transactions: {
      purchases: number;
      sales: number;
      turnoverRatio: number;
    };
    investmentApproaches: Array<{
      name: string;
      aum: number;
      return1m: number;
      return1y: number;
      benchmark: string;
      benchmarkReturn1m: number;
      benchmarkReturn1y: number;
    }>;
  };

  // Non-Discretionary Service Data
  nonDiscretionary: {
    clients: ClientBreakdown;
    totalClients: number;
    aum: number;
  } | null;

  // Advisory Service Data
  advisory: {
    totalClients: number;
    aum: number;
  } | null;
}

// API Response types
export interface PMSListItem {
  id: number;
  sebiId: string;
  name: string;
  latestAum: number | null;
  latestReturn1y: number | null;
  latestNetFlow: number | null;
}

export interface PMSComparison {
  pmsId: number;
  pmsName: string;
  metrics: {
    date: string;
    aum: number | null;
    return1m: number | null;
    return1y: number | null;
    netFlow: number | null;
  }[];
}

export interface RankingEntry {
  rank: number;
  pmsId: number;
  pmsName: string;
  value: number;
  change: number | null;
}
