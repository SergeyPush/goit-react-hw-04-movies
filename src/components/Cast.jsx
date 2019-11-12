import React, { Component } from 'react';
import T from 'prop-types';

import { getCastById } from '../services/themovieDB';

class Cast extends Component {
  static propTypes = {
    movieId: T.number.isRequired,
  };

  state = { cast: [] };

  async componentDidMount() {
    const { movieId } = this.props;
    if (!movieId) {
      return;
    }
    const cast = await getCastById(movieId);
    this.setState({
      cast,
    });
  }

  async componentDidUpdate(prevProps) {
    const { movieId } = this.props;
    if (prevProps.movieId !== movieId) {
      const cast = await getCastById(movieId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        cast,
      });
    }
  }

  render() {
    const { cast } = this.state;
    return (
      <div className="ui bottom attached segment">
        <div className="ui items">
          {cast.map(item => {
            return (
              <div className="item" key={item.id}>
                <div className="ui small image">
                  {item.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                      alt="actor"
                    />
                  ) : (
                    <img
                      src="https://icon-library.net/images/no-user-image-icon/no-user-image-icon-8.jpg"
                      alt="profile icon"
                    />
                  )}
                </div>
                <div className="middle aligned content">
                  <div className="header">
                    {item.character} - {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Cast;
