import { NextApiRequest, NextApiResponse } from "next";

export async function successHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
): Promise<void> {
  return res.status(200).json(data);
}
export async function errorHandlerCallback<T>(
  req: NextApiRequest,
  res: NextApiResponse,
  data: T,
): Promise<void> {
  return res.status(500).json(data);
}

export type HTTP_METHOD = "GET" | "PUT" | "POST" | "DELETE";
export type HTTP_METHOD_CB = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;
export async function mainHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    GET,
    PUT,
    POST,
    DELETE,
  }: {
    GET?: HTTP_METHOD_CB;
    POST?: HTTP_METHOD_CB;
    PUT?: HTTP_METHOD_CB;
    DELETE?: HTTP_METHOD_CB;
  },
) {
  const method = req.method as HTTP_METHOD;
  switch (method) {
    case "GET":
      return await GET?.(req, res);
    case "POST":
      return await POST?.(req, res);
    case "PUT":
      return PUT?.(req, res);
    case "DELETE":
      return DELETE?.(req, res);

    default:
      return res.status(405).end();
  }
}
