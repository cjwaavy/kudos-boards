import { useState } from 'react';
import { createCard } from '../../utils/fetchRequests';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardCreated: () => void;
}

const CreateCardModal = ({ isOpen, onClose, onCardCreated }: CreateCardModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [giphyResults, setGiphyResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const boardId = parseInt(window.location.pathname.split('/')[2]);

      const result = await createCard(boardId, {
        title,
        description,
        gifUrl,
        owner: owner || null,
      });

      if (!result) {
        throw new Error('Failed to create card');
      }

      setTitle('');
      setDescription('');
      setGifUrl('');
      setOwner('');
      setSearchTerm('');
      setGiphyResults([]);

      onCardCreated();
      onClose();
    } catch (err) {
      setError('Failed to create card. Please try again.');
      console.error('Error creating card:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGiphySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${encodeURIComponent(
          searchTerm
        )}&limit=8&rating=g`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch GIFs');
      }

      const data = await response.json();
      setGiphyResults(data.data);
    } catch (err) {
      console.error('Error searching Giphy:', err);
      setError('Failed to search for GIFs. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const selectGif = (url: string) => {
    setGifUrl(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm pop-in z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full pop-in max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Create New Card</h2>
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
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              GIF URL
            </label>
            <input
              type="url"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="https://example.com/image.gif"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Search for a GIF
            </label>
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Search Giphy..."
              />
              <button
                type="button"
                onClick={handleGiphySearch}
                className="bg-teal-600 px-4 py-2 text-white rounded-r-lg hover:bg-teal-700 disabled:opacity-50"
                disabled={isSearching || !searchTerm.trim()}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {giphyResults.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Select a GIF
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {giphyResults.map((gif) => (
                  <div
                    key={gif.id}
                    className="cursor-pointer border rounded hover:border-teal-500 transition-colors"
                    onClick={() => selectGif(gif.images.fixed_height.url)}
                  >
                    <img
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Owner (optional)
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your name"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 px-4 py-2 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardModal;
