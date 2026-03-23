import { useEffect, useState } from "react";
import { fetchMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMovies = async (pageNumber, searchQuery= "") => {
    try {
      setLoading(true);
      let data;

      if(searchQuery){
        data = await searchMovies(searchQuery,pageNumber);
      } else{
        data = await fetchMovies(pageNumber);
      }

      if (pageNumber === 1) {
        setMovies(data);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }

    } catch (err) {
      console.error("ERROR:", err);
    } finally{
      setLoading(false);
    }
  }; 

  const handleLoadMore = ()=>{
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage, query);
  }

  const handleSearch=(e)=>{
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    loadMovies(1,value);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-start">
      <div className="w-full max-w-6xl mx-auto p-6">
      
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Movies
        </h1>

        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={handleSearch}
          className="w-full p-4 pl-12 rounded-xl bg-gray-800 text-white 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        {loading && movies.length === 0
        
        ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-800 h-72 rounded-xl"></div>
        ))}
      </div>
        )


        : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>)
        
        }

        

        <div className="flex justify-center mt-6">
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 
             text-white px-8 py-3 rounded-full 
             hover:scale-105 hover:shadow-lg 
             transition duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>

      </div>
    </div>
  );
}