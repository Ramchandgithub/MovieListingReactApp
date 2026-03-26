import { X, Star, Calendar, Clock } from "lucide-react";

export default function MovieDetailsModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          {/* Poster */}
          <div className="w-full md:w-2/5 shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 w-full md:w-3/5 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {movie.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6 text-sm">
              {movie.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              )}
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Popularity: {movie.popularity?.toFixed(0)}</span>
              </div>
            </div>

            <div className="mb-8 text-gray-300 h-px bg-gray-800 w-full"></div>

            <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.overview || "No overview available for this movie."}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
