import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ingredients extends Component {
  render() {
    return (
      <div className="Ingredients">
        test
        {this.props.ingredients.map((oneIngredient, index) => {
          return (
            <div key={index}>
              <Link
                probably="propb"
                to={{
                  pathname: `/recipes/${oneIngredient.name
                    .split(' ')
                    .join('+')}`,
                  state: this.props.ingredients
                }}
              >
                <p>{oneIngredient.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Ingredients;
