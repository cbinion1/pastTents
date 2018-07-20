const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

// require db
require('./db/db');

// set up middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
}));

// use public folder for CSS
app.use(express.static(__dirname + '/public'));

// require our controllers
const usersController = require('./controllers/users');
const campsitesController = require('./controllers/campsites');
const authController = require('./controllers/auth');

// set up controller routes
app.use('/users', usersController);
app.use('/campsites', campsitesController);
app.use('/auth', authController);

app.get('/', (req, res) => {
	res.render('main.ejs');
});

app.listen(3000, () => {
	console.log('App is listening on port 3000');
});