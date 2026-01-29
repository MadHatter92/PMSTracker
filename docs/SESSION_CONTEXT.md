# PMS Tracker - Session Context

## Current State (Jan 29, 2026)

### What's Been Built

**Backend (Node.js/Express on port 3001):**
- `/api/rankings/returns` - Top PMSs by 1Y returns (NEW)
- `/api/rankings/aum` - Top PMSs by AUM
- `/api/pms` - List all PMSs
- `/api/pms/:id` - PMS details with reports
- `/api/pms/:id/reports` - Historical reports with investment approaches
- `/api/analytics/overview` - Industry stats
- `/api/compare` - Compare multiple PMSs

**Frontend (React/Vite with Tailwind CSS):**
- Tailwind configured with Permabullish brand colors (navy: #1e3a5f, saffron: #e8913a)
- New components created:
  - `PMSCard.tsx` - Default, Compact, Ranking variants
  - `StrategyCard.tsx` - Default, Compact, Comparison variants
  - `StatCard.tsx` - Default, Highlight, Compact variants
- Pages enhanced with Tailwind:
  - Dashboard - StatCards + PMSCardRanking (sorted by returns)
  - PMSDetail - StatCards for metrics + StrategyCards for approaches + Strategy Summary
  - Compare - Redesigned with search, comparison cards, better tables

### Data Available

**584 PMSs with 32,996 monthly reports (Jan 2018 - Dec 2024)**

| Category | Fields |
|----------|--------|
| AUM | Total, Discretionary, Non-discretionary, Advisory |
| Clients | Total, Domestic, Foreign, PF/EPFO, Corporate, Non-corporate |
| Fund Flows | Monthly Inflow, Outflow, Net Flow, Yearly totals |
| Performance | 1-Month Return, 1-Year Return |
| Benchmark | Benchmark 1M & 1Y returns |
| Trading | Purchases, Sales, Turnover Ratio |
| Asset Allocation | Equity (Listed/Unlisted), Debt, Derivatives, MFs, Other |

**117,000+ Investment Approaches (Strategies):**
- Strategy Name, AUM, 1M/1Y Returns, Benchmark

**Latest Stats (Nov 2024):**
- 440 active PMSs
- ₹4.39 Lakh Cr total AUM
- 1,383 clients
- ₹15,961 Cr net inflow

---

## Next Steps: Design Direction

### User Personas
1. **Prospective investors** (₹50L+ capital) - "Where should I invest?"
2. **Existing PMS clients** - "Is my PMS doing well? Should I switch?"
3. **Financial advisors** - "What should I recommend?"

### Proposed User Flows

**1. "Top Performers" - Leaderboards**
- Best 1Y returns
- Best risk-adjusted returns
- Highest inflows (social proof)
- Largest AUM (established players)

**2. "Explore Strategies" - Strategy-first browsing**
- Browse by investment style (Large Cap, Multi-cap, Value, Growth, etc.)
- Compare strategies across different PMSs
- "Best performing Multi-cap strategies"

**3. "PMS Profile" - Deep research**
- Performance history chart
- All strategies with individual returns
- Fund flow trends
- Client growth

**4. "Compare" - Decision mode**
- Select 2-3 PMSs side-by-side
- Highlight winner in each metric

**5. "Industry Pulse" - Market overview**
- Total industry AUM trend
- Net flows this month
- Rising stars vs falling giants

### Design References
- `frontend/public/flow-prototype.html` - Guided investment flow prototype
- Permabullish design system: Navy (#1e3a5f) + Saffron (#e8913a)
- Font: DM Sans (body) + DM Serif Display (headings)

---

## Deployment Notes

**NOT YET DEPLOYED** - Was about to copy to permabullish-ai repo when paused.

To deploy:
1. Copy `pms-frontend/` and `pms-backend/` to `permabullish-ai/`
2. Add services to `permabullish-ai/render.yaml`
3. Include `data/pms.db` with backend (static database approach)

---

## Git Status

Latest commit: `d597ad6` - "feat: Add rankings by returns API and enhance UI pages"
Branch: master
Remote: https://github.com/MadHatter92/PMSTracker.git

Uncommitted files:
- PERMABULLISH_PRD.md (modified)
- data/pms.db (modified - updated scrape data)
- frontend/public/flow-prototype.html (new)
- scripts/ (new)
