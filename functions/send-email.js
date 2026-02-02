/**
 * Cloudflare Pages Function to send contact form emails
 * 
 * Setup Instructions:
 * 1. Sign up for Resend API at https://resend.com (free tier: 3,000 emails/month)
 * 2. Get your API key from Resend dashboard
 * 3. In Cloudflare Pages dashboard, go to Settings > Environment variables
 * 4. Add: RESEND_API_KEY = your_api_key_here
 * 5. Bind KV namespace: CONTACT_MESSAGES (in Settings > Functions > KV Namespace Bindings)
 * 6. Deploy this function (Cloudflare auto-deploys from /functions folder)
 * 
 * Endpoint: POST /api/send-email
 */

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // Parse the incoming request
        const data = await request.json();
        const { name, email, affiliation, subject, message } = data;

        // Validate required fields
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create message record
        const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const timestamp = new Date().toISOString();
        
        const messageRecord = {
            id: messageId,
            name,
            email,
            affiliation: affiliation || 'Not specified',
            subject: subject || 'No subject',
            message,
            timestamp,
            status: 'new',
            source: 'contact-form'
        };

        // Store message in Cloudflare KV
        if (env.CONTACT_MESSAGES) {
            try {
                await env.CONTACT_MESSAGES.put(messageId, JSON.stringify(messageRecord), {
                    metadata: { timestamp, status: 'new', email }
                });
                console.log('Message stored in KV:', messageId);
            } catch (kvError) {
                console.error('KV storage error:', kvError);
                // Continue to send email even if KV fails
            }
        }

        // Get Resend API key from environment variables
        const RESEND_API_KEY = env.RESEND_API_KEY;
        
        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            return new Response(
                JSON.stringify({ 
                    success: true,
                    messageId,
                    warning: 'Message stored but email service not configured' 
                }),
                { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Prepare elegant email content
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0 0 8px 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 0; opacity: 0.9; font-size: 14px; }
        .content { background: #f8f9fa; padding: 35px 30px; }
        .info-grid { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .info-row { padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: 700; color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
        .value { color: #222; font-size: 15px; }
        .message-box { background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .message-label { font-weight: 700; color: #3b82f6; font-size: 14px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .message-text { white-space: pre-wrap; color: #333; font-size: 15px; line-height: 1.7; }
        .cta-box { margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%); border-radius: 8px; border-left: 4px solid #0284c7; }
        .cta-box strong { color: #0284c7; display: block; margin-bottom: 8px; font-size: 15px; }
        .cta-link { display: inline-block; background: #0284c7; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 8px; }
        .cta-link:hover { background: #0369a1; }
        .footer { text-align: center; padding: 25px 30px; background: #f8f9fa; border-radius: 0 0 12px 12px; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 5px 0; color: #999; font-size: 12px; }
        .dashboard-link { display: inline-block; margin-top: 15px; padding: 10px 20px; background: white; border: 2px solid #3b82f6; color: #3b82f6; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px; }
        .dashboard-link:hover { background: #3b82f6; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📨 New Contact Message</h1>
            <p>Someone reached out via your Lernaean Research website</p>
        </div>
        <div class="content">
            <div class="info-grid">
                <div class="info-row">
                    <span class="label">From</span>
                    <div class="value">${escapeHtml(name)}</div>
                </div>
                <div class="info-row">
                    <span class="label">Email</span>
                    <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #3b82f6; text-decoration: none;">${escapeHtml(email)}</a></div>
                </div>
                ${affiliation && affiliation !== 'Not specified' ? `
                <div class="info-row">
                    <span class="label">Affiliation</span>
                    <div class="value">${escapeHtml(affiliation)}</div>
                </div>` : ''}
                ${subject && subject !== 'No subject' ? `
                <div class="info-row">
                    <span class="label">Subject</span>
                    <div class="value">${escapeHtml(subject)}</div>
                </div>` : ''}
                <div class="info-row">
                    <span class="label">Received</span>
                    <div class="value">${new Date().toLocaleString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })}</div>
                </div>
            </div>
            
            <div class="message-box">
                <div class="message-label">Message</div>
                <div class="message-text">${escapeHtml(message)}</div>
            </div>
            
            <div class="cta-box">
                <strong>Quick Actions:</strong>
                <a href="mailto:${escapeHtml(email)}" style="color: #0284c7; text-decoration: none; display: block; margin: 8px 0;">Reply directly to ${escapeHtml(email)}</a>
                <a href="https://humanparadigm.org/admin/contact-messages.html" style="color: #0284c7; text-decoration: none; display: block;">View in admin dashboard</a>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <a href="https://humanparadigm.org/admin/contact-messages.html" class="dashboard-link">
                    📊 View All Messages in Dashboard
                </a>
            </div>
        </div>
        <div class="footer">
            <p><strong>Message ID:</strong> ${messageId}</p>
            <p>This is an automated notification from your contact form</p>
            <p>© ${new Date().getFullYear()} Lernaean Research • humanparadigm.org</p>
        </div>
    </div>
</body>
</html>
        `.trim();

        const emailSubject = subject && subject !== 'No subject' 
            ? `📨 ${subject}` 
            : `📨 New Contact from ${name}`;
            
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Lernaean Research <noreply@humanparadigm.org>',
                to: ['rkitcey@lernaean.net'],
                reply_to: email,
                subject: emailSubject,
                html: emailHtml
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.error('Resend API error:', result);
            return new Response(
                JSON.stringify({ error: 'Failed to send email', details: result }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({ 
                success: true, 
                message: 'Message received and email sent successfully',
                messageId,
                emailId: result.id 
            }),
            { 
                status: 200, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                } 
            }
        );

    } catch (error) {
        console.error('Error in send-email function:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Handle OPTIONS requests for CORS
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
