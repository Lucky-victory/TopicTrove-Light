import { db } from "@/db/db";
import { users, prompts } from "@/db/schema";
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
    let { id } = req.query;

    const promptId = +(id as string);
    const prompt = await db.query.prompts.findFirst({
      where: eq(prompts.id, promptId),

      columns: {
        userId: false,
      },
      with: {
        meta: true,
        postWriter: {
          columns: {
            fullName: true,
            username: true,
            id: true,
            isVerified: true,
            firstName: true,
          },
        },
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

    if (isEmpty(prompt)) {
      return await successHandlerCallback(
        req,
        res,
        {
          message: `Prompt with '${id}' does not exist`,
          data: prompt,
        },
        404,
      );
    }
    // update the views whenever a prompt is requested
    // await db.update(posts).set({ views: (prompt?.views as number) + 1 });

    return await successHandlerCallback(req, res, {
      message: `Prompt retrieved successfully`,
      data: prompt,
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
      await db.insert(users).values({ ...rest, status });
      return await successHandlerCallback(req, res, {
        message: "Draft saved successfully",
      });
    }

    const insert = await db.insert(users).values({ ...rest, status });

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
