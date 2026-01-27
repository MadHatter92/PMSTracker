# Permabullish
## Product Requirements Document (PRD)

**Version:** 2.0
**Date:** January 2026
**Author:** Product Team
**Status:** Draft

> **Tagline:** "Your Own Investment Bank that does Research For You"
>
> **Positioning:** The AI-Ready Investment Research Suite — Bloomberg Terminal for Indians

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Target Users](#target-users)
4. [Product Vision](#product-vision)
5. [Business Pillars](#business-pillars)
6. [Product Modules](#product-modules)
7. [User Flows & Journeys](#user-flows--journeys)
8. [Design Philosophy & UX](#design-philosophy--ux)
9. [Design System Specifications](#design-system-specifications)
10. [Feature Requirements](#feature-requirements)
11. [User Stories](#user-stories)
12. [Technical Architecture](#technical-architecture)
13. [Pricing & Monetization](#pricing--monetization)
14. [Launch Strategy](#launch-strategy)
15. [Success Metrics](#success-metrics)
16. [Roadmap](#roadmap)
17. [Risks & Mitigations](#risks--mitigations)
18. [Appendix](#appendix)

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

## Business Pillars

The foundation of Permabullish rests on four strategic pillars that drive product decisions and growth:

### 1. Shareability
Every output should be worth sharing. Research reports, portfolio comparisons, and insights should be visually compelling and socially shareable.
- Shareable report cards and summaries
- Social-ready graphics and charts
- Embeddable widgets for blogs/websites
- WhatsApp/Twitter-optimized formats

### 2. Creativity in Portfolio Building
Users should feel empowered to experiment and create unique portfolios.
- Mix stocks, MFs, SIFs (Specialized Investment Funds), and PMS
- "What if" scenario simulations
- Custom allocation strategies
- Save and name personal strategies

### 3. Portfolio Simulation
Before committing capital, users should see projected outcomes.
- Historical backtesting
- Monte Carlo simulations for range of outcomes
- Compare against benchmarks (Nifty, category average)
- Project net worth growth over 3Y, 5Y, 10Y horizons

### 4. Cross-Asset Integration
The power of combining Stocks + Mutual Funds + PMS + SIFs in one view.
- Unified portfolio dashboard
- Cross-asset correlation analysis
- Holistic risk assessment
- Single source of truth for all investments

### Growth Formula: 10³ × 10³
- **1,000 power users** creating content and sharing insights
- **1,000 touchpoints** per user through shares, referrals, and engagement
- Viral coefficient driven by genuine value delivery

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
**Status:** In Development (Q1 2026)

> **Core Value Proposition:** "There are way too many schemes. The value lies in reducing clutter and organizing information so that fund selection becomes easy."

Complete mutual fund research suite:
- **37,000+ schemes** coverage across all categories
- Performance analysis with rolling returns
- Portfolio overlap detection
- Expense ratio comparison
- SIP calculator and planning
- Category-level insights
- NFO tracking

#### MF-Specific Features

**Navigation & Discovery:**
- Intelligent categorization to reduce 37K schemes to actionable shortlists
- Explain each category: what it means, risk-reward profile, who it's for
- Role in portfolio guidance (e.g., "Large Cap for stability, Small Cap for growth")

**Risk Appetite Meter:**
- Visual indicator based on debt-equity balance
- Large Cap vs Mid Cap vs Small Cap allocation
- Volatility score and suitability indicator

**Key Data Points Users Want:**
| Data Point | Why It Matters |
|------------|----------------|
| Fund Type/Category | Understanding what they're buying |
| Returns (1Y, 3Y, 5Y) | Performance track record |
| AUM | Fund size and liquidity |
| Time Since Inception | Track record length |
| Expense Ratio | Cost of ownership |
| Fund Manager Tenure | Stability of management |

**Engagement Features (Repeat Usage):**
- Watchlists: Track favorite funds
- Portfolio tracker: Monitor NAV movements
- NFO alerts: New fund offerings
- Downloadable & shareable reports

### Module 4: Portfolio Builder & Manager
**Status:** Planned (Q2-Q3 2026)

> **Core Value Proposition:** "Take the user from high-level abstraction ('I want to invest ₹1 Cr') to specific allocations ('40% in this PMS, 40% in these MFs, 20% in these stocks') and maintain that allocation over time."

Personalized portfolio construction and ongoing management:

**Portfolio Creation:**
- Risk profiling questionnaire
- Asset allocation recommendations (PMS/MF/Stocks/Debt)
- Drill-down into each asset class using respective tools
- Specific instrument selection within each bucket
- Goal-based portfolio mapping (retirement, education, house, etc.)

**Portfolio Tracking:**
- Unified dashboard across all holdings
- Allocation history and change tracking
- Performance visualization (absolute & relative to benchmarks)
- Cross-asset correlation view

**Life Stage Management:**
- Age-aware rebalancing suggestions
- "As you approach 50, consider shifting 10% from equity to debt"
- Major life event prompts (marriage, child, retirement)
- Glide path visualization towards goals

**Updates & Alerts:**
- Performance updates (daily/weekly digest)
- Rebalancing nudges when allocation drifts
- News alerts affecting holdings
- Delivery: Email, Push notifications, WhatsApp (future)

**Sharing & Collaboration:**
- Shareable portfolio views (read-only links)
- Family sharing (spouse can view/comment)
- Advisor sharing (RIA can manage with permission)
- Export as PDF report

### Module 5: Advisor Mode (B2B)
**Status:** Planned (Q4 2026)

> **Core Value Proposition:** "Enable financial advisors to manage multiple client portfolios, run scenarios, and provide professional-grade service without Bloomberg-level costs."

Client relationship management for RIAs and wealth managers:

**Client Management:**
- Create and manage client profiles
- Basic client info: name, age, risk profile, goals, AUM
- Link portfolios to clients
- View all clients in dashboard

**Scenario Modeling:**
- "What if" analysis for client portfolios
- Compare different allocation strategies
- Project outcomes under various market conditions
- Side-by-side scenario comparison

**Client Communication:**
- Generate client-ready reports
- Share portfolio proposals
- Track client approvals/feedback
- White-label report branding (future)

**Bulk Operations:**
- Batch rebalancing across clients
- Model portfolio templates
- Apply strategy changes to multiple clients

### Module 6: Life Planning
**Status:** Planned (2027)

> **Core Value Proposition:** "User tells us about their life — age, income, expenses, dependents, goals — and we build a complete financial roadmap that evolves with them."

Comprehensive financial life planning:

**Profile Building:**
- Age, income, current savings
- Monthly expenses and obligations
- Dependents (children, parents)
- Existing investments and liabilities
- Insurance coverage

**Goal Mapping:**
- Retirement planning
- Children's education
- House purchase
- Emergency fund
- Wealth transfer

**AI Plan Generation:**
- Automated allocation based on complete profile
- "Given your situation, here's how to reach all your goals"
- Priority ranking when goals conflict
- Trade-off visualization

**Dynamic Adjustments:**
- Plan evolves as life changes
- Annual review prompts
- Major event triggers (job change, new child, inheritance)
- Course correction suggestions

### Module 7: AI Advisor
**Status:** Planned (Q4 2026)

Conversational AI investment advisor:
- Natural language queries ("Should I buy Infosys?")
- Personalized recommendations
- Portfolio review conversations
- Market event explanations
- Learning/educational content
- "What if" scenario analysis

---

## User Flows & Journeys

### Primary User Flows

#### Flow 1: "Go Deep" — Asset Allocation Drill-Down

For users who have capital and want to allocate it intelligently.

```
┌─────────────────────────────────────────────────────────────────┐
│                     "GO DEEP" FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  START: "How much would you like to invest?"                    │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │     ASSET ALLOCATION DECISION                            │   │
│  │                                                          │   │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │   │   PMS    │  │  Mutual  │  │  Direct  │            │   │
│  │   │  (50L+)  │  │  Funds   │  │  Stocks  │            │   │
│  │   └────┬─────┘  └────┬─────┘  └────┬─────┘            │   │
│  │        │             │             │                   │   │
│  │        ▼             ▼             ▼                   │   │
│  │   Explore PMS   How much to    Stock Research         │   │
│  │   Analytics     equity funds?   Generator             │   │
│  │                      │                                 │   │
│  │                      ▼                                 │   │
│  │              Explore MF Analytics                      │   │
│  │                      │                                 │   │
│  └──────────────────────┼───────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  SIMULATION: Net worth projection using 3Y/5Y returns   │ │
│  │  of selected PMS, MF, and estimated stock returns       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

#### Flow 2: "How Do I Get There" — Goal-Based Planning

For users who have a target corpus and need a path to reach it.

```
┌─────────────────────────────────────────────────────────────────┐
│                "HOW DO I GET THERE" FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  START: "What's your goal corpus?" (e.g., ₹5 Cr in 15 years)   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  RISK APPETITE ASSESSMENT                                │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │ Conserv │  │ Moderate│  │ Aggress │  │ Very    │    │   │
│  │  │  ative  │  │         │  │  ive    │  │ Aggress │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SUGGESTED ALLOCATION                                    │   │
│  │  "To reach ₹5Cr in 15 years, with moderate risk:"       │   │
│  │                                                          │   │
│  │  • Monthly SIP: ₹85,000                                  │   │
│  │  • Allocation: 60% Equity MF, 30% Stocks, 10% Debt      │   │
│  │  • Suggested Funds: [List based on risk + goal]         │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  INVITE TO GO DEEPER                                     │   │
│  │  "Want to explore these funds in detail?" → MF Module    │   │
│  │  "Compare with PMS options?" → PMS Module               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

#### Flow 3: "Research-First" — Stock Deep Dive

For users who already have a specific stock in mind.

```
┌─────────────────────────────────────────────────────────────────┐
│                "RESEARCH-FIRST" FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  START: "There is a stock I want to research"                   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  STOCK SEARCH                                            │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │ 🔍 Search for a company (e.g., "Reliance")      │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AI RESEARCH REPORT                                      │   │
│  │  • Company overview & business model                     │   │
│  │  • Financial analysis (revenue, profit, margins)        │   │
│  │  • Valuation metrics (P/E, P/B, DCF)                    │   │
│  │  • Peer comparison                                       │   │
│  │  • Bull & Bear case scenarios                           │   │
│  │  • Key risks & opportunities                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↓                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ACTIONS                                                 │   │
│  │  • Add to Watchlist                                      │   │
│  │  • Add to Portfolio (allocate %)                        │   │
│  │  • Share Report                                          │   │
│  │  • Download PDF                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

### The Complete Portfolio Journey

All three entry paths converge into a unified portfolio experience:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE USER JOURNEY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ENTRY POINTS (Landing Page)                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                        │
│  │ "I have     │  │ "I have a   │  │ "Stock I    │                        │
│  │  money to   │  │  goal to    │  │  want to    │                        │
│  │  invest"    │  │  reach"     │  │  research"  │                        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                        │
│         │                │                │                                │
│         ▼                ▼                ▼                                │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │                    DRILL DOWN INTO TOOLS                         │      │
│  │                                                                  │      │
│  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │      │
│  │   │  PMS Tool    │  │  MF Tool     │  │  Stock Tool  │         │      │
│  │   │  (₹50L+)     │  │  (Any amt)   │  │  (Research)  │         │      │
│  │   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │      │
│  │          │                 │                 │                  │      │
│  │          │    SELECT SPECIFIC INSTRUMENTS    │                  │      │
│  │          │    ┌─────────────────────────┐   │                  │      │
│  │          └───►│ "I want 40% in this PMS,│◄──┘                  │      │
│  │               │  20% in these 3 MFs,    │                       │      │
│  │               │  40% in these 5 stocks" │                       │      │
│  │               └───────────┬─────────────┘                       │      │
│  └───────────────────────────┼─────────────────────────────────────┘      │
│                              │                                             │
│                              ▼                                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │                    SAVE AS PORTFOLIO                             │      │
│  │                                                                  │      │
│  │   "My Retirement Portfolio" / "Kid's Education Fund" / etc.     │      │
│  │                                                                  │      │
│  │   ┌──────────────────────────────────────────────────────┐     │      │
│  │   │  CREATE ACCOUNT (if not logged in)                    │     │      │
│  │   │  → Required to save and track                         │     │      │
│  │   └──────────────────────────────────────────────────────┘     │      │
│  └───────────────────────────┬─────────────────────────────────────┘      │
│                              │                                             │
│                              ▼                                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │                    PORTFOLIO DASHBOARD                           │      │
│  │                                                                  │      │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │      │
│  │   │ Track    │  │ Get      │  │ Life     │  │ Share    │      │      │
│  │   │ Perform- │  │ Updates  │  │ Stage    │  │ With     │      │      │
│  │   │ ance     │  │ & Alerts │  │ Rebalance│  │ Others   │      │      │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘      │      │
│  │                                                                  │      │
│  │   • See allocation history & changes over time                  │      │
│  │   • Receive rebalancing suggestions based on life stage         │      │
│  │   • Get performance updates (email/push)                        │      │
│  │   • Share portfolio view with family/advisor                    │      │
│  │   • Modify allocations and track impact                        │      │
│  └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Abstraction Levels

The platform supports multiple levels of abstraction, allowing users to go as deep as they want:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ABSTRACTION LEVELS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LEVEL 1: HIGH ABSTRACTION (Landing Page)                                   │
│  ─────────────────────────────────────────                                  │
│  "I want to invest ₹1 Crore"                                                │
│  → System suggests: 40% PMS, 40% MF, 20% Stocks                            │
│                                                                             │
│  LEVEL 2: ASSET CLASS SELECTION                                             │
│  ─────────────────────────────────                                          │
│  "Show me PMS options for the 40% allocation"                              │
│  → Browse PMS Tool, compare strategies, select 1-2 PMS                     │
│                                                                             │
│  LEVEL 3: SPECIFIC INSTRUMENT SELECTION                                     │
│  ───────────────────────────────────────                                    │
│  "I'll put 25% in Motilal Oswal NextGen, 15% in ASK India Select"         │
│  → Confirm specific allocations                                             │
│                                                                             │
│  LEVEL 4: DEEP RESEARCH (Optional)                                          │
│  ──────────────────────────────────                                         │
│  "Tell me more about ASK India Select's holdings"                          │
│  → View portfolio, generate AI analysis, compare with alternatives         │
│                                                                             │
│  LEVEL 5: ONGOING MANAGEMENT                                                │
│  ─────────────────────────────                                              │
│  "How should this change as I approach retirement?"                        │
│  → Life stage rebalancing suggestions, alerts, updates                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Complete User Journey Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  DISCOVERY           ENGAGEMENT          CONVERSION        RETENTION    │
│  ─────────           ──────────          ──────────        ─────────    │
│                                                                         │
│  YouTube Video  →    Land on App    →    Create           Track         │
│  Telegram       →    Explore Tool   →    Watchlist   →    Portfolio     │
│  Word of Mouth  →    Get "Wow"      →    Sign Up     →    Share         │
│  Ads            →    moment         →    (free)      →    Reports       │
│                                                                         │
│       │                  │                  │                │          │
│       ▼                  ▼                  ▼                ▼          │
│  ┌─────────┐       ┌─────────┐       ┌─────────┐      ┌─────────┐     │
│  │ Hook:   │       │ Value:  │       │ Invest- │      │ Habit:  │     │
│  │ "Did    │       │ Instant │       │ ment in │      │ Weekly  │     │
│  │ you know│       │ insight │       │ identity│      │ check-  │     │
│  │ this?"  │       │ delivery│       │         │      │ ins     │     │
│  └─────────┘       └─────────┘       └─────────┘      └─────────┘     │
│                                                                         │
│                            │                                            │
│                            ▼                                            │
│                     ┌─────────────┐                                     │
│                     │   PAYWALL   │                                     │
│                     │   TRIGGER   │                                     │
│                     │             │                                     │
│                     │ • 3rd report│                                     │
│                     │ • Advanced  │                                     │
│                     │   compare   │                                     │
│                     │ • Portfolio │                                     │
│                     │   builder   │                                     │
│                     └─────────────┘                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### User Journey Touchpoints

| Stage | Action | Emotional Goal | Feature Highlight |
|-------|--------|----------------|-------------------|
| **Land** | User arrives from YouTube/Telegram | Curiosity | Striking visual, clear value prop |
| **Explore** | Tries one tool (Stock/PMS/MF) | "Wow, this is useful" | Instant value, no signup needed |
| **Create** | Builds first watchlist/portfolio | Ownership | Easy save, satisfying UX |
| **Signup** | Creates account to save work | Investment in identity | Frictionless auth (Google/Phone) |
| **Return** | Checks portfolio, NAV updates | Habit formation | Push notifications, email digests |
| **Share** | Shares report with friend/advisor | Social proof | Beautiful shareable formats |
| **Pay** | Hits limit, sees premium value | "Worth it" | Clear upgrade path, fair pricing |
| **Advocate** | Recommends to others | Pride | Referral rewards, community |

---

## Design Philosophy & UX

### The "Wow" Factor

Every interaction should feel premium, insightful, and unexpectedly delightful.

> **Design Principle:** "Information overload is the enemy. Equity story is subdued in a deluge of data. With AI, we construct the story artisanally, augmented with data and graphics."

### Visual Language

| Element | Approach |
|---------|----------|
| **Typography** | Clean, financial-grade fonts (Inter, DM Sans) |
| **Colors** | Deep blues, greens for growth, subtle gradients |
| **Charts** | Animated, interactive, touch-friendly |
| **Cards** | Elevated shadows, smooth transitions |
| **Icons** | Custom icon set, consistent stroke width |

### Interaction Metaphors

#### The Tarot Card Discovery
For exploring funds/PMS/stocks, present options like three spread tarot cards:
- User hovers/taps to reveal details
- Creates sense of discovery and choice
- Reduces decision paralysis through curated options

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    ┌─────────┐    ┌─────────┐    ┌─────────┐          │
│    │ ░░░░░░░ │    │ ░░░░░░░ │    │ ░░░░░░░ │          │
│    │ ░░░░░░░ │    │ REVEAL  │    │ ░░░░░░░ │          │
│    │ ░░░░░░░ │    │  THIS   │    │ ░░░░░░░ │          │
│    │ HDFC    │    │  FUND   │    │ ICICI   │          │
│    │ Flexi   │    │    ▼    │    │ Value   │          │
│    └─────────┘    └─────────┘    └─────────┘          │
│                                                         │
│         "Choose a fund to explore..."                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Risk Appetite Meter
Visual indicator showing risk level based on:
- Debt-Equity balance
- Large Cap vs Small Cap allocation
- Volatility of selected instruments

```
┌─────────────────────────────────────────────────────────┐
│                   RISK APPETITE METER                   │
│                                                         │
│  Conservative ◀━━━━━━━━━●━━━━━━━━━━▶ Aggressive        │
│                         │                               │
│                    YOUR PORTFOLIO                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 40% Large Cap Equity  ████████░░░░░░░░░░        │   │
│  │ 30% Mid Cap Equity    ██████░░░░░░░░░░░░        │   │
│  │ 20% Small Cap Equity  ████░░░░░░░░░░░░░░        │   │
│  │ 10% Debt              ██░░░░░░░░░░░░░░░░        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  "This portfolio suits: Growth-oriented investors       │
│   with 7+ year horizon and high volatility tolerance"   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Animation Guidelines

| Interaction | Animation |
|-------------|-----------|
| Page transitions | Smooth fade + slide (300ms) |
| Card reveals | Flip or scale up with bounce |
| Chart loading | Progressive draw, data points pop in |
| Numbers | Count-up animation for metrics |
| Success states | Subtle confetti or checkmark pulse |

### Accessibility
- WCAG 2.1 AA compliance
- Screen reader friendly
- Keyboard navigation
- Color-blind safe palettes

---

## Design System Specifications

### Brand Identity

**Logo:** Nandi (bull) icon in saffron orange on navy blue background
**Tagline:** "Your Personal Investment Banker"

### Color Palette

#### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Navy 900** | `#1e3a5f` | Primary brand color, headers, buttons |
| **Navy 800** | `#243b53` | Secondary backgrounds, hover states |
| **Navy 700** | `#334e68` | Borders, dividers |
| **Navy 950** | `#102a43` | Darkest backgrounds, footer |
| **Saffron 500** | `#e8913a` | Primary accent, CTAs, highlights |
| **Saffron 600** | `#d97316` | Hover states for accent elements |
| **Saffron 400** | `#f19338` | Light accent, icons |

#### Extended Navy Palette

| Shade | Hex Code | Usage |
|-------|----------|-------|
| Navy 50 | `#f0f4f8` | Light backgrounds, hover states |
| Navy 100 | `#d9e2ec` | Subtle borders |
| Navy 200 | `#bcccdc` | Muted text on dark backgrounds |
| Navy 300 | `#9fb3c8` | Secondary text on dark backgrounds |
| Navy 400 | `#829ab1` | Placeholder text |
| Navy 500 | `#627d98` | Muted elements |
| Navy 600 | `#486581` | Secondary text |

#### Extended Saffron Palette

| Shade | Hex Code | Usage |
|-------|----------|-------|
| Saffron 50 | `#fef7ed` | Light accent backgrounds |
| Saffron 100 | `#fdecd4` | Subtle accent, text on dark accent |
| Saffron 200 | `#fad5a8` | Light borders |
| Saffron 300 | `#f6b871` | Medium accent |
| Saffron 700 | `#b45309` | Dark accent text |

#### Semantic Colors

| Purpose | Positive | Negative | Neutral |
|---------|----------|----------|---------|
| Background | `#dcfce7` (green-100) | `#fee2e2` (red-100) | `#f3f4f6` (gray-100) |
| Text | `#16a34a` (green-600) | `#dc2626` (red-600) | `#6b7280` (gray-500) |
| Border | `#86efac` (green-300) | `#fca5a5` (red-300) | `#d1d5db` (gray-300) |

### Typography

#### Font Families

| Type | Font | Fallback Stack | Usage |
|------|------|----------------|-------|
| **Display** | DM Serif Display | Georgia, serif | Headlines, fund names, key numbers |
| **Sans** | DM Sans | Inter, system-ui, sans-serif | Body text, UI elements |
| **Body** | Inter | system-ui, sans-serif | Long-form content, descriptions |

#### Font Loading

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet">
```

#### Type Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 (Hero) | DM Serif Display | 48-60px | 400 | 1.1 |
| H2 (Section) | DM Serif Display | 24-32px | 400 | 1.2 |
| H3 (Card Title) | DM Serif Display | 16-18px | 600 | 1.3 |
| Body | DM Sans | 14-16px | 400 | 1.5 |
| Caption | DM Sans | 10-12px | 500 | 1.4 |
| Button | DM Sans | 14px | 500 | 1 |

### Component Specifications

#### Cards (Fund Card)

```
┌─────────────────────────────────────────┐
│ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ │  ← Top accent: gradient navy→saffron
│                                         │
│  FUND HOUSE (saffron, uppercase, xs)    │
│  Fund Name (navy, serif, semibold)   🔖 │  ← Bookmark icon
│  ┌─────────────────┐                    │
│  │ Category Badge  │                    │  ← Rounded pill
│  └─────────────────┘                    │
│                                         │
│  ┌─────────┬─────────┬─────────┐       │
│  │ 1Y Ret  │ 3Y Ret  │ 5Y Ret  │       │  ← Return boxes (gray-50 bg)
│  │ +24.5%  │ +18.2%  │ +15.8%  │       │
│  └─────────┴─────────┴─────────┘       │
│                                         │
│  Risk Level                    Moderate │
│  ◀━━━━━━━━━●━━━━━━━━━━▶               │  ← Risk meter gradient
│  Low                         Very High  │
│                                         │
│  ─────────────────────────────────────  │
│  AUM        NAV        Expense    ▶    │
│  ₹45.6K Cr  ₹1523.45   0.75%           │
└─────────────────────────────────────────┘

Properties:
- Background: white
- Border radius: 16px (rounded-2xl)
- Border: 1px solid gray-100
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Shadow (hover): 0 10px 15px rgba(0,0,0,0.1)
- Padding: 20px
- Top accent: 4px height, gradient from navy-900 via navy-700 to saffron-500
```

#### Buttons

| Type | Background | Text | Border | Hover |
|------|------------|------|--------|-------|
| Primary | `#e8913a` | white | none | `#d97316` |
| Secondary | `#1e3a5f` | white | none | `#243b53` |
| Ghost | transparent | `#1e3a5f` | 1px `#334e68` | bg `#f0f4f8` |
| Tab Active | `#e8913a` | white | none | - |
| Tab Inactive | `#243b53` | `#bcccdc` | none | `#334e68` |

**Button Properties:**
- Border radius: 12px (rounded-xl)
- Padding: 8px 16px (py-2 px-4)
- Font: DM Sans, 500 weight
- Transition: all 200ms ease

#### Navigation Header

```
┌─────────────────────────────────────────────────────────┐
│ 🐂 Permabullish    ◎ Explore  ⚖ Compare  💼 Portfolio  │  [Sign In]
└─────────────────────────────────────────────────────────┘

Properties:
- Background: #1e3a5f (navy-900)
- Height: 64px
- Border bottom: 1px solid #334e68
- Logo text: "Perma" (white) + "bullish" (saffron)
- Nav links: white/80 opacity, white on hover
- Sign In button: saffron background
```

#### Category Pills

```
┌──────────────────┐  ┌──────────────────┐
│ All Funds 37,368 │  │ Large Cap 45     │
└──────────────────┘  └──────────────────┘
     (active)              (inactive)

Active:
- Background: #e8913a
- Text: white
- Shadow: 0 10px 15px rgba(232,145,58,0.3)

Inactive:
- Background: #243b53
- Text: #bcccdc
- Hover background: #334e68
```

### Icons

**Icon Library:** Lucide React (lucide.dev)

| Context | Icon | Size |
|---------|------|------|
| Explore | `Compass` | 16px (w-4 h-4) |
| Compare | `Scale` | 16px |
| Portfolio | `Briefcase` | 16px |
| Search | `Search` | 20px |
| Filter | `Filter` | 16px |
| Bookmark | `Bookmark` | 20px |
| Trending Up | `TrendingUp` | 24px |
| Trending Down | `TrendingDown` | 24px |
| Menu (mobile) | `Menu` | 24px |
| Close | `X` | 24px |
| Arrow Right | `ArrowRight` | 16px |
| Chevron | `ChevronRight`, `ChevronDown` | 20px |
| Sparkles | `Sparkles` | 16px |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| Card | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)` | Default card state |
| Card Hover | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)` | Card hover state |
| Button Glow | `0 10px 15px rgba(232,145,58,0.3)` | Primary button, active tabs |

### Spacing Scale

Based on 4px base unit (Tailwind default):

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Element gaps |
| 3 | 12px | Small padding |
| 4 | 16px | Standard padding |
| 5 | 20px | Card padding |
| 6 | 24px | Section gaps |
| 8 | 32px | Large gaps |
| 10 | 40px | Section spacing |
| 16 | 64px | Page sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| rounded-lg | 8px | Small elements |
| rounded-xl | 12px | Buttons, inputs |
| rounded-2xl | 16px | Cards |
| rounded-3xl | 24px | Large containers |
| rounded-full | 9999px | Pills, avatars |

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

### Animation Guidelines

| Interaction | Duration | Easing | Properties |
|-------------|----------|--------|------------|
| Hover transitions | 200ms | ease | colors, background |
| Card hover | 300ms | ease-out | shadow, transform |
| Page transitions | 300ms | ease-in-out | opacity, transform |
| Number count-up | 1000ms | ease-out | content |
| Loading shimmer | 1500ms | linear | background-position |

### Dark Mode Considerations (Future)

For future dark mode implementation:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Page background | gray-50 | navy-950 |
| Card background | white | navy-900 |
| Primary text | navy-900 | white |
| Secondary text | gray-500 | navy-300 |
| Borders | gray-100 | navy-700 |

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

### Module 4: Portfolio Builder & Manager

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| PB-001 | Risk Profiling | Questionnaire-based assessment |
| PB-002 | Asset Allocation | Recommended PMS/MF/Stock/Debt split |
| PB-003 | Instrument Selection | Drill down from allocation to specific funds/stocks |
| PB-004 | Save Portfolio | Name and save portfolio to account |
| PB-005 | Portfolio Dashboard | View all portfolios in one place |
| PB-006 | Allocation History | Track changes to portfolio over time |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| PB-007 | Goal Mapping | Link portfolios to life goals |
| PB-008 | Life Stage Rebalancing | Age-aware allocation suggestions |
| PB-009 | Performance Tracking | Returns vs benchmarks over time |
| PB-010 | Share Portfolio | Generate shareable read-only links |
| PB-011 | Email Digests | Weekly/monthly performance updates |
| PB-012 | Drift Alerts | Notify when allocation drifts from target |

#### P2 (Nice to Have)
| ID | Feature | Description |
|----|---------|-------------|
| PB-013 | Tax Optimization | Tax-loss harvesting suggestions |
| PB-014 | Family Sharing | Allow family members to view/comment |
| PB-015 | Push Notifications | Mobile alerts for important events |
| PB-016 | WhatsApp Updates | Portfolio updates via WhatsApp |
| PB-017 | Zerodha Sync | Import real holdings via MCP |

### Module 5: Advisor Mode (B2B)

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| AM-001 | Client Profiles | Create/manage client information |
| AM-002 | Client Portfolios | Link portfolios to clients |
| AM-003 | Client Dashboard | View all clients in one place |
| AM-004 | Scenario Modeling | "What if" analysis for allocations |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| AM-005 | Client Reports | Generate client-ready PDF reports |
| AM-006 | Proposal Sharing | Share portfolio proposals with clients |
| AM-007 | Model Portfolios | Create reusable portfolio templates |
| AM-008 | Bulk Rebalancing | Apply changes across multiple clients |

#### P2 (Nice to Have)
| ID | Feature | Description |
|----|---------|-------------|
| AM-009 | White Label | Custom branding on reports |
| AM-010 | Client Portal | Client-facing view of their portfolio |
| AM-011 | Compliance Reports | Audit trail and compliance documentation |
| AM-012 | Fee Tracking | Track advisor fees across clients |

### Module 6: Life Planning

#### P0 (Must Have)
| ID | Feature | Description |
|----|---------|-------------|
| LP-001 | Profile Builder | Capture age, income, expenses, dependents |
| LP-002 | Goal Definition | Define life goals with amounts and timelines |
| LP-003 | AI Plan Generation | Generate allocation plan based on profile |
| LP-004 | Plan Summary | Visual overview of all goals and paths |

#### P1 (Should Have)
| ID | Feature | Description |
|----|---------|-------------|
| LP-005 | Priority Ranking | Rank goals when resources are limited |
| LP-006 | Trade-off Analysis | Show impact of prioritizing one goal over another |
| LP-007 | Annual Review | Prompt for yearly profile updates |
| LP-008 | Life Event Triggers | Adjust plan for major life changes |

#### P2 (Nice to Have)
| ID | Feature | Description |
|----|---------|-------------|
| LP-009 | Insurance Integration | Factor in life/health insurance |
| LP-010 | Liability Tracking | Include loans and EMIs in planning |
| LP-011 | Estate Planning | Wealth transfer and succession planning |

### Module 7: AI Advisor

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
| **Auth** | Clerk / Auth0 (planned) | User authentication, session management |

### Future Integrations

#### Zerodha MCP Servers (Planned)

Integration with Zerodha's MCP (Model Context Protocol) servers to enable:

**Real Portfolio Sync:**
- Import actual holdings from Zerodha account
- Real-time portfolio valuation
- Automatic tracking of executed trades
- Dividend and corporate action tracking

**Trading Capabilities (Future):**
- Place orders directly from Permabullish
- Execute rebalancing recommendations
- SIP automation

**Data Enrichment:**
- Actual cost basis for holdings
- Realized/unrealized gains
- Tax lot tracking

```
┌─────────────────────────────────────────────────────────────────┐
│                  ZERODHA MCP INTEGRATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐         ┌─────────────┐                      │
│   │ Permabullish│ ◄─────► │   Zerodha   │                      │
│   │   Backend   │   MCP   │   Servers   │                      │
│   └──────┬──────┘         └──────┬──────┘                      │
│          │                       │                              │
│          │    Capabilities:      │                              │
│          │    • Get Holdings     │                              │
│          │    • Get Positions    │                              │
│          │    • Get Orders       │                              │
│          │    • Place Orders*    │                              │
│          │                       │                              │
│          │    * Future phase     │                              │
│          │                       │                              │
└──────────┼───────────────────────┼──────────────────────────────┘
           │                       │
           ▼                       ▼
    ┌─────────────┐         ┌─────────────┐
    │  Portfolio  │         │   Zerodha   │
    │  Dashboard  │         │   Demat     │
    │  (Enhanced) │         │   Account   │
    └─────────────┘         └─────────────┘
```

#### Other Potential Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| **Kite Connect API** | Alternative to MCP for trading | P1 |
| **CAMS/KFintech** | MF portfolio import | P1 |
| **NSDL/CDSL** | Demat holdings import | P2 |
| **Google Finance** | Price data backup | P2 |
| **WhatsApp Business** | Update notifications | P1 |
| **Razorpay** | Payments | P0 |

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

### Operations & Monitoring

#### Automated Admin Reports

The platform includes automated reporting infrastructure for monitoring user growth and platform health:

```
┌─────────────────────────────────────────────────────────┐
│              AUTOMATED REPORTING SYSTEM                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           RENDER CRON JOBS                       │   │
│  │                                                  │   │
│  │  ┌─────────────────┐  ┌─────────────────┐      │   │
│  │  │   Daily Report  │  │  Weekly Report  │      │   │
│  │  │   (9:00 AM UTC) │  │  (Mon 9:00 AM)  │      │   │
│  │  └────────┬────────┘  └────────┬────────┘      │   │
│  │           │                    │                │   │
│  │           └────────┬───────────┘                │   │
│  │                    │                            │   │
│  │                    ▼                            │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │        send_user_report.py              │   │   │
│  │  │  • Platform stats (users, reports,      │   │   │
│  │  │    portfolios, watchlists)              │   │   │
│  │  │  • New user list with details           │   │   │
│  │  │  • Per-user activity metrics            │   │   │
│  │  └────────────────────┬────────────────────┘   │   │
│  │                       │                         │   │
│  │                       ▼                         │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │          Resend API / SMTP              │   │   │
│  │  │     (sends email to admin inbox)        │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Report Contents:**
| Section | Daily Report | Weekly Report |
|---------|--------------|---------------|
| Platform Overview | Total users, Google OAuth users, total reports, portfolios, watchlists | Same |
| New Users | Users from last 24 hours | Users from last 7 days |
| User Details | Email, name, auth provider, join date, reports generated | Same |

**Technical Implementation:**
- **Scheduler:** Render Cron Jobs
- **Email Provider:** Resend API (primary), SMTP (fallback)
- **Scripts Location:** `backend/scripts/send_user_report.py`
- **Configuration:** Environment variables in Render dashboard

#### User Export Scripts

Additional admin utilities for user management:

| Script | Purpose | Output Formats |
|--------|---------|----------------|
| `export_users.py` | Export all users or filtered subset | Table, CSV, JSON, emails-only |
| `weekly_new_users.py` | Get new users from last N days | Report, CSV, JSON, emails-only |

**Usage Examples:**
```bash
# Export all Google OAuth users as CSV
python scripts/export_users.py --google-only --format csv

# Get new users from last 30 days
python scripts/weekly_new_users.py --days 30

# Export just email addresses for marketing
python scripts/export_users.py --emails-only
```

---

## Pricing & Monetization

### Pricing Philosophy

> **Initial Strategy:** Package-based payments (not subscriptions) until payment infrastructure is mature.

### Pricing Tiers

| Tier | Price | Duration | Target User | Features |
|------|-------|----------|-------------|----------|
| **Free** | ₹0 | Forever | Trial users | 3 reports/month, basic data, no save |
| **Starter Pack** | ₹499 | 30 days | Casual investors | 15 reports, all modules, save watchlists |
| **Pro Pack** | ₹1,499 | 90 days | Active investors | Unlimited reports, comparisons, portfolio builder |
| **Annual** | ₹3,999 | 365 days | Power users | Everything + priority support, early features |
| **Advisor/Enterprise** | Custom | Annual | RIAs, firms | White-label, API access, bulk reports, dedicated support |

### Monetization Timeline

```
Phase 1 (Now): Package-based payments
    └── Simple Razorpay integration
    └── No recurring billing complexity
    └── Test price sensitivity

Phase 2 (Q2 2026): Subscription model
    └── Monthly/Annual subscriptions
    └── Auto-renewal
    └── Usage analytics

Phase 3 (Q3 2026): Enterprise tier
    └── Custom pricing
    └── API access
    └── White-label options
```

### Revenue Projections

| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Free Users | 10,000 | 50,000 | 100,000 |
| Paid Users | 200 | 1,500 | 5,000 |
| Conversion Rate | 2% | 3% | 5% |
| ARPU | ₹600 | ₹700 | ₹800 |
| MRR | ₹1.2L | ₹10.5L | ₹40L |

### Cost Estimates

| Cost Item | Monthly (Est.) | Notes |
|-----------|----------------|-------|
| **AI/Claude API** | ₹50K-2L | Scales with usage |
| **Hosting (Render/AWS)** | ₹10K-30K | Database + compute |
| **Domain/CDN** | ₹2K | Cloudflare |
| **Payment Gateway** | 2% of revenue | Razorpay fees |
| **Marketing** | ₹20K-1L | Ads, content |
| **Total Burn** | ₹1-4L/month | Before revenue |

---

## Launch Strategy

### Wedge Product: AI Stock Researcher

The AI Equity Research Report Generator is the **wedge product** — the sharp entry point that gets users in the door.

**Why Stock Research First:**
- Immediate value delivery (report in 60 seconds)
- Broadest appeal (stock investors >> PMS investors)
- Viral potential (shareable reports)
- Clear "wow" moment

### Pre-Launch Checklist

- [ ] Feature improvements for Stock Researcher
  - [ ] Better language quality (more articulate AI prompts)
  - [ ] Add Hindi and Gujarati support
  - [ ] Add Permabullish logo/branding
  - [ ] Implement paywall (3 free reports, then pay)
- [ ] Host at permabullish.com domain
- [ ] Payment integration (Razorpay packages)
- [ ] Basic analytics (Mixpanel/Amplitude)

### Launch Timeline

```
Weekend (Current):
├── Complete PMS data scraping
├── Finalize Stock Researcher improvements
└── Test payment flow

Week 1:
├── Soft launch to Telegram group
├── Gather initial feedback
└── Fix critical bugs

Week 2:
├── YouTube video launch
├── Shift Telegram marketing to tool usage
└── Monitor conversions

Week 3+:
├── Iterate based on feedback
├── Consider paid ads
└── Build MF Analytics module
```

### Content & Marketing Plan

#### YouTube Video Strategy

**Video Structure:**
1. **Hook** (0-10 sec): "Did you know you can get institutional-grade stock research for free?"
2. **Demo** (10-120 sec): Show the tool in action, generate a report
3. **Value Props** (120-180 sec): "10 things you can do that were impossible before"
4. **CTA** (180-200 sec): "Join our Telegram group for early access"

**Video Series Plan:**
| Video | Focus | Hook |
|-------|-------|------|
| 1 | Combined Overview | "Your personal investment bank" |
| 2 | Stock Research Deep Dive | "Research any stock in 60 seconds" |
| 3 | PMS Analytics | "See what the rich are investing in" |
| 4 | MF Analytics | "37,000 funds, simplified" |

#### Telegram Strategy
- Shift from general market content to tool demos
- Daily "stock of the day" generated reports
- User success stories and testimonials
- Exclusive early access announcements

#### Paid Advertising (Future)
- **Google Ads:** Target "stock research", "mutual fund comparison"
- **YouTube Ads:** Pre-roll on finance channels
- **Instagram/Facebook:** Carousel ads showing report samples
- **Budget:** Start with ₹500/day, scale based on CAC

### Word of Mouth Mechanics

1. **Shareable Reports:** Every report has "Powered by Permabullish" footer
2. **Referral Program:** "Give ₹100, Get ₹100" credit system
3. **Telegram Viral Loops:** Users share reports in groups
4. **Influencer Seeding:** Send free access to finance YouTubers

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
- [x] Landing page with three entry paths

### Phase 2: Expansion (Q2 2026)
- [ ] Mutual Fund Analytics module
- [ ] AMFI data integration
- [ ] User authentication (Clerk/Auth0)
- [ ] Basic portfolio saving
- [ ] Basic subscription tier (Razorpay)

### Phase 3: Portfolio Management (Q3 2026)
- [ ] Portfolio Builder MVP
- [ ] Risk profiling system
- [ ] Instrument selection (drill-down from allocation)
- [ ] Portfolio dashboard
- [ ] Allocation history tracking
- [ ] Share portfolio feature

### Phase 4: Intelligence & Updates (Q4 2026)
- [ ] Life stage rebalancing suggestions
- [ ] Performance tracking vs benchmarks
- [ ] Email digest system
- [ ] AI Advisor MVP
- [ ] Natural language queries

### Phase 5: B2B & Advanced (2027 H1)
- [ ] Advisor Mode MVP
- [ ] Client management
- [ ] Scenario modeling
- [ ] Model portfolios
- [ ] Zerodha MCP integration (beta)

### Phase 6: Life Planning & Scale (2027 H2)
- [ ] Life Planning module
- [ ] Comprehensive profile builder
- [ ] AI plan generation
- [ ] Mobile applications (iOS/Android)
- [ ] Regional language support (Hindi, Gujarati)

### Gantt View

```
2026                                            2027
         Q1          Q2          Q3          Q4          H1          H2
    ┌───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐
Stock│███████████│           │           │           │           │           │
 Res │  ✅ MVP   │  Enhance  │           │           │           │           │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
PMS │███████████│           │           │           │           │           │
Trkr│  ✅ MVP   │  Enhance  │           │           │           │           │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
MF  │           │███████████│███████████│           │           │           │
Anly│           │    MVP    │  Enhance  │           │           │           │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
Port│           │           │███████████│███████████│███████████│           │
Bldr│           │   Auth    │    MVP    │  Updates  │  Enhance  │           │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
AI  │           │           │           │███████████│███████████│           │
Advr│           │           │           │    MVP    │  Enhance  │           │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
Advsr│           │           │           │           │███████████│███████████│
Mode│           │           │           │           │    MVP    │  Enhance  │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
Life│           │           │           │           │           │███████████│
Plan│           │           │           │           │           │    MVP    │
    ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤
Zrdha│           │           │           │           │███████████│███████████│
 MCP│           │           │           │           │   Beta    │    GA     │
    └───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘
```

### Key Milestones

| Milestone | Target Date | Description |
|-----------|-------------|-------------|
| **MF Analytics Launch** | Q2 2026 | Complete mutual fund coverage |
| **Auth + Save** | Q2 2026 | Users can create accounts and save work |
| **Portfolio MVP** | Q3 2026 | Full journey from Landing → Save Portfolio |
| **First Paying B2B Client** | Q4 2026 | Advisor mode in production |
| **10K Active Portfolios** | Q1 2027 | Validation of portfolio management |
| **Zerodha Integration** | H1 2027 | Real portfolio sync |
| **Life Planning** | H2 2027 | Comprehensive financial planning |

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

### B. Pricing Strategy

> See [Pricing & Monetization](#pricing--monetization) section for detailed pricing tiers and strategy.

**Summary:** Package-based payments initially (₹499-₹3,999), transitioning to subscriptions. Enterprise tier for advisors.

### C. Glossary

- **AUM**: Assets Under Management
- **HNI**: High Net-worth Individual (₹50L-5Cr investable)
- **UHNI**: Ultra High Net-worth Individual (₹5Cr+ investable)
- **PMS**: Portfolio Management Services
- **MF**: Mutual Fund
- **SIF**: Specialized Investment Fund (new SEBI category)
- **NAV**: Net Asset Value
- **SIP**: Systematic Investment Plan
- **RIA**: Registered Investment Advisor
- **TER**: Total Expense Ratio

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Product Team | Initial PRD |
| 2.0 | Jan 2026 | Product Team | Added Business Pillars, User Flows, Design Philosophy, Pricing & Monetization, Launch Strategy. Updated MF module with navigation focus. |
| 2.1 | Jan 2026 | Product Team | Added comprehensive Design System Specifications including color palette (Navy & Saffron), typography (DM Serif Display, DM Sans, Inter), component specs, icons, shadows, spacing, and animation guidelines. |
| 2.2 | Jan 2026 | Product Team | Major expansion: Added Flow 3 (Research-First), Complete Portfolio Journey diagram, Abstraction Levels concept. Expanded Portfolio Builder to Portfolio Builder & Manager with life stage management, updates/alerts, and sharing features. Added new modules: Advisor Mode (B2B), Life Planning. Added Zerodha MCP integration roadmap and Future Integrations section. Updated Feature Requirements for all new modules. Revised Roadmap to extend through 2027 with key milestones. |
| 2.3 | Jan 2026 | Product Team | Added Operations & Monitoring section under Technical Architecture: Automated Admin Reports (daily/weekly user reports via Render Cron Jobs with Resend API), User Export Scripts (export_users.py, weekly_new_users.py) for user management and marketing outreach. |

---

*This is a living document and will be updated as the product evolves.*
