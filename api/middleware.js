const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const cors = require('cors');

const logger = (req, res, next) => {
	console.log(
		`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
			'Origin'
		)}`
	);
	next();
};

module.exports = server => {
	server.use(morgan('dev'));
	server.use(helmet());
	server.use(express.json());
	server.use(logger);
	// server.use(cors);
};
