import Slugify from "slugify";
import { nanoid } from "nanoid";

export const slugify = (text: string) =>
  Slugify(text + "-" + nanoid(10), {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

export const ImageIpfsUrl = "https://ipfs.io/ipfs/";
export const IS_DEV = process.env.NODE_ENV !== "production";
