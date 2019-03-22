import React, { Component } from 'react';
import Fridge from './pages/Fridge';
import { Link } from 'react-router-dom';

const FridgeRender = props => {
  console.log(props);
  while (props.ingredientsCopy) {
    props.ingredientsCopy.splice(0, 3).map((oneIngredient, index) => {
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
