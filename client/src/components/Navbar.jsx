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
        <h1 className="App-title">Foodini</h1>
        user: {this.props.user.username}
        {api.isLoggedIn() && (
          <NavLink to="/" exact>
            Home
          </NavLink>
        )}
        {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
        {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
        {api.isLoggedIn() && (
          <Link to="/" onClick={e => this.handleLogoutClick(e)}>
            Logout
          </Link>
        )}
        {api.isLoggedIn() && <NavLink to="/secret">Secret</NavLink>}
      </header>
    );
  }
}

export default Navbar;
