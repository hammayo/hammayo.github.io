import { z } from "zod";

// Environment variable schema with validation
const envSchema = z.object({
  // Next.js specific
  NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
  
  // GitHub specific
  GITHUB_ACTIONS: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  
  // Analytics
  GA_MEASUREMENT_ID: z.string().optional(),
  
  // App specific - add your env variables here
  // EXAMPLE_API_KEY: z.string().min(1),
}).passthrough();

/*
 * Parse and validate environment variables
 */
function parseEnv() {
  const parsed = envSchema.safeParse({
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development'
  });
  
  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    
    // Return default values instead of throwing
    return {
      NODE_ENV: 'development',
      GITHUB_ACTIONS: undefined,
      GITHUB_REPOSITORY: undefined,
      GA_MEASUREMENT_ID: undefined
    };
  }
  
  return parsed.data;
}

// Type-safe environment variables
export const env = parseEnv();

// Repository and path configurations based on environment
export const isGithubActions = Boolean(env.GITHUB_ACTIONS);
export const repo = env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
export const basePath = isGithubActions ? `/${repo}` : '';
export const assetPrefix = isGithubActions ? `/${repo}/` : ''; 
