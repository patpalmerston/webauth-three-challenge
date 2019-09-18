const express = require('express');
const Users = require('./users-model');

const restricted = require('../auth/restricted-middleware');

const router = express.Router();

// Need to add user validation Middleware
router.get('/', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'could not find users' });
		});
});

// Need to add user validation Middleware
router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;

	Users.findById(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to locate user' });
		});
});

module.exports = router;
