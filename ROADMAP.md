# Permabullish - Production Roadmap

> Created: January 25, 2026
> Goal: Launch MVP of Permabullish with unified MF, PMS, and Stock Research tools

---

## Overview

```
CURRENT STATE                           TARGET STATE
─────────────────                       ─────────────────
✓ Equity Research (deployed)            Unified Platform
✓ PMS Tracker (local)                   ├── Landing + Flow
✓ MF Scraper (88% done)                 ├── MF Analytics
○ MF Frontend (not built)               ├── PMS Tracker
○ Unified Flow (prototype)              ├── Stock Research
○ Production DB (not set up)            └── All on Render
```

---

## Phase 1: Complete Data Foundation
**Timeline: 2-3 days**
**Goal: Finish scraping, optimize data, set up production database**

### Step 1.1: Complete MF Scraping
- [ ] Monitor scraper until 100% complete
- [ ] Verify data integrity (spot check random schemes)
- [ ] Document any failed/missing schemes

### Step 1.2: Fix PMS Data Gaps
- [ ] Investigate why Marcellus and others are missing
- [ ] Identify all major PMS providers that should be included
- [ ] Re-scrape or manually add missing providers
- [ ] Verify completeness against SEBI registered list

### Step 1.3: Create Data Optimization Script
- [ ] Write script to compute MF metrics from NAV history:
  ```
  Input: nav_records (25M+ rows)
  Output: mutual_fund_metrics (37K rows)

  Metrics to compute:
  - return_1m, return_3m, return_6m, return_1y, return_3y, return_5y, return_10y
  - volatility (std dev of returns)
  - sharpe_ratio
  - max_drawdown
  - sortino_ratio
  - alpha, beta (vs Nifty 50)
  - category_rank
  ```
- [ ] Run optimization script
- [ ] Validate computed metrics against known sources (Value Research, etc.)
- [ ] Export optimized data to CSV/JSON for PostgreSQL import

### Step 1.4: Set Up Render PostgreSQL
- [ ] Create Render account (if not exists)
- [ ] Provision PostgreSQL database (Starter plan - $7/mo)
- [ ] Design unified schema:
  ```sql
  -- MF Tables
  mutual_funds (id, scheme_code, name, category, amc, ...)
  mf_metrics (scheme_id, return_1y, return_3y, volatility, ...)

  -- PMS Tables
  pms_providers (id, sebi_id, name, ...)
  pms_reports (provider_id, month, year, aum, returns, ...)
  pms_strategies (provider_id, name, benchmark, ...)

  -- Stock Research Tables
  research_reports (id, ticker, company_name, recommendation, ...)

  -- User Tables (for future)
  users (id, email, name, ...)
  user_watchlists (user_id, item_type, item_id, ...)
  ```
- [ ] Create migration scripts
- [ ] Import MF optimized data
- [ ] Import PMS data
- [ ] Test queries for performance

**Deliverable:** Production database with all data, optimized and queryable

---

## Phase 2: Build MF Analytics Frontend
**Timeline: 3-4 days**
**Goal: Create MF Analytics UI matching PMS Tracker design**

### Step 2.1: Set Up MF Frontend Project
- [ ] Create React + Vite project in MFAnalytics/frontend
- [ ] Copy design system from PMS Tracker (colors, fonts, components)
- [ ] Set up routing structure:
  ```
  /                → Dashboard (overview stats)
  /explore         → Browse all MFs with filters
  /scheme/:id      → MF detail page
  /compare         → Compare multiple MFs
  /categories      → Browse by category
  ```

### Step 2.2: Build Core Pages
- [ ] **Dashboard**
  - Total AUM in MF industry
  - Top performing categories
  - Top 10 funds by returns
  - Market overview stats

- [ ] **Explore Page**
  - Search by name/AMC
  - Filter by category (Equity, Debt, Hybrid, etc.)
  - Filter by sub-category (Large Cap, Flexi Cap, etc.)
  - Sort by returns, AUM, rating
  - Pagination

- [ ] **Scheme Detail Page**
  - Fund overview (name, category, AMC, AUM)
  - Performance metrics (returns across timeframes)
  - Risk metrics (volatility, Sharpe, max drawdown)
  - Historical NAV chart (fetch on-demand or show computed)
  - Peer comparison
  - Similar funds

- [ ] **Compare Page**
  - Select 2-4 funds
  - Side-by-side metrics table
  - Overlay performance chart

### Step 2.3: Build MF Backend API
- [ ] Create Express.js API for MF data
- [ ] Endpoints:
  ```
  GET /api/mf                    → List funds (with filters)
  GET /api/mf/:id                → Fund details
  GET /api/mf/:id/metrics        → Performance metrics
  GET /api/mf/categories         → List categories
  GET /api/mf/compare?ids=1,2,3  → Compare funds
  GET /api/mf/search?q=hdfc      → Search funds
  GET /api/mf/top                → Top performers
  ```
- [ ] Connect to PostgreSQL
- [ ] Add caching for expensive queries

**Deliverable:** Fully functional MF Analytics tool (local)

---

## Phase 3: Create Unified Frontend
**Timeline: 3-4 days**
**Goal: Single React app with all tools + flow**

### Step 3.1: Set Up Unified Project Structure
- [ ] Create new repo: `permabullish` (or restructure existing)
  ```
  permabullish/
  ├── frontend/
  │   ├── src/
  │   │   ├── components/        # Shared components
  │   │   ├── pages/
  │   │   │   ├── Landing.tsx
  │   │   │   ├── Flow/          # Investment flow screens
  │   │   │   ├── MF/            # MF Analytics pages
  │   │   │   ├── PMS/           # PMS Tracker pages
  │   │   │   └── Research/      # Stock Research pages
  │   │   ├── services/          # API clients
  │   │   ├── hooks/             # Custom hooks
  │   │   ├── context/           # Global state (user profile, etc.)
  │   │   └── styles/            # Design tokens, global CSS
  │   ├── public/
  │   └── package.json
  │
  ├── backend/
  │   ├── src/
  │   │   ├── routes/
  │   │   │   ├── mf.ts
  │   │   │   ├── pms.ts
  │   │   │   ├── research.ts
  │   │   │   └── recommendations.ts
  │   │   ├── services/
  │   │   ├── db/
  │   │   └── index.ts
  │   └── package.json
  │
  ├── scripts/                   # Data migration, scrapers
  ├── render.yaml                # Render infrastructure
  └── README.md
  ```

### Step 3.2: Migrate Existing Code
- [ ] Copy PMS Tracker pages to unified frontend
- [ ] Copy MF Analytics pages to unified frontend
- [ ] Create Stock Research pages (adapt from current HTML)
- [ ] Integrate flow prototype into React components
- [ ] Set up React Router with all routes
- [ ] Create shared layout (header, footer, nav)

### Step 3.3: Build Unified Backend
- [ ] Merge PMS API routes
- [ ] Merge MF API routes
- [ ] Adapt Stock Research API (proxy to Claude)
- [ ] Create `/api/recommendations` endpoint:
  ```javascript
  // Takes user profile from flow
  // Queries both MF and PMS tables
  // Returns ranked, scored recommendations
  POST /api/recommendations
  Body: { amount, risk, horizon, goal }
  Response: { mf: [...], pms: [...] }
  ```
- [ ] Add health check endpoint
- [ ] Add error handling middleware
- [ ] Add request logging

### Step 3.4: Connect Flow to Real Data
- [ ] Update flow to call `/api/recommendations`
- [ ] Display real MF/PMS data on results page
- [ ] Link "View Details" to actual detail pages
- [ ] Persist user profile in session/localStorage

**Deliverable:** Unified app running locally with all features

---

## Phase 4: Deploy to Production
**Timeline: 2 days**
**Goal: Live on Render with custom domain**

### Step 4.1: Prepare for Deployment
- [ ] Create production environment variables:
  ```
  DATABASE_URL=postgresql://...
  ANTHROPIC_API_KEY=sk-...
  NODE_ENV=production
  ```
- [ ] Add build scripts to package.json
- [ ] Test production build locally
- [ ] Create render.yaml:
  ```yaml
  services:
    - type: web
      name: permabullish-api
      env: node
      buildCommand: npm install && npm run build
      startCommand: npm start
      envVars:
        - key: DATABASE_URL
          fromDatabase:
            name: permabullish-db
            property: connectionString

    - type: web
      name: permabullish-web
      env: static
      buildCommand: cd frontend && npm install && npm run build
      staticPublishPath: frontend/dist
      routes:
        - type: rewrite
          source: /*
          destination: /index.html

  databases:
    - name: permabullish-db
      plan: starter
  ```

### Step 4.2: Deploy to Render
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Render
- [ ] Create services from render.yaml (or manually)
- [ ] Verify database connection
- [ ] Run initial data migration/seed
- [ ] Test all endpoints
- [ ] Test all frontend routes

### Step 4.3: Custom Domain Setup
- [ ] Purchase domain (permabullish.com or .in)
- [ ] Configure DNS:
  ```
  permabullish.com      → Render static site
  api.permabullish.com  → Render web service
  ```
- [ ] Enable SSL (automatic with Render)
- [ ] Update frontend API URLs to production
- [ ] Test everything end-to-end

### Step 4.4: Post-Deploy Checks
- [ ] Verify all pages load
- [ ] Test flow end-to-end
- [ ] Test MF search and filtering
- [ ] Test PMS browsing
- [ ] Test stock research generation
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers

**Deliverable:** Live site at permabullish.com

---

## Phase 5: Polish & Launch Prep
**Timeline: 2-3 days**
**Goal: Production-ready with monitoring and analytics**

### Step 5.1: Error Handling & Monitoring
- [ ] Add error boundaries in React
- [ ] Set up Sentry (or similar) for error tracking
- [ ] Add API error logging
- [ ] Create error pages (404, 500)
- [ ] Add loading states everywhere

### Step 5.2: Performance Optimization
- [ ] Add API response caching (Redis or in-memory)
- [ ] Optimize database queries (add indexes)
- [ ] Lazy load routes in React
- [ ] Optimize images (if any)
- [ ] Run Lighthouse audit, fix issues

### Step 5.3: Analytics
- [ ] Set up Plausible or Umami (privacy-friendly)
- [ ] Track key events:
  - Flow completion
  - Fund views
  - Comparisons made
  - Reports generated

### Step 5.4: SEO & Meta
- [ ] Add meta tags to all pages
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Add Open Graph tags for social sharing

### Step 5.5: Final Testing
- [ ] Full regression test
- [ ] Test on mobile devices
- [ ] Test slow network conditions
- [ ] Get feedback from 2-3 beta users
- [ ] Fix any reported issues

**Deliverable:** Production-ready, polished application

---

## Phase 6: Soft Launch
**Timeline: 1 day**
**Goal: Go live!**

### Step 6.1: Launch Checklist
- [ ] All tests passing
- [ ] Error monitoring active
- [ ] Analytics working
- [ ] Database backed up
- [ ] Team notified

### Step 6.2: Go Live
- [ ] Remove any "beta" flags
- [ ] Announce on social media (optional)
- [ ] Monitor for errors
- [ ] Watch analytics for usage patterns

### Step 6.3: Post-Launch
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Create list of improvements for next iteration

**Deliverable:** LIVE PRODUCT! 🎉

---

## Summary Timeline

| Phase | Duration | Milestone |
|-------|----------|-----------|
| Phase 1: Data Foundation | 2-3 days | Production DB ready |
| Phase 2: MF Frontend | 3-4 days | MF Analytics complete |
| Phase 3: Unified App | 3-4 days | All tools in one app |
| Phase 4: Deployment | 2 days | Live on Render |
| Phase 5: Polish | 2-3 days | Production-ready |
| Phase 6: Launch | 1 day | GO LIVE |
| **Total** | **~2-3 weeks** | |

---

## Post-Launch Roadmap (Future)

### v1.1 - User Accounts
- [ ] User registration/login
- [ ] Save watchlists
- [ ] Save comparisons
- [ ] Email alerts

### v1.2 - Enhanced Recommendations
- [ ] AI-powered fund matching
- [ ] Portfolio suggestions
- [ ] Rebalancing alerts

### v1.3 - Zerodha Integration
- [ ] Connect Zerodha account
- [ ] Import holdings
- [ ] Analyze current portfolio
- [ ] Suggest improvements

### v1.4 - Advisor Mode
- [ ] Multi-client dashboard
- [ ] Client portfolio management
- [ ] Proposal generation

---

## Dependencies & Blockers

| Item | Dependency | Status |
|------|------------|--------|
| MF Frontend | MF scraping complete | In progress (88%) |
| PostgreSQL setup | Render account | Ready |
| Stock Research in unified app | Anthropic API key | Have it |
| Custom domain | Domain purchase | Not started |
| PMS data | Fix missing providers | Not started |

---

## Notes

- Keep SQLite databases locally for historical analysis and recomputation
- Run data optimization weekly via cron job or manually
- Back up PostgreSQL regularly
- Keep Equity Research API on Render as fallback during migration

