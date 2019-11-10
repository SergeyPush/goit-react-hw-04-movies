import React from 'react';
import { NavLink } from 'react-router-dom';
import router from '../routes';

const Header = () => {
  return (
    <div>
      <div className="ui secondary menu">
        <NavLink
          className="item"
          exact
          to={router.HOME}
          activeClassName="active"
        >
          Home
        </NavLink>
        <NavLink className="item" to={router.MOVIES} activeClassName="active">
          Movies
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
