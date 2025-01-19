// dbml.ts
import { schema } from "@/db/schema.ts"; // Adjust this import based on your project structure
import { pgGenerate } from "drizzle-dbml-generator"; // Assuming you are using PostgreSQL
import { logger } from "@/lib/logger.ts";

const out = "./schema.dbml"; // Output path for DBML file
const relational = true; // Set to true for relational schema generation

// Generate DBML schema
try {
  await pgGenerate({ schema, out, relational });
  logger.info(`DBML schema generated at ${out}`);
} catch (err) {
  logger.error("Failed to generate DBML schema:", err);
}
