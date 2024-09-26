import Navbar from "@/components/navbar";
import SectionContainer from "@/components/section-container";
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Post } from "@/types/blog-type";
import Image from "next/image";

interface Props {
  post: Post;
}

const BlogDetails = ({ post }: Props) => {
  return (
    <div>
      <Navbar />
      <SectionContainer>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <article className="prose lg:prose-xl">
            {post.coverImage && (
              <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1000}
                  height={1000}
                  className="max-h-[200px] w-full object-cover"
                />
              </div>
            )}

            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

            <div className="mb-8 flex items-center space-x-4 text-gray-600">
              {post.author.picture && (
                <img
                  src={post.author.picture}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.date}
                  </span>
                  {post.readingTime && (
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div
              className="markdown-content space-y-6"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        </div>
      </SectionContainer>
    </div>
  );
};

export default BlogDetails;
