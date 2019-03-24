import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../api';

class Navbar extends Component {
  handleLogoutClick(e) {
    api.logout();
    this.setUser();
  }

  render() {
    return (
      <header className="App-header">
        <div className="nav-bar flex">
          <div className="magnet user">{this.props.user.username}</div>
          {api.isLoggedIn() && (
            <NavLink className="magnet mag-1" to="/" exact>
              Home
            </NavLink>
          )}
          {!api.isLoggedIn() && (
            <NavLink className="magnet mag-1" to="/signup">
              Signup
            </NavLink>
          )}
          {!api.isLoggedIn() && (
            <NavLink className="magnet mag-2" to="/login">
              Login
            </NavLink>
          )}
          {api.isLoggedIn() && (
            <Link
              className="magnet mag-2"
              to="/"
              onClick={e => this.handleLogoutClick(e)}
            >
              Logout
            </Link>
          )}
          {api.isLoggedIn() && (
            <NavLink className="magnet mag-3" to="/secret">
              Secret
            </NavLink>
          )}
        </div>
        <div className="flex">
          <h1 className="magnet mag-2 food-head App-title">Foodini</h1>
        </div>
      </header>
    );
  }
}

export default Navbar;
