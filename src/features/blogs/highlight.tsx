import { Fragment } from 'react';

export const searchWords = (query: string) => query.toLowerCase().split(/\s+/).filter(Boolean);

const escape = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Wraps each occurrence of any query word in <mark>; renders plain text when there is no query. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const words = searchWords(query);
  if (words.length === 0) return <>{text}</>;
  const re = new RegExp(`(${words.map(escape).join('|')})`, 'gi');
  return (
    <>
      {text.split(re).map((part, i) => (
        <Fragment key={i}>{i % 2 === 1 ? <mark>{part}</mark> : part}</Fragment>
      ))}
    </>
  );
}
