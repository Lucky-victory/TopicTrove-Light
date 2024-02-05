import { db } from "@/db/db";
import { posts } from "@/db/schema";
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

const MAX_LOCKED_CONTENT_LENGTH = 200;
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
    let { id_or_slug: idOrSlug } = req.query;
    idOrSlug = idOrSlug as string;
    let slugOrId: number | string = "";
    if (!Number.isNaN(+idOrSlug)) {
      slugOrId = +idOrSlug;
    } else {
      slugOrId = idOrSlug;
    }
    // console.log({ s: +idOrSlug, slugOrId });

    const post = await db.query.posts.findFirst({
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

    if (isEmpty(post)) {
      return await successHandlerCallback(
        req,
        res,
        {
          message: `Post with '${idOrSlug}' does not exist`,
          data: {
            ...post,
          },
        },
        404,
      );
    }
    // update the views whenever a post is requested
    await db.update(posts).set({ views: (post?.views as number) + 1 });

    //if the posts is locked, return only a some of the post content.
    if (post?.isLocked) {
      post.content = post.content.substring(0, MAX_LOCKED_CONTENT_LENGTH);
    }

    return await successHandlerCallback(req, res, {
      message: `Post retrieved successfully`,
      data: {
        ...post,
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
    const { status, ...rest } = req.body;

    if (status === "DRAFT") {
      await db.update(posts).set({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: "Draft saved successfully",
      });
    }

    const update = await db.update(posts).set({ ...rest, status });

    return await successHandlerCallback(req, res, {
      message: "Post updated successfully",
    });
  } catch (error: any) {
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
    });
  }
};
// export function PUT(req:NextApiRequest,res:NextApiResponse){

// }
// export function DELETE(req:NextApiRequest,res:NextApiResponse){

// }
