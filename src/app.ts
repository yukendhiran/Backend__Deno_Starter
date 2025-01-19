import configureOpenAPI from "@/lib/configure-open-api.ts";
import createApp from "@/lib/create-app.ts";
import index from "@/routes/index.route.ts";
import notes from "@/routes/notes/notes.index.ts";
import { loggerMiddleware } from "@/middleware/logger-middleware.ts";
import { logger } from "@/lib/logger.ts";
const app = createApp();

configureOpenAPI(app);

const routes = [index, notes] as const;
app.use("*", loggerMiddleware);

routes.forEach((route) => {
  logger.info("Handled GET request on /");
  app.route("/", route);
});

// export type AppType = (typeof routes)[number];

export default app;
