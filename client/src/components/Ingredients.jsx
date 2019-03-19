import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Ingredients extends Component {
  render() {
    return (
      <div className="Ingredients">
        {this.props.ingredients.map((oneIngredient, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <Link
                  to={{
                    pathname: `/recipes/${oneIngredient.name
                      .split(' ')
                      .join('+')}`,
                    state: this.props.ingredients
                  }}
                >
                  <p>{oneIngredient.name}</p>
                </Link>
                <span
                  onClick={() => {
                    this.props.deleteIngredient(oneIngredient);
                  }}
                >
                  ×
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Ingredients;
