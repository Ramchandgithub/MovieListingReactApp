import axios from "axios";

const API_KEY = "1cbc1c53fa986419014a0f52afed63dc";
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchMovies = async (page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw new Error(error.response?.data?.status_message || "Failed to fetch movies.");
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return res.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error(error.response?.data?.status_message || "Failed to search movies.");
  }
};

