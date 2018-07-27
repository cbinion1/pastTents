const express = require('express');
const router  = express.Router();
const Users  = require('../models/users');

router.get('/:id', isLoggedIn, (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
        res.render('users/show.ejs', {
            users: foundUsers
    });
  });
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
    Users.findById(req.params.id, (err, foundUsers) => {
        res.render('users/edit.ejs', {
            users: foundUsers
    });
  });
});

router.put('/:id', isLoggedIn, (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUsers)=> {
            console.log(updatedUsers, " This is the updated user");
    res.redirect('/users');
  });
});

router.delete('/:id', isLoggedIn, (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, deletedUsers) => {
            console.log(deletedUsers, " This is the deleted user");
        res.redirect('/users')
  })
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







