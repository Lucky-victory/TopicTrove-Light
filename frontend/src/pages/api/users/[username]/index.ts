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
import { count, eq, or } from "drizzle-orm";
dotenv.config();
import isEmpty from "just-is-empty";
import { IS_DEV } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return mainHandler(req, res, {
    GET,
    PUT,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    //sample user
    const userId = 1;
    let { username } = req.query;

    // console.log({ s: +idOrSlug, slugOrId });

    const user = await db.query.users.findFirst({
      where: eq(users.username, username as string),
      columns: {
        email: false,
      },
      with: {
        meta: true,

        interests: {
          columns: {
            userId: false,
            createdAt: false,
          },
        },
      },
    });
    const followersCount = await db
      .select({ value: count(follows.followerId) })
      .from(follows)
      .where(eq(follows.followerId, user?.id as number));
    const followingsCount = await db
      .select({ value: count(follows.followingId) })
      .from(follows)
      .where(eq(follows.followingId, user?.id as number));
    if (isEmpty(user)) {
      return await successHandlerCallback(
        req,
        res,
        {
          message: `user with '${username}' does not exist`,
          data: {
            ...user,
            followersCount,
            followingsCount,
          },
        },
        404,
      );
    }

    return await successHandlerCallback(req, res, {
      message: `user retrieved successfully`,
      data: {
        ...user,
      },
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occurred",
      error: IS_DEV ? { ...error } : null,
    });
  }
};
export const PUT: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { ...rest } = req.body;
    //sample user
    const userId = 1;

    const update = await db
      .update(users)
      .set({ ...rest })
      .where(eq(users.id, userId));

    return await successHandlerCallback(req, res, {
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
    });
  }
};
