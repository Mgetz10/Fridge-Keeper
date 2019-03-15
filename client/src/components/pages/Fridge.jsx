import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api';
// import { Redirect } from 'react-router-dom';
export default class Home extends Component {
  componentDidMount() {
    // console.log(api.isLoggedIn());
    // console.log(api.getLocalStorageUser());
    // console.log(this);

    Axios.get('http://localhost:5000/api/whatever').then(res => {
      // console.log(res);
    });
  }

  render() {
    return (
      <div className="Home">
        {/* <Redirect to="/monkey" /> */}

        <h2>Fridge</h2>
        <p>This is where the ingredients will go</p>
      </div>
    );
  }
}
