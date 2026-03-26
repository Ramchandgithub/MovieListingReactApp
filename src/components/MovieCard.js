import { Star, Calendar } from "lucide-react";

export default function MovieCard({ movie, onClick }) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  
  return (
    <div 
      onClick={() => onClick(movie)}
      className="group relative bg-gray-800 w-full rounded-2xl overflow-hidden shadow-lg 
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500/50"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="text-white text-lg font-bold truncate drop-shadow-md">
          {movie.title}
        </h2>

        <div className="flex items-center gap-3 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <span className="flex items-center gap-1 text-yellow-400 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
          </span>
          <span className="flex items-center gap-1 text-gray-300 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
             <Calendar className="w-3.5 h-3.5" />
             <span>{year}</span>
          </span>
        </div>
      </div>
    </div>
  );
}