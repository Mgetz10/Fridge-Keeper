import React, { Component } from 'react';
import api from '../api';
import presetIngredients from '../ingredients.json';
// import poop from '../../images/'

class AddIngredient extends Component {
  state = {
    name: '',
    expdate: {},
    presetIngredients: [...presetIngredients],
    filteredIngredients: [],
    image: ''
  };

  setFilteredIngredients = filteredIngredients => {
    this.setState({ filteredIngredients: filteredIngredients });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    this.setFilteredIngredients(
      this.state.presetIngredients.filter(ingredient => {
        return ingredient.name
          .toUpperCase()
          .includes(event.target.value.toUpperCase());
      })
    );
  };

  async handleClick(e) {
    e.preventDefault();
    const currentDate = new Date(Date.now());
    const expdate = new Date(this.state.expdate.split(' ')[0]);
    let data = {
      name: this.state.name,
      expdate: expdate,
      daysleft: Math.floor((expdate - currentDate) / (1000 * 60 * 60 * 24)),
      fridge: await api.getFridge(),
      image: this.state.image
    };
    api
      .addIngredient(data)
      .then(result => {
        this.props.getIngredients();
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  addDays = days => {
    var date = new Date(Date.now());
    date.setDate(date.getDate() + days);
    return date;
  };

  presetIngredientClickHandler = presetIngredient => {
    let expdate = this.addDays(presetIngredient.shelfLife);
    this.setState({
      name: presetIngredient.name,
      expdate: expdate.toISOString().substr(0, 10),
      image: presetIngredient.image
    });
  };

  render() {
    return (
      <div className="Add-Ingredient">
        <h2>Add Ingredient</h2>
        <form className="form flex">
          <div className="form-inputs">
            Name:
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-inputs">
            Expiration Date:
            <input
              type="date"
              value={this.state.expdate}
              name="expdate"
              onChange={this.handleInputChange}
            />
            <button onClick={e => this.handleClick(e)}>Add Ingredient</button>
            {/* </div> */}
          </div>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
        <div className="flex">
          <div className="presets flex">
            <div className="presets2">
              {this.state.filteredIngredients.map((ingredient, index) => {
                return (
                  <p
                    key={index}
                    className="preset-ingredients"
                    onClick={() => {
                      this.presetIngredientClickHandler(ingredient);
                    }}
                  >
                    {ingredient.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddIngredient;
