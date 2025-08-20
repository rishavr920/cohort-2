import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    authorId: string;
    author: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/my-posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data.posts); // ✅ match backend response
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      setDeletingId(blogId);
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // remove deleted blog from state instead of refetching
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch (err) {
      console.error("Failed to delete blog", err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (loading) return <p>Loading your blogs...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {blogs.length === 0 ? (
        <p className="text-gray-500">You have no blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border rounded p-4 mb-4 shadow-sm">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content.substring(0, 150)}...</p>
            <p className="text-xs text-gray-400 mt-1">
              Posted by {blog.author.name} on {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Comments: {blog.comments.length}
            </p>
            <button
              className="mt-2 text-red-500 text-sm"
              disabled={deletingId === blog.id}
              onClick={() => handleDelete(blog.id)}
            >
              {deletingId === blog.id ? "Deleting..." : "Delete Blog"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};
