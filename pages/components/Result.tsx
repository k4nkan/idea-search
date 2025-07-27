type Props = {
  query: string;
  result: any;
  onReset: () => void;
};

export default function Result({ query, result, onReset }: Props) {
  return (
    <div className="result">
      <h2>「{query}」の検索結果</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <button onClick={onReset}>もう一度検索する</button>
    </div>
  );
}
