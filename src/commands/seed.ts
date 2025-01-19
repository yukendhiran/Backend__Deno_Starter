import { faker } from "@faker-js/faker";
import { client, db } from "@/db/db.ts";
import { notes } from "@/db/models/notes.model.ts"; // Notes schema
import { command } from "@drizzle-team/brocli";
import { logger } from "@/lib/logger.ts";

// Function to seed notes

export default command({
  name: "seed",
  desc: "Seed test database with sample data",
  handler: async () => {
    try {
      const numberOfNotes = 5; // Number of fake notes to create

      // Generate fake notes
      const fakeNotes = Array.from({ length: numberOfNotes }).map(() => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
      }));

      // Insert fake notes into the database
      const insertedNotes = await db.insert(notes).values(fakeNotes);

      logger.info(`${insertedNotes.length} fake notes added to the database.`);
    } catch (error) {
      logger.error("❌ Error during seeding:", error);
      throw error;
    } finally {
      await client.end();
    }
  },
});
