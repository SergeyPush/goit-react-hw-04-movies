import React, { Component } from 'react';
import T from 'prop-types';
import { getReviewsById } from '../services/themovieDB';

class Reviews extends Component {
  static propTypes = {
    movieId: T.number.isRequired,
  };

  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props;
    if (!movieId) {
      return;
    }
    const reviews = await getReviewsById(movieId);
    this.setState({
      reviews,
    });
  }

  async componentDidUpdate(prevProps) {
    const { movieId } = this.props;
    if (prevProps.movieId !== movieId) {
      const reviews = await getReviewsById(movieId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        reviews,
      });
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className="ui bottom attached segment">
        {reviews.length > 0 ? (
          reviews.map(review => {
            return (
              <div key={review.id} className="ui segment">
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </div>
            );
          })
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    );
  }
}

export default Reviews;
