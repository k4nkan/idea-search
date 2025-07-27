import { useState } from 'react';
import { generateQuery } from '../lib/query';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const formattedQuery = generateQuery(query);

    try {
      setLoading(true);
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: formattedQuery }),
      });

      if (!res.ok) throw new Error('検索に失敗しました');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: '検索中にエラーが発生しました' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>アイデア検索</h1>

      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: AIを使った新しいツール"
        />
      </div>

      <button onClick={handleSearch} disabled={loading || !query.trim()}>
        {loading ? '検索中...' : '検索'}
      </button>

      {result && (
        <div>
          <h2>検索結果</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
