import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ingredients extends Component {
  ingredientsCopy = [...this.props.ingredients];

  render() {
    return (
      <div className="Ingredients flex">
        <div className="refrigerator flex">
          {this.props.ingredients.map((oneIngredient, index) => {
            return (
              <div key={index} className="fridge-ingredients flex">
                <div className="ingredient-image-container flex">
                  <Link
                    className="link-container"
                    to={{
                      pathname: `/recipes`,
                      state: oneIngredient
                    }}
                  >
                    <div className="ingredient-image">
                      <img src={oneIngredient.image} alt={oneIngredient.name} />
                    </div>
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
      </div>
    );
  }
}

export default Ingredients;
