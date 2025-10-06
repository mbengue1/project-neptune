# Runbook: Payments Webhook Delay

## Symptom

* User deposits showing as "Processing" longer than expected (>5 minutes)
* Payments stuck in `INITIATED` status in database
* Users contacting support about missing funds
* Webhook delivery lag alerts firing

## Checks

1. **Check payment status in DB**:
   ```sql
   SELECT id, status, created_at, psp_txn_id 
   FROM payments 
   WHERE status = 'INITIATED' 
   AND created_at < NOW() - INTERVAL '10 minutes'
   ORDER BY created_at DESC
   LIMIT 20;
   ```

2. **Check Stripe webhook logs**: Visit Stripe Dashboard → Developers → Webhooks
   * Look for failed deliveries
   * Check response codes and retry attempts

3. **Check webhook processor logs**:
   ```
   kubectl logs -l app=api --tail=100 | grep "webhook"
   ```

4. **Check outbox queue lag**:
   ```
   aws sqs get-queue-attributes --queue-url $PAYMENT_QUEUE_URL --attribute-names ApproximateNumberOfMessages
   ```

## Actions

### Immediate (< 5 min)

1. **Verify webhook endpoint health**:
   ```
   curl -I https://api.neptune/webhooks/stripe/health
   ```

2. **Check for webhook signature validation errors**: May indicate key mismatch
   ```
   kubectl logs -l app=api --tail=200 | grep "signature"
   ```

### Short-term (< 30 min)

3. **Manual reconciliation**: For affected users, manually reconcile with Stripe
   ```bash
   # Get Stripe payment intent status
   stripe payment_intents retrieve pi_XXX
   
   # If succeeded in Stripe but not in our DB, manually credit:
   curl -X POST https://api.neptune/admin/payments/reconcile \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -d '{"payment_id": "123", "force_credit": true}'
   ```

4. **Replay webhooks**: In Stripe Dashboard → Webhooks → select event → "Resend"

5. **Scale webhook processors** (if backlog):
   ```
   kubectl scale deployment/api --replicas=5
   ```

### Recovery (< 2 hours)

6. **Identify root cause**:
   * Network issue between Stripe and our API?
   * Database contention causing timeouts?
   * Bug in webhook handler?

7. **Notify affected users**: Template message:
   > "Your deposit has been processed. Apologies for the delay. Your balance is now updated."

8. **Review webhook retry configuration**: Ensure Stripe retries are enabled

## Prevention

* Monitor payment processing time (alert if p95 > 2 min)
* Alert on payments in `INITIATED` > 10 minutes
* Set up Stripe webhook endpoint monitoring (uptime check)
* Use idempotent webhook processing (already implemented)
* Implement manual reconciliation job that runs every 15 minutes
* Document PSP escalation process

## Escalation

* **Level 1**: Platform Engineering on-call
* **Level 2**: Payment Operations team
* **Level 3**: Stripe Technical Account Manager (enterprise plan)

---

_Last updated: 2025-10-06_  
_Owner: Platform Engineering & Payment Ops_
