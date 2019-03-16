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
    user: {},
    fridge: {}
  };

  componentDidMount() {
    this.setUser();
  }

  setUser = async () => {
    if (api.isLoggedIn()) {
      this.setState({
        user: api.getLocalStorageUser(),
        fridge: await api.getFridge().then(res => {
          return res;
        })
      });
    } else {
      this.setState({
        user: {},
        fridge: {}
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} />
        <Routes
          user={this.state.user}
          fridge={this.state.fridge}
          setUser={this.setUser}
        />
      </div>
    );
  }
}
