// src/features/blogs/schema.ts
import { z } from 'zod';

export const PostSchema = z.object({
  title:       z.string(),
  date:        z.string().date(),
  summary:     z.string(),
  tags:        z.array(z.string()).default([]),
  published:   z.boolean().default(true),
  readingTime: z.number().optional(),
});

export type PostFrontmatter = z.infer<typeof PostSchema>;

export type PostMeta = PostFrontmatter & {
  slug:        string;
  readingTime: number; // always set after pipeline processing
};

export type Post = PostMeta & {
  content: React.ReactElement;
};
