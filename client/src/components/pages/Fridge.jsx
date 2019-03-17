import React, { Component } from 'react';
import AddIngredient from '../AddIngredient';
import Ingredients from '../Ingredients';

class Fridge extends Component {
  state = {
    showForm: false
  };
  handleToggleClick = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };
  render() {
    return (
      <div className="Fridge">
        {/* {console.log('LOOK HERE  ', this.props)} */}
        <h2>Fridge</h2>
        {console.log('HEY  ', this.props.fridge)}
        <Ingredients fridge={this.props.fridge} />
        <button onClick={this.handleToggleClick}>
          {!this.state.showForm ? 'Add Ingredient' : 'Hide'}
        </button>
        {this.state.showForm ? (
          <AddIngredient fridge={this.props.fridge} />
        ) : null}
      </div>
    );
  }
}

export default Fridge;
