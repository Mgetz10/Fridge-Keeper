/* TODO
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
import { Redirect } from 'react-router-dom';

class Fridge extends Component {
  state = {
    showForm: false,
    ingredients: [],
    didSearch: false
  };

  componentDidMount() {
    this.getIngredients();
  }

  handleToggleClick = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  deleteIngredient = ingredient => {
    api.deleteIngredient(ingredient).then(res => {
      this.getIngredients();
    });
  };

  getIngredients = async () => {
    this.setState({ ingredients: await api.getIngredients() });
  };

  render() {
    if (!api.isLoggedIn()) return <Redirect to="/login" />;
    return (
      <div className="Fridge">
        <h2>Fridge</h2>
        <Ingredients
          ingredients={this.state.ingredients}
          setIngredients={this.setIngredients}
          deleteIngredient={this.deleteIngredient}
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
