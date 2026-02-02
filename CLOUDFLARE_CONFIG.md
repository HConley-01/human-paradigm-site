# Cloudflare Configuration Reference

## Environment Variables

Add these in Cloudflare Pages → Settings → Environment variables:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name: "Lernaean Contact Form"
4. Permissions: Sending access
5. Copy the key (starts with `re_`)

---

## KV Namespace Binding

In Cloudflare Pages → Settings → Functions → KV namespace bindings:

```
Variable name:  CONTACT_MESSAGES
KV namespace:   CONTACT_MESSAGES
```

**How to create:**
1. Go to Workers & Pages → KV
2. Click "Create namespace"
3. Name: `CONTACT_MESSAGES`
4. Click "Add"
5. Bind to your Pages project (see above)

---

## DNS Records (in Cloudflare DNS)

For Resend email sending, add these DNS records:

### SPF Record
```
Type:    TXT
Name:    @
Content: v=spf1 include:_spf.resend.com ~all
TTL:     Auto
```

### DKIM Record
```
Type:    TXT
Name:    resend._domainkey
Content: [Copy from Resend dashboard]
TTL:     Auto
```

### DMARC Record
```
Type:    TXT
Name:    _dmarc
Content: v=DMARC1; p=none
TTL:     Auto
```

**Note:** Get exact DKIM value from Resend dashboard after adding domain.

---

## Function Routes

These are automatically configured from `/functions` directory structure:

```
POST   /api/send-email       → /functions/api/send-email.js
GET    /api/messages          → /functions/api/messages.js
POST   /api/message-status    → /functions/api/message-status.js
```

No manual configuration needed - Cloudflare auto-detects.

---

## Build Settings

In Cloudflare Pages → Settings → Build:

```
Framework preset:       None
Build command:          (leave empty)
Build output directory: /
Root directory:         /
```

**Note:** This is a static site with serverless functions. No build step required.

---

## Deployment Settings

### Production Branch
```
Branch: main (or your default branch)
```

### Preview Branches
```
All branches except production
```

### Build Watch Paths
```
(default - all files)
```

---

## Custom Domain (if needed)

If using custom domain:

1. Go to Pages project → Custom domains
2. Click "Set up a custom domain"
3. Enter: `humanparadigm.org` or `www.humanparadigm.org`
4. Click "Activate domain"
5. DNS records auto-configured (Cloudflare DNS)

---

## Functions Configuration (wrangler.toml)

**Optional:** Create `wrangler.toml` in project root for local development:

```toml
name = "humanparadigm-contact-form"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "CONTACT_MESSAGES"
id = "YOUR_KV_NAMESPACE_ID"

[env.production]
vars = { }
```

**Note:** Not required for deployment. Only for local testing with Wrangler CLI.

---

## Testing Configuration

### Test Email Sending

```bash
curl -X POST https://humanparadigm.org/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "affiliation": "Test Org",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "messageId": "msg-1738524680123-abc123",
  "emailId": "re_abc123def456"
}
```

### Test Message Retrieval

```bash
curl https://humanparadigm.org/api/messages
```

Expected response:
```json
{
  "success": true,
  "messages": [...],
  "count": 1
}
```

### Test Status Update

```bash
curl -X POST https://humanparadigm.org/api/message-status \
  -H "Content-Type: application/json" \
  -d '{
    "messageId": "msg-1738524680123-abc123",
    "status": "read"
  }'
```

Expected response:
```json
{
  "success": true,
  "messageId": "msg-1738524680123-abc123",
  "newStatus": "read"
}
```

---

## Monitoring & Logs

### View Function Logs

1. Go to Cloudflare Pages → Your project
2. Click "Functions" tab
3. Click "Logs (Real-time)"
4. See live execution logs

### View Email Logs

1. Go to [resend.com/emails](https://resend.com/emails)
2. See all sent emails
3. Check delivery status
4. View open/click rates

### View KV Data

1. Go to Workers & Pages → KV
2. Select `CONTACT_MESSAGES` namespace
3. Browse stored messages
4. See metadata for each key

---

## Security Headers (Optional)

Add to `_headers` file in project root:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/api/*
  Access-Control-Allow-Origin: https://humanparadigm.org
  Access-Control-Allow-Methods: GET, POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
```

**Note:** Functions already include CORS headers. This is additional security.

---

## Rate Limiting (Optional)

To prevent abuse, add rate limiting in function:

```javascript
// In send-email.js, add at top of onRequestPost:
const clientIP = request.headers.get('CF-Connecting-IP');
const rateLimitKey = `ratelimit:${clientIP}`;

// Check rate limit (example: 5 submissions per hour)
const submissionCount = await env.CONTACT_MESSAGES.get(rateLimitKey);
if (submissionCount && parseInt(submissionCount) > 5) {
  return new Response(
    JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
    { status: 429 }
  );
}

// Increment counter
await env.CONTACT_MESSAGES.put(rateLimitKey, 
  String((parseInt(submissionCount) || 0) + 1), 
  { expirationTtl: 3600 }
);
```

**Note:** This is optional. Include only if experiencing spam.

---

## Backup & Export

### Manual Backup

1. Go to admin dashboard
2. Click "Export Report"
3. Saves all messages as text file

### Automated Backup (Optional)

Create Cloudflare Worker to sync KV to external storage:

```javascript
// Scheduled worker (runs daily)
export default {
  async scheduled(event, env, ctx) {
    const messages = await getAllMessages(env.CONTACT_MESSAGES);
    // Send to external backup (S3, etc.)
    await backupToS3(messages);
  }
}
```

**Note:** Only needed for enterprise use. Free tier is reliable.

---

## Troubleshooting

### Email not sending?

1. Check Resend dashboard → Emails
2. Look for failed sends
3. Verify domain is verified
4. Check RESEND_API_KEY is set correctly
5. View Cloudflare function logs

### Messages not storing?

1. Verify KV binding exists
2. Check variable name is `CONTACT_MESSAGES`
3. View KV namespace in dashboard
4. Check function logs for errors

### Badge not updating?

1. Check browser console for errors
2. Verify `/api/messages` endpoint works
3. Check localStorage has messages
4. Refresh page

---

## Support Resources

- **Cloudflare Pages**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **Cloudflare KV**: [developers.cloudflare.com/kv](https://developers.cloudflare.com/kv/)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: [resend.com/support](https://resend.com/support)

---

## Quick Configuration Checklist

- [ ] Create Cloudflare Pages project
- [ ] Add RESEND_API_KEY environment variable
- [ ] Create CONTACT_MESSAGES KV namespace
- [ ] Bind KV namespace to project
- [ ] Add DNS records (SPF, DKIM, DMARC)
- [ ] Verify domain in Resend
- [ ] Deploy functions
- [ ] Test with submission
- [ ] Verify email delivery
- [ ] Check admin dashboard
- [ ] Confirm badge works

---

*Configuration complete!* 🎉
