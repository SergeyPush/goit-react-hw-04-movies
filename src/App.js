import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDeatailsPage from './pages/MovieDetailsPage';

import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App ui container">
        <Header />

        <Switch>
          <Route path={routes.MOVIE_DETAILS} component={MovieDeatailsPage} />
          <Route path={routes.MOVIES} component={MoviesPage} />
          <Route path={routes.HOME} exact component={HomePage} />
          <Redirect to={routes.HOME} component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
