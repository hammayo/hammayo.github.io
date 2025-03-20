import { env } from "./env";

// Log levels
type LogLevel = "debug" | "info" | "warn" | "error";

// Color codes for terminal output
const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// Formatter for log messages
const formatMessage = (level: LogLevel, message: string): string => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
};

// Logger utility for consistent logging
export const logger = {
   // Debug level logging (only in development)
  debug: (message: string, ...args: any[]): void => {
    if (env.NODE_ENV !== "production") {
      console.debug(
        `${COLORS.dim}${formatMessage("debug", message)}${COLORS.reset}`,
        ...args
      );
    }
  },

  // Info level logging
  info: (message: string, ...args: any[]): void => {
    console.info(
      `${COLORS.blue}${formatMessage("info", message)}${COLORS.reset}`,
      ...args
    );
  },

  // Warning level logging
  warn: (message: string, ...args: any[]): void => {
    console.warn(
      `${COLORS.yellow}${formatMessage("warn", message)}${COLORS.reset}`,
      ...args
    );
  },

  // Error level logging
  error: (message: string, error?: Error, ...args: any[]): void => {
    console.error(
      `${COLORS.red}${formatMessage("error", message)}${COLORS.reset}`,
      error ? `\n${error.stack || error.message}` : "",
      ...args
    );
  },
};
