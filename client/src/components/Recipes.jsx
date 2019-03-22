import React, { Component } from 'react';
import MoreIngredients from './MoreIngredients';
import axios from 'axios';
import Ingredients from './Ingredients';
import api from '../api';
import history from 'react-router-dom';

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
    console.log('That  ', prevProps, '  THIS  ', prevState);
    if (prevState.yummlyQuery !== this.state.yummlyQuery) {
      // console.log('will receive props', prevProps.match.params.ingredient);
      // this.setState(
      //   {
      //     yummlyQuery:
      //       searchURL +
      //       '&q=' +
      //       prevProps.match.params.ingredient +
      //       '&requirePictures=true&maxResult=20&start=10'
      //   },
      //   () => {
      //     console.log(this.state.yummlyQuery, 'heyo');
      this.callApi();
      //   }
      // );
    }
    // this.callApi();
  }

  componentDidMount() {
    console.log(this.props.location.state);
    let urlIngredients = [];
    this.state.lastSearchObject.map(ingredient => {
      console.log(ingredient);
      urlIngredients.push(ingredient.name.split(' ').join('+'));
    });
    console.log(urlIngredients);
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
    console.log(ingredientToSearch);
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
    console.log(this.state.yummlyQuery);
    axios
      .get(this.state.yummlyQuery)
      .then(response => {
        console.log(response.data.matches);
        return response.data.matches;
      })
      .then(searchResults => {
        let newRecipes = [];
        searchResults.map(recipe => {
          let getRequest = getURL + recipe.id + '?' + appID + apiKey;
          return axios
            .get(getRequest)
            .then(responseTwo => {
              // console.log('What if this works    ', responseTwo.data);
              newRecipes.push(responseTwo.data);
              this.setState({ recipes: newRecipes });
            })
            .then(() => {
              // console.log(this.state.recipes);
            });
        });
      });
  };
  render() {
    console.log(this.state.ingredients);
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
              {/* <p>{oneRecipe.name}</p> */}
              <img
                src={oneRecipe.images[0].hostedMediumUrl}
                alt={oneRecipe.name}
              />
            </a>
          );
        })}
        {/* {this.state.yummlyQuery} */}
      </div>
    );
  }
}

export default Recipes;

// http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters
// 4ae8cf94
// cafbf046a015241bf6a21b351e35da8d
