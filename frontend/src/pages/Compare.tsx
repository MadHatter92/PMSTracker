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
import { X, Plus } from 'lucide-react';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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

  return (
    <div className="compare-page">
      <h2>Compare Portfolio Management Services</h2>

      {/* PMS Selection */}
      <div className="compare-selector">
        <div className="selected-pms-list">
          {selectedIds.map((id, index) => {
            const pmsName = pmsList?.data?.find((p) => p.id === id)?.name ||
              comparison?.data?.find((d) => d.pms?.id === id)?.pms?.name ||
              `PMS ${id}`;
            return (
              <div
                key={id}
                className="selected-pms-chip"
                style={{ borderColor: COLORS[index] }}
              >
                <span style={{ color: COLORS[index] }}>{pmsName}</span>
                <button onClick={() => handleRemovePMS(id)}>
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {selectedIds.length < 5 && (
          <div className="add-pms-section">
            <div className="search-dropdown">
              <input
                type="text"
                placeholder="Search and add PMS to compare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && pmsList?.data && (
                <div className="dropdown-results">
                  {pmsList.data
                    .filter((p) => !selectedIds.includes(p.id))
                    .slice(0, 10)
                    .map((pms) => (
                      <button
                        key={pms.id}
                        onClick={() => handleAddPMS(pms.id)}
                        className="dropdown-item"
                      >
                        <Plus size={14} /> {pms.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedIds.length === 0 ? (
        <div className="compare-empty">
          <p>Select up to 5 PMSes to compare their performance</p>
        </div>
      ) : comparisonLoading ? (
        <div className="loading">Loading comparison data...</div>
      ) : (
        <>
          {/* AUM Comparison Chart */}
          <div className="chart-section">
            <h3>AUM Comparison</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatAUMAxis} />
                  <Tooltip formatter={(value: number) => [`${value?.toFixed(2) || 'N/A'} Cr`]} />
                  <Legend />
                  {selectedPMSNames.map((name, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`aum_${index}`}
                      name={name}
                      stroke={COLORS[index]}
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Returns Comparison Chart */}
          <div className="chart-section">
            <h3>1-Year Return Comparison</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(v) => `${v?.toFixed(1) || 0}%`} />
                  <Tooltip formatter={(value: number) => [`${value?.toFixed(2) || 'N/A'}%`]} />
                  <Legend />
                  {selectedPMSNames.map((name, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`return1y_${index}`}
                      name={name}
                      stroke={COLORS[index]}
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="table-section">
            <h3>Latest Data Comparison</h3>
            {comparison?.data && comparison.data.length > 0 && (
              <table className="data-table comparison-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    {comparison.data.map((d, i) => (
                      <th key={i} style={{ color: COLORS[i] }}>
                        {d.pms?.name || 'Unknown'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Latest AUM (Cr)</td>
                    {comparison.data.map((d, i) => {
                      const latest = d.reports[d.reports.length - 1];
                      return <td key={i}>{latest?.aum?.toFixed(2) || 'N/A'}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>1-Year Return</td>
                    {comparison.data.map((d, i) => {
                      const latest = d.reports[d.reports.length - 1];
                      const val = latest?.return1y;
                      return (
                        <td key={i} className={val && val >= 0 ? 'positive' : 'negative'}>
                          {val !== null && val !== undefined ? `${val >= 0 ? '+' : ''}${val.toFixed(2)}%` : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td>Net Flow (Cr)</td>
                    {comparison.data.map((d, i) => {
                      const latest = d.reports[d.reports.length - 1];
                      const val = latest?.netFlow;
                      return (
                        <td key={i} className={val && val >= 0 ? 'positive' : 'negative'}>
                          {val !== null && val !== undefined ? val.toFixed(2) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td>Data Points</td>
                    {comparison.data.map((d, i) => (
                      <td key={i}>{d.reports.length} months</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
