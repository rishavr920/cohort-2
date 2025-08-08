import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 px-6 w-full max-w-screen-xl pt-12">
          
          {/* Blog Content */}
          <div className="md:col-span-8 col-span-1">
            <div className="text-4xl font-extrabold break-words">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd December 2023
            </div>
            <div className="pt-4 whitespace-pre-line break-words">
              {blog.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="md:col-span-4 col-span-1 mt-10 md:mt-0">
            <div className="text-slate-600 text-lg mb-2">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab user attention.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

