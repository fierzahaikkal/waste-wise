import { PostMetadata } from "@/types/blog-type";
import Link from "next/link";

interface Props {
  post: PostMetadata;
}

const BlogCard = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} aria-label="View Item">
      <div className="relative transform overflow-hidden rounded shadow-lg transition duration-200 hover:-translate-y-2 hover:shadow-2xl">
        <img className="h-56 w-full object-cover md:h-64 xl:h-80" src={post.coverImage} alt="" />
        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 px-6 py-4">
          <p className="text-lg font-medium tracking-wide text-white">#{post.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
