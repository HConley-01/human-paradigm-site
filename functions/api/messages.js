/**
 * Cloudflare Pages Function to retrieve all contact messages
 * 
 * Endpoint: GET /api/messages
 */

export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        if (!env.CONTACT_MESSAGES) {
            return new Response(
                JSON.stringify({ success: false, error: 'KV storage not configured' }),
                { 
                    status: 500, 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    } 
                }
            );
        }

        // List all messages from KV
        const list = await env.CONTACT_MESSAGES.list();
        const messages = [];

        // Fetch each message
        for (const key of list.keys) {
            const messageData = await env.CONTACT_MESSAGES.get(key.name);
            if (messageData) {
                try {
                    messages.push(JSON.parse(messageData));
                } catch (e) {
                    console.error('Error parsing message:', key.name, e);
                }
            }
        }

        // Sort by timestamp (newest first)
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return new Response(
            JSON.stringify({ 
                success: true, 
                messages,
                count: messages.length
            }),
            { 
                status: 200, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                } 
            }
        );

    } catch (error) {
        console.error('Error in messages function:', error);
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Failed to retrieve messages',
                details: error.message 
            }),
            { 
                status: 500, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
}

// Handle OPTIONS requests for CORS
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
