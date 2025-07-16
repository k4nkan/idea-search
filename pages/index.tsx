import { useState } from 'react';
import { IoAddCircle, IoCloseCircle, IoSend } from 'react-icons/io5';

export default function Home() {
  const [keywords, setKeywords] = useState(['']);
  const [result, setResult] = useState(null);

  // 入力欄の変更処理
  const handleChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  // 入力欄の追加
  const handleAdd = () => {
    setKeywords([...keywords, '']);
  };

  // 入力欄の削除
  const handleRemove = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  // 検索
  const handleSearch = async () => {
    const query = keywords.filter(Boolean).join(' ');
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    setResult(await res.json());
  };

  return (
    <section className="main">
      <div className="search-box">
        <h3>アイデアを検索</h3>

        <div className="search-item">
          {keywords.map((kw, i) => (
            <div key={i} className="input-row">
              <input
                type="text"
                value={kw}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder={`キーワード${i + 1}`}
              />
              {keywords.length > 1 && (
                <div className="close-button">
                  <IoCloseCircle onClick={() => handleRemove(i)} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="form-footer">
          <div className="button-back" onClick={handleAdd}>
            <IoAddCircle />
          </div>

          <div className="button-back">
            <IoSend onClick={handleSearch} />
          </div>
        </div>
      </div>

      {result && (
        <div className="result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
