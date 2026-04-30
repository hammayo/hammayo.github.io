import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV:              z.enum(['development', 'production', 'test']).optional().default('development'),
  NEXT_PUBLIC_BASE_PATH: z.string().optional(),
  GITHUB_USERNAME:       z.string().optional(),
  GITHUB_REPOSITORY:     z.string().optional(),
  GITHUB_TOKEN:          z.string().optional(),
  GITHUB_ACTIONS:        z.string().optional(),
  GA_MEASUREMENT_ID:     z.string().optional().default('G-8NQ9R6QK1K'),
}).passthrough();

function parseEnv() {
  const parsed = envSchema.safeParse({
    NODE_ENV:              process.env.NODE_ENV ?? 'development',
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    GITHUB_USERNAME:       process.env.GITHUB_USERNAME,
    GITHUB_REPOSITORY:     process.env.GITHUB_REPOSITORY,
    GITHUB_TOKEN:          process.env.GITHUB_TOKEN,
    GITHUB_ACTIONS:        process.env.GITHUB_ACTIONS,
    GA_MEASUREMENT_ID:     process.env.GA_MEASUREMENT_ID ?? 'G-8NQ9R6QK1K',
  });

  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    return {
      NODE_ENV:              'development' as const,
      NEXT_PUBLIC_BASE_PATH: undefined as string | undefined,
      GITHUB_USERNAME:       undefined as string | undefined,
      GITHUB_REPOSITORY:     undefined as string | undefined,
      GITHUB_TOKEN:          undefined as string | undefined,
      GITHUB_ACTIONS:        undefined as string | undefined,
      GA_MEASUREMENT_ID:     undefined as string | undefined,
    };
  }

  return parsed.data;
}

export const env            = parseEnv();
export const repo           = env.GITHUB_REPOSITORY?.replace(/.*?\//, '') ?? '';
export const isGithubActions = Boolean(env.GITHUB_ACTIONS);
export const basePath       = isGithubActions ? `/${repo}` : (env.NEXT_PUBLIC_BASE_PATH ?? '');
export const assetPrefix    = isGithubActions ? `/${repo}/` : '';

export type Env = ReturnType<typeof parseEnv>;
