# Neptune Docker Infrastructure

This directory contains Docker configuration files for running Neptune services locally and in production.

## Files

- `Dockerfile.api` - Multi-stage Dockerfile for the API service
- `Dockerfile.ingestion` - Dockerfile for the ingestion worker
- `docker-compose.yml` - Development environment with hot reload
- `docker-compose.prod.yml` - Production-like environment

## Development Usage

1. **Start all services**:
   ```bash
   cd infra/docker
   docker-compose up -d
   ```

2. **View logs**:
   ```bash
   docker-compose logs -f api
   docker-compose logs -f ingestion
   ```

3. **Stop services**:
   ```bash
   docker-compose down
   ```

4. **Rebuild after changes**:
   ```bash
   docker-compose up -d --build
   ```

## Production Usage

```bash
cd infra/docker
docker-compose -f docker-compose.prod.yml up -d
```

## Environment Variables

Create a `.env` file in this directory:

```bash
# Database
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgresql://neptune:password@postgres:5432/neptune

# Redis
REDIS_PASSWORD=your_redis_password
REDIS_URL=redis://:password@redis:6379

# External APIs
ODDS_API_KEY=your_odds_api_key
```

## Health Checks

- **API**: http://localhost:3000/health
- **Postgres**: `docker-compose exec postgres pg_isready`
- **Redis**: `docker-compose exec redis redis-cli ping`

---

_See also: [Deployment & Operations](../../docs/130-deployment-and-operations.md)_
