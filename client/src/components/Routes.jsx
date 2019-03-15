import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Fridge';
import Login from './pages/Login';
import Signup from './pages/Signup';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              {...props}
              user={this.props.user}
              setUser={this.props.setUser}
            />
          )}
        />
        <Route
          path="/signup"
          render={props => <Signup {...props} setUser={this.props.setUser} />}
        />
        <Route
          path="/login"
          render={props => <Login {...props} setUser={this.props.setUser} />}
        />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    );
  }
}

export default Routes;
