import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/stories/bookmarks', config);
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (storyId, isBookmarked) => {
    if (!isBookmarked) {
      setBookmarks(prev => prev.filter(story => story._id !== storyId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />
          <span className="text-gradient">Your Bookmarks</span>
        </h1>
        <p className="text-slate-400 mt-2">Stories you've saved for later reading</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map(story => (
              <StoryCard 
                key={story._id} 
                story={story} 
                isBookmarkedInitial={true} 
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))
          ) : (
            <div className="text-center py-24 bg-[#1a1d24] rounded-xl border border-white/5 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Bookmark className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No bookmarks yet</h3>
              <p className="text-slate-400 max-w-md mb-6">
                You haven't saved any stories. Go back to the top stories and click the bookmark icon to save them here.
              </p>
              <Link to="/" className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
                Browse Stories
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}