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
    res.json({ fridge: fridge[0] });
  });
});

router.post('/addingredient', (req, res, next) => {
  const { name, expdate, daysleft, fridge, image } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Add ingredient name' });
    return;
  }
  const newIngredient = new Ingredient({
    name,
    expdate,
    daysleft,
    fridge,
    image
  });
  newIngredient.save().then(ingredientSaved => {
    Fridge.find({ user_id: req.user._id }).then(fridgeToPush => {
      fridgeToPush[0].ingredients.push(ingredientSaved._id);
      fridgeToPush[0].save();
      return res.json({ itsallgoingdown: true });
    });
  });
});

router.get('/getingredients', (req, res, next) => {
  console.log('made it');
  if (!req.user) {
    return res.send('not logged in');
  }
  Fridge.find({ user_id: req.user._id }).then(fridgeToOpen => {
    console.log('too good', fridgeToOpen[0]._id);
    Ingredient.find({ fridge: fridgeToOpen[0]._id }).then(ingredients => {
      console.log('me', ingredients);
      res.send(ingredients);
    });
  });
});

router.post('/delete-ingredient', (req, res, next) => {
  Fridge.findOneAndUpdate(
    { _id: req.body.fridge },
    { $pull: { ingredients: req.body._id } },
    { new: true }
  ).then(() => {
    console.log(1);
    return Ingredient.findByIdAndDelete({ _id: req.body._id }).then(
      response => {
        console.log(2);
        res.json({ itsallgoingdown: true });
      }
    );
  });
});

module.exports = router;
