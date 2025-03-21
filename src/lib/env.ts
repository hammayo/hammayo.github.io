import { z } from "zod";

// Environment variable schema with validation
const envSchema = z.object({
  // Next.js environment
  NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
  
  // GitHub
  GITHUB_ACTIONS: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  GITHUB_USERNAME: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  
  // Google Analytics
  GA_MEASUREMENT_ID: z.string().optional(), 
}).passthrough();

// Parse and validate environment variables
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
      GITHUB_USERNAME: undefined,
      GITHUB_TOKEN: undefined,
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
