import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: keyword }),
    });
    const data = await res.json();

    const encoded = encodeURIComponent(JSON.stringify(data.result));
    router.push(`/result?data=${encoded}`);
  };

  return (
    <>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワードを入力"
      />
      <button onClick={handleSearch}>検索</button>
    </>
  );
}
