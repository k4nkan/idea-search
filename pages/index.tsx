import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ keyword1: '', keyword2: '' });
  const [result, setResult] = useState(null);
  const [similarWords, setSimilarWords] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // キーワードから検索
  const handleSearch = async () => {
    const query = [form.keyword1, form.keyword2].filter(Boolean).join(' ');
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    setResult(await res.json());
  };

  // 類語検索
  const handleSimilarWords = async () => {
    const res = await fetch('/api/keyword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: form.keyword1.trim() }),
    });
    setSimilarWords(await res.json());
  };

  return (
    <section className="main">
      <div className="search-box">
        <input
          type="text"
          name="keyword1"
          value={form.keyword1}
          onChange={handleChange}
          placeholder="キーワード1"
        />
        <p>x</p>
        <input
          type="text"
          name="keyword2"
          value={form.keyword2}
          onChange={handleChange}
          placeholder="キーワード2"
        />
      </div>

      <button onClick={handleSearch}>検索</button>

      <div className="result">
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>

      <button onClick={handleSimilarWords}>similar words</button>

      <div className="result">
        {similarWords.length > 0 && (
          <ul>
            {similarWords.map((item: any, i: number) => (
              <li key={i}>{item.word}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
