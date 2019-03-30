import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Fridge from './pages/Fridge';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipes from './Recipes';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Fridge
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
        <Route exact path="/recipes" component={Recipes} />

        <Route render={() => <h2>404</h2>} />
      </Switch>
    );
  }
}

export default Routes;
