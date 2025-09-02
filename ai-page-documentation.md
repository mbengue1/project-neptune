
# Neptune AI Page – README

## 📌 Overview

The **AI Page** is a core feature of Neptune, designed to give users **comprehensive sports data, intelligent betting recommendations, and a modern, seamless experience** that goes beyond traditional sportsbooks.

This page combines:

* **Stats widgets** (recent performance, trends, injuries, line moves)
* **Interactive chat** (ask questions like *“How many points has James Harden averaged in the last 15 games?”*)
* **Machine Learning (ML) predictions** (probability estimates, fair prices, expected value, confidence scores, and explanations)

By blending **deterministic stats** (from APIs/DB) with **probabilistic models** (ML predictions) and **LLM orchestration** (for natural interaction), Neptune AI provides a user-friendly and data-backed way to explore bets.

---

## 🎯 Main Goals

1. **Empower users** with explainable stats and betting recommendations.
2. **Go beyond sportsbooks**: advanced analytics, variance analysis, trends, EV estimates, and user watchlists.
3. **Responsible design**: no guarantees, always “edges/leans/confidence,” with regional compliance controls.
4. **Seamless UX**: clean, modern UI with widgets + conversational AI.

---

## 🏗️ Development Process

### 1. Accounts, APIs & Setup

will need:

* **OpenAI** (LLM for chat orchestration)
* **Odds API** (for live/book odds)
* **Stats APIs** (NBA/NFL/MLB/Soccer/etc.)
* **Injury feeds** (from sports data vendors)
* **Weather API** (OpenWeather/VisualCrossing for outdoor games)
* **Cloud services**:

  * DB: CosmosDB/DynamoDB for canonical store
  * Cache: Redis for hot queries
  * Object store: S3/Azure Blob for history & ML datasets

Keys stored in `.env` for dev and in a **Secret Manager** (Azure Key Vault / AWS Secrets Manager) in production.

---

### 2. Repo Layout (suggested monorepo)

```
/apps
  /web                # Next.js/React front-end (AI page)
/services
  /sport-intel        # API for stats/odds/injuries/schedule
  /ml-api             # API for ML predictions + explanations
  /etl                # Scheduled ingestion jobs
/packages
  /feature-store      # Feature transforms for ML (rolling windows, context)
/shared               # Shared types, schemas, utils
/infra                # Infra as code (docker, k8s, terraform/bicep)
```

---

### 3. Data Layer

* **Hot reads**: Redis + CosmosDB/DynamoDB
* **Cold history**: S3/Blob (parquet) + Athena/BigQuery for backtesting
* **Collections**:

  * `players`, `teams`, `games`, `boxscores`, `injuries`
  * `odds_snapshots`, `market_moves`, `weather`

IDs normalized across vendors (mapping table `{providerId -> internalId}`).

---

### 4. Backend Services

#### a) Sport-Intel Service

Purpose: clean API for deterministic data.
Endpoints:

* `GET /players/:id/rolling?window=15&league=NBA`
* `GET /odds/player/:id?league=NBA&market=points&book=dk`
* `GET /injuries/:id?league=NBA`
* `GET /trends/top?league=NBA&metric=points&window=10`

Handles vendor calls, normalization, caching, and timestamps.

#### b) ML-API Service

Purpose: serve model predictions and explanations.
Endpoints:

* `GET /ml/v1/game?league=NBA&gameId=...`
* `GET /ml/v1/prop?league=NBA&playerId=...&market=points&gameId=...`
* `GET /ml/v1/explain?playerId=...&gameId=...`

Returns:

* Probabilities (p\_over, p\_under, p\_win, etc.)
* Fair price/line
* Expected value (EV)
* Confidence bucket (low/medium/high)
* Drivers (top SHAP features)
* Model version metadata

#### c) ETL Jobs

* Odds snapshots (30–90s)
* Injuries (2–5 min)
* Weather (hourly)
* Boxscores/play-by-play (post-game)
* Market move deltas

---

### 5. Machine Learning Models

#### Phase A – Baseline

* Game outcomes (win/cover/total) → Gradient-boosted trees (LightGBM/XGBoost).
* Player props (points, rebounds, etc.) → Mean/variance estimation + distributional model (Gaussian/NegBin).

Features include:

* Player/team form (rolling windows)
* Opponent context (defensive ratings, pace)
* Injuries/rest/travel
* Market context (line moves, odds shifts)
* Weather (for outdoor sports)

#### Phase B – Calibration & Explainability

* Calibrate with isotonic/Platt.
* SHAP explanations for transparency.
* Confidence buckets (sample size, variance, volatility).

#### Phase C – Personalization (future)

* Bandit models (Thompson Sampling/LinUCB) for prioritizing recs.

---

### 6. LLM Orchestration

* **LLM (OpenAI GPT)** orchestrates tool calls, never fabricates numbers.
* Tools available:

  * `Stats.getRolling` (sport-intel)
  * `Odds.getCurrentLines` (sport-intel)
  * `ML.getPrediction` (ml-api)
  * `Injuries.getStatus` (sport-intel)
  * `Schedule.getUpcoming` (sport-intel)
* **System prompt rules**:

  * All numbers must cite source + timestamp.
  * Recs only from ML tool outputs (EV, confidence, drivers).
  * Always use safe language (“edge,” “lean,” “confidence”).

---

### 7. Front-End (AI Page)

* **Header filters**: Sport, date range, book.
* **Widgets**:

  * Trending Players (last 5/10/15 averages, variance, usage)
  * Injury & Line Movement Ticker
  * Model Picks (top 3 edges with EV + confidence)
  * Watchlist (user-saved players/teams)
* **Chat Panel**:

  * Multiline chat input.
  * Responses stream with tables, EV, confidence, and explanations.
  * Action chips: *Compare 10 vs 15*, *Show alt lines*, *Notify on line change*.

UI tech: React (Next.js), Tailwind, shadcn/ui, Recharts (sparklines).

---

### 8. Development Workflow

1. **Local Dev**: Docker Compose for services + Redis + DB.
2. **Feature Work**:

   * Build sport-intel endpoints.
   * Add ML baseline + /ml/v1 endpoints.
   * Wire LLM tool-calling with `/ai/query`.
   * Build AI page with skeleton loaders + streaming.
3. **Testing**:

   * Unit tests on feature extraction & API contracts.
   * Backtests with historical odds/outcomes.
   * CI/CD: nightly regression tests, CLV & calibration reports.
4. **Environments**:

   * Dev → Stage → Prod, each with isolated DB/secrets.
   * Canary deploys for new ML models.

---

### 9. Observability & QA

* **Logs**: cache hit/miss, provider latency, LLM token usage.
* **Metrics**:

  * API p95 latency (<2.5s for chat, <1.5s for widgets).
  * Model calibration drift (Brier/log loss).
  * CLV vs closing line (baseline vs model).
* **Alerts**: Provider schema changes, data drift, ML reliability degradation.

---

### 10. Compliance & Safety

* **Language**: no guarantees; “edges/leans/confidence only.”
* **Limits**: daily rec caps, bankroll suggestions (fractional Kelly).
* **Geo-controls**: hide odds/recs in restricted regions, show stats-only answers.
* **User data**: anonymous aggregation only; no PII for ML.

---

## ✅ Acceptance Criteria

* Every numeric output has **source + timestamp**.
* ML recs show **probability, fair line, EV, confidence, drivers, model version**.
* Chat answers degrade gracefully to **stats-only** if ML is unavailable.
* Backtests confirm **positive CLV** and calibration stability.

---

## 🚀 Future Roadmap

* Sport-specific simulators (xG for soccer, EPA for NFL).
* Personalization with bandits.
* Parlay builder with correlation adjustment.
* Live-betting models (real-time state).
* Cross-sport parity across NBA/NFL/MLB/Soccer.

---

### Example Flow

User: *“How many points has James Harden averaged in the past 15 games? Should I take over 20.5 tonight on DK?”*

1. LLM calls `Stats.getRolling(Harden, 15)` → avg 22.1 pts.
2. Calls `Odds.getCurrentLines(Harden, points, DK)` → line 20.5, −115.
3. Calls `ML.getPrediction(Harden, points)` → p\_over 58%, EV +6%, confidence medium, drivers (minutes ↑, opponent pace ↑).
4. Response:

   > **Answer**: Harden averaged 22.1 PPG over his last 15 (Jan 12–Feb 20).
   > **Lean**: Over 20.5 (58% | EV +6%). Confidence: Medium.
   > **Why**: ↑ minutes, fast-paced opponent, line moved −0.5 since open.
