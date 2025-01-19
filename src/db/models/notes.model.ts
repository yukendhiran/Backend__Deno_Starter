import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// Define the notes table
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(), // Auto-incrementing note ID
  title: text("title").notNull(), // Note title
  content: text("content").notNull(), // Note content
  createdAt: timestamp("created_at").defaultNow().notNull(), // Timestamp of note creation
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Timestamp of note update
});

// Create Zod schemas for select and insert operations

export const selectNotesSchema = createSelectSchema(notes);

export const insertNotesSchema = createInsertSchema(notes, {
  title: (schema) => schema.min(1).max(255),
  content: (schema) => schema.min(1),
})
  .required({
    title: true, // Make title required
    content: true, // Make content required
    // Make updatedAt required
  })
  .omit({
    id: true, // Omit id as it's auto-generated
    createdAt: true,
    updatedAt: true,
  });
export const patchNotesSchema = insertNotesSchema.partial(); // Allow partial updates for notes
