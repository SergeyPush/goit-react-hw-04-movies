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
      return 'not found';
    });
};

const getCastById = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then(response => response.data.cast);
};

const getReviewsById = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    })
    .then(response => response.data.results);
};

const searchMovieByName = query => {
  return axios
    .get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: API_KEY,
        query,
        language: 'en-US',
        page: 1,
        nclude_adult: false,
      },
    })
    .then(response => response.data.results);
};

export {
  getTrendingMovies,
  getMovieByID,
  getCastById,
  getReviewsById,
  searchMovieByName,
};
