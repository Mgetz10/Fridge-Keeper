import React, { Component } from 'react';
import api from '../api';

class Ingredients extends Component {
  state = {
    ingredients: []
  };
  componentDidUpdate() {
    console.log('is this OIK    ', this.props.fridge._id);
    let fridgeID = { fridgeID: this.props.fridge._id };
    api.getIngredients(fridgeID).then(gotIngredients => {
      this.setState({
        ingredients: gotIngredients
      });
    });
  }
  render() {
    return (
      <div className="Ingredients">
        test
        {/* {this.props.ingredients.map((oneIngredient, index) => {
          return oneIngredient.name;
        })} */}
      </div>
    );
  }
}

export default Ingredients;
