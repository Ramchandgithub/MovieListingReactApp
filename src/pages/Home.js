import { useEffect, useState } from "react";
import { fetchMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import Navbar from "../components/Navbar";
import { useDebounce } from "../hooks/useDebounce";
import { Search, Loader2, Film } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Reset page and load movies when debouncedQuery changes
    setPage(1);
    loadMovies(1, debouncedQuery, true);
  }, [debouncedQuery]);

  const loadMovies = async (pageNumber, searchQuery = "", isNewSearch = false) => {
    try {
      if (isNewSearch) setLoading(true);
      else setLoadingMore(true);

      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery, pageNumber);
      } else {
        data = await fetchMovies(pageNumber);
      }

      if (isNewSearch) {
        setMovies(data);
      } else {
        setMovies((prev) => {
          // Avoid duplicates if API returns same results
          const newMovies = data.filter(d => !prev.some(p => p.id === d.id));
          return [...prev, ...newMovies];
        });
      }
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage, debouncedQuery, false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section Container */}
      <div className="relative pt-24 pb-12 lg:pt-36 lg:pb-24 border-b border-gray-800">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Favorite Movie</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
            Explore thousands of movies, from Hollywood blockbusters to indie gems. Find exactly what you're looking for.
          </p>

          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for movies, genres, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-gray-800/80 backdrop-blur-md border border-gray-700 
                rounded-2xl text-white placeholder-gray-400 shadow-xl 
                focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-blue-400" />
            {debouncedQuery ? `Search Results for "${debouncedQuery}"` : "Trending Now"}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 aspect-[2/3] rounded-2xl border border-gray-700/50"></div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-6">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your search query.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10 place-items-center">
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={setSelectedMovie} 
                />
              ))}
            </div>

            {movies.length > 0 && (
              <div className="flex justify-center mt-12 mb-8">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gray-800/80 hover:bg-gray-700 text-white font-medium rounded-full border border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Movies"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}