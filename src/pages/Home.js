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
    <div className="min-h-screen bg-gray-900 flex justify-center items-start">
      <div className="w-full max-w-6xl mx-auto p-6">
      
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Movies
        </h1>

        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={handleSearch}
          className="w-full mb-6 mt-6 my-4 p-3 rounded bg-gray-800 text-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>

      </div>
    </div>
  );
}