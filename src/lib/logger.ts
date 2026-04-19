import { env } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const COLORS = {
  reset:  '\x1b[0m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
};

const formatMessage = (level: LogLevel, message: string): string => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
};

export const logger = {
  // Debug level logging (only in development)
  debug: (message: string, ...args: unknown[]): void => {
    if (env.NODE_ENV !== 'production') {
      console.debug(
        `${COLORS.dim}${formatMessage('debug', message)}${COLORS.reset}`,
        ...args
      );
    }
  },

  info: (message: string, ...args: unknown[]): void => {
    console.info(
      `${COLORS.blue}${formatMessage('info', message)}${COLORS.reset}`,
      ...args
    );
  },

  warn: (message: string, ...args: unknown[]): void => {
    console.warn(
      `${COLORS.yellow}${formatMessage('warn', message)}${COLORS.reset}`,
      ...args
    );
  },

  error: (message: string, error?: Error, ...args: unknown[]): void => {
    console.error(
      `${COLORS.red}${formatMessage('error', message)}${COLORS.reset}`,
      error ? `\n${error.stack ?? error.message}` : '',
      ...args
    );
  },
};
