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
        <div className="flex">
          <div className="MoreIngredients flex">
            {filteredIngredients.map((oneIngredient, index) => {
              return (
                <div className="selectables">
                  <div key={index} className="ingredient-image-container">
                    <div
                      className="ingredient-image flex"
                      onClick={() => {
                        this.props.addSearchIngredientHandler(oneIngredient);
                      }}
                    >
                      <img src={oneIngredient.image} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="last-search-row flex">
          {this.props.lastSearchObject.map((oneSearch, index) => {
            console.log('check', oneSearch);
            return (
              <div className="last-search">
                <div className="ingredient-image-container flex" key={index}>
                  <div className="ingredient-image flex">
                    <img src={oneSearch.image} />
                    <span
                      onClick={() => {
                        this.props.deleteSearchIngredientHandler(oneSearch);
                      }}
                    >
                      ×
                    </span>
                  </div>
                </div>
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
