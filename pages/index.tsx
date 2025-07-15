import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: keyword }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="検索ワード"
      />
      <button onClick={handleSearch}>検索</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
