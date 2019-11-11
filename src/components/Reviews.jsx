import React, { Component } from 'react';
import { getReviewsById } from '../services/themovieDB';

class Reviews extends Component {
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

  async componentDidUpdate(prevProps, prevState) {
    const { movieId } = this.props;
    if (prevProps.movieId !== this.props.movieId) {
      const reviews = await getReviewsById(movieId);
      this.setState({
        reviews,
      });
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className="ui bottom attached segment">
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Reviews;
