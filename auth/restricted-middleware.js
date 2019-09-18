const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	console.log(token);

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(401).json({ error: 'that token dont work son' });
			} else {
				req.decodedJwt = decodedToken;
				console.log('decoded token', req.decodedJwt);
				next();
			}
		});
	} else {
		res.status(500).json({ message: 'NO TOKEN' });
	}
};
