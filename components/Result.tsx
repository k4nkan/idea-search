type ApiResponse = {
  results: {
    title: string;
    url: string;
  }[];
};

type Props = {
  query: string;
  result: ApiResponse;
  onReset: () => void;
};

export default function Result({ query, result, onReset }: Props) {
  return (
    <div className="result">
      <h2>「{query}」の検索結果</h2>
      <ul>
        {result.results.map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={onReset}>もう一度検索する</button>
    </div>
  );
}
