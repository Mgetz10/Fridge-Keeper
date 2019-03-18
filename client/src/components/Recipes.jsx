import React, { Component } from 'react';
import MoreIngredients from './MoreIngredients';
import axios from 'axios';
import Ingredients from './Ingredients';

let baseURL = 'http://api.yummly.com/v1/api/recipes?';
let appID = '_app_id=4ae8cf94';
let apiKey = '&_app_key=cafbf046a015241bf6a21b351e35da8d';
let searchURL = baseURL + appID + apiKey;
let getURL = 'http://api.yummly.com/v1/api/recipe/';

class Recipes extends Component {
  state = {
    recipes: [],
    ingredient: this.props.match.params.ingredient
    // search:
    //   '&q=' + this.ingredient + '&requirePictures=true&maxResult=20&start=10',
    // yummlyQuery: searchURL + this.search
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.ingredient !== this.props.match.params.ingredient
    ) {
      // console.log('call api', nextProps.match.params.ingredient);
      this.callApi(nextProps.match.params.ingredient);
    }
  }

  componentDidMount() {
    // console.log('mounted', this.props.match.params.ingredient);
    this.callApi(this.props.match.params.ingredient);
  }

  callApi = ingredients => {
    console.log(ingredients, 'heyo');
    this.setState({ ingredient: this.state.ingredient + ingredients }, () => {
      console.log(this.state.ingredient);
    });
    // axios
    //   .get(this.yummlyQuery)
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
    return (
      <div className="Recipes">
        <MoreIngredients
          ingredients={
            this.props.location.state ? this.props.location.state : []
          }
          lastSearch={this.state.ingredient}
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
      </div>
    );
  }
}

export default Recipes;

// http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your _search_parameters
// 4ae8cf94
// cafbf046a015241bf6a21b351e35da8d
