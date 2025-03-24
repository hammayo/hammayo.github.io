import { basePath } from './env';

export default function imageLoader({ src }: { src: string }) {
  return `${basePath}${src}`;
}