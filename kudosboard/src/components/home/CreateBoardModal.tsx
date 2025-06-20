import { useState } from 'react';
import { createBoard } from '../../utils/fetchRequests';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardCreated: () => void;
}

const CreateBoardModal = ({ isOpen, onClose, onBoardCreated }: CreateBoardModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('NONE');
  const [coverImg, setCoverImg] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await createBoard({
        title,
        category,
        coverImg,
        author: author || null,
      });

      if (!result) {
        throw new Error('Failed to create board');
      }

      setTitle('');
      setCategory('NONE');
      setCoverImg('');
      setAuthor('');

      onBoardCreated();
      onClose();
    } catch (err) {
      setError('Failed to create board. Please try again.');
      console.error('Error creating board:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm pop-in z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full pop-in max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Create New Board</h2>
          <button
            onClick={onClose}
            className="!bg-teal-600 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="NONE">None</option>
              <option value="CELEBRATION">Celebration</option>
              <option value="THANK_YOU">Thank You</option>
              <option value="INSPIRATION">Inspiration</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Author (optional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="!bg-teal-600 mr-2 px-4 py-2 text-gray-700rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="!bg-teal-600 px-4 py-2 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Board'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
