import { Fragment } from 'react';

export const searchWords = (query: string) => query.toLowerCase().split(/\s+/).filter(Boolean);

const escape = (w: string) => w.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

/** Wraps each occurrence of any query word in <mark>; renders plain text when there is no query. */
export function Highlight({ text, query }: Readonly<{ text: string; query: string }>) {
  const words = searchWords(query);
  if (words.length === 0) return <>{text}</>;
  const re = new RegExp(`(${words.map(escape).join('|')})`, 'gi');
  let offset = 0;
  return (
    <>
      {text.split(re).map((part, i) => {
        const key = `${offset}:${i % 2}`; // text offset plus match flag: stable, unique per part
        offset += part.length;
        return <Fragment key={key}>{i % 2 === 1 ? <mark>{part}</mark> : part}</Fragment>;
      })}
    </>
  );
}
