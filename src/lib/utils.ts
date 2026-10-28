import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Google truncates snippets at roughly this many characters. */
export const META_DESCRIPTION_MAX = 155;

/** Whole sentences up to `max` chars; a lone over-long first sentence is cut at a word with an ellipsis. */
export function metaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  let out = '';
  for (const sentence of text.split(/(?<=[.?!])\s+/)) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${space > 0 ? cut.slice(0, space).trimEnd() : cut}…`;
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return 'today';
  }
}
