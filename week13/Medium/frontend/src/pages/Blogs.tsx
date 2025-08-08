import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  //try to fetch blog from backend way to do it
  // store blogs in state
  // stote directly here
  // store it in context variable
  // create our own custom hook called useBlogs
  // if we have to use Blogs in multiple places then we can use recoil but here we use cutom hook

  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />

        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.length === 0
            ? "No blogs yet"
            : blogs.map((blog) => (
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"17-12-01"}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
