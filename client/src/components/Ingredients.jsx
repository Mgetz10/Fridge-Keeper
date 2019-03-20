import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Ingredients extends Component {
  render() {
    // console.log(this.props.ingredients);
    return (
      <div className="Ingredients">
        {this.props.ingredients.map((oneIngredient, index) => {
          return (
            <div key={index}>
              <div className="flex">
                <Link
                  to={{
                    pathname: `/recipes`,
                    state: oneIngredient.name.split(' ').join('+')
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
