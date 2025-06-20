import { useState, useEffect } from 'react';
import { getComments } from '../../utils/fetchRequests';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
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
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-2 dark:border-gray-700">
                    <p className="dark:text-white">{comment.content}</p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{comment.author}</span>
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
