# Local Development Helpers

This directory contains scripts and configuration files for local development.

## Planned Contents

- `seed-data.sql` - Database seed scripts with test data
- `redis.conf` - Redis configuration for local development
- `db-migrations/` - Database migration scripts
- `test-fixtures/` - Test data fixtures

## Usage

### Database Seeding

```bash
# After starting postgres via docker-compose
psql -U neptune -d neptune -f infra/local/seed-data.sql
```

### Redis Configuration

```bash
redis-server infra/local/redis.conf
```

---

_See also: [Testing & Quality](../../docs/140-testing-and-quality.md)_
