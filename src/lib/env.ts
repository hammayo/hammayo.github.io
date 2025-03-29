import { z } from "zod";

// Environment variable schema with validation
const envSchema = z.object({
  // Next.js environment
  NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
  NEXT_PUBLIC_BASE_PATH: z.string().optional(),
  
  // GitHub
  GITHUB_USERNAME: z.string().optional(),
  GITHUB_REPOSITORY: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_ACTIONS: z.string().optional(),

  // Analytics
  GA_MEASUREMENT_ID: z.string().optional(),
}).passthrough();

// Parse and validate environment variables
function parseEnv() {
  const parsed = envSchema.safeParse({
    ...process.env,
    // Next.js
    NODE_ENV: process.env.NODE_ENV || 'development',
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    
    // GitHub
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,    
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    
    // Analytics
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID
  });
  
  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    
    // Return default values instead of throwing
    return {
      // Next.js
      NODE_ENV: 'development',
      NEXT_PUBLIC_BASE_PATH: '',
      
      // GitHub
      GITHUB_USERNAME: undefined,
      GITHUB_REPOSITORY: undefined,
      GITHUB_TOKEN: undefined,
      GITHUB_ACTIONS: undefined,
      
      // Analytics
      GA_MEASUREMENT_ID: undefined
    };
  }
  
  return parsed.data;
}

// Type-safe environment variables
export const env = parseEnv();

// Repository and path configurations based on environment
export const repo = env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
export const isGithubActions = Boolean(env.GITHUB_ACTIONS);
export const basePath = isGithubActions ? `/${repo}` : env.NEXT_PUBLIC_BASE_PATH || '';
export const assetPrefix = isGithubActions ? `/${repo}/` : ''; 

// Export type for type safety across the application
export type Env = ReturnType<typeof parseEnv>;
