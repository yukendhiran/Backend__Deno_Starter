import { createRoute, z } from "@hono/zod-openapi";
import {
  selectNotesSchema,
  insertNotesSchema,
  patchNotesSchema,
} from "@/db/models/notes.model.ts";
import jsonContent from "stoker/openapi/helpers/json-content";
import * as HttpStatusCodes from "stoker/http-status-codes";
import jsonContentRequired from "stoker/openapi/helpers/json-content-required";
import createErrorSchema from "stoker/openapi/schemas/create-error-schema";
import IdParamsSchema from "stoker/openapi/schemas/id-params";
import { notFoundSchema } from "@/lib/constants.ts";

const tags = ["Notes"];

export const list = createRoute({
  path: "/notes",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectNotesSchema),
      "The list of notes"
    ),
  },
});

export const getOne = createRoute({
  path: "/notes/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectNotesSchema, "The requested Note"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Note not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
});

export const create = createRoute({
  path: "/notes",
  method: "post",
  request: {
    body: jsonContentRequired(insertNotesSchema, "The Note to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectNotesSchema, "The created Note"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertNotesSchema),
      "The validation error(s)"
    ),
  },
});

export const patch = createRoute({
  path: "/notes/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchNotesSchema, "The Note updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectNotesSchema, "The updated Note"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Note not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchNotesSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)"
    ),
  },
});

export const remove = createRoute({
  path: "/notes/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Note deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Note not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
