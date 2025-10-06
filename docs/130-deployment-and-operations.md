# 14) Deployment and Operations

## Environments

* **Dev**: docker-compose; Postgres/Redis local; localstack S3/SQS; stripe-cli.
* **Staging**: managed serverless DB/cache free tiers where possible; one small compute node; real S3.
* **Prod**: ECS Fargate or EKS; ALB + WAF; Aurora Postgres; ElastiCache; S3; SNS/SQS.

## CI/CD

* GitHub Actions: lint → typecheck → unit → contract → build images → SBOM → security scan; ephemeral compose for API tests; nightly E2E.
* CD: Blue/green or canary; feature flags for risky paths; infra via Terraform.

## Images & Runtime

* Multi-stage Docker; distroless base; non-root; read-only FS; drop Linux caps.

---

_See also: [Observability & SLOs](./100-observability-and-slos.md), [Testing & Quality](./140-testing-and-quality.md)_
