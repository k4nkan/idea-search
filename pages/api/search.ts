import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'クエリが不正です' });
  }

  try {
    const tavilyRes = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TAVILY_API_KEY || ''}`,
      },
      body: JSON.stringify({
        query,
        search_depth: 'advanced',
      }),
    });

    if (!tavilyRes.ok) {
      const errorText = await tavilyRes.text();
      throw new Error(`Tavily API Error: ${tavilyRes.status} - ${errorText}`);
    }

    const data = await tavilyRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('[API/search] エラー:', err);
    return res.status(500).json({ error: 'Tavily APIへの接続に失敗しました' });
  }
}
