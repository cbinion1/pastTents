const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
const reviewsController = require('./controllers/reviews');

// set up controller routes
app.use('/users', usersController);
app.use('/campsites', campsitesController);
app.use('/reviews', reviewsController);

// set up passport
const User = require('./models/users');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new GoogleStrategy({
    clientID: "316136943987-ofqcnosgte4ionkd7q50jojqu5h1i05a.apps.googleusercontent.com",
    clientSecret: "R_Bdwc2QcHz2Pl1zBaqmthzf",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id, displayName: profile.displayName }, function (err, user) {
         return done(err, user);
       });
  }
));

// Main and Index Routes

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
	console.log('user is not authenticated at isLoggedIn');
	res.redirect('/login')
};

// Google routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
  	console.log('successful google login');
  	console.log(req.user);
    res.redirect('/index');
  });

// listen
app.listen(3000, () => {
	console.log('App is listening on port 3000');
});