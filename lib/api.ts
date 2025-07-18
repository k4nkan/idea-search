import { generateQuery } from './query';

export const searchIdeas = async (keywords: string[]) => {
  const query = generateQuery(keywords);
  if (!query) {
    console.error('キーワードが入力されていません');
    return;
  }

  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error('検索に失敗しました');
  return await res.json();
};
