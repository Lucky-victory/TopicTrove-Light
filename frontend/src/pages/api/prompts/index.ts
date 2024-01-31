import { mainHandler } from "@/lib/api-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest,res:NextApiResponse) {
    return mainHandler(req,res,{
        
    })
}