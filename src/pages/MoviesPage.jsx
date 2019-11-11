import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { searchMovieByName } from '../services/themovieDB';
import routes from '../routes';

class MoviesPage extends Component {
  state = {
    searchQuery: '',
    movies: [],
  };

  componentDidMount() {}

  onInput = e => {
    const { value } = e.target;
    this.setState({
      searchQuery: value,
    });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const movies = await searchMovieByName(this.state.searchQuery);

    this.setState({
      movies,
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery, movies } = this.state;
    return (
      <div>
        <div>
          <h1 className="">Movies Page</h1>

          <form onSubmit={this.onFormSubmit}>
            <div className="ui left icon input focus">
              <input
                type="text"
                placeholder="Search movie..."
                value={searchQuery}
                onChange={this.onInput}
              />
              <i className="search icon" />
            </div>
          </form>
        </div>
        <div className="ui middle aligned list">
          {movies.map(movie => (
            <div className="item" key={movie.id}>
              <Link to={`${routes.MOVIES}/${movie.id}`}>
                {movie.original_title || movie.original_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MoviesPage;
