import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRankings, fetchIndustryOverview } from '../services/api';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import { PMSCardRanking } from '../components/PMSCard';

export default function Dashboard() {
  const navigate = useNavigate();

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

      {/* Stats Cards - Using new Tailwind components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total AUM"
          value={overviewLoading ? '...' : overview?.data ? formatCrores(overview.data.totalAUM) : 'N/A'}
          icon={DollarSign}
          variant="highlight"
        />
        <StatCard
          title="Active PMSes"
          value={overviewLoading ? '...' : String(overview?.data?.totalPMS || 'N/A')}
          icon={Activity}
        />
        <StatCard
          title="Total Clients"
          value={overviewLoading ? '...' : overview?.data?.totalClients?.toLocaleString() || 'N/A'}
          icon={Users}
        />
        <StatCard
          title="Net Flow"
          value={overviewLoading ? '...' : overview?.data ? formatCrores(overview.data.totalNetFlow) : 'N/A'}
          icon={TrendingUp}
        />
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

      {/* Top PMS Cards - Using new Tailwind components */}
      <div className="mt-8">
        <h3 className="text-xl font-display font-semibold text-navy-900 mb-4">Top Performers</h3>
        {rankingsLoading ? (
          <div className="text-gray-500">Loading...</div>
        ) : rankings?.data && rankings.data.length > 0 ? (
          <div className="space-y-3">
            {rankings.data.map((r) => (
              <PMSCardRanking
                key={r.pms.id}
                rank={r.rank}
                name={r.pms.name}
                aum={r.aum}
                onClick={() => navigate(`/pms/${r.pms.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );
}
