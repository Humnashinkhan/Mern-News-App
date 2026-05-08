import { useState } from 'react';
import { Bookmark, ExternalLink, ArrowUpCircle, Clock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cn } from '../utils/cn';

export default function StoryCard({ story, isBookmarkedInitial = false, onBookmarkToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post(`http://localhost:5000/api/stories/${story._id}/bookmark`, {}, config);
      setIsBookmarked(!isBookmarked);
      if (onBookmarkToggle) {
        onBookmarkToggle(story._id, !isBookmarked);
      }
    } catch (error) {
      console.error('Error toggling bookmark', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-[#1a1d24] hover:bg-[#222630] border border-white/5 hover:border-indigo-500/30 rounded-xl p-5 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <a href={story.url} target="_blank" rel="noopener noreferrer" className="block outline-none">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors leading-tight mb-3">
              {story.title}
            </h2>
          </a>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md">
              <ArrowUpCircle className="w-4 h-4" />
              <span className="font-medium">{story.points} points</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <UserIcon className="w-4 h-4" />
              <span>{story.author || 'Unknown'}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{story.postedAt || 'Unknown time'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleBookmarkClick}
            disabled={loading}
            className={cn(
              "p-2.5 rounded-full transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
              isBookmarked 
                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
                : "bg-white/5 text-slate-400 border-transparent hover:bg-white/10 hover:text-white"
            )}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
          </button>
          
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300"
            title="Open link"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}