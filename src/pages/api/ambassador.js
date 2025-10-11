// simple mock API to test ambassador flow / feed
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return mock feed items
    return res.status(200).json({
      feed: [
        { id: 'f1', title: 'Ambassador: Summer Picks', author: 'user123', createdAt: new Date().toISOString() },
        { id: 'f2', title: 'New: Streetwear drop', author: 'user456', createdAt: new Date().toISOString() }
      ]
    });
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    // In production you would validate and persist
    return res.status(201).json({ ok: true, item: { id: Math.random().toString(36).slice(2,8), ...body, createdAt: new Date().toISOString() } });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
