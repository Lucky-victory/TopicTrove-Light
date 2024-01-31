import { db } from "@/db/db";
import { users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import { desc } from "drizzle-orm";

import { IS_DEV } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return mainHandler(req, res, {
    GET,
    POST,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let { count = 25, page = 1 } = req.query;
    const limit = +count;
    let offset = limit * (+page - 1);

    const response = await db.query.users.findMany({
      orderBy: desc(users.fullName),
      limit,
      offset,
    });
    return await successHandlerCallback(req, res, {
      message: `Users retrieved successfully`,
      data: response,
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occurred",
      error: IS_DEV ? { ...error } : null,
    });
  }
};
export const POST: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { ...rest } = req.body;

    await db.insert(users).values({ ...rest });

    return await successHandlerCallback(req, res, {
      message: "Account created successfully",
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
      error: IS_DEV ? { ...error } : null,
    });
  }
};
