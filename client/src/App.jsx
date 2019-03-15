import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Home from './components/pages/Home';

// import Login from './components/pages/Login';
// import Signup from './components/pages/Signup';
import api from './api';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

export default class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.setUser();
  }

  setUser = () => {
    if (api.isLoggedIn()) {
      this.setState({ user: api.getLocalStorageUser() });
    } else {
      this.setState({ user: {} });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} />
        <Routes user={this.state.user} setUser={this.setUser} />
      </div>
    );
  }
}
