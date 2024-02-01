import { db } from "@/db/db";
import { follows, posts, users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { and, desc, eq, gt, or, sql } from "drizzle-orm";
dotenv.config();
import isEmpty from "just-is-empty";
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
    /*
     * filter - the type of filter, e.g trend for trending posts, category for categories
    filterCount -  the limit of posts to retrieve for that filter
    count - the limit of posts to retrieve for non-filter
     */
    let { filter, filterCount = 4, count = 6, page = 1 } = req.query;
    const limit = +count;
    let offset = limit * (+page - 1);
    let response;
    if (!isEmpty(filter) && filter == "trend") {
      response = await db.query.posts.findMany({
        columns: {
          userId: false,
        },
        offset,
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
        where: eq(posts.status, "PUBLISHED"),
        orderBy: desc(posts.views),
        limit: +filterCount,
      });
      return await successHandlerCallback(req, res, {
        message: `Trending posts retrieved successfully`,
        data: response,
      });
    }

    response = await db.query.posts.findMany({
      columns: {
        userId: false,
      },
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
      where: eq(posts.status, "PUBLISHED"),
      orderBy: desc(posts.createdAt),
      limit,
    });
    return await successHandlerCallback(req, res, {
      message: `Posts retrieved successfully`,
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
      await db.insert(posts).values({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: "Draft saved successfully",
      });
    }

    await db.insert(posts).values({ ...rest, status });

    return await successHandlerCallback(req, res, {
      message: "Post created successfully",
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
      error: IS_DEV ? { ...error } : null,
    });
  }
};
