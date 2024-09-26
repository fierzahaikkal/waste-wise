import fs from "fs";
import path from "path";
import { parseMarkdown } from "./markdown-parse";
import { Post, PostMetadata } from "@/types/blog-type";

const postsDirectory = path.join(process.cwd(), "contents");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return await parseMarkdown(fileContents);
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async slug => {
      const post = await getPostBySlug(slug);
      return { ...post, contentHtml: "" }; // Exclude contentHtml for the list
    })
  );

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
