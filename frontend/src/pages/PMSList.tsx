import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPMSList } from '../services/api';
import { Search } from 'lucide-react';

export default function PMSList() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['pmsList', debouncedSearch],
    queryFn: () => fetchPMSList(debouncedSearch || undefined),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    // Simple debounce
    setTimeout(() => setDebouncedSearch(value), 300);
  };

  return (
    <div className="pms-list-page">
      <h2>Browse Portfolio Management Services</h2>

      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search by PMS name..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {isLoading ? (
        <div className="loading">Loading PMS list...</div>
      ) : error ? (
        <div className="error">Error loading data. Please try again.</div>
      ) : data?.data && data.data.length > 0 ? (
        <>
          <p className="result-count">
            Showing {data.data.length} of {data.total} PMSes
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>SEBI ID</th>
                <th>PMS Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((pms) => (
                <tr key={pms.id}>
                  <td>{pms.sebi_id}</td>
                  <td>{pms.name}</td>
                  <td>
                    <Link to={`/pms/${pms.id}`} className="btn-link">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="no-data">
          {debouncedSearch
            ? `No PMSes found matching "${debouncedSearch}"`
            : 'No PMS data available'}
        </div>
      )}
    </div>
  );
}
