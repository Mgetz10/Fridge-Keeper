import React, { Component } from 'react';
import MoreIngredients from './MoreIngredients';
import axios from 'axios';
import api from '../api';

let baseURL = 'https://api.yummly.com/v1/api/recipes?';
let appID = '_app_id=' + process.env.REACT_APP_APP_ID;
let apiKey = '&_app_key=' + process.env.REACT_APP_API_KEY;
let searchURL = baseURL + appID + apiKey;
let getURL = 'https://api.yummly.com/v1/api/recipe/';

class Recipes extends Component {
  state = {
    ingredients: [],
    recipes: [],
    lastSearch: [],
    lastSearchObject: [this.props.location.state],
    yummlyQuery: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.yummlyQuery !== this.state.yummlyQuery) {
      this.callApi();
    }
  }

  componentDidMount() {
    let urlIngredients = [];
    this.state.lastSearchObject.map(ingredient =>
      urlIngredients.push(ingredient.name.split(' ').join('+'))
    );
    this.setState({
      lastSearch: urlIngredients,
      yummlyQuery:
        searchURL +
        '&q=' +
        urlIngredients.join('+') +
        '&requirePictures=true&maxResult=50&start=10'
    });
    this.getIngredients();
    this.callApi();
  }

  getIngredients = async () => {
    this.setState({ ingredients: await api.getIngredients() });
  };

  addSearchIngredientHandler = ingredientToSearch => {
    let newSearchIngredients = this.state.lastSearch;
    let newSearchIngredientObjects = this.state.lastSearchObject;
    newSearchIngredients.push(ingredientToSearch.name);
    newSearchIngredientObjects.push(ingredientToSearch);
    this.setState({
      lastSearch: newSearchIngredients,
      lastSearchObject: newSearchIngredientObjects,
      yummlyQuery:
        searchURL +
        '&q=' +
        newSearchIngredients.join('+') +
        '&requirePictures=true&maxResult=20&start=10'
    });
  };

  deleteSearchIngredientHandler = ingredientToRemoveFromSearch => {
    let lastSearch = this.state.lastSearch;
    let lastSearchObject = this.state.lastSearchObject;
    lastSearch.splice(lastSearch.indexOf(ingredientToRemoveFromSearch), 1);
    lastSearchObject.splice(
      lastSearch.indexOf(ingredientToRemoveFromSearch),
      1
    );
    this.setState({
      lastSearch: lastSearch,
      lastSearchObject: lastSearchObject,
      yummlyQuery:
        searchURL +
        '&q=' +
        lastSearch.join('+') +
        '&requirePictures=true&maxResult=20&start=10'
    });
  };

  callApi = () => {
    axios
      .get(this.state.yummlyQuery)
      .then(response => {
        return response.data.matches;
      })
      .then(searchResults => {
        let newRecipes = [];
        searchResults.map(recipe => {
          let getRequest = getURL + recipe.id + '?' + appID + apiKey;
          return axios
            .get(getRequest)
            .then(responseTwo => {
              newRecipes.push(responseTwo.data);
              this.setState({ recipes: newRecipes });
            })
            .then(() => {});
        });
      });
  };
  render() {
    return (
      <div className="Recipes">
        <MoreIngredients
          lastSearch={this.state.lastSearch}
          lastSearchObject={this.state.lastSearchObject}
          addSearchIngredientHandler={this.addSearchIngredientHandler}
          deleteSearchIngredientHandler={this.deleteSearchIngredientHandler}
          ingredients={this.state.ingredients ? this.state.ingredients : []}
        />
        {this.state.recipes.map((oneRecipe, index) => {
          return (
            <a
              className="recipes"
              href={oneRecipe.source.sourceRecipeUrl}
              key={index}
            >
              <img
                src={oneRecipe.images[0].hostedMediumUrl}
                alt={oneRecipe.name}
              />
            </a>
          );
        })}
      </div>
    );
  }
}

export default Recipes;
