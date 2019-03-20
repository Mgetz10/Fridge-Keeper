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
              <div key={index}>
                <p
                  onClick={() => {
                    this.props.addSearchIngredientHandler(oneIngredient.name);
                  }}
                >
                  {oneIngredient.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex">
          {this.props.lastSearch.map((oneSearch, index) => {
            return (
              <div className="flex" key={index}>
                <p>{oneSearch}</p>
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
