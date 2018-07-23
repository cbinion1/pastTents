const express = require('express');
const router  = express.Router();
const Users  = require('../models/users');

router.get('/', (req, res) => {
    Users.find({}, (err, foundUsers) => {
        res.render('users/index.ejs', {
            users: foundUsers
    });
  });
});

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});


router.get('/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
        res.render('users/show.ejs', {
            users: foundUsers
    });
  });
});

router.get('/:id/edit', (req, res) => {
    Users.findById(req.params.id, (err, foundUsers) => {
        res.render('users/edit.ejs', {
            users: foundUsers
    });
  });
});

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUsers)=> {
            console.log(updatedUsers, " This is the updated user");
    res.redirect('/users');
  });
});


router.post('/', (req, res) => {
            console.log(req.body)
  Users.create(req.body, (err, createdUsers) => {
            console.log(createdUsers, " This is the created user");
    res.redirect('/users');
  });
});


router.delete('/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, deletedUsers) => {
            console.log(deletedUsers, " This is the deleted user");
        res.redirect('/users')
  })
});

module.exports = router;







