const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Fridge = require('../models/Fridge');
const Ingredient = require('../models/Ingredient');

router.get('/whatever', (req, res, next) => {
  console.log('in whatever', req.user);
  res.json({ user: req.user });
});

router.get('/getfridge', (req, res, next) => {
  Fridge.find({ user_id: req.user._id }).then(fridge => {
    console.log('WOWOWOWOWOW:   ', fridge[0]);
    res.json({ fridge: fridge[0] });
  });
});

router.post('/addingredient', (req, res, next) => {
  const { name, expdate, daysleft, fridge } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Add ingredient name' });
    return;
  }
  const newIngredient = new Ingredient({ name, expdate, daysleft, fridge });
  newIngredient.save().then(ingredientSaved => {
    Fridge.findById(fridge).then(fridgeToPush => {
      console.log('OKOKOKOKOKOK:   ', fridgeToPush);
      fridgeToPush.ingredients.push(ingredientSaved._id);
      fridgeToPush.save();
    });
  });
});

module.exports = router;
