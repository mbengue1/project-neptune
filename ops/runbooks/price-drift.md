# Runbook: Price Drift / Odds Stale

## Symptom

* Frequent re-offers during bet placement
* Low Redis cache hit ratio
* Provider lag warnings in logs
* Users seeing outdated odds

## Checks

1. **Redis hit ratio**: Check metrics dashboard or run:
   ```
   redis-cli INFO stats | grep keyspace_hits
   ```
   
2. **Odds age**: Check `asOf` timestamp age in cached markets:
   ```
   redis-cli GET markets:{market_id} | jq '.asOf'
   ```

3. **Ingestion error logs**: Check for vendor API errors:
   ```
   kubectl logs -l app=ingestion --tail=100 | grep ERROR
   ```

4. **Provider status**: Check vendor API status page

## Actions

### Immediate (< 5 min)

1. **Increase SWR window**: Temporarily extend stale-while-revalidate from 2-3s to 5-8s
   ```
   kubectl set env deployment/api REDIS_SWR_SEC=8
   ```

2. **Reduce fanout frequency**: Lower WebSocket update frequency to reduce pressure
   ```
   kubectl set env deployment/chat-gateway WS_THROTTLE_MS=1000
   ```

### Short-term (< 30 min)

3. **Scale ingestion workers**: Add more polling workers if rate-limited
   ```
   kubectl scale deployment/ingestion --replicas=3
   ```

4. **Circuit break slow markets**: Temporarily suspend volatile/high-volume markets
   ```
   curl -X POST https://api.neptune/admin/markets/suspend \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -d '{"markets": ["nba-live-123"], "reason": "price_drift"}'
   ```

### Follow-up (< 2 hours)

5. **Investigate root cause**: Check if provider degradation or our ingestion lag
6. **Adjust polling intervals**: Tune based on rate limits and freshness SLO
7. **Post-incident**: Update capacity plan if load exceeded assumptions

## Prevention

* Monitor Redis hit ratio (alert < 85%)
* Alert on `asOf` age (alert > 15s for 5 minutes)
* Load test ingestion path monthly
* Establish vendor SLAs and escalation contacts

---

_Last updated: 2025-10-06_  
_Owner: Platform Engineering_
