import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { fetchPMSDetails, fetchPMSReports } from '../services/api';
import Tabs from '../components/Tabs';
import StatCard from '../components/StatCard';
import StrategyCard from '../components/StrategyCard';
import {
  ArrowLeft,
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  Wallet,
  Briefcase,
  Users,
  DollarSign,
  Activity,
  PieChart,
} from 'lucide-react';

export default function PMSDetail() {
  const { id } = useParams<{ id: string }>();
  const pmsId = parseInt(id || '0', 10);

  const { data: details, isLoading: detailsLoading } = useQuery({
    queryKey: ['pmsDetails', pmsId],
    queryFn: () => fetchPMSDetails(pmsId),
    enabled: pmsId > 0,
  });

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ['pmsReports', pmsId],
    queryFn: () => fetchPMSReports(pmsId),
    enabled: pmsId > 0,
  });

  const formatCrores = (value: number | null) => {
    if (value === null || value === undefined) return 'N/A';
    if (Math.abs(value) >= 10000) return `${(value / 10000).toFixed(1)}L Cr`;
    if (Math.abs(value) >= 100) return `${(value / 100).toFixed(1)}K Cr`;
    return `${value.toFixed(1)} Cr`;
  };

  const formatPercent = (value: number | null) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Format AUM for Y-axis (compact display)
  const formatAUMAxis = (value: number) => {
    if (value >= 10000) return `${(value / 1000).toFixed(0)}K`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${value.toFixed(0)}`;
  };

  const formatMonth = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
  };

  if (detailsLoading) {
    return <div className="loading">Loading PMS details...</div>;
  }

  if (!details?.pms) {
    return <div className="error">PMS not found</div>;
  }

  const { pms, reports: latestReports } = details;
  const latestReport = latestReports?.[0];

  // Prepare chart data from reports (API returns data sorted oldest to newest)
  const chartData = reports?.data
    ?.map((r) => ({
      date: `${formatMonth(r.month)} ${r.year.toString().slice(-2)}`,
      fullDate: `${r.year}-${r.month.toString().padStart(2, '0')}`,
      aum: r.total_aum,
      return1m: r.return_1m,
      return1y: r.return_1y,
      netFlow: r.net_flow,
      inflow: r.inflow,
      outflow: r.outflow ? -Math.abs(r.outflow) : null,
      clients: r.total_clients,
      investmentApproaches: r.investmentApproaches,
    })) || [];

  // Get latest investment approaches (last element is most recent)
  const latestApproaches = reports?.data?.length
    ? reports.data[reports.data.length - 1].investmentApproaches || []
    : [];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'performance', label: 'Performance', icon: <LineChartIcon size={16} /> },
    { id: 'flows', label: 'Fund Flows', icon: <Wallet size={16} /> },
    { id: 'approaches', label: 'Investment Approaches', icon: <Briefcase size={16} /> },
  ];

  return (
    <div className="pms-detail-page">
      <Link to="/pms" className="back-link">
        <ArrowLeft size={16} /> Back to list
      </Link>

      {/* Header Section */}
      <div className="pms-detail-header">
        <div className="pms-title-section">
          <h2>{pms.name}</h2>
          <span className="sebi-id">SEBI ID: {pms.sebi_id}</span>
        </div>
        {latestReport && (
          <div className="pms-period-badge">
            Data as of {formatMonth(latestReport.month)} {latestReport.year}
          </div>
        )}
      </div>

      {/* Quick Stats Bar - Tailwind styled */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="AUM"
          value={formatCrores(latestReport?.total_aum ?? null)}
          icon={DollarSign}
          variant="compact"
        />
        <StatCard
          title="Clients"
          value={latestReport?.total_clients?.toLocaleString() || 'N/A'}
          icon={Users}
          variant="compact"
        />
        <StatCard
          title="1M Return"
          value={formatPercent(latestReport?.return_1m ?? null)}
          icon={Activity}
          variant="compact"
        />
        <StatCard
          title="1Y Return"
          value={formatPercent(latestReport?.return_1y ?? null)}
          icon={TrendingUp}
          variant="highlight"
        />
        <StatCard
          title="Net Flow"
          value={formatCrores(latestReport?.net_flow ?? null)}
          icon={Wallet}
          variant="compact"
        />
      </div>

      {/* Tabbed Content */}
      <Tabs tabs={tabs} defaultTab="overview">
        {(activeTab) => (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-panel">
                <div className="charts-grid">
                  {/* AUM Trend Chart */}
                  <div className="chart-section">
                    <h3>AUM Trend</h3>
                    {reportsLoading ? (
                      <div className="loading">Loading chart data...</div>
                    ) : chartData.length > 0 ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={formatAUMAxis} tick={{ fontSize: 12 }} />
                            <Tooltip
                              formatter={(value: number) => [`${value?.toFixed(2)} Cr`, 'AUM']}
                              labelFormatter={(label) => `Period: ${label}`}
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            />
                            <Line
                              type="monotone"
                              dataKey="aum"
                              stroke="#4f46e5"
                              strokeWidth={2.5}
                              dot={{ fill: '#4f46e5', strokeWidth: 0, r: 3 }}
                              activeDot={{ r: 5, fill: '#4f46e5' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="no-data">No historical data available</div>
                    )}
                  </div>

                  {/* Client Trend Chart */}
                  <div className="chart-section">
                    <h3>Client Growth</h3>
                    {reportsLoading ? (
                      <div className="loading">Loading chart data...</div>
                    ) : chartData.length > 0 ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                              formatter={(value: number) => [value?.toLocaleString(), 'Clients']}
                              labelFormatter={(label) => `Period: ${label}`}
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            />
                            <Line
                              type="monotone"
                              dataKey="clients"
                              stroke="#10b981"
                              strokeWidth={2.5}
                              dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }}
                              activeDot={{ r: 5, fill: '#10b981' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="no-data">No client data available</div>
                    )}
                  </div>
                </div>

                {/* Monthly Reports Table */}
                <div className="table-section">
                  <h3>Monthly Reports</h3>
                  {latestReports && latestReports.length > 0 ? (
                    <div className="table-wrapper">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>AUM (Cr)</th>
                            <th>Clients</th>
                            <th>Net Flow (Cr)</th>
                            <th>1M Return</th>
                            <th>1Y Return</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestReports.map((report) => (
                            <tr key={report.id}>
                              <td className="period-cell">
                                {formatMonth(report.month)} {report.year}
                              </td>
                              <td>{report.total_aum?.toFixed(2) || 'N/A'}</td>
                              <td>{report.total_clients?.toLocaleString() || 'N/A'}</td>
                              <td className={report.net_flow && report.net_flow >= 0 ? 'positive' : 'negative'}>
                                {report.net_flow?.toFixed(2) || 'N/A'}
                              </td>
                              <td className={report.return_1m && report.return_1m >= 0 ? 'positive' : 'negative'}>
                                {formatPercent(report.return_1m)}
                              </td>
                              <td className={report.return_1y && report.return_1y >= 0 ? 'positive' : 'negative'}>
                                {formatPercent(report.return_1y)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">No reports available</div>
                  )}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="tab-panel">
                <div className="charts-grid">
                  {/* Returns Comparison Chart */}
                  <div className="chart-section chart-full-width">
                    <h3>Performance Returns Over Time</h3>
                    {reportsLoading ? (
                      <div className="loading">Loading chart data...</div>
                    ) : chartData.length > 0 ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={350}>
                          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(v) => `${v.toFixed(0)}%`} tick={{ fontSize: 12 }} />
                            <Tooltip
                              formatter={(value: number, name: string) => [
                                `${value?.toFixed(2)}%`,
                                name === 'return1m' ? '1-Month Return' : '1-Year Return'
                              ]}
                              labelFormatter={(label) => `Period: ${label}`}
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            />
                            <Legend />
                            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                            <Line
                              type="monotone"
                              dataKey="return1m"
                              name="1-Month Return"
                              stroke="#10b981"
                              strokeWidth={2.5}
                              dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="return1y"
                              name="1-Year Return"
                              stroke="#f59e0b"
                              strokeWidth={2.5}
                              dot={{ fill: '#f59e0b', strokeWidth: 0, r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="no-data">No performance data available</div>
                    )}
                  </div>
                </div>

                {/* Performance Table */}
                <div className="table-section">
                  <h3>Monthly Performance Summary</h3>
                  {latestReports && latestReports.length > 0 ? (
                    <div className="table-wrapper">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>1M Return</th>
                            <th>1Y Return</th>
                            <th>AUM Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestReports.map((report, index) => {
                            const prevReport = latestReports[index + 1];
                            const aumChange = prevReport && report.total_aum && prevReport.total_aum
                              ? ((report.total_aum - prevReport.total_aum) / prevReport.total_aum) * 100
                              : null;
                            return (
                              <tr key={report.id}>
                                <td className="period-cell">
                                  {formatMonth(report.month)} {report.year}
                                </td>
                                <td className={report.return_1m && report.return_1m >= 0 ? 'positive' : 'negative'}>
                                  {formatPercent(report.return_1m)}
                                </td>
                                <td className={report.return_1y && report.return_1y >= 0 ? 'positive' : 'negative'}>
                                  {formatPercent(report.return_1y)}
                                </td>
                                <td className={aumChange !== null && aumChange >= 0 ? 'positive' : 'negative'}>
                                  {aumChange !== null ? formatPercent(aumChange) : 'N/A'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">No performance data available</div>
                  )}
                </div>
              </div>
            )}

            {/* Fund Flows Tab */}
            {activeTab === 'flows' && (
              <div className="tab-panel">
                <div className="charts-grid">
                  {/* Inflow/Outflow Chart */}
                  <div className="chart-section chart-full-width">
                    <h3>Monthly Fund Flows</h3>
                    {reportsLoading ? (
                      <div className="loading">Loading chart data...</div>
                    ) : chartData.length > 0 ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(v) => `${v.toFixed(0)}`} tick={{ fontSize: 12 }} />
                            <Tooltip
                              formatter={(value: number, name: string) => [
                                `${Math.abs(value)?.toFixed(2)} Cr`,
                                name === 'inflow' ? 'Inflow' : 'Outflow'
                              ]}
                              labelFormatter={(label) => `Period: ${label}`}
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            />
                            <Legend />
                            <ReferenceLine y={0} stroke="#9ca3af" />
                            <Bar dataKey="inflow" name="Inflow" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="outflow" name="Outflow" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="no-data">No flow data available</div>
                    )}
                  </div>

                  {/* Net Flow Trend */}
                  <div className="chart-section chart-full-width">
                    <h3>Net Flow Trend</h3>
                    {reportsLoading ? (
                      <div className="loading">Loading chart data...</div>
                    ) : chartData.length > 0 ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(v) => `${v.toFixed(0)}`} tick={{ fontSize: 12 }} />
                            <Tooltip
                              formatter={(value: number) => [`${value?.toFixed(2)} Cr`, 'Net Flow']}
                              labelFormatter={(label) => `Period: ${label}`}
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                            />
                            <ReferenceLine y={0} stroke="#9ca3af" />
                            <Bar
                              dataKey="netFlow"
                              name="Net Flow"
                              fill="#4f46e5"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="no-data">No flow data available</div>
                    )}
                  </div>
                </div>

                {/* Fund Flow Table */}
                <div className="table-section">
                  <h3>Fund Flow Details</h3>
                  {latestReports && latestReports.length > 0 ? (
                    <div className="table-wrapper">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>Inflow (Cr)</th>
                            <th>Outflow (Cr)</th>
                            <th>Net Flow (Cr)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestReports.map((report) => (
                            <tr key={report.id}>
                              <td className="period-cell">
                                {formatMonth(report.month)} {report.year}
                              </td>
                              <td className="positive">
                                {report.inflow?.toFixed(2) || 'N/A'}
                              </td>
                              <td className="negative">
                                {report.outflow?.toFixed(2) || 'N/A'}
                              </td>
                              <td className={report.net_flow && report.net_flow >= 0 ? 'positive' : 'negative'}>
                                {report.net_flow?.toFixed(2) || 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">No flow data available</div>
                  )}
                </div>
              </div>
            )}

            {/* Investment Approaches Tab */}
            {activeTab === 'approaches' && (
              <div className="tab-panel">
                {latestApproaches.length > 0 ? (
                  <>
                    {/* Strategy Cards Grid - Tailwind styled */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {latestApproaches.map((approach) => (
                        <StrategyCard
                          key={approach.id}
                          name={approach.name}
                          aum={approach.aum}
                          return1m={approach.return_1m}
                          return1y={approach.return_1y}
                          benchmark={approach.benchmark}
                        />
                      ))}
                    </div>

                    {/* Summary Stats */}
                    <div className="bg-gradient-to-r from-navy-50 to-saffron-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Strategy Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy-900">{latestApproaches.length}</p>
                          <p className="text-sm text-gray-600">Total Strategies</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-navy-900">
                            {formatCrores(latestApproaches.reduce((sum, a) => sum + (a.aum || 0), 0))}
                          </p>
                          <p className="text-sm text-gray-600">Combined AUM</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${
                            Math.max(...latestApproaches.map(a => a.return_1y || 0)) >= 0
                              ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercent(Math.max(...latestApproaches.map(a => a.return_1y || 0)))}
                          </p>
                          <p className="text-sm text-gray-600">Best 1Y Return</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${
                            (latestApproaches.reduce((sum, a) => sum + (a.return_1y || 0), 0) / latestApproaches.length) >= 0
                              ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercent(latestApproaches.reduce((sum, a) => sum + (a.return_1y || 0), 0) / latestApproaches.length)}
                          </p>
                          <p className="text-sm text-gray-600">Avg 1Y Return</p>
                        </div>
                      </div>
                    </div>

                    {/* Approaches Table */}
                    <div className="table-section">
                      <h3>All Investment Approaches</h3>
                      <div className="table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Strategy Name</th>
                              <th>AUM (Cr)</th>
                              <th>1M Return</th>
                              <th>1Y Return</th>
                              <th>Benchmark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {latestApproaches.map((approach) => (
                              <tr key={approach.id}>
                                <td className="strategy-name">{approach.name}</td>
                                <td>{approach.aum?.toFixed(2) || 'N/A'}</td>
                                <td className={approach.return_1m && approach.return_1m >= 0 ? 'positive' : 'negative'}>
                                  {formatPercent(approach.return_1m)}
                                </td>
                                <td className={approach.return_1y && approach.return_1y >= 0 ? 'positive' : 'negative'}>
                                  {formatPercent(approach.return_1y)}
                                </td>
                                <td className="benchmark-cell">{approach.benchmark || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <PieChart size={48} className="mb-4" />
                    <p>No investment approach data available for this PMS</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
