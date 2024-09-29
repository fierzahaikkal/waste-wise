import BlogCard from "@/components/blog/blog-card";
import SectionContainer from "@/components/section-container";
import { getAllPosts } from "@/utils/get-markdown-posts";

const EducationArticle = async () => {
  const posts = await getAllPosts();
  if (!posts || posts.length === 0) {
    return (
      <SectionContainer>
        <div>Untuk saat ini tidak ada post yang tersedia.</div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <div className="mb-6 flex flex-col md:mb-8 lg:flex-row lg:justify-between">
        <h2 className="group mb-5 max-w-lg font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6">
          <span className="mb-1 inline-block sm:mb-4">
            Temukan Artikel <br className="hidden md:inline-block" />
            Menarik Terkait Sampah
          </span>
          <div className="scale-x-30 ml-auto h-1 origin-left transform bg-highland-400 duration-300 group-hover:scale-x-100" />
        </h2>
      </div>
      <div className="row-gap-5 sm:row-gap-6 mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 4).map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default EducationArticle;
