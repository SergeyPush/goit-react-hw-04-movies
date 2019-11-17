import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import T from 'prop-types';
import { searchMovieByName } from '../services/themovieDB';
import routes from '../routes';

class MoviesPage extends Component {
  state = {
    searchQuery: '',
    movies: [],
  };

  static propTypes = {
    location: T.object.isRequired,
    history: T.object.isRequired,
  };

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const { query } = qs.parse(search);
    if (!query) {
      return;
    }
    const movies = await searchMovieByName(query);
    this.setState({
      movies,
    });
  }

  async componentDidUpdate(prevProps) {
    const {
      location: { search },
    } = this.props;
    const { query: prevQuery } = qs.parse(prevProps.location.search);
    const { query: nextQuery } = qs.parse(search);
    if (prevQuery === nextQuery) {
      return;
    }
    if (!nextQuery) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        movies: [],
      });
      return;
    }
    const movies = await searchMovieByName(nextQuery);
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      movies,
    });
  }

  onInput = e => {
    const { value } = e.target;
    this.setState({
      searchQuery: value,
    });
  };

  onFormSubmit = async e => {
    e.preventDefault();

    this.setState({
      searchQuery: '',
    });

    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.searchQuery}`,
    });
  };

  render() {
    const { searchQuery, movies } = this.state;
    return (
      <div>
        <div>
          <h1>Movies Page</h1>

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
            <button type="submit" className="ui button ">
              Search
            </button>
          </form>
        </div>
        <div className="ui middle aligned list">
          {movies.map(movie => (
            <div className="item" key={movie.id}>
              <Link
                to={{
                  pathname: `${routes.MOVIES}/${movie.id}`,
                  // eslint-disable-next-line react/destructuring-assignment
                  state: { from: this.props.location },
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

export default MoviesPage;
