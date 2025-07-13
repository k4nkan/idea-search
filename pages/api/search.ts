import type { NextApiRequest, NextApiResponse } from 'next';
import { TavilyClient } from 'tavily';

const client = new TavilyClient({
  apiKey: process.env.TAVILY_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const result = await client.search({
      query,
      include_answer: true,
      max_results: 5,
    });
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
