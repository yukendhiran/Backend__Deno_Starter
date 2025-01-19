// lib/logger.ts
import * as log from "@std/log";

// Custom JSON formatter
const customJsonLogFormat = (logRecord: log.LogRecord): string => {
  const logObject = {
    timestamp: new Date().toISOString(),
    level: logRecord.levelName,
    message: logRecord.msg,
  };
  return JSON.stringify(logObject, null, 2); // pretty print JSON
};

// Set up the logger
await log.setup({
  handlers: {
    console: new log.ConsoleHandler("INFO", {
      formatter: customJsonLogFormat,
    }),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

const logger = log.getLogger();

export { logger };
