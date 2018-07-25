const express = require('express');
const router = express.Router();
const Campsites = require('../models/campsites');
const Reviews = require('../models/reviews');


// Route Route
router.get('/', (req, res) => {
    Reviews.find({}, (err, foundReviews) => {
        res.render('reviews/index.ejs', {
          reviews: foundReviews
        });
    });
});

// New Route
router.get('/new', (req, res) => {
  Campsites.find({}, (err, allCampsites) => {
    res.render('reviews/new.ejs', {
      campsites: allCampsites
    });
  });
});

// Show Route
router.get('/:id', (req, res) => {
    Reviews.findById(req.params.id, (err, foundReviews) => {
        res.render('reviews/show.ejs', {
            reviews: foundReviews
		});
	});
});

//  Edit Route
  router.get('/:id/edit', (req, res) => {
      Reviews.findById(req.params.id, (err, foundReviews) => {
          res.render('reviews/edit.ejs', {
              reviews: foundReviews
      });
    });
  });
  
  // Put Route
  router.put('/:id', (req, res) => {
    Reviews.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedReviews)=> {
              console.log(updatedReviews, " This is the updated review");
      res.redirect('/reviews');
    });
  });

// Post Route
  router.post('/', (req, res) => {
    console.log(req.body, ' this is req.body')
    // create a review, push a copy into the Campsite reviews array
    Campsites.findById(req.body.campsiteId, (err, foundCampsite) => {
      console.log(foundCampsite, ' this is foundCampsite');
      console.log(foundCampsite.location, ' this is foundCampsite.location');
      req.body.location = foundCampsite.location;
      console.log(req.body, ' this is 2nd req.body');
      Reviews.create(req.body, (err, createdReview) => {
        foundCampsite.reviews.push(createdReview);
        foundCampsite.save((err, data) => {
          res.redirect('/reviews');
        });
      });
    });
  });
  
  // Delete Route
  router.delete('/:id', (req, res) => {
      Reviews.findByIdAndRemove(req.params.id, (err, deletedReviews) => {
              console.log(deletedReviews, " This is the deleted review");
          res.redirect('/reviews')
    })
  });



module.exports = router;