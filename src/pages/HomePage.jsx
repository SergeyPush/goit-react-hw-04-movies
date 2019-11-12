import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import T from 'prop-types';

import routes from '../routes';
import { getTrendingMovies } from '../services/themovieDB';

class HomePage extends Component {
  static propTypes = {
    location: T.any.isRequired,
  };

  state = {
    movies: [],
  };

  async componentDidMount() {
    const moviesFromDB = await getTrendingMovies();
    this.setState({
      movies: moviesFromDB,
    });
  }

  render() {
    const { movies } = this.state;
    const { location } = this.props;

    return (
      <div>
        <h1>Trending Today</h1>
        <div className="ui middle aligned list">
          {movies.map(movie => (
            <div className="item" key={movie.id}>
              <Link
                to={{
                  pathname: `${routes.MOVIES}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title || movie.original_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
