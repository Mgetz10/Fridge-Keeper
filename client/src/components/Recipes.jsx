import React, { Component } from 'react';
import MoreIngredients from './MoreIngredients';
import axios from 'axios';
import Ingredients from './Ingredients';
import history from 'react-router-dom';
import api from '../api';

let baseURL = 'http://api.yummly.com/v1/api/recipes?';
let appID = '_app_id=' + process.env.REACT_APP_APP_ID;
let apiKey = '&_app_key=' + process.env.REACT_APP_API_KEY;
let searchURL = baseURL + appID + apiKey;
let getURL = 'http://api.yummly.com/v1/api/recipe/';

class Recipes extends Component {
  state = {
    ingredients: [],
    recipes: [],
    lastSearch: [this.props.location.state],
    yummlyQuery:
      searchURL +
      '&q=' +
      this.props.location.state +
      '&requirePictures=true&maxResult=20&start=10'
  };

  componentWillReceiveProps(prevProps, nextProps) {
    // if (
    //   prevProps.match.params.ingredient !== this.props.match.params.ingredient
    // ) {
    //   console.log('will receive props', prevProps.match.params.ingredient);
    //   this.setState(
    //     {
    //       yummlyQuery:
    //         searchURL +
    //         '&q=' +
    //         prevProps.match.params.ingredient +
    //         '&requirePictures=true&maxResult=20&start=10'
    //     },
    //     () => {
    //       console.log(this.state.yummlyQuery, 'heyo');
    //       this.callApi();
    //     }
    //   );
    // }
  }

  componentDidMount() {
    this.getIngredients();
    this.callApi();
  }

  getIngredients = async () => {
    this.setState({ ingredients: await api.getIngredients() });
  };

  addSearchIngredientHandler = ingredientToSearch => {
    let newSearchIngredients = this.state.lastSearch;
    newSearchIngredients.push(ingredientToSearch);
    this.setState({
      lastSearch: newSearchIngredients,
      yummlyQuery:
        searchURL +
        '&q=' +
        newSearchIngredients.join('+') +
        '&requirePictures=true&maxResult=20&start=10'
    });
  };

  deleteSearchIngredientHandler = ingredientToRemoveFromSearch => {
    let lastSearch = this.state.lastSearch;
    lastSearch.splice(lastSearch.indexOf(ingredientToRemoveFromSearch), 1);
    this.setState({
      lastSearch: lastSearch,
      yummlyQuery:
        searchURL +
        '&q=' +
        lastSearch.join('+') +
        '&requirePictures=true&maxResult=20&start=10'
    });
  };

  callApi = () => {
    // axios
    //   .get(this.state.yummlyQuery)
    //   .then(response => {
    //     // console.log(response.data.matches);
    //     return response.data.matches;
    //   })
    //   .then(searchResults => {
    //     let newRecipes = [];
    //     searchResults.map(recipe => {
    //       let getRequest = getURL + recipe.id + '?' + appID + apiKey;
    //       return axios
    //         .get(getRequest)
    //         .then(responseTwo => {
    //           // console.log('What if this works    ', responseTwo.data);
    //           newRecipes.push(responseTwo.data);
    //           this.setState({ recipes: newRecipes });
    //         })
    //         .then(() => {
    //           // console.log(this.state.recipes);
    //         });
    //     });
    //   });
  };
  render() {
    console.log(this.state.ingredients);
    return (
      <div className="Recipes">
        <MoreIngredients
          lastSearch={this.state.lastSearch}
          addSearchIngredientHandler={this.addSearchIngredientHandler}
          deleteSearchIngredientHandler={this.deleteSearchIngredientHandler}
          ingredients={this.state.ingredients ? this.state.ingredients : []}
        />
        {this.state.recipes.map((oneRecipe, index) => {
          return (
            <a href={oneRecipe.source.sourceRecipeUrl} key={index}>
              <img
                src={oneRecipe.images[0].hostedMediumUrl}
                alt={oneRecipe.name}
              />
            </a>
          );
        })}
        {this.state.yummlyQuery}
      </div>
    );
  }
}

export default Recipes;

// http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters
// 4ae8cf94
// cafbf046a015241bf6a21b351e35da8d
