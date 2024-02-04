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
export function calculateReadTime(content: string) {
  // Average reading speed in words per minute
  const wordsPerMinute = 200;

  // Calculate the number of words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the read time in minutes
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return readTimeMinutes;
}

export function convertCamelCaseToSpace<T extends object>(obj: T) {
  const resultArray = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Convert camelCase to space-separated keys
      const spacedKey = key.replace(/([a-z])([A-Z])/g, "$1 $2");
      const formattedKey =
        spacedKey.charAt(0).toUpperCase() + spacedKey.slice(1);

      const keyString = `${formattedKey}`;

      resultArray.push(keyString);
    }
  }

  return resultArray;
}
export const shortenText = (text: string, len = 50) => {
  if (text.length > len) return text.substring(0, len) + "...";
  return text.substring(0, len);
};
export function removeKeyFromObject<T extends object>(
  arr: T[],
  keysToRemove: (keyof T)[] = [],
) {
  return arr.map((obj) => {
    const newObj: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      if (!keysToRemove.includes(key as keyof T)) {
        newObj[key] = obj[key as keyof T];
      }
    });

    return newObj as T;
  });
}
