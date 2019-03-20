/* TODO
-> remove 'more ingredients'
-> add selectable list
 -> create json file for available lists
-> add pictures
 -> change database for pictures
-> add fridge css
 */

import React, { Component } from 'react';
import AddIngredient from '../AddIngredient';
import Ingredients from '../Ingredients';
import api from '../../api';

class Fridge extends Component {
  state = {
    showForm: false,
    ingredients: [],
    didSearch: false
  };

  componentDidMount() {
    this.getIngredients();
  }

  // componentDidUpdate() {
  //   console.log(this.state.didSearch);
  //   if (!this.state.didSearch) {
  //     this.setIngredients();
  //   }
  // }

  handleToggleClick = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  deleteIngredient = ingredient => {
    api.deleteIngredient(ingredient).then(res => {
      console.log(4, res);
      this.getIngredients();
    });
  };

  getIngredients = async () => {
    this.setState({ ingredients: await api.getIngredients() });
  };

  render() {
    return (
      <div className="Fridge">
        <h2>Fridge</h2>
        <Ingredients
          deleteIngredient={this.deleteIngredient}
          ingredients={this.state.ingredients}
          setIngredients={this.setIngredients}
        />
        <button onClick={this.handleToggleClick}>
          {!this.state.showForm ? 'Add Ingredient' : 'Hide'}
        </button>
        {this.state.showForm ? (
          <AddIngredient getIngredients={this.getIngredients} />
        ) : null}
      </div>
    );
  }
}

export default Fridge;
