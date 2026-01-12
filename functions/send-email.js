/**
 * Cloudflare Pages Function to send contact form emails
 * 
 * Setup Instructions:
 * 1. Sign up for Resend API at https://resend.com (free tier: 3,000 emails/month)
 * 2. Get your API key from Resend dashboard
 * 3. In Cloudflare Pages dashboard, go to Settings > Environment variables
 * 4. Add: RESEND_API_KEY = your_api_key_here
 * 5. Deploy this function (Cloudflare auto-deploys from /functions folder)
 * 
 * Endpoint: POST /api/send-email
 */

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // Parse the incoming request
        const data = await request.json();
        const { name, email, message } = data;

        // Validate required fields
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Get Resend API key from environment variables
        const RESEND_API_KEY = env.RESEND_API_KEY;
        
        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            return new Response(
                JSON.stringify({ error: 'Email service not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Prepare email content
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
        .info-row { margin: 10px 0; }
        .label { font-weight: 600; color: #666; }
        .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📨 New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">NiCE Framework Website</p>
        </div>
        <div class="content">
            <div class="info-row">
                <span class="label">From:</span> ${escapeHtml(name)}
            </div>
            <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </div>
            <div class="info-row">
                <span class="label">Date:</span> ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
            
            <div class="message-box">
                <div class="label" style="margin-bottom: 10px;">Message:</div>
                <div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>
            
            <p style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-radius: 6px; border-left: 3px solid #0284c7;">
                <strong>💡 Quick Reply:</strong><br>
                <a href="mailto:${escapeHtml(email)}?subject=Re: Contact from NiCE Framework" 
                   style="color: #0284c7; text-decoration: none;">Click here to reply directly</a>
            </p>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                View and manage all messages in your 
                <a href="https://humanparadigm.org/admin/contact-messages.html" style="color: #3b82f6;">admin dashboard</a>
            </p>
        </div>
        <div class="footer">
            <p>This email was sent from the NiCE Framework contact form</p>
            <p>Automated notification - Do not reply to this email directly</p>
        </div>
    </div>
</body>
</html>
        `.trim();

        // Plain text version
        const emailText = `
New Contact Form Submission - NiCE Framework

From: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}

---
Reply to: ${email}
View all messages: https://humanparadigm.org/admin/contact-messages.html
        `.trim();

        // Send email via Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'NiCE Framework <noreply@humanparadigm.org>',
                to: ['rkitcey@humanparadigm.org'],
                reply_to: email,
                subject: `📨 New Contact: ${name}`,
                html: emailHtml,
                text: emailText
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
                message: 'Email sent successfully',
                emailId: result.id 
            }),
            { 
                status: 200, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // Allow CORS
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
