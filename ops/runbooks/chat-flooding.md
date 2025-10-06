# Runbook: Chat Flooding/Abuse

## Symptom

* Chat messages/sec spike (>500 msgs/sec sustained)
* Moderation queue backlog growing
* WebSocket gateway CPU/memory saturation
* Legitimate users reporting lag or inability to send messages
* Spam or abuse content flooding event rooms

## Checks

1. **Check message rate per room**:
   ```
   # From metrics dashboard or:
   redis-cli HGETALL room:stats:messages
   ```

2. **Identify flooding sources**:
   ```sql
   SELECT user_id, COUNT(*) as msg_count
   FROM chat_messages
   WHERE created_at > NOW() - INTERVAL '5 minutes'
   GROUP BY user_id
   ORDER BY msg_count DESC
   LIMIT 10;
   ```

3. **Check moderation queue depth**:
   ```
   aws sqs get-queue-attributes --queue-url $MODERATION_QUEUE_URL --attribute-names ApproximateNumberOfMessages
   ```

4. **Gateway health**:
   ```
   kubectl top pods -l app=chat-gateway
   ```

## Actions

### Immediate (< 2 min)

1. **Enable slow mode globally**: Rate limit to 1 message per 5 seconds
   ```
   redis-cli SET global:slowmode:enabled 1
   redis-cli SET global:slowmode:interval 5
   ```

2. **Shadowban identified abusers**: (won't notify them, but messages hidden)
   ```
   curl -X POST https://api.neptune/admin/chat/shadowban \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -d '{"user_ids": ["user123", "user456"], "duration": "24h"}'
   ```

### Short-term (< 15 min)

3. **Raise rate limit strictness**: Reduce from default 10 msgs/min to 5 msgs/min
   ```
   kubectl set env deployment/chat-gateway RATE_LIMIT_MSGS=5 RATE_LIMIT_WINDOW=60
   ```

4. **Temporarily freeze reactions**: Reduce non-essential traffic
   ```
   redis-cli SET reactions:enabled 0
   ```

5. **Scale chat gateway**: Add more pods if CPU/memory saturated
   ```
   kubectl scale deployment/chat-gateway --replicas=4
   ```

6. **Enable CAPTCHA for new connections**: (if bot attack suspected)
   ```
   kubectl set env deployment/chat-gateway REQUIRE_CAPTCHA=true
   ```

### Recovery (< 1 hour)

7. **Review moderation logs**: Identify patterns (coordinated attack? single bad actor?)
   ```
   kubectl logs -l app=chat-gateway --tail=500 | grep "rate_limit"
   ```

8. **Permanent bans**: For confirmed abusers
   ```
   curl -X POST https://api.neptune/admin/chat/ban \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -d '{"user_ids": ["user789"], "reason": "coordinated_spam"}'
   ```

9. **Gradually relax restrictions**: Once traffic normalizes
   ```
   redis-cli SET global:slowmode:enabled 0
   redis-cli SET reactions:enabled 1
   kubectl set env deployment/chat-gateway REQUIRE_CAPTCHA=false
   ```

10. **Notify affected users**: In-app banner:
    > "We experienced elevated chat activity. Normal service has resumed. Thank you for your patience."

## Prevention

* Per-user rate limits (default: 10 msgs/min)
* Per-room rate limits (escalating slow mode at thresholds)
* Profanity/spam filters (keyword + ML-based)
* New user restrictions (account age < 24h: stricter limits)
* Monitor msgs/sec per room (alert > 200 sustained for 2 min)
* Require phone verification for chat access (optional, for high-abuse periods)
* Implement reputation system (trusted users get higher limits)

## Post-Incident

* Analyze attack vector (coordinated bots? single user?)
* Update keyword filters if new spam patterns
* Review and tune rate limits based on legitimate usage patterns
* Consider temporary room closures for high-abuse events

---

_Last updated: 2025-10-06_  
_Owner: Platform Engineering & Moderation Team_
