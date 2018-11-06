const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession');

// CONTROLLERS
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const fc = require('./controllers/search_controller');

const app = express();

//PORT
const {SERVER_PORT, SESSION_SECRET} = process.env;
const port = SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static(`./../build`));

// SWAG
app.get('/api/swag', sc.read);

// AUTH
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

// CART
app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete);

//FILTER
app.get('/api/search', fc.search);

app.listen(port, () => {
    console.log('im a lead farmer muthafucka')
    console.log('they can hear us on', port)
})