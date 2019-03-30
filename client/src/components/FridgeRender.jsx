import React, { Component } from 'react';
import Fridge from './pages/Fridge';
import { Link } from 'react-router-dom';

const FridgeRender = props => {
  while (props.ingredientsCopy) {
    props.ingredientsCopy.splice(0, 3).map((oneIngredient, index) => {
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
            </Link>
            <span
              onClick={() => {
                props.deleteIngredient(oneIngredient);
              }}
            >
              ×
            </span>
          </div>
        </div>
      );
    });
  }
};

export default FridgeRender;
