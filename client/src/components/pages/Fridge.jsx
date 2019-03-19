/* TODO
-> remove ingredients
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
    ingredients: []
  };

  componentDidUpdate() {
    if (this.state.ingredients.length === 0) {
      this.setIngredients();
    }
  }

  handleToggleClick = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  setIngredients = () => {
    console.log('is this OK    ', this.props.fridge._id);

    let fridgeID = { fridgeID: this.props.fridge._id };
    api.getIngredients(fridgeID).then(gotIngredients => {
      // console.log('did it work?', gotIngredients);
      this.setState({
        ingredients: gotIngredients
      });
    });
  };
  render() {
    return (
      <div className="Fridge">
        {/* {console.log('LOOK HERE  ', this.props)} */}
        <h2>Fridge</h2>
        {/* {console.log('HEY  ', this.props.fridge)} */}
        <Ingredients
          fridge={this.props.fridge}
          ingredients={this.state.ingredients}
          setIngredients={this.setIngredients}
        />
        <button onClick={this.handleToggleClick}>
          {!this.state.showForm ? 'Add Ingredient' : 'Hide'}
        </button>
        {this.state.showForm ? (
          <AddIngredient
            fridge={this.props.fridge}
            setIngredients={this.setIngredients}
          />
        ) : null}
      </div>
    );
  }
}

export default Fridge;
