import { db } from "@/db/db";
import { posts, users } from "@/db/schema";
import {
  HTTP_METHOD_CB,
  errorHandlerCallback,
  getUserFromDB,
  mainHandler,
  successHandlerCallback,
} from "@/lib/api-utils";
import { IS_DEV } from "@/lib/utils";
import { POST_STATUS } from "@/types/common";
import { and, desc, eq } from "drizzle-orm";
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
    /*
     
    count - the limit of posts to retrieve for non-filter
     */
    let { count = 10, page = 1, filter = "PUBLISHED" } = req.query;
    const limit = +count;
    let offset = limit * (+page - 1);
    let response;
    const { id: userId } = (await getUserFromDB(
      1,
    )) as typeof users.$inferSelect;
    response = await db.query.posts.findMany({
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
      where: and(
        eq(posts.status, filter as POST_STATUS),
        eq(posts.userId, userId),
      ),
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
