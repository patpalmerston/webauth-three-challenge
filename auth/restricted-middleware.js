// with session and cookies
module.exports = (req, res, next) => {
	console.log(req.session, req.session.user)
	if (req.session && req.session.user) {
		
		next();
	} else {
		res.status(401).json({ error: 'nope not allowed' });
	}
};

// without session and cookies

// const bcrypt = require('bcryptjs');
// const Users = require('../users/users-model');

// module.exports = (req, res, next) => {
// 	let { username, password } = req.headers;

// 	Users.findBy({ username })
// 		.first()
// 		.then(user => {
// 			if (user && bcrypt.compareSync(password, user.password)) {
// 				next();
// 			} else {
// 				res.status(401).json({ message: 'Invalid credentials' });
// 			}
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ error: 'incomplete credentials' });
// 		});
// };
