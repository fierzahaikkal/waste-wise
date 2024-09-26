import BlogCard from "@/components/blog/blog-card";
import SectionContainer from "@/components/section-container";
import { getAllPosts } from "@/utils/get-markdown-posts";
import Link from "next/link";

const Education = async () => {
  const posts = await getAllPosts();
  if (!posts || posts.length === 0) {
    return (
      <SectionContainer>
        <div>No posts available at the moment.</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <div className="mb-6 flex flex-col md:mb-8 lg:flex-row lg:justify-between">
        <h2 className="group mb-5 max-w-lg font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6">
          <span className="mb-1 inline-block sm:mb-4">
            The quick, brown fox <br className="hidden md:inline-block" />
            jumps over a lazy dog
          </span>
          <div className="scale-x-30 ml-auto h-1 origin-left transform bg-highland-400 duration-300 group-hover:scale-x-100" />
        </h2>
        <p className="text-gray-700 lg:max-w-md lg:text-sm">
          Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem accusantium doloremque
          rem aperiam, ipsa eaque quae. Sed ut perspiciatis unde omnis iste.
        </p>
      </div>
      <div className="row-gap-5 sm:row-gap-6 mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 4).map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/education"
          aria-label=""
          className="text-deep-purple-accent-400 hover:text-deep-purple-800 inline-flex items-center font-semibold transition-colors duration-200"
        >
          See more
          <svg className="ml-2 inline-block w-3" fill="currentColor" viewBox="0 0 12 12">
            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
          </svg>
        </Link>
      </div>
    </SectionContainer>
  );
};

export default Education;
