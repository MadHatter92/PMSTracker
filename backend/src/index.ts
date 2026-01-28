import express from 'express';
import cors from 'cors';
import {
  initDatabase,
  getAllPMS,
  getPMSById,
  searchPMS,
  getLatestReportsForPMS,
  getReportsByPeriod,
  getInvestmentApproaches,
  getTopPMSByAUM,
  getTopPMSByReturns,
  getIndustryStats,
} from './db/database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database before starting server
async function start() {
  try {
    await initDatabase();
    console.log('Database initialized');

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // PMS endpoints
    app.get('/api/pms', (req, res) => {
      try {
        const { search, limit = '50' } = req.query;

        if (search && typeof search === 'string') {
          const results = searchPMS(search);
          res.json({ data: results, total: results.length });
        } else {
          const allPms = getAllPMS();
          const limitNum = Math.min(parseInt(limit as string, 10), 100);
          res.json({
            data: allPms.slice(0, limitNum),
            total: allPms.length,
          });
        }
      } catch (error) {
        console.error('Error fetching PMS list:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/api/pms/:id', (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        const pms = getPMSById(id);

        if (!pms) {
          res.status(404).json({ error: 'PMS not found' });
          return;
        }

        // Get latest reports
        const reports = getLatestReportsForPMS(id, 12);

        res.json({
          pms,
          reports,
        });
      } catch (error) {
        console.error('Error fetching PMS:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/api/pms/:id/reports', (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        const {
          fromYear = '2018',
          fromMonth = '1',
          toYear = new Date().getFullYear().toString(),
          toMonth = '12',
        } = req.query;

        const reports = getReportsByPeriod(
          id,
          parseInt(fromYear as string, 10),
          parseInt(fromMonth as string, 10),
          parseInt(toYear as string, 10),
          parseInt(toMonth as string, 10)
        );

        // Get investment approaches for each report
        const reportsWithApproaches = reports.map(report => ({
          ...report,
          investmentApproaches: getInvestmentApproaches(report.id),
        }));

        res.json({ data: reportsWithApproaches });
      } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Rankings by AUM
    app.get('/api/rankings/aum', (req, res) => {
      try {
        const {
          year = new Date().getFullYear().toString(),
          month = new Date().getMonth().toString(),
          limit = '10',
        } = req.query;

        const rankings = getTopPMSByAUM(
          parseInt(year as string, 10),
          parseInt(month as string, 10),
          parseInt(limit as string, 10)
        );

        res.json({
          data: rankings.map((r, i) => ({
            rank: i + 1,
            pms: r.pms,
            aum: r.aum,
          })),
          period: { year: parseInt(year as string, 10), month: parseInt(month as string, 10) },
        });
      } catch (error) {
        console.error('Error fetching rankings:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Rankings by Returns (1Y)
    app.get('/api/rankings/returns', (req, res) => {
      try {
        const {
          year = new Date().getFullYear().toString(),
          month = new Date().getMonth().toString(),
          limit = '10',
        } = req.query;

        const rankings = getTopPMSByReturns(
          parseInt(year as string, 10),
          parseInt(month as string, 10),
          parseInt(limit as string, 10)
        );

        res.json({
          data: rankings.map((r, i) => ({
            rank: i + 1,
            pms: r.pms,
            aum: r.aum,
            return1y: r.return1y,
            return1m: r.return1m,
          })),
          period: { year: parseInt(year as string, 10), month: parseInt(month as string, 10) },
        });
      } catch (error) {
        console.error('Error fetching return rankings:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Industry overview
    app.get('/api/analytics/overview', (req, res) => {
      try {
        const {
          year = new Date().getFullYear().toString(),
          month = (new Date().getMonth()).toString(), // Previous month
        } = req.query;

        const stats = getIndustryStats(
          parseInt(year as string, 10),
          parseInt(month as string, 10)
        );

        if (!stats) {
          res.json({
            data: null,
            message: 'No data available for this period',
          });
          return;
        }

        res.json({
          data: stats,
          period: { year: parseInt(year as string, 10), month: parseInt(month as string, 10) },
        });
      } catch (error) {
        console.error('Error fetching overview:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Comparison endpoint
    app.get('/api/compare', (req, res) => {
      try {
        const { ids, fromYear, fromMonth, toYear, toMonth } = req.query;

        if (!ids) {
          res.status(400).json({ error: 'PMS IDs required' });
          return;
        }

        const pmsIds = (ids as string).split(',').map(id => parseInt(id, 10));

        const comparisons = pmsIds.map(id => {
          const pms = getPMSById(id);
          const reports = getReportsByPeriod(
            id,
            parseInt(fromYear as string || '2023', 10),
            parseInt(fromMonth as string || '1', 10),
            parseInt(toYear as string || new Date().getFullYear().toString(), 10),
            parseInt(toMonth as string || '12', 10)
          );

          return {
            pms,
            reports: reports.map(r => ({
              date: `${r.year}-${r.month.toString().padStart(2, '0')}`,
              aum: r.total_aum,
              return1m: r.return_1m,
              return1y: r.return_1y,
              netFlow: r.net_flow,
            })),
          };
        });

        res.json({ data: comparisons });
      } catch (error) {
        console.error('Error comparing PMS:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('API endpoints:');
      console.log('  GET /api/health          - Health check');
      console.log('  GET /api/pms             - List all PMS');
      console.log('  GET /api/pms/:id         - Get PMS details');
      console.log('  GET /api/pms/:id/reports - Get PMS reports');
      console.log('  GET /api/rankings/aum    - Top PMS by AUM');
      console.log('  GET /api/analytics/overview - Industry stats');
      console.log('  GET /api/compare         - Compare PMSes');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
