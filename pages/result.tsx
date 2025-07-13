import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (router.query.data) {
      const decoded = JSON.parse(
        decodeURIComponent(router.query.data as string)
      );
      setResult(decoded);
    }
  }, [router.query.data]);

  if (!result) return <p>読み込み中...</p>;

  return (
    <>
      <ul>
        {result.results?.map((r: any, i: number) => (
          <li key={i}>
            <a href={r.url} target="_blank" rel="noreferrer">
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
