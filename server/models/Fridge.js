const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fridgeSchema = new Schema({
  ingredients: [String],
  user_id: String
});

const Fridge = mongoose.model('Fridges', fridgeSchema);
module.exports = Fridge;
