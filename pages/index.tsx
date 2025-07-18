import { useState } from 'react';
import { IoAddCircle, IoCloseCircle, IoSend } from 'react-icons/io5';
import { searchIdeas } from '../lib/api';

export default function Home() {
  const [keywords, setKeywords] = useState(['']);
  const [result, setResult] = useState(null);

  const handleChange = (i: number, value: string) => {
    const newKw = [...keywords];
    newKw[i] = value;
    setKeywords(newKw);
  };

  const handleAdd = () => setKeywords([...keywords, '']);
  const handleRemove = (i: number) => {
    const newKw = [...keywords];
    newKw.splice(i, 1);
    setKeywords(newKw);
  };

  const onSearch = async () => {
    try {
      const res = await searchIdeas(keywords);
      setResult(res);
    } catch (err) {
      console.error(err);
    }
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
            <IoSend onClick={onSearch} />
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
