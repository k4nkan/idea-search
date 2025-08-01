'use client';

import { useState, useEffect } from 'react';
import Search from './components/Search';
import Loading from './components/Loading';
import Result from './components/Result';

type Step = 'search' | 'loading' | 'result';

export default function Home() {
  const [step, setStep] = useState<Step>('search');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null); // ← 検索結果用

  // 検索の実行
  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setStep('loading');
  };

  // トップに戻る
  const handleReset = () => {
    setQuery('');
    setResult(null);
    setStep('search');
  };

  // ローディング中に API へリクエスト
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setResult(data);
        setStep('result');
      } catch (err) {
        console.error('検索失敗:', err);
        setResult({ error: '検索中にエラーが発生しました' });
        setStep('result');
      }
    };

    if (step === 'loading') {
      fetchResult();
    }
  }, [step, query]);

  return (
    <main>
      {step === 'search' && <Search onSubmit={handleSearch} />}
      {step === 'loading' && <Loading />}
      {step === 'result' && (
        <Result query={query} result={result} onReset={handleReset} />
      )}
    </main>
  );
}
