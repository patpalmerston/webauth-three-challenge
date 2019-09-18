const express = require('express');
const bcrypt = require('bcryptjs');

const tokenService = require('./token-service');

const Users = require('../users/users-model');

const router = express.Router();
// const router = require('express').Router()

router.post('/register', (req, res) => {
	let { username, password } = req.body;
	const hash = bcrypt.hashSync(password, 8);

	Users.add({ username, password: hash })
		.then(saved => {
			const token = tokenService.generateToken(saved);
			res.status(201).json({
				message: `Hello ${saved.username} you are registered!`,
				token
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to register user' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = tokenService.generateToken(user);

				return res
					.status(200)
					.json({ message: `Welcome ${user.username}!`, token });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'could not find user' });
		});
});

// Not sure about the logout conversion yet

// router.get('/logout', (req, res) => {
// 	if (req.session) {
// 		req.session.destroy(err => {
// 			if (err) {
// 				res.send('unable to log out');
// 			} else {
// 				res.send('later gator');
// 			}
// 		});
// 	} else {
// 		res.end().send('you were never logged in');
// 	}
// });

module.exports = router;
