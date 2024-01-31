import { db } from "@/db/db";
import { posts, users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { eq, or } from "drizzle-orm";
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
    let { id_or_slug: idOrSlug } = req.query;
    idOrSlug = idOrSlug as string;
    let slugOrId: number | string = "";
    if (!Number.isNaN(+idOrSlug)) {
      slugOrId = +idOrSlug;
    } else {
      slugOrId = idOrSlug;
    }
    // console.log({ s: +idOrSlug, slugOrId });

    const user = await db.query.posts.findFirst({
      where: or(
        eq(posts.slug, slugOrId as string),
        eq(posts.id, slugOrId as number),
      ),
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
    });

    if (isEmpty(user)) {
      return await successHandlerCallback(
        req,
        res,
        {
          message: `Post with '${idOrSlug}' does not exist`,
          data: {
            ...user,
          },
        },
        404,
      );
    }
    // update the views whenever a post is requested
    await db.update(posts).set({ views: (user?.views as number) + 1 });

    return await successHandlerCallback(req, res, {
      message: `Post retrieved successfully`,
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
