import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';

class MoreIngredients extends Component {
  // state = {
  //   ingredientsToSearch: lastIngredients
  // };

  render() {
    let lastIngredients = this.props.match.params.ingredient.split('+');
    return (
      <div className="MoreIngredients flex">
        {this.props.ingredients.map((oneIngredient, index) => {
          return (
            <div className="MoreIngredientsRecipesContainer" key={index}>
              <Link
                to={{
                  pathname: `/recipes/${lastIngredients.join(
                    '+'
                  )}+${oneIngredient.name.split(' ').join('+')}`,
                  state: this.props.ingredients
                }}
              >
                <p>{oneIngredient.name}</p>
              </Link>
            </div>
          );
        })}
        {/* {console.log('more ingredients', this.props)} */}
      </div>
    );
  }
}

export default MoreIngredients;
