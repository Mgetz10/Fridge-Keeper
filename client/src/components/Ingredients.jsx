import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Ingredients extends Component {
  render() {
    // console.log(this.props.ingredients);
    return (
      <div className="Ingredients">
        {this.props.ingredients.map((oneIngredient, index) => {
          console.log(oneIngredient);
          return (
            <div key={index} className="flex">
              <div className="ingredient-image-container flex">
                <Link
                  className="link-container"
                  to={{
                    pathname: `/recipes`,
                    state: oneIngredient
                  }}
                >
                  <div className="ingredient-image">
                    <img src={oneIngredient.image} />
                  </div>
                  {/* <p>{oneIngredient.name}</p> */}
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
