const express = require('express');
const router = express.Router();
const Campsites = require('../models/campsites');
const Reviews = require('../models/reviews');


// Route Route
router.get('/', isLoggedIn, (req, res) => {
    Reviews.find({}, (err, foundReviews) => {
        res.render('reviews/index.ejs', {
          reviews: foundReviews
        });
    });
});

// New Route
router.get('/new', isLoggedIn, (req, res) => {
  Campsites.find({}, (err, allCampsites) => {
    res.render('reviews/new.ejs', {
      campsites: allCampsites
    });
  });
});

// Show Route
router.get('/:id', isLoggedIn, (req, res) => {
  Reviews.findById(req.params.id, (err, foundReview) => {
    console.log(req.params.id);
    console.log(foundReview, ' this is foundReview');
    // find the campsite of the review
    Campsites.findOne({'reviews._id': req.params.id}, (err, foundCampsite) => {
      console.log(foundCampsite, ' this is foundCampsite');
      res.render('reviews/show.ejs', {
        review: foundReview,
        campsite: foundCampsite
      });
    });
	});
});

//  Edit Route
  router.get('/:id/edit', isLoggedIn, (req, res) => {
    Reviews.findById(req.params.id, (err, foundReview) => {
      // Find all the campsites, so we can select them in the drop down menu when we are editing
      Campsites.find({}, (err, allCampsites) => {
        // Then we need to find the campsite the review is currently attached to
        Campsites.findOne({'reviews._id': req.params.id}, (err, foundReviewCampsite) => {
          res.render('reviews/edit.ejs', {
            review: foundReview,
            campsites: allCampsites,
            reviewCampsite: foundReviewCampsite
          });
        });
      });
    });
  });
  
// Post Route
  router.post('/', isLoggedIn, (req, res) => {
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
  router.delete('/:id', isLoggedIn, (req, res) => {
    Reviews.findByIdAndRemove(req.params.id, (err, deletedReview) => {
      console.log(deletedReview, " This is the deleted review");
      // Find the campsite with that review
      Campsites.findOne({'reviews._id': req.params.id}, (err, foundCampsite) => {
        // Find the review in the campsite reviews array and remove it
        foundCampsite.reviews.id(req.params.id).remove();
        foundCampsite.save((err, data) => {
          res.redirect('/reviews');
        });
      });
    });
  });

  // Put Route
  router.put('/:id', isLoggedIn, (req, res) => {
    Reviews.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedReview)=> {
      console.log(updatedReview, " This is the updated review");
      // Find the campsite with that review
      Campsites.findOne({'reviews._id': req.params.id}, (err, foundCampsite) => {
        // Saying the review now belongs to a different campsite
        if(foundCampsite._id.toString() !== req.body.campsiteId) {
          // remove the review from the previous campsite and then save it
          foundCampsite.reviews.id(req.params.id).remove();
          foundCampsite.save((err, savedFoundCampsite) => {
            // Find the new campsite and add the review to their array
            Campsites.findById(req.body.campsiteId, (err, newCampsite) => {
              newCampsite.reviews.push(updatedReview);
              newCampsite.save((err, savedFoundCampsite) => {
                res.redirect('/reviews');
              });
            });
          });
        } else {
          // If the campsite is the same as it was before
          // first fimd the review and remove it, req.params.id = reviews id
          foundCampsite.reviews.id(req.params.id).remove();
          foundCampsite.reviews.push(updatedReview);
          foundCampsite.save((err, data) => {
            res.redirect('/reviews');
          });
        }
      });
    });
  });

function isLoggedIn (req, res, next) {
  if(req.user) {
    console.log('Authenticated');
    return next();
  } else {
      console.log('Not Authenticated');
      res.redirect('/login')
  }
};

module.exports = router;