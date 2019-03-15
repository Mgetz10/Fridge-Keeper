const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

router.get('/whatever', (req, res, next) => {
  console.log('in whatever', req.user);
  res.json({ user: req.user });
});

// router.post('/addingredient', (req, res, next) => {

// });

module.exports = router;
