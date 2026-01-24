import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PMSList from './pages/PMSList';
import PMSDetail from './pages/PMSDetail';
import Compare from './pages/Compare';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <div className="header-content">
              <Link to="/" className="logo">
                <h1>Perma<span className="accent">bullish</span></h1>
              </Link>
              <nav className="nav">
                <Link to="/">Dashboard</Link>
                <Link to="/pms">Browse PMS</Link>
                <Link to="/compare">Compare</Link>
              </nav>
            </div>
          </header>
          <main className="main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pms" element={<PMSList />} />
              <Route path="/pms/:id" element={<PMSDetail />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </main>
          <footer className="footer">
            <p className="brand">Perma<span className="accent">bullish</span></p>
            <p>Data source: SEBI Portfolio Manager Monthly Reports</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
