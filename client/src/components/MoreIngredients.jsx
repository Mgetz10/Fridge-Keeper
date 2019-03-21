import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ingredients from './Ingredients';

class MoreIngredients extends Component {
  // state = {
  //   ingredientsToSearch: lastIngredients
  // };

  filterSearchedIngredients = searchedIngredients => {
    let allIngredients = this.props.ingredients;
    let filteredIngredients = allIngredients.filter(
      ingredient => !searchedIngredients.includes(ingredient.name)
    );
    console.log('all: ', allIngredients, '  filt:  ', filteredIngredients);
    return filteredIngredients;
  };

  render() {
    console.log(this.props);
    let filteredIngredients = this.filterSearchedIngredients(
      this.props.lastSearch
    );
    // let lastIngredients = this.props.match.params.ingredient.split('+');
    return (
      <div className="MoreIngredientsRecipesContainer">
        <div className="MoreIngredients flex">
          {filteredIngredients.map((oneIngredient, index) => {
            return (
              <div key={index} className="ingredient-image-container">
                <div
                  className="ingredient-image"
                  onClick={() => {
                    this.props.addSearchIngredientHandler(oneIngredient);
                  }}
                >
                  <img src={oneIngredient.image} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex">
          {this.props.lastSearchObject.map((oneSearch, index) => {
            console.log('check', oneSearch);
            return (
              <div className="ingredient-image-container flex" key={index}>
                <div className="ingredient-image">
                  <img src={oneSearch.image} />
                </div>
                <span
                  onClick={() => {
                    this.props.deleteSearchIngredientHandler(oneSearch);
                  }}
                >
                  ×
                </span>
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
