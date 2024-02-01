import { db } from "@/db/db";
import { prompts } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { IS_DEV } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return mainHandler(req, res, {
    GET,
    POST,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  let { count = 10, page = 1 } = req.query;
  const limit = +count;
  let offset = limit * (+page - 1);
  try {
    const response = await db.query.prompts.findMany({
      columns: {
        userId: false,
      },
      offset,
      limit,
      with: {
        author: {
          columns: {
            avatar: true,
            fullName: true,
            firstName: true,
            isVerified: true,
            id: true,
            username: true,
          },
        },
      },
      where: eq(prompts.status, "PUBLISHED"),
      orderBy: desc(prompts.createdAt),
    });
    return await successHandlerCallback(req, res, {
      message: `Prompts retrieved successfully`,
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
    const { status, ...rest } = req.body;

    if (status === "DRAFT") {
      await db.insert(prompts).values({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: "Draft saved successfully",
      });
    }

    await db.insert(prompts).values({ ...rest, status });

    return await successHandlerCallback(req, res, {
      message: "Prompt created successfully",
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
      error: IS_DEV ? { ...error } : null,
    });
  }
};
