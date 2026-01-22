import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRankings, fetchIndustryOverview } from '../services/api';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  const { data: rankings, isLoading: rankingsLoading } = useQuery({
    queryKey: ['rankings', 2024, 11],
    queryFn: () => fetchRankings(2024, 11, 10),
  });

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['overview', 2024, 11],
    queryFn: () => fetchIndustryOverview(2024, 11),
  });

  const formatCrores = (value: number) => {
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L Cr`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K Cr`;
    return `${value.toFixed(1)} Cr`;
  };

  // Format for chart axis (compact)
  const formatAxisCrores = (value: number) => {
    if (value >= 10000) return `${(value / 1000).toFixed(0)}K`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${value.toFixed(0)}`;
  };

  return (
    <div className="dashboard">
      <h2>Industry Overview - November 2024</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total AUM</span>
            <span className="stat-value">
              {overviewLoading ? '...' : overview?.data ? formatCrores(overview.data.totalAUM) : 'N/A'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Active PMSes</span>
            <span className="stat-value">
              {overviewLoading ? '...' : overview?.data?.totalPMS || 'N/A'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Clients</span>
            <span className="stat-value">
              {overviewLoading ? '...' : overview?.data?.totalClients?.toLocaleString() || 'N/A'}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Net Flow</span>
            <span className="stat-value">
              {overviewLoading ? '...' : overview?.data ? formatCrores(overview.data.totalNetFlow) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Top PMS by AUM Chart */}
      <div className="chart-section">
        <h3>Top 10 PMS by AUM</h3>
        {rankingsLoading ? (
          <div className="loading">Loading...</div>
        ) : rankings?.data && rankings.data.length > 0 ? (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={rankings.data.map(r => ({
                  name: r.pms.name.length > 20 ? r.pms.name.substring(0, 20) + '...' : r.pms.name,
                  aum: r.aum,
                  fullName: r.pms.name,
                }))}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatAxisCrores} />
                <YAxis type="category" dataKey="name" width={140} />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(2)} Cr`, 'AUM']}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                />
                <Bar dataKey="aum" fill="#4f46e5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="no-data">No ranking data available</div>
        )}
      </div>

      {/* Top PMS Table */}
      <div className="table-section">
        <h3>Top Performers</h3>
        {rankingsLoading ? (
          <div className="loading">Loading...</div>
        ) : rankings?.data && rankings.data.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>PMS Name</th>
                <th>AUM (Cr)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rankings.data.map((r) => (
                <tr key={r.pms.id}>
                  <td>{r.rank}</td>
                  <td>{r.pms.name}</td>
                  <td>{r.aum.toFixed(2)}</td>
                  <td>
                    <Link to={`/pms/${r.pms.id}`} className="btn-link">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">No data available</div>
        )}
      </div>
    </div>
  );
}
