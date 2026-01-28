import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { fetchPMSList, fetchComparison } from '../services/api';
import { X, Plus, Search, BarChart2 } from 'lucide-react';

const COLORS = ['#1e3a5f', '#e8913a', '#10b981', '#ef4444', '#8b5cf6'];

// Format AUM for Y-axis (compact display)
const formatAUMAxis = (value: number) => {
  if (value >= 10000) return `${(value / 1000).toFixed(0)}K Cr`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K Cr`;
  return `${value.toFixed(0)} Cr`;
};

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: pmsList } = useQuery({
    queryKey: ['pmsList', searchTerm],
    queryFn: () => fetchPMSList(searchTerm || undefined),
  });

  const { data: comparison, isLoading: comparisonLoading } = useQuery({
    queryKey: ['comparison', selectedIds],
    queryFn: () => fetchComparison(selectedIds),
    enabled: selectedIds.length > 0,
  });

  const handleAddPMS = (id: number) => {
    if (selectedIds.length < 5 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setSearchTerm('');
    }
  };

  const handleRemovePMS = (id: number) => {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  // Merge comparison data for charts
  const chartData = (() => {
    if (!comparison?.data || comparison.data.length === 0) return [];

    const dateMap = new Map<string, Record<string, number | null>>();

    comparison.data.forEach((pmsData, index) => {
      pmsData.reports.forEach((report) => {
        if (!dateMap.has(report.date)) {
          dateMap.set(report.date, {});
        }
        const entry = dateMap.get(report.date)!;
        entry[`aum_${index}`] = report.aum;
        entry[`return1y_${index}`] = report.return1y;
      });
    });

    return Array.from(dateMap.entries())
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => a.date.localeCompare(b.date));
  })();

  const selectedPMSNames = comparison?.data?.map((d) => d.pms?.name || 'Unknown') || [];

  // Format values for display
  const formatCrores = (value: number | null) => {
    if (value === null || value === undefined) return 'N/A';
    if (Math.abs(value) >= 10000) return `₹${(value / 10000).toFixed(1)}L Cr`;
    if (Math.abs(value) >= 100) return `₹${(value / 100).toFixed(1)}K Cr`;
    return `₹${value.toFixed(1)} Cr`;
  };

  const formatPercent = (value: number | null) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="compare-page">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-navy-900">Compare PMS</h2>
        <p className="text-gray-600 mt-1">Select up to 5 portfolio managers to compare side-by-side</p>
      </div>

      {/* PMS Selection - Tailwind styled */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-card">
        {/* Selected PMS chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedIds.map((id, index) => {
            const pmsName = pmsList?.data?.find((p) => p.id === id)?.name ||
              comparison?.data?.find((d) => d.pms?.id === id)?.pms?.name ||
              `PMS ${id}`;
            return (
              <div
                key={id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-white"
                style={{ borderColor: COLORS[index], backgroundColor: `${COLORS[index]}10` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm font-medium text-navy-900 max-w-[200px] truncate">
                  {pmsName}
                </span>
                <button
                  onClick={() => handleRemovePMS(id)}
                  className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>
            );
          })}
          {selectedIds.length === 0 && (
            <p className="text-gray-400 text-sm">No PMS selected yet</p>
          )}
        </div>

        {/* Search input */}
        {selectedIds.length < 5 && (
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search and add PMS to compare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
              />
            </div>
            {searchTerm && pmsList?.data && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                {pmsList.data
                  .filter((p) => !selectedIds.includes(p.id))
                  .slice(0, 10)
                  .map((pms) => (
                    <button
                      key={pms.id}
                      onClick={() => handleAddPMS(pms.id)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <Plus size={16} className="text-saffron-500" />
                      <span className="text-sm text-navy-900">{pms.name}</span>
                    </button>
                  ))}
                {pmsList.data.filter((p) => !selectedIds.includes(p.id)).length === 0 && (
                  <p className="px-4 py-3 text-sm text-gray-500">No matching PMS found</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedIds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <BarChart2 size={64} className="mb-4" />
          <p className="text-lg">Select PMSes above to start comparing</p>
        </div>
      ) : comparisonLoading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          Loading comparison data...
        </div>
      ) : (
        <>
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {comparison?.data?.map((d, i) => {
              const latest = d.reports[d.reports.length - 1];
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border-2 p-4 shadow-card"
                  style={{ borderColor: COLORS[i] }}
                >
                  <div
                    className="w-full h-1 rounded-full mb-3"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <h4 className="font-semibold text-navy-900 text-sm mb-3 truncate">
                    {d.pms?.name || 'Unknown'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">AUM</span>
                      <span className="text-sm font-medium text-navy-800">
                        {formatCrores(latest?.aum ?? null)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">1Y Return</span>
                      <span className={`text-sm font-bold ${
                        (latest?.return1y ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatPercent(latest?.return1y ?? null)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Net Flow</span>
                      <span className={`text-sm font-medium ${
                        (latest?.netFlow ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCrores(latest?.netFlow ?? null)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AUM Comparison Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-card">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">AUM Comparison</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatAUMAxis} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value?.toFixed(2) || 'N/A'} Cr`]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  {selectedPMSNames.map((name, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`aum_${index}`}
                      name={name}
                      stroke={COLORS[index]}
                      strokeWidth={2.5}
                      dot={false}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Returns Comparison Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-card">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">1-Year Return Comparison</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v?.toFixed(1) || 0}%`} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value?.toFixed(2) || 'N/A'}%`]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  {selectedPMSNames.map((name, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`return1y_${index}`}
                      name={name}
                      stroke={COLORS[index]}
                      strokeWidth={2.5}
                      dot={false}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-card">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Detailed Comparison</h3>
            {comparison?.data && comparison.data.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Metric</th>
                      {comparison.data.map((d, i) => (
                        <th key={i} className="text-left py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[i] }}
                            />
                            <span className="text-sm font-semibold text-navy-900 truncate max-w-[150px]">
                              {d.pms?.name || 'Unknown'}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">Latest AUM</td>
                      {comparison.data.map((d, i) => {
                        const latest = d.reports[d.reports.length - 1];
                        return (
                          <td key={i} className="py-3 px-4 text-sm font-medium text-navy-900">
                            {formatCrores(latest?.aum ?? null)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">1-Year Return</td>
                      {comparison.data.map((d, i) => {
                        const latest = d.reports[d.reports.length - 1];
                        const val = latest?.return1y;
                        return (
                          <td key={i} className={`py-3 px-4 text-sm font-bold ${
                            val && val >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercent(val ?? null)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">1-Month Return</td>
                      {comparison.data.map((d, i) => {
                        const latest = d.reports[d.reports.length - 1];
                        const val = latest?.return1m;
                        return (
                          <td key={i} className={`py-3 px-4 text-sm font-medium ${
                            val && val >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercent(val ?? null)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">Net Flow</td>
                      {comparison.data.map((d, i) => {
                        const latest = d.reports[d.reports.length - 1];
                        const val = latest?.netFlow;
                        return (
                          <td key={i} className={`py-3 px-4 text-sm font-medium ${
                            val && val >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCrores(val ?? null)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">Data History</td>
                      {comparison.data.map((d, i) => (
                        <td key={i} className="py-3 px-4 text-sm text-gray-500">
                          {d.reports.length} months
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
