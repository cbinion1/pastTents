const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

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
app.use(passport.initialize());
app.use(passport.session());

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

// set up passport
const User = require('./models/users');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

// Login Routes

app.get('/', (req, res) => {
	res.render('main.ejs');
});

app.get('/index', isLoggedIn, (req, res) => {
	res.render('index.ejs');
});


// Auth Routes

// show sign up form
app.get('/join', (req, res) => {
	res.render('auth/join.ejs');
});

// handling user sign up
app.post('/join', (req, res) => {
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			res.render('auth/join.ejs');
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/index');
			console.log(user);
		});
	});
});

// LOGIN ROUTES

// render login form
app.get('/login', (req, res) => {
	res.render('auth/login.ejs');
});

// login logic
app.post('/login', passport.authenticate('local', {
	successRedirect: '/index',
	failureRedirect: '/login'
}), (req, res) => {
});

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login')
};

// listen
app.listen(3000, () => {
	console.log('App is listening on port 3000');
});