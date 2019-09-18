const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConnection = require('../data/dbConfig')

// global middleware

const sessionConfig = {
	name: 'monkey',
	secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: true,
	store: new KnexSessionStore({
		knex: dbConnection,
		tablename: 'session',
		sidfieldname: 'sid',
		createtable: true,
		clearInterval: 1000 * 60 * 60
	})
};

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
	server.use(session(sessionConfig));
};
