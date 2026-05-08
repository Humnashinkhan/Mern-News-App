import { useState, useEffect } from 'react';
import axios from 'axios';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, TrendingUp } from 'lucide-react';

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    fetchStories();
  }, [page]);

  useEffect(() => {
    if (user) {
      fetchUserBookmarks();
    } else {
      setUserBookmarks([]);
    }
  }, [user]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/stories?page=${page}&limit=10`);
      setStories(data.stories);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching stories', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookmarks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/stories/bookmarks', config);
      setUserBookmarks(data.map(story => story._id));
    } catch (error) {
      console.error('Error fetching user bookmarks', error);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    try {
      await axios.post('http://localhost:5000/api/stories/scrape');
      setPage(1);
      fetchStories();
    } catch (error) {
      console.error('Error scraping', error);
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-indigo-400" />
            <span className="text-gradient">Top Stories</span>
          </h1>
          <p className="text-slate-400 mt-2">The latest and most popular stories from HackerNews</p>
        </div>
        
        <button 
          onClick={handleScrape}
          disabled={scraping}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#222630] hover:bg-[#2a2e3a] border border-white/10 rounded-lg text-sm font-medium transition-all group disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-indigo-400 ${scraping ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>{scraping ? 'Scraping...' : 'Sync Latest'}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map(story => (
            <StoryCard 
              key={story._id} 
              story={story} 
              isBookmarkedInitial={userBookmarks.includes(story._id)} 
            />
          ))}
          
          {stories.length === 0 && (
            <div className="text-center py-20 bg-[#1a1d24] rounded-xl border border-white/5">
              <p className="text-slate-400 text-lg">No stories found. Try syncing the latest stories.</p>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-[#222630] hover:bg-[#2a2e3a] disabled:opacity-50 disabled:hover:bg-[#222630] rounded-lg text-sm font-medium transition-colors"
          >
            Previous
          </button>
          <span className="text-slate-400 text-sm">
            Page <span className="text-white font-medium">{page}</span> of <span className="text-white font-medium">{totalPages}</span>
          </span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#222630] hover:bg-[#2a2e3a] disabled:opacity-50 disabled:hover:bg-[#222630] rounded-lg text-sm font-medium transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}