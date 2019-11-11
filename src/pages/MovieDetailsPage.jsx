import React, { Component } from 'react';

import { NavLink, Route } from 'react-router-dom';
import { getMovieByID } from '../services/themovieDB';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

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
    const {
      title,
      release_date,
      overview,
      poster_path,
      genres,
      id,
    } = this.state.movie;
    const { url, path } = this.props.match;
    return (
      <div>
        <button
          type="button"
          className="ui tiny compact labeled icon button"
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
            to={`${url}/cast`}
          >
            Cast
          </NavLink>
          <NavLink
            className="item"
            exact
            activeClassName="active"
            to={`${url}/reviews`}
          >
            Reviews
          </NavLink>
        </div>

        <Route
          path={`${path}/cast`}
          render={props => <Cast {...props} movieId={id} />}
        />
        <Route
          path={`${path}/reviews`}
          render={props => <Reviews {...props} movieId={id} />}
        />
      </div>
    );
  }
}

export default MovieDetailsPage;
