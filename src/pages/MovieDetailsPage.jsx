import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { getMovieByID } from '../services/themovieDB';

class MovieDetailsPage extends Component {
  state = {
    movie: '',
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    getMovieByID(movieId).then(movie =>
      this.setState({
        movie,
      }),
    );
  }

  onGoBack = () => {
    this.props.history.push('/');
  };

  render() {
    console.log(this.state.movie);
    const {
      title,
      release_date,
      overview,
      poster_path,
      genres,
    } = this.state.movie;
    return (
      <div>
        <button
          type="button"
          className="ui compact labeled icon button"
          onClick={this.onGoBack}
        >
          <i className="arrow left icon" />
          Go back
        </button>
        {this.state.movie ? (
          <div className="movie_details">
            <img
              className="ui small image"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
              alt=""
            />
            <h1>
              {title}({release_date})
            </h1>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <div className="ui horizontal list">
              {genres.map(genre => (
                <span className="item" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>No movie found</p>
        )}

        <div className="ui top attached tabular menu">
          <NavLink
            className="item"
            exact
            activeClassName="active"
            to="/movies/499701"
          >
            Bio
          </NavLink>
          <NavLink className="item" exact activeClassName="active" to="/movies">
            Photos
          </NavLink>
        </div>
        <div className="ui bottom attached segment">
          <p>Some text</p>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
