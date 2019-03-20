import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';

class MoreIngredients extends Component {
  // state = {
  //   ingredientsToSearch: lastIngredients
  // };

  render() {
    console.log(this.props);
    // let lastIngredients = this.props.match.params.ingredient.split('+');
    return (
      <div className="MoreIngredientsRecipesContainer">
        <div className="MoreIngredients flex">
          {this.props.ingredients.map((oneIngredient, index) => {
            return (
              <div key={index}>
                <p
                  onClick={() => {
                    this.props.addSearchIngredientHandler(oneIngredient.name);
                  }}
                >
                  {oneIngredient.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex">
          {this.props.lastSearch.map((oneSearch, index) => {
            return (
              <div className="flex" key={index}>
                <p>{oneSearch}</p>
                <span>×</span>
              </div>
            );
          })}
        </div>
        {/* {console.log('more ingredients', this.props)} */}
      </div>
    );
  }
}

export default MoreIngredients;
