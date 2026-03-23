export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-800 w-60 rounded-xl overflow-hidden
         shadow-lg
        hover:scale-105 transition hover:shadow-2xl transition duration-300">
      
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-3">
        <h2 className="text-white text-sm font-semibold truncate">
          {movie.title}
        </h2>

        <p className="text-gray-400 text-xs mt-1">
          ⭐ {movie.vote_average}
        </p>
      </div>
    </div>
  );
}