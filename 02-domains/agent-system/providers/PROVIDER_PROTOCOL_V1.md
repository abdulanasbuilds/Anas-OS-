# ANAS Provider Protocol v1

This protocol keeps ANAS OS independent from any single vendor.

## Request envelope

An adapter endpoint receives JSON:

```json
{
  "protocol": "anas-provider-v1",
  "family": "ai",
  "operation": "structured-response",
  "input": {"prompt": "..."}
}
```

## Response envelope

Success:

```json
{
  "protocol": "anas-provider-v1",
  "status": "completed",
  "output": {"text": "..."},
  "usage": {"inputTokens": 0, "outputTokens": 0, "cost": 0}
}
```

Failure:

```json
{
  "protocol": "anas-provider-v1",
  "status": "error",
  "error": {"code": "provider-error", "message": "..."}
}
```

The adapter may translate this envelope to any upstream model or service. ANAS domain code never needs to know the upstream vendor API.

## Security requirements

- API keys come from runtime environment or an external secret store.
- Never log credentials or place them in repository files.
- Use HTTPS for remote providers.
- Apply bounded timeouts and response-size limits.
- Treat remote output as untrusted data until verified.
- External mutations remain governed by ANAS authority and approval policies.
