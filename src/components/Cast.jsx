import React, { Component } from 'react';

import { getCastById } from '../services/themovieDB';

class Cast extends Component {
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

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.movieId !== this.props.movieId) {
      const cast = await getCastById(this.props.movieId);
      this.setState({
        cast,
      });
    }
  }

  render() {
    const { cast } = this.state;
    return (
      <div className="ui bottom attached segment">
        <ul>
          {cast.map(item => {
            return (
              <li key={item.id}>
                {item.character} - {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Cast;
