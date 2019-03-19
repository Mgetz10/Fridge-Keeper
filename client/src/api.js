import axios from 'axios';
axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error('API response', err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user');
    return service.get('/logout');
  },

  getFridge() {
    return service
      .get('/getfridge')
      .then(fridge => {
        // console.log(fridge.data.fridge);
        return fridge.data.fridge;
      })
      .catch(err => console.log(err));
  },

  addIngredient(ingredientInfo) {
    return service
      .post('/addingredient', ingredientInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        // localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  getIngredients(fridgeID) {
    console.log('check ME out  ', fridgeID);
    return service
      .post('/getingredients', fridgeID)
      .then(res => {
        console.log('LOOK AT ME   ', res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  },

  deleteIngredient(ingredient) {
    console.log(ingredient);
    return service
      .post('/delete-ingredient', ingredient)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        // localStorage.setItem('user', JSON.stringify(res.data));
        // return res.data;
      })
      .catch(errHandler);
  }
  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
};
