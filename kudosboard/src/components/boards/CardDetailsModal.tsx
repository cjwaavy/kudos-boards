import { useState, useEffect } from 'react';
import { getComments, addComment } from '../../utils/fetchRequests';

interface Comment {
  id: string;
  messageBody: string;
  author: string;
}

interface Card {
  id: string;
  gifUrl: string;
  title: string;
  author: string;
  upvotes: number;
}

interface CardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
  boardId: string;
}

const CardDetailsModal = ({ isOpen, onClose, card, boardId }: CardDetailsModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, card.id, boardId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const commentsData = await getComments(parseInt(boardId), parseInt(card.id));
      if (commentsData) {
        setComments(commentsData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        messageBody: newComment,
        author: commentAuthor.trim() || 'Anonymous'
      };

      const result = await addComment(parseInt(boardId), parseInt(card.id), commentData);
      if (result) {
        await fetchComments();
        setNewComment('');
        setCommentAuthor('');
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 pop-in">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto pop-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">{card.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              className="w-full md:w-64 rounded-lg"
              src={card.gifUrl}
              alt={card.title}
            />
            <p className="mt-2 dark:text-white">By: {card.author}</p>
            <p className="dark:text-white">Upvotes: {card.upvotes}</p>
          </div>

          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Comments</h3>
            {isLoading ? (
              <p className="dark:text-white">Loading comments...</p>
            ) : comments.length > 0 ? (
              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-2 dark:border-gray-700">
                    <p className="dark:text-white ml-1 text-left">{comment.messageBody}</p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{comment.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-4">No comments yet.</p>
            )}

            <div className="mt-4 border-t pt-4 dark:border-gray-700">
              <h4 className="font-medium mb-2 dark:text-white">Add a Comment</h4>
              <form onSubmit={handleSubmitComment}>
                <div className="mb-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-600 px-4 py-2 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
