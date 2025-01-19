import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types.ts";

import { db } from "@/db/db.ts";
import { notes } from "@/db/models/notes.model.ts";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants.ts";

import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./notes.routes.ts";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const notes = await db.query.notes.findMany();
  return c.json(notes);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const note = c.req.valid("json");
  const [inserted] = await db.insert(notes).values(note).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const note = await db.query.notes.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!note) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(note, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    );
  }

  const [note] = await db
    .update(notes)
    .set(updates)
    .where(eq(notes.id, id))
    .returning();

  if (!note) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(note, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(notes).where(eq(notes.id, id));

  if (result.length === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
