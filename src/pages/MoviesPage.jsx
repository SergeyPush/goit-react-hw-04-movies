import React, { Component } from 'react';

class MoviesPage extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className="">Movies Page</h1>
      </div>
    );
  }
}

export default MoviesPage;
