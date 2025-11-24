import type { VercelRequest, VercelResponse } from '@vercel/node';
import ninjasData from '../ninjas-database.json' with { type: "json" };

export default function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        const { id } = req.query;

        if (id) {
            // Get single ninja by ID
            const ninja = ninjasData.ninjas.find((n) => n.id === id);
            if (ninja) {
                res.status(200).json(ninja);
            } else {
                res.status(404).json({ error: 'Ninja not found' });
            }
        } else {
            // Get all ninjas
            res.status(200).json(ninjasData.ninjas);
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
