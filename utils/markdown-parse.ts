import { Post, PostMetadata } from "@/types/blog-type";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function parseMarkdown(markdownContent: string): Promise<Post> {
  const matterResult = matter(markdownContent);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...(matterResult.data as PostMetadata),
  };
}
