import axios from "axios";

const API_KEY = "1cbc1c53fa986419014a0f52afed63dc";
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchMovies = async(page = 1) => {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return res.data.results;
}

export const searchMovies = async(query,page=1)=>{
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&query=${query}&page=${page}`);
    return res.data.results;
}

// export const fetchMovies = async () => {
//   const requests = [];

//   for (let page = 1; page <= 5; page++) {
//     requests.push(
//       axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
//     );
//   }

//   const responses = await Promise.all(requests);

//   const allMovies = responses.flatMap(res => res.data.results);

//   console.log(allMovies);
//    return allMovies; 
// };