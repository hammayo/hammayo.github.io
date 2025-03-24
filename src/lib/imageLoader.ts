import { basePath } from './env';

export default function imageLoader({ src }: { src: string }) {
  // If src already starts with basePath, don't add it again
  if (src.startsWith(basePath)) {
    return src;
  }
  // Remove leading slash if both basePath and src have it
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${normalizedBasePath}/${normalizedSrc}`;
}
