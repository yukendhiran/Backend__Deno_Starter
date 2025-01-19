// middleware/loggerMiddleware.ts
import HonoContext from "hono/context";
import { logger } from "../lib/logger.ts"; // Import the logger

// Logger middleware function
export const loggerMiddleware = async (
  c: HonoContext,
  next: () => Promise<void>
) => {
  logger.info(`Incoming request: ${c.req.method} ${c.req.url}`);
  await next();
};
