import { db } from "@/db/db";
import { comments, users } from "@/db/schema";

import {
  mainHandler,
  HTTP_METHOD_CB,
  successHandlerCallback,
} from "@/lib/api-utils";
import { and, desc, eq, or } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return mainHandler(req, res, {
    GET,
  });
}

export const GET: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let { id_or_slug: id, page = 1 } = req.query;
    const limit = 10;
    let offset = limit * (+page - 1);
    const ID = parseInt(id as string);

    const response = await db.query.comments.findMany({
      where: and(eq(comments.postId, ID), eq(comments.status, "APPROVED")),
      limit,
      columns: {
        status: false,
      },
      orderBy: desc(comments.createdAt),
      offset: offset,
      with: {
        author: {
          columns: {
            avatar: true,
            fullName: true,
            isVerified: true,
            id: true,
            username: true,
          },
        },
      },
    });
    return await successHandlerCallback(req, res, {
      message: "Comments retreived successfully",
      data: response,
    });
  } catch (error: any) {}
};
export const POST: HTTP_METHOD_CB = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let { id_or_slug: id } = req.query;
    const body = req.body;
    const ID = parseInt(id as string);

    const response = await db.insert(comments).values({ postId: ID, ...body });

    return await successHandlerCallback(req, res, {
      message: "Comment added successfully",
      data: response,
    });
  } catch (error: any) {}
};
