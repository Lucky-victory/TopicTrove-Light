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

// Example usage
const postContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ..."; // Your actual post content here
const readTime = calculateReadTime(postContent);

console.log(`Estimated read time: ${readTime} minute(s)`);
