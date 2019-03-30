import React, { Component } from 'react';

class MoreIngredients extends Component {
  filterSearchedIngredients = searchedIngredients => {
    let allIngredients = this.props.ingredients;
    let filteredIngredients = allIngredients.filter(
      ingredient => !searchedIngredients.includes(ingredient.name)
    );
    return filteredIngredients;
  };

  render() {
    let filteredIngredients = this.filterSearchedIngredients(
      this.props.lastSearch
    );
    return (
      <div className="MoreIngredientsRecipesContainer">
        <div className="flex">
          <div className="MoreIngredients flex">
            {filteredIngredients.map((oneIngredient, index) => {
              return (
                <div key={index} className="magnet selectables">
                  <div className="ingredient-image-container">
                    <div
                      className="ingredient-image flex"
                      onClick={() => {
                        this.props.addSearchIngredientHandler(oneIngredient);
                      }}
                    >
                      <img src={oneIngredient.image} alt={oneIngredient.name} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="last-search-row flex">
          {this.props.lastSearchObject.map((oneSearch, index) => {
            return (
              <div className="last-search magnet" key={index}>
                <div className="ingredient-image-container flex">
                  <div className="ingredient-image flex">
                    <img src={oneSearch.image} alt={oneSearch.name} />
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
      </div>
    );
  }
}

export default MoreIngredients;
