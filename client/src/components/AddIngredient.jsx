import React, { Component } from 'react';
import api from '../api';

class AddIngredient extends Component {
  //   name: String,
  //   expdate: Date,
  //   daysleft: Number,
  //   image: String,
  //   fridge_id: String
  state = {
    name: '',
    expdate: {}
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick(e) {
    e.preventDefault();
    const currentDate = new Date(Date.now());
    const expdate = new Date(this.state.expdate.split(' ')[0]);
    let data = {
      name: this.state.name,
      expdate: expdate,
      daysleft: Math.floor((expdate - currentDate) / (1000 * 60 * 60 * 24)),
      fridge: this.props.fridge._id
    };
    api
      .addIngredient(data)
      .then(result => {
        console.log('SUCCESS!');
        this.props.history.push('/'); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Add-Ingredient">
        <h2>Add Ingredient</h2>
        <form>
          Name:
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <br />
          Expiration Date:
          <input
            type="date"
            value={this.state.expdate}
            name="expdate"
            onChange={this.handleInputChange}
          />
          <br />
          <button onClick={e => this.handleClick(e)}>Add Ingredient</button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default AddIngredient;
