# Contact Form Deployment & Configuration Guide

## Overview

This guide will help you set up a robust contact form system that:
- ✅ Sends elegantly formatted emails to **rkitcey@lernaean.net**
- ✅ Stores all messages securely in Cloudflare KV storage
- ✅ Displays messages in an elegant admin dashboard
- ✅ Shows unread message count with an email icon badge
- ✅ Provides backup storage in localStorage
- ✅ Handles offline/errors gracefully

---

## Prerequisites

1. **Cloudflare Pages Account** (free tier is sufficient)
2. **Resend Account** for email sending (free tier: 3,000 emails/month)
3. **Domain** configured with Cloudflare (humanparadigm.org)

---

## Step 1: Configure Resend Email Service

### 1.1 Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 1.2 Add and Verify Your Domain

1. In Resend dashboard, go to **Domains** → **Add Domain**
2. Enter: `humanparadigm.org`
3. Add the required DNS records to Cloudflare:
   - **SPF Record** (TXT): `v=spf1 include:_spf.resend.com ~all`
   - **DKIM Record** (TXT): Copy from Resend dashboard
   - **DMARC Record** (TXT): `v=DMARC1; p=none`

4. Verify domain in Resend (may take a few minutes)

### 1.3 Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: "Lernaean Contact Form"
4. Select permissions: **Sending access**
5. **Copy the API key** (you'll need it in Step 2)

> ⚠️ **Important**: Save this API key securely. It won't be shown again.

---

## Step 2: Configure Cloudflare Pages

### 2.1 Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect your GitHub repository (or upload files directly)
4. Set build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
5. Click **Save and Deploy**

### 2.2 Create KV Namespace

1. In Cloudflare dashboard, go to **Workers & Pages** → **KV**
2. Click **Create namespace**
3. Name it: `CONTACT_MESSAGES`
4. Click **Add**

### 2.3 Bind KV Namespace to Your Project

1. Go to your Pages project → **Settings** → **Functions**
2. Scroll to **KV namespace bindings**
3. Click **Add binding**
   - **Variable name**: `CONTACT_MESSAGES`
   - **KV namespace**: Select `CONTACT_MESSAGES`
4. Click **Save**

### 2.4 Add Environment Variables

1. In your Pages project, go to **Settings** → **Environment variables**
2. Add the following variable:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: [Paste your Resend API key from Step 1.3]
   - **Environment**: Production (and Preview if needed)
3. Click **Save**

### 2.5 Deploy Functions

Your Cloudflare Functions should be automatically deployed from the `/functions` directory:
- `/functions/api/send-email.js` - Sends emails and stores messages
- `/functions/api/messages.js` - Retrieves all messages
- `/functions/api/message-status.js` - Updates message status

**Verify deployment:**
1. Go to **Functions** tab in your Pages project
2. You should see:
   - `/api/send-email`
   - `/api/messages`
   - `/api/message-status`

---

## Step 3: Test the Contact Form

### 3.1 Submit a Test Message

1. Navigate to [https://humanparadigm.org](https://humanparadigm.org)
2. Scroll to the contact form
3. Fill in all fields:
   - **Name**: Your Name
   - **Email**: your-email@example.com
   - **Affiliation**: Test Organization
   - **Subject**: Test Submission
   - **Message**: This is a test message
4. Click **Send Message**

### 3.2 Verify Email Delivery

1. Check **rkitcey@lernaean.net** inbox
2. You should receive an elegantly formatted email with:
   - Header with gradient background
   - All form fields nicely displayed
   - Message in a styled box
   - Quick reply button

### 3.3 Check Admin Dashboard

1. Navigate to [https://humanparadigm.org/admin/](https://humanparadigm.org/admin/)
2. You should see:
   - **Email icon (📧)** in navigation with **red badge showing "1"**
   - **Contact Messages card** showing 1 new message
3. Click on **Contact Messages** or the email icon
4. Verify your test message appears with:
   - All fields displayed
   - Status: "NEW"
   - Timestamp
   - Action buttons (Reply, Delete, Status change)

---

## Step 4: Admin Features

### Message Management

In [/admin/contact-messages.html](https://humanparadigm.org/admin/contact-messages.html):

1. **Filter messages** by status (New, Read, Replied, Archived)
2. **Search** across all message fields
3. **Update status** by changing dropdown
4. **Reply** directly via email button
5. **Delete** unwanted messages
6. **Mark all as read** with one click
7. **Export report** as text file

### Message Statuses

- 🔵 **New**: Unread message (shows in badge count)
- 🟡 **Read**: Opened but not responded to
- 🟢 **Replied**: Response sent
- ⚫ **Archived**: Older or resolved messages

### Navigation Badge

The email icon (📧) in the admin navigation shows:
- **Red pulsing badge** with count of unread messages
- Updates automatically every 30 seconds
- Disappears when no new messages

---

## Step 5: Monitoring & Maintenance

### View Logs

**Cloudflare Logs:**
1. Go to your Pages project → **Functions** → **Logs (Real-time)**
2. Monitor function executions and errors

**Resend Logs:**
1. Go to Resend dashboard → **Emails**
2. View all sent emails, delivery status, and opens

### KV Storage Management

**View stored messages:**
1. Cloudflare Dashboard → **Workers & Pages** → **KV**
2. Select `CONTACT_MESSAGES` namespace
3. Browse all stored messages

**Export backup:**
- Use the **Export Report** button in admin dashboard
- Downloads all messages as formatted text file

### Troubleshooting

**If emails don't send:**
1. Check Resend dashboard for failed sends
2. Verify domain is verified in Resend
3. Check RESEND_API_KEY in Cloudflare environment variables
4. Check Cloudflare Functions logs for errors

**If messages don't appear in dashboard:**
1. Check browser console for API errors
2. Verify KV namespace is bound correctly
3. Check if localStorage has messages (fallback)
4. Verify `/api/messages` endpoint is working

**If form submissions fail:**
- Messages are still saved to localStorage
- Admin dashboard will show localStorage messages
- User sees warning but message is preserved

---

## Architecture Overview

```
Contact Form (lernaen-homepage/index.html)
    ↓
    ├─→ Immediate: Save to localStorage (backup)
    ↓
    POST /api/send-email
    ↓
    ├─→ Store in Cloudflare KV
    └─→ Send email via Resend API
         ↓
         Email delivered to rkitcey@lernaean.net
    
Admin Dashboard
    ↓
    GET /api/messages
    ↓
    Fetch from KV (with localStorage fallback)
    ↓
    Display in admin/contact-messages.html
    └─→ Show unread count badge on email icon
```

---

## Security Notes

- ✅ All API endpoints use CORS headers for security
- ✅ Email addresses are validated
- ✅ HTML content is escaped to prevent XSS
- ✅ API keys are stored securely in environment variables
- ✅ Messages stored in Cloudflare KV with metadata
- ✅ No sensitive data logged

---

## Costs

### Free Tiers

**Resend:**
- 3,000 emails/month
- 1 domain
- Email API access

**Cloudflare Pages:**
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month

**Cloudflare KV:**
- 100,000 reads/day
- 1,000 writes/day
- 1 GB storage

### Upgrade if Needed

If you exceed free tiers:
- **Resend**: $20/month for 50,000 emails
- **Cloudflare**: $5/month for increased KV limits

---

## File Structure

```
/functions/
  /api/
    send-email.js       # POST - Send email & store message
    messages.js         # GET - Retrieve all messages
    message-status.js   # POST - Update message status

/lernaen-homepage/
  index.html           # Contact form (fixed & enhanced)

/admin/
  index.html           # Admin dashboard with email badge
  contact-messages.html # Message management interface
```

---

## Next Steps

1. ✅ Deploy to Cloudflare Pages
2. ✅ Configure Resend domain and API key
3. ✅ Set up KV namespace and bindings
4. ✅ Test with a real submission
5. ✅ Monitor first messages
6. 🎯 Enjoy your robust contact form system!

---

## Support

If you encounter any issues:
1. Check Cloudflare Functions logs
2. Check Resend email logs
3. Check browser console for errors
4. Verify all environment variables are set
5. Test each endpoint individually

**All messages are preserved** - even if email delivery fails, messages are stored in KV and localStorage, ensuring nothing is lost.

---

*Last updated: February 2026*
