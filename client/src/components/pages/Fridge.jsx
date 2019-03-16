import React, { Component } from 'react';
import AddIngredient from '../AddIngredient';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        {/* {console.log('LOOK HERE  ', this.props)} */}
        <h2>Fridge</h2>
        <p>This is where the ingredients will go</p>
        <AddIngredient fridge={this.props.fridge} />
      </div>
    );
  }
}
