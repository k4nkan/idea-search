import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keyword } = req.body;
  const r = await fetch(
    `https://api.datamuse.com/words?ml=${encodeURIComponent(keyword)}`
  );
  const data = await r.json();
  res.status(200).json(data);
}
