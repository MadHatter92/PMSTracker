# Permabullish
## Product Requirements Document (PRD)

**Version:** 1.0
**Date:** January 2026
**Author:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Target Users](#target-users)
4. [Product Vision](#product-vision)
5. [Product Modules](#product-modules)
6. [Feature Requirements](#feature-requirements)
7. [User Stories](#user-stories)
8. [Technical Architecture](#technical-architecture)
9. [Success Metrics](#success-metrics)
10. [Roadmap](#roadmap)
11. [Risks & Mitigations](#risks--mitigations)
12. [Appendix](#appendix)

---

## Executive Summary

**Permabullish** is an AI-powered investment research and advisory platform for Indian investors. It consolidates analysis tools for stocks, Portfolio Management Services (PMS), and mutual funds into a single platform, enabling investors to make informed decisions across all major equity investment vehicles.

The platform addresses a critical gap in the Indian investment landscape: while data exists across multiple sources (SEBI, AMFI, exchanges), no single platform provides unified, AI-enhanced analysis across all investment options.

### Key Differentiators

- **Full Spectrum Coverage**: Stocks + PMS + Mutual Funds in one platform
- **AI-Powered Analysis**: Not just data display, but intelligent insights
- **Indian Market Focus**: Built specifically for Indian regulations and market nuances
- **Accessible Pricing**: Democratizing research that typically costs ₹1L+/year

---

## Problem Statement

### The Investor's Dilemma

Indian investors face a fragmented research landscape:

| Challenge | Current State |
|-----------|---------------|
| **Data Fragmentation** | Stock data on Screener, MF data on ValueResearch, PMS data buried in SEBI PDFs |
| **No Cross-Comparison** | Impossible to compare "Should I buy HDFC stock, HDFC MF, or a PMS holding HDFC?" |
| **Information Asymmetry** | HNIs get relationship manager insights; retail gets nothing |
| **Analysis Paralysis** | Too much raw data, too little actionable insight |
| **PMS Opacity** | ₹50L+ investment decisions made with minimal comparable data |

### The Opportunity

- **5M+** Indians eligible for PMS (₹50L+ investable assets)
- **15Cr+** mutual fund folios seeking better analysis
- **1Cr+** active stock traders wanting research tools
- **Growing DIY trend** accelerated by discount brokers

---

## Target Users

### Primary Personas

#### 1. Rajesh — The Aspiring HNI
- **Age:** 42, IT Director
- **Portfolio:** ₹1.5 Cr
- **Behavior:** Currently in MFs, considering PMS
- **Pain Point:** "How do I evaluate which PMS is actually good?"
- **Need:** PMS comparison, performance analysis, manager track records

#### 2. Priya — The DIY Investor
- **Age:** 34, Startup Founder
- **Portfolio:** ₹80 L (direct stocks + MFs)
- **Behavior:** Manages own portfolio, reads annual reports
- **Pain Point:** "I spend weekends researching stocks manually"
- **Need:** AI-powered stock research, quick analysis reports

#### 3. Amit — The Retail Investor
- **Age:** 28, Software Engineer
- **Portfolio:** ₹15 L (mostly MFs)
- **Behavior:** SIPs in 5-6 funds, wants to optimize
- **Pain Point:** "Are my funds overlapping? Am I diversified?"
- **Need:** MF analysis, portfolio overlap detection, recommendations

#### 4. Sunita — The Financial Advisor (RIA)
- **Age:** 45, Independent RIA
- **Clients:** 50 families, ₹200 Cr AUA
- **Behavior:** Needs research for client recommendations
- **Pain Point:** "I need professional-grade research without Bloomberg costs"
- **Need:** Client-ready reports, comparison tools, bulk analysis

### User Segmentation

| Segment | Size (Est.) | Willingness to Pay | Priority |
|---------|-------------|-------------------|----------|
| HNIs (₹50L-5Cr) | 5M | High (₹5K-20K/yr) | P0 |
| Affluent (₹10L-50L) | 20M | Medium (₹1K-5K/yr) | P0 |
| Retail (<₹10L) | 100M+ | Low (Free/₹500/yr) | P1 |
| Financial Advisors | 50K | High (₹10K-50K/yr) | P1 |

---

## Product Vision

### Vision Statement

> "Empower every Indian investor with institutional-grade research and AI-powered insights to build lasting wealth."

### 3-Year Vision

By 2029, Permabullish will be:
- The **default research platform** for Indian equity investors
- Serving **1M+ active users** across all segments
- Providing **AI advisor** capabilities rivaling human RIAs
- Generating **₹50Cr+ ARR** through subscriptions

### Product Principles

1. **Data-First**: Every insight backed by verifiable data
2. **AI-Enhanced, Human-Controlled**: AI assists, user decides
3. **Accessible**: Complex analysis in simple language
4. **Comprehensive**: One platform for all equity research
5. **Trustworthy**: No hidden agendas, no commission-driven recommendations

---

## Product Modules

### Module 1: Stock Research Generator
**Status:** MVP Complete

AI-powered analysis of individual stocks including:
- Fundamental analysis (financials, ratios, peer comparison)
- Technical analysis (charts, patterns, indicators)
- News sentiment analysis
- AI-generated research reports
- Bull/bear case scenarios

### Module 2: PMS Tracker
**Status:** MVP Complete

Comprehensive PMS analytics platform:
- 219+ PMS profiles with historical data
- AUM tracking and growth trends
- Performance comparison (returns, risk metrics)
- Fund flow analysis (inflows/outflows)
- Investment approach breakdown
- Manager track records

### Module 3: Mutual Fund Analytics
**Status:** Planned (Q2 2026)

Complete mutual fund research suite:
- 2000+ fund coverage across categories
- Performance analysis with rolling returns
- Portfolio overlap detection
- Expense ratio comparison
- SIP calculator and planning
- Category-level insights
- NFO tracking

### Module 4: Portfolio Builder
**Status:** Planned (Q3 2026)

Personalized portfolio construction:
- Risk profiling questionnaire
- Asset allocation recommendations
- Product selection (stocks/MF/PMS mix)
- Rebalancing alerts
- Goal-based portfolio mapping
- Tax-loss harvesting suggestions

### Module 5: AI Advisor
**Status:** Planned (Q4 2026)

Conversational AI investment advisor:
- Natural language queries ("Should I buy Infosys?")
- Personalized recommendations
- Portfolio review conversations
- Market event explanations
- Learning/educational content
- "What if" scenario analysis

---

## Feature Requirements

### Module 1: Stock Research Generator

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| SR-001 | Stock Search | Search any NSE/BSE listed stock |
| SR-002 | Fundamental Snapshot | Key ratios, financials at a glance |
| SR-003 | AI Research Report | Generate comprehensive analysis |
| SR-004 | Peer Comparison | Compare with industry peers |
| SR-005 | Price Charts | Interactive technical charts |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| SR-006 | Watchlist | Save stocks for tracking |
| SR-007 | Alerts | Price/news alerts |
| SR-008 | Screener | Filter stocks by criteria |
| SR-009 | Bulk Analysis | Analyze multiple stocks |

#### P2 (Nice to Have)
| ID | Feature | Description |
|----|---------|-------------|
| SR-010 | DCF Calculator | Intrinsic value estimation |
| SR-011 | Insider Trades | Track promoter activity |
| SR-012 | Export Reports | PDF/Excel export |

### Module 2: PMS Tracker

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| PMS-001 | PMS Directory | Browse all SEBI-registered PMS |
| PMS-002 | PMS Detail Page | Comprehensive single-PMS view |
| PMS-003 | Historical Data | Monthly time-series (AUM, returns, flows) |
| PMS-004 | Performance Charts | Visual trend analysis |
| PMS-005 | Search & Filter | Find PMS by name, AUM, returns |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| PMS-006 | Compare Tool | Side-by-side PMS comparison |
| PMS-007 | Rankings | Leaderboards by various metrics |
| PMS-008 | Investment Approaches | Strategy-level breakdown |
| PMS-009 | Flow Analysis | Industry-wide flow trends |

#### P2 (Nice to Have)
| ID | Feature | Description |
|----|---------|-------------|
| PMS-010 | Manager Profiles | Fund manager track records |
| PMS-011 | Risk Metrics | Sharpe, Sortino, Max Drawdown |
| PMS-012 | Alerts | AUM/return change notifications |

### Module 3: Mutual Fund Analytics

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| MF-001 | Fund Directory | Browse all AMFI-registered funds |
| MF-002 | Fund Detail Page | NAV history, returns, holdings |
| MF-003 | Category Analysis | Equity, Debt, Hybrid breakdowns |
| MF-004 | Return Comparison | Compare funds within category |
| MF-005 | SIP Calculator | Project SIP returns |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| MF-006 | Portfolio Overlap | Detect holding overlaps |
| MF-007 | Expense Analysis | TER comparison and impact |
| MF-008 | Rolling Returns | 1Y/3Y/5Y rolling performance |
| MF-009 | Fund Manager Analysis | Manager tenure and track record |

### Module 4: Portfolio Builder

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| PB-001 | Risk Profiling | Questionnaire-based assessment |
| PB-002 | Asset Allocation | Recommended stock/MF/debt split |
| PB-003 | Product Suggestions | Specific fund/stock recommendations |
| PB-004 | Portfolio Summary | Consolidated view |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| PB-005 | Goal Mapping | Link portfolios to goals |
| PB-006 | Rebalancing | Drift alerts and suggestions |
| PB-007 | Tax Optimization | Tax-loss harvesting suggestions |

### Module 5: AI Advisor

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| AI-001 | Natural Language Query | Ask questions in plain English/Hindi |
| AI-002 | Stock Queries | "Tell me about Reliance" |
| AI-003 | Comparison Queries | "Compare HDFC Bank vs ICICI Bank" |
| AI-004 | Explainer Mode | "Why did markets fall today?" |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| AI-005 | Portfolio Review | "Review my portfolio" |
| AI-006 | Recommendations | "What should I buy?" |
| AI-007 | Scenario Analysis | "What if interest rates rise?" |

---

## User Stories

### Stock Research Generator

```
As a DIY investor,
I want to generate an AI-powered research report for any stock,
So that I can make informed investment decisions without hours of manual research.

Acceptance Criteria:
- Can search for any NSE/BSE stock
- Report generates within 60 seconds
- Report includes fundamentals, technicals, peer comparison
- Report provides bull/bear case scenarios
- Can download report as PDF
```

### PMS Tracker

```
As an HNI considering PMS investment,
I want to compare multiple PMS providers side-by-side,
So that I can choose the best manager for my ₹50L+ investment.

Acceptance Criteria:
- Can select up to 5 PMS for comparison
- Shows AUM, returns, flows, client count
- Displays performance charts overlaid
- Highlights best/worst in each metric
- Shows fee structures where available
```

### Mutual Fund Analytics

```
As a retail investor with multiple MF holdings,
I want to detect portfolio overlap between my funds,
So that I can avoid unintended concentration risk.

Acceptance Criteria:
- Can input or connect existing MF holdings
- Shows common stocks across funds
- Calculates overlap percentage
- Suggests consolidation opportunities
- Displays effective stock exposure
```

### Portfolio Builder

```
As a new investor unsure where to start,
I want personalized portfolio recommendations,
So that I can begin investing with confidence.

Acceptance Criteria:
- Complete risk profiling in <5 minutes
- Receive asset allocation recommendation
- Get specific product suggestions
- Understand reasoning behind recommendations
- Can adjust preferences and regenerate
```

### AI Advisor

```
As a busy professional,
I want to ask investment questions in plain language,
So that I can get quick answers without navigating complex interfaces.

Acceptance Criteria:
- Can type questions naturally
- Supports English and Hindi
- Provides sourced, verifiable answers
- Offers follow-up suggestions
- Remembers conversation context
```

---

## Technical Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PERMABULLISH                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Web App   │  │ Mobile App  │  │   API       │            │
│  │   (React)   │  │  (Future)   │  │  (Public)   │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
│         │                │                │                    │
│         └────────────────┼────────────────┘                    │
│                          │                                     │
│                    ┌─────▼─────┐                               │
│                    │    API    │                               │
│                    │  Gateway  │                               │
│                    └─────┬─────┘                               │
│                          │                                     │
│    ┌─────────────────────┼─────────────────────┐              │
│    │                     │                     │              │
│    ▼                     ▼                     ▼              │
│ ┌──────────┐      ┌──────────┐          ┌──────────┐         │
│ │  Stock   │      │   PMS    │          │    MF    │         │
│ │ Service  │      │ Service  │          │ Service  │         │
│ └────┬─────┘      └────┬─────┘          └────┬─────┘         │
│      │                 │                     │                │
│      └─────────────────┼─────────────────────┘                │
│                        │                                      │
│                   ┌────▼────┐                                 │
│                   │   AI    │                                 │
│                   │ Service │                                 │
│                   │(Claude) │                                 │
│                   └────┬────┘                                 │
│                        │                                      │
│         ┌──────────────┼──────────────┐                      │
│         │              │              │                      │
│         ▼              ▼              ▼                      │
│    ┌─────────┐   ┌─────────┐   ┌─────────┐                  │
│    │ Stock   │   │   PMS   │   │   MF    │                  │
│    │   DB    │   │   DB    │   │   DB    │                  │
│    └─────────┘   └─────────┘   └─────────┘                  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                      DATA LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  SEBI    │  │   AMFI   │  │  NSE/BSE │  │  News    │    │
│  │ Scraper  │  │ Scraper  │  │   APIs   │  │   APIs   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React 18, Vite, TailwindCSS | Modern, fast, component-based |
| **Charts** | Recharts | React-native, good for financial data |
| **State** | React Query | Server state management, caching |
| **Backend** | Node.js, Express, TypeScript | JavaScript ecosystem, type safety |
| **Database** | PostgreSQL (prod), SQLite (dev) | Relational, proven, scalable |
| **AI** | Claude API (Anthropic) | Best-in-class reasoning |
| **Scraping** | Puppeteer | Browser automation for SEBI/AMFI |
| **Hosting** | Render / AWS | Scalable, cost-effective |
| **CDN** | Cloudflare | Performance, security |

### Data Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DATA SOURCES                         │
├─────────────┬─────────────┬─────────────┬──────────────┤
│    SEBI     │    AMFI     │   NSE/BSE   │    News      │
│  (PMS Data) │  (MF Data)  │ (Stock Data)│   (Feeds)    │
└──────┬──────┴──────┬──────┴──────┬──────┴───────┬──────┘
       │             │             │              │
       ▼             ▼             ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                       │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐            │
│  │  Scraper  │ │  Scraper  │ │    API    │            │
│  │   Jobs    │ │   Jobs    │ │  Fetchers │            │
│  └───────────┘ └───────────┘ └───────────┘            │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   STORAGE LAYER                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              PostgreSQL                          │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │  │  stocks │ │   pms   │ │   mf    │           │   │
│  │  │ _data   │ │ _data   │ │ _data   │           │   │
│  │  └─────────┘ └─────────┘ └─────────┘           │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│  │  │  users  │ │portfolios│ │ alerts  │           │   │
│  │  └─────────┘ └─────────┘ └─────────┘           │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Success Metrics

### North Star Metric
**Weekly Active Researchers (WAR)**: Users who perform at least one research action (generate report, view PMS, compare funds) per week.

### Primary Metrics

| Metric | Definition | Target (Y1) |
|--------|------------|-------------|
| **Registered Users** | Total signups | 100,000 |
| **WAR** | Weekly active researchers | 25,000 |
| **Paid Subscribers** | Paying customers | 5,000 |
| **MRR** | Monthly recurring revenue | ₹25L |
| **NPS** | Net Promoter Score | >50 |

### Module-Specific Metrics

| Module | Metric | Target |
|--------|--------|--------|
| Stock Research | Reports generated/week | 10,000 |
| PMS Tracker | PMS profiles viewed/week | 5,000 |
| MF Analytics | Funds analyzed/week | 15,000 |
| Portfolio Builder | Portfolios created | 10,000 |
| AI Advisor | Queries answered/week | 50,000 |

### Engagement Metrics

| Metric | Target |
|--------|--------|
| Session duration | >8 minutes |
| Pages per session | >5 |
| Return rate (7-day) | >40% |
| Feature adoption | >3 modules used |

---

## Roadmap

### Phase 1: Foundation (Q1 2026) ✅
- [x] Stock Research Generator MVP
- [x] PMS Tracker MVP
- [x] Basic web application
- [x] Data pipeline for SEBI

### Phase 2: Expansion (Q2 2026)
- [ ] Mutual Fund Analytics module
- [ ] AMFI data integration
- [ ] User authentication
- [ ] Saved watchlists/portfolios
- [ ] Basic subscription tier

### Phase 3: Intelligence (Q3 2026)
- [ ] Portfolio Builder module
- [ ] Risk profiling system
- [ ] Cross-module insights
- [ ] Enhanced comparison tools
- [ ] Mobile-responsive redesign

### Phase 4: AI-First (Q4 2026)
- [ ] AI Advisor module
- [ ] Natural language interface
- [ ] Personalized recommendations
- [ ] Conversation memory
- [ ] Premium subscription tier

### Phase 5: Scale (2027)
- [ ] Mobile applications (iOS/Android)
- [ ] API for third-party integrations
- [ ] B2B offering for RIAs
- [ ] Regional language support
- [ ] Advanced analytics (quant tools)

### Gantt View

```
2026
         Q1          Q2          Q3          Q4
    ┌───────────┬───────────┬───────────┬───────────┐
Stock│███████████│           │           │           │
 Res │  ✅ MVP   │  Enhance  │           │           │
    ├───────────┼───────────┼───────────┼───────────┤
PMS │███████████│           │           │           │
Trkr│  ✅ MVP   │  Enhance  │           │           │
    ├───────────┼───────────┼───────────┼───────────┤
MF  │           │███████████│███████████│           │
Anly│           │    MVP    │  Enhance  │           │
    ├───────────┼───────────┼───────────┼───────────┤
Port│           │           │███████████│███████████│
Bldr│           │           │    MVP    │  Enhance  │
    ├───────────┼───────────┼───────────┼───────────┤
AI  │           │           │           │███████████│
Advr│           │           │           │    MVP    │
    └───────────┴───────────┴───────────┴───────────┘
```

---

## Risks & Mitigations

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| SEBI website structure changes | High | High | Modular scraper design, monitoring, quick response process |
| API rate limits (exchanges) | Medium | Medium | Caching, request throttling, multiple data sources |
| AI hallucination in reports | Medium | High | Fact-checking layer, source citations, human review for critical data |
| Scale issues with growth | Low | High | Cloud-native architecture, horizontal scaling design |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Regulatory concerns (SEBI) | Low | High | Legal review, clear disclaimers, no direct advice |
| Competition from incumbents | Medium | Medium | Move fast, superior UX, AI differentiation |
| Low conversion to paid | Medium | High | Freemium model, clear value prop, usage-based pricing |
| Data accuracy issues | Medium | High | Multiple source verification, user feedback loop |

### Regulatory Considerations

1. **SEBI RIA Regulations**: Permabullish provides information and tools, not personalized advice. Clear disclaimers required.
2. **Data Usage**: Publicly available data aggregation is permitted. No proprietary data misuse.
3. **Privacy**: User data handled per IT Act and upcoming DPDP Act requirements.

---

## Appendix

### A. Competitive Landscape

| Competitor | Strengths | Weaknesses | Permabullish Advantage |
|------------|-----------|------------|------------------------|
| **Screener.in** | Stock fundamentals | No PMS/MF, no AI | Full spectrum + AI |
| **ValueResearch** | MF analysis | No stocks, dated UX | Modern UX, cross-asset |
| **Tijori** | Premium research | Expensive, limited coverage | Accessible pricing |
| **Smallcase** | Thematic investing | Product push, not research | Research-first approach |
| **Bloomberg** | Comprehensive | ₹15L+/year, enterprise focus | India-focused, affordable |

### B. Pricing Strategy (Draft)

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₹0 | Basic search, limited reports (3/month), public data |
| **Pro** | ₹299/month | Unlimited reports, all modules, comparisons, alerts |
| **Premium** | ₹799/month | Pro + AI Advisor, portfolio builder, API access |
| **Advisor** | ₹2499/month | Premium + client management, white-label reports |

### C. Glossary

- **AUM**: Assets Under Management
- **HNI**: High Net-worth Individual (₹50L-5Cr investable)
- **UHNI**: Ultra High Net-worth Individual (₹5Cr+ investable)
- **PMS**: Portfolio Management Services
- **MF**: Mutual Fund
- **NAV**: Net Asset Value
- **SIP**: Systematic Investment Plan
- **RIA**: Registered Investment Advisor
- **TER**: Total Expense Ratio

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Product Team | Initial PRD |

---

*This is a living document and will be updated as the product evolves.*
