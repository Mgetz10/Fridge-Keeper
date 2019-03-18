import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MoreIngredients extends Component {
  render() {
    console.log(this);
    return (
      <div className="MoreIngredients flex">
        {this.props.ingredients.map((oneIngredient, index) => {
          return (
            <div className="MoreIngredientsRecipesContainer" key={index}>
              <Link
                to={{
                  pathname: `/recipes/${oneIngredient.name
                    .split(' ')
                    .join('+')}+${this.props.lastSearch}`,
                  state: this.props.ingredients
                }}
              >
                <p>{oneIngredient.name}</p>
              </Link>
            </div>
          );
        })}
        {console.log('more ingredients', this.props)}
      </div>
    );
  }
}

export default MoreIngredients;
