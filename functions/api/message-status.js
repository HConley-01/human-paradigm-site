/**
 * Cloudflare Pages Function to update message status
 * 
 * Endpoint: POST /api/message-status
 * Body: { messageId: string, status: 'new' | 'read' | 'replied' | 'archived' }
 */

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
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

        // Parse request body
        const data = await request.json();
        const { messageId, status } = data;

        // Validate
        if (!messageId || !status) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing messageId or status' }),
                { 
                    status: 400, 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    } 
                }
            );
        }

        // Valid statuses
        const validStatuses = ['new', 'read', 'replied', 'archived'];
        if (!validStatuses.includes(status)) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
                }),
                { 
                    status: 400, 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    } 
                }
            );
        }

        // Get existing message
        const messageData = await env.CONTACT_MESSAGES.get(messageId);
        
        if (!messageData) {
            return new Response(
                JSON.stringify({ success: false, error: 'Message not found' }),
                { 
                    status: 404, 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    } 
                }
            );
        }

        // Parse and update message
        const message = JSON.parse(messageData);
        message.status = status;
        message.lastUpdated = new Date().toISOString();

        // Save updated message
        await env.CONTACT_MESSAGES.put(messageId, JSON.stringify(message), {
            metadata: { 
                timestamp: message.timestamp, 
                status: status,
                email: message.email
            }
        });

        return new Response(
            JSON.stringify({ 
                success: true, 
                message: 'Status updated successfully',
                messageId,
                newStatus: status
            }),
            { 
                status: 200, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );

    } catch (error) {
        console.error('Error updating message status:', error);
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Failed to update status',
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
