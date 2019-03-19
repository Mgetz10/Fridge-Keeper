import React, { Component } from 'react';
import MoreIngredients from './MoreIngredients';
import axios from 'axios';
import Ingredients from './Ingredients';
import history from 'react-router-dom';

let baseURL = 'http://api.yummly.com/v1/api/recipes?';
let appID = '_app_id=' + process.env.REACT_APP_APP_ID;
let apiKey = '&_app_key=' + process.env.REACT_APP_API_KEY;
let searchURL = baseURL + appID + apiKey;
let getURL = 'http://api.yummly.com/v1/api/recipe/';
console.log(process.env.REACT_APP_API_KEY);

class Recipes extends Component {
  state = {
    recipes: [],
    yummlyQuery:
      searchURL +
      '&q=' +
      this.props.match.params.ingredient +
      '&requirePictures=true&maxResult=20&start=10'
  };

  componentWillReceiveProps(prevProps, nextProps) {
    if (
      prevProps.match.params.ingredient !== this.props.match.params.ingredient
    ) {
      console.log('will receive props', prevProps.match.params.ingredient);
      this.setState(
        {
          yummlyQuery:
            searchURL +
            '&q=' +
            prevProps.match.params.ingredient +
            '&requirePictures=true&maxResult=20&start=10'
        },
        () => {
          console.log(this.state.yummlyQuery, 'heyo');
          this.callApi();
        }
      );
    }
  }

  componentDidMount() {
    console.log('mounted', this.props.match.params.ingredient);
    this.callApi();
  }

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
    return (
      <div className="Recipes">
        {/* <MoreIngredients
          ingredients={
            this.props.location.state ? this.props.location.state : []
          }
          lastSearch={this.state.ingredient}
        /> */}
        <MoreIngredients
          {...this.props}
          ingredients={
            this.props.location.state ? this.props.location.state : []
          }
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
