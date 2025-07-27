import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

type Props = {
  onSubmit: (query: string) => void;
};

export default function Search({ onSubmit }: Props) {
  const [query, setQuery] = useState('');

  return (
    <div className="search">
      <h1>そのアイデア、被ってない？</h1>
      <div className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="あなたのアイデアを入力"
        />
        <div className="send-icon" onClick={() => onSubmit(query)}>
          <IoIosSend />
        </div>
      </div>
    </div>
  );
}
