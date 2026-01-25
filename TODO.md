# Permabullish - Master To-Do List

> Last updated: January 25, 2026

**See [ROADMAP.md](./ROADMAP.md) for full production launch plan**

---

## Current Sprint: Phase 1 - Data Foundation

> **Estimated: 2-3 days**

### MF Scraping (In Progress)
- [ ] Complete MF NAV history scraping (currently ~88%)
- [ ] Verify data integrity
- [ ] Document any failed schemes

### PMS Data Fixes
- [ ] Investigate missing providers (Marcellus, etc.)
- [ ] Re-scrape or supplement missing data
- [ ] Verify against SEBI registered list

### Data Optimization
- [ ] Write script to compute MF metrics from NAV history
- [ ] Run optimization (10GB → ~100MB)
- [ ] Validate computed metrics

### Production Database
- [ ] Set up Render PostgreSQL
- [ ] Design unified schema
- [ ] Import optimized data

---

## In Progress

### MF Data Scraping
- [ ] Complete MF NAV history scraping (currently 71.9% - 26,849/37,370 schemes)
- [ ] Monitor scraper for errors and restart if needed

---

## Bugs / Data Issues

### PMS Data Incomplete
- [ ] **Missing PMS providers** - Some major PMS like Marcellus not found in database
- [ ] Investigate SEBI scraping - may have missed some providers or data
- [ ] Re-scrape or supplement PMS data to ensure completeness
- [ ] Verify all major PMS providers are included (Marcellus, Motilal Oswal, ASK, etc.)

---

## High Priority

### Production Database Strategy (MF Analytics)
- [ ] Design optimized schema storing only computed metrics (~100MB vs 10GB)
  - Pre-computed returns: 1M, 3M, 6M, 1Y, 3Y, 5Y, 10Y
  - Risk metrics: Volatility, Sharpe ratio, Max drawdown
  - Fund metadata and rankings
- [ ] Create data optimization script to compute metrics from raw NAV
- [ ] Set up production database (Supabase or Neon - free tier)
- [ ] Create daily update job for metrics refresh
- [ ] Keep full SQLite locally for historical analysis

### PMS & MF Module UX Design
- [ ] Design investment amount gate (< ₹50L → MF only, ≥ ₹50L → MF + PMS)
- [ ] Create investment style filter UI
  - "Steady growth, less volatility"
  - "High returns, can handle ups and downs"
  - "Regular income"
  - "Tax saving"
- [ ] Implement time horizon filter
- [ ] Build fund scoring/ranking algorithm
- [ ] Design "Top Picks" curated lists by category
- [ ] Create side-by-side comparison tool
- [ ] Add "Why This Fund" recommendation cards

---

## Medium Priority

### Landing Page Integration
- [ ] Connect Stock Research tool to landing page Flow 3
- [ ] Connect PMS Tracker to landing page
- [ ] Connect MF Analytics to landing page
- [ ] Implement unified navigation across all tools
- [ ] Create user journey from landing → tool selection → results

### MF Analytics Frontend
- [ ] Build MF Analytics frontend (similar to PMS Tracker)
- [ ] Implement search and filtering
- [ ] Create fund detail pages
- [ ] Add performance charts
- [ ] Build comparison feature

### Deployment
- [ ] Deploy MF Analytics backend to Render
- [ ] Deploy MF Analytics frontend
- [ ] Set up CI/CD for all projects
- [ ] Configure custom domain (permabullish.com?)

---

## Low Priority / Future

### Zerodha MCP Integration (from PRD)
- [ ] Research Zerodha Kite Connect API
- [ ] Design portfolio sync architecture
- [ ] Implement read-only portfolio import
- [ ] Build holdings analysis feature

### Advisor Mode (B2B) - from PRD
- [ ] Design multi-client dashboard
- [ ] Implement client portfolio management
- [ ] Build proposal generation tools

### Life Planning Module - from PRD
- [ ] Design goal-based planning UI
- [ ] Implement financial goal calculators
- [ ] Create investment recommendation engine

---

## Completed

### Design System
- [x] Define Permabullish design system (Navy + Saffron)
- [x] Update Equity Research Generator with design system
- [x] Update PMS Tracker with design system
- [x] Add Google Fonts (DM Sans, DM Serif Display, Inter)
- [x] Push changes to GitHub

### Equity Research Generator
- [x] Build report generation with Claude API
- [x] Deploy backend to Render
- [x] Update frontend design

### PMS Tracker
- [x] Scrape PMS data from SEBI
- [x] Build backend API
- [x] Build frontend dashboard
- [x] Deploy to GitHub

### PRD & Vision
- [x] Create PERMABULLISH_PRD.md with full product vision
- [x] Define user flows and abstraction levels
- [x] Document module specifications

---

## Notes

### Database Sizes (Current)
| Database | Size | Status |
|----------|------|--------|
| MF Analytics (mf.db) | ~10GB | Needs optimization for production |
| PMS Tracker (pms.db) | ~few MB | Ready for production |
| Equity Research | Uses external APIs | No local DB needed |

### Production Hosting Plan
| Component | Platform | Status |
|-----------|----------|--------|
| Equity Research API | Render | Deployed |
| PMS Tracker API | TBD | Local only |
| MF Analytics API | TBD | Not started |
| Frontend (all) | TBD | Local only |
| Database | Supabase/Neon | Not started |

---

## Ideas to Explore
- [ ] AI-powered fund recommendations based on user profile
- [ ] Portfolio overlap analysis (show duplicate holdings across funds)
- [ ] SIP calculator with inflation adjustment
- [ ] Tax harvesting suggestions
- [ ] Rebalancing alerts

