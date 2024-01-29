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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  mainHandler(req, res, {
    GET,
    POST,
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

    const response = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"));

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

    const insert = await db.insert(posts).values({ ...rest, status });

    return await successHandlerCallback(req, res, {
      message: "Post created successfully",
    });
  } catch (error: any) {
    console.log(error);
    return await errorHandlerCallback(req, res, {
      message: "An error occured",
    });
  }
};
// export function PUT(req:NextApiRequest,res:NextApiResponse){

// }
// export function DELETE(req:NextApiRequest,res:NextApiResponse){

// }
