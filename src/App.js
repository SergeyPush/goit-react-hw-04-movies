import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDeatailsPage from './pages/MovieDetailsPage';

import routes from './routes';

// const api = '';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App ui container">
        <Switch>
          <Route path={routes.MOVIE_DETAILS} component={MovieDeatailsPage} />
          <Route path={routes.MOVIES} component={MoviesPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
