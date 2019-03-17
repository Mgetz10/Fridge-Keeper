const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: String,
    expdate: Date,
    daysleft: Number,
    image: String,
    fridge: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Ingredient = mongoose.model('Ingredients', ingredientSchema);
module.exports = Ingredient;
