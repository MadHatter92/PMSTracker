import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export interface PMS {
  id: number;
  sebi_id: string;
  name: string;
  created_at: string;
}

export interface MonthlyReport {
  id: number;
  pms_id: number;
  year: number;
  month: number;
  total_aum: number | null;
  discretionary_aum: number | null;
  total_clients: number | null;
  inflow: number | null;
  outflow: number | null;
  net_flow: number | null;
  return_1m: number | null;
  return_1y: number | null;
}

export interface InvestmentApproach {
  id: number;
  name: string;
  aum: number | null;
  return_1m: number | null;
  return_1y: number | null;
  benchmark: string | null;
}

// API functions
export async function fetchPMSList(search?: string) {
  const params = search ? { search } : {};
  const response = await api.get<{ data: PMS[]; total: number }>('/pms', { params });
  return response.data;
}

export async function fetchPMSDetails(id: number) {
  const response = await api.get<{ pms: PMS; reports: MonthlyReport[] }>(`/pms/${id}`);
  return response.data;
}

export async function fetchPMSReports(
  id: number,
  fromYear?: number,
  fromMonth?: number,
  toYear?: number,
  toMonth?: number
) {
  const params = { fromYear, fromMonth, toYear, toMonth };
  const response = await api.get<{ data: (MonthlyReport & { investmentApproaches: InvestmentApproach[] })[] }>(
    `/pms/${id}/reports`,
    { params }
  );
  return response.data;
}

export async function fetchRankings(year?: number, month?: number, limit?: number) {
  const params = { year, month, limit };
  const response = await api.get<{
    data: { rank: number; pms: PMS; aum: number }[];
    period: { year: number; month: number };
  }>('/rankings/aum', { params });
  return response.data;
}

export async function fetchIndustryOverview(year?: number, month?: number) {
  const params = { year, month };
  const response = await api.get<{
    data: {
      totalPMS: number;
      totalAUM: number;
      totalClients: number;
      totalNetFlow: number;
    } | null;
    period: { year: number; month: number };
  }>('/analytics/overview', { params });
  return response.data;
}

export async function fetchComparison(
  ids: number[],
  fromYear?: number,
  fromMonth?: number,
  toYear?: number,
  toMonth?: number
) {
  const params = {
    ids: ids.join(','),
    fromYear,
    fromMonth,
    toYear,
    toMonth,
  };
  const response = await api.get<{
    data: {
      pms: PMS;
      reports: { date: string; aum: number | null; return1m: number | null; return1y: number | null; netFlow: number | null }[];
    }[];
  }>('/compare', { params });
  return response.data;
}
