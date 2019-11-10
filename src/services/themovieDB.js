import axios from 'axios';

const API_KEY = '8ac4df37eecec895d03ef505ffd12d26';

const getTrendingMovies = () => {
  return axios
    .get('https://api.themoviedb.org/3/trending/all/week', {
      params: {
        api_key: API_KEY,
      },
    })
    .then(response => response.data.results);
};
const getMovieByID = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    })
    .then(response => response.data)
    .catch(error => {
      // error handling
      return '';
    });
};

export { getTrendingMovies, getMovieByID };
