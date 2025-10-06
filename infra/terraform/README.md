# Neptune Terraform Infrastructure

Infrastructure as Code for deploying Neptune to cloud environments.

## Structure

```
terraform/
├── environments/
│   ├── dev/          # Development environment
│   ├── staging/      # Staging environment
│   └── prod/         # Production environment
└── modules/          # Reusable Terraform modules
    ├── api/          # API service module
    ├── database/     # RDS/Aurora module
    ├── cache/        # ElastiCache module
    ├── networking/   # VPC, subnets, security groups
    └── observability/# CloudWatch, OTel Collector
```

## Planned Modules

### Core Infrastructure
- VPC with public/private subnets
- RDS Postgres (Aurora Serverless v2)
- ElastiCache Redis cluster
- S3 buckets for audit logs
- SQS/SNS for event bus

### Compute
- ECS Fargate for API service
- ECS Fargate for workers (ingestion, settlement)
- Application Load Balancer
- Auto-scaling policies

### Observability
- CloudWatch log groups
- CloudWatch metrics
- X-Ray tracing
- Dashboards and alarms

### Security
- WAF rules
- Secrets Manager
- IAM roles and policies
- Security groups

## Usage

```bash
cd infra/terraform/environments/dev
terraform init
terraform plan
terraform apply
```

## Prerequisites

- Terraform >= 1.5
- AWS CLI configured
- Appropriate AWS credentials

---

_Status: Placeholder - To be implemented in Phase 5_  
_See also: [Deployment & Operations](../../docs/130-deployment-and-operations.md), [Scaling & Capacity](../../docs/120-scaling-and-capacity-planning.md)_
