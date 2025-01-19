import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { apiReference } from "@scalar/hono-api-reference";
import type { AppOpenAPI } from "./types.ts";

// Load environment variables
const env = config();
const version = env.API_VERSION || "1.0.0"; // Default version if not specified in .env

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: version, // Use the version from the .env file
      title: "Backend Starter API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "bluePlanet",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    })
  );
}
