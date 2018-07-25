const express = require('express');
const router = express.Router();
const Campsites = require('../models/campsites');
const Reviews = require('../models/reviews');


// Index Route
router.get('/', async (req, res, next) => {
	try {
		const foundCampsites = await Campsites.find();
		res.render('campsites/index.ejs', {
			campsites: foundCampsites
		})
	} catch (err) {
		next(err);
	}
});

// New Route
router.get('/new', (req, res) => {
	res.render('campsites/new.ejs');
});

// Show Route
router.get('/:id', (req, res) => {
	Campsites.findById(req.params.id, (err, foundCampsite) => {
		console.log(foundCampsite, ' this is foundCampsite');
		// Find all reviews on this campsite
		Reviews.find({'campsites.location': req.params.location}, (err, foundReviews) => {
			res.render('campsites/show.ejs', {
				campsite: foundCampsite,
				reviews: foundReviews
			});
		});
	});
});

// Edit Route
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundCampsite = await Campsites.findById(req.params.id);
		res.render('campsites/edit.ejs', {
			campsite: foundCampsite
		})
	} catch (err) {
		res.send(err);
	}
});

// Update Route
router.put('/:id', async (req, res, next) => {
	try {
    const updatedCampsite = await Campsites.findByIdAndUpdate(req.params.id, req.body, {new:true});
		console.log(updatedCampsite, ' this is updatedCampsite');
		res.redirect('/campsites');
	} catch (err) {
		res.send(err);
	}
});

// Create Route
router.post('/', async (req, res, next) => {
	try {
		const createdCampsite = await Campsites.create(req.body);
		console.log(createdCampsite, ' this is createdCampsite');
		res.redirect('/campsites');
	} catch (err) {
		res.send(err);
	}
});

// Destroy Route
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedCampsite = await Campsites.findByIdAndRemove(req.params.id);
		console.log(deletedCampsite, ' this is deletedCampsite');
		res.redirect('/campsites');
	} catch (err) {
		res.send(err);
	}
});




module.exports = router;