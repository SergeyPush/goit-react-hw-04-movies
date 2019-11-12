import React, { Component } from 'react';

import { NavLink, Route } from 'react-router-dom';
import T from 'prop-types';
import { getMovieByID } from '../services/themovieDB';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.object.isRequired,
    location: T.object.isRequired,
    history: T.object.isRequired,
  };

  state = {
    movie: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { movieId } = this.props.match.params;
    getMovieByID(movieId).then(movie =>
      this.setState({
        movie,
      }),
    );
  }

  onGoBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
      return;
    }
    this.props.history.goBack();
  };

  render() {
    const { movie } = this.state;
    const {
      title,
      release_date: releaseDate,
      overview,
      poster_path: posterPath,
      genres,
      id,
      vote_average: voteAverage,
    } = movie;

    const {
      location: { state },
    } = this.props;

    const year = new Date(releaseDate).getFullYear();
    const {
      match: { url, path },
    } = this.props;
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
        {movie ? (
          <div className="movie_details">
            <img
              className="ui small image"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${posterPath}`}
              alt=""
            />
            <h1>
              {title} ({year})
            </h1>
            <h3>Overview</h3>
            <p>{overview}</p>

            <h3>Rating</h3>
            <p>User score: {voteAverage}</p>
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
            to={{
              pathname: `${url}/cast`,
              state: { ...state },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            className="item"
            exact
            activeClassName="active"
            to={{
              pathname: `${url}/reviews`,
              state: { ...state },
            }}
          >
            Reviews
          </NavLink>
        </div>

        <Route
          path={`${path}/cast`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Cast {...props} movieId={id} />}
        />
        <Route
          path={`${path}/reviews`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Reviews {...props} movieId={id} />}
        />
      </div>
    );
  }
}

export default MovieDetailsPage;
