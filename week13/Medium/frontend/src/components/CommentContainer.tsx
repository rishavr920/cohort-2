import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CommentBox } from "./CommentBox";

interface Comment {
  commentId: string;
  content: string;
  username: string;
  createdAt: string;
}

export const CommentContainer = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/v1/post/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      setDeletingId(commentId);
      const res = await axios.delete(`${BACKEND_URL}/api/v1/post/${postId}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Refresh comments after deletion
      setDeletingId(res.data);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-6">
      Comments
      <CommentBox postId={postId} onCommentAdded={fetchComments} />
      <div className="mt-2 space-y-1">
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c.commentId} className="p-2 border-b border-gray-200 rounded">
              <p className="font-semibold">{c.username}</p>
              <p>{c.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </span>
              <button
                className="text-red-500 text-sm mt-1"
                disabled={deletingId === c.commentId}
                onClick={() => handleDelete(c.commentId)}
              >
                {deletingId === c.commentId ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
