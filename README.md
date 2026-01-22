# PMS Tracker - Application Overview

## What is PMS Tracker?

PMS Tracker is a comprehensive tool for tracking and analyzing **Portfolio Management Services (PMS)** registered with SEBI (Securities and Exchange Board of India). It scrapes publicly available data from SEBI's website and presents it in an intuitive, searchable interface with time-series visualizations.

---

## Data Coverage

| Metric | Value |
|--------|-------|
| **PMSes Tracked** | 219 active portfolio managers |
| **Historical Reports** | 11,996 monthly data points |
| **Time Range** | 2018 - 2025 (up to 96 months per PMS) |
| **Data Source** | SEBI Official PMR (Portfolio Manager Reports) |

---

## What Can You Do?

### 1. Browse All PMSes
- View a searchable, sortable list of all 219 portfolio management services
- See key metrics at a glance: AUM, returns, client count
- Filter and search by PMS name

### 2. Analyze Individual PMS (Detail Page)
The enhanced detail page has **4 tabs**:

**Overview Tab**
- Quick stats: Total AUM, Clients, 1-Year Return, Net Flow
- AUM trend chart (historical growth)
- Client growth chart
- Monthly reports table

**Performance Tab**
- Returns over time (line chart)
- 1-month and 1-year return trends
- Performance summary table by month

**Fund Flows Tab**
- Monthly inflow vs outflow (bar chart)
- Net flow trend over time
- Flow analysis to track money movement

**Investment Approaches Tab**
- Breakdown of different strategies offered by the PMS
- Individual strategy AUM and returns
- Benchmark comparisons (where available)

### 3. Compare PMSes
- Side-by-side comparison of multiple PMSes
- Compare AUM, returns, and other metrics

### 4. View Rankings
- Top PMSes by AUM
- Industry leaderboard

### 5. Industry Analytics
- Total industry AUM overview
- Aggregate statistics across all PMSes

---

## Architecture

```
PMSTracker/
├── scraper/          # SEBI data scraper (Puppeteer + TypeScript)
├── backend/          # REST API server (Express + TypeScript)
├── frontend/         # Web UI (React + Vite + Recharts)
├── shared/           # Shared TypeScript types
└── data/             # SQLite database (pms.db)
```

### Scraper
- **Technology:** Puppeteer (headless Chrome), TypeScript
- **Features:**
  - Fetches data from SEBI's official PMR portal
  - Resume mode: skips already-scraped months
  - Skip existing PMS mode: for incremental updates
  - Handles browser session recovery
- **Commands:**
  ```bash
  npm run scrape                        # Full scrape (resume mode)
  npm run scrape -- --skip-existing-pms # Skip PMSes with any data
  npm run scrape -- --pms "hdfc"        # Filter by name
  npm run scrape -- --limit 10          # Limit to N PMSes
  ```

### Backend API
- **Technology:** Express.js, sql.js (SQLite), TypeScript
- **Port:** 3001
- **Endpoints:**
  | Endpoint | Description |
  |----------|-------------|
  | `GET /api/pms` | List all PMSes |
  | `GET /api/pms/:id` | PMS details |
  | `GET /api/pms/:id/reports` | Historical monthly reports |
  | `GET /api/rankings/aum` | Top PMSes by AUM |
  | `GET /api/analytics/overview` | Industry statistics |
  | `GET /api/compare` | Compare multiple PMSes |

### Frontend
- **Technology:** React 18, Vite, Recharts, React Query
- **Port:** 5173
- **Pages:**
  - Dashboard (industry overview)
  - PMS List (browse all)
  - PMS Detail (deep dive with tabs)
  - Compare (side-by-side)
  - Rankings (leaderboards)

### Database Schema
```
pms                    # PMS master data (id, sebi_id, name)
monthly_reports        # Time-series data (AUM, clients, flows, returns)
investment_approaches  # Strategy-level breakdown
```

---

## Data Points Tracked (Per Month)

| Category | Metrics |
|----------|---------|
| **AUM** | Total, Discretionary, Non-Discretionary, Advisory |
| **Clients** | Total, Domestic, Foreign, PF/EPFO, Corporates, Non-Corporates |
| **Fund Flows** | Monthly Inflow, Outflow, Net Flow, Yearly totals |
| **Performance** | 1-Month Return, 1-Year Return |
| **Transactions** | Purchases, Sales, Turnover Ratio |
| **Asset Allocation** | Equity (Listed/Unlisted), Debt, Derivatives, Mutual Funds |

---

## Running the Application

```bash
# Start backend (from backend/)
npm run dev          # Runs on http://localhost:3001

# Start frontend (from frontend/)
npm run dev          # Runs on http://localhost:5173

# Run scraper (from scraper/)
npm run scrape       # Fetch latest data from SEBI
```

---

## Deployment Strategy

The application uses a **static database approach**:
1. Run scraper locally to fetch latest SEBI data
2. Commit the updated `data/pms.db` file
3. Deploy to hosting platform (e.g., Render)
4. Backend serves the pre-populated database

This avoids running the scraper in production and keeps hosting costs minimal.

---

## Use Cases

1. **Investors:** Research PMS options, compare performance, track AUM growth
2. **Financial Advisors:** Analyze industry trends, identify top performers
3. **PMS Companies:** Benchmark against competitors, track market share
4. **Researchers:** Study PMS industry data, fund flows, asset allocation patterns

---

## Summary

PMS Tracker transforms raw SEBI regulatory data into actionable insights through:
- **Automated data collection** from official sources
- **Time-series analysis** with interactive charts
- **Searchable database** of 219 PMSes
- **Clean API** for programmatic access
- **Modern UI** for visual exploration
