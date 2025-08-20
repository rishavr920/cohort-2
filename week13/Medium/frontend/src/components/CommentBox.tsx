import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const CommentBox = ({
  postId,
  onCommentAdded,
}: {
  postId: string;
  onCommentAdded: () => void;
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/post/${postId}/comment`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComment("");
      onCommentAdded();
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};
