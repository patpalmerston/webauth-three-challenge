const db = require('../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find() {
	return db('users').select('id', 'username', 'department');
}

function findBy(username) {
	return db('users').where(username)
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

function add(user) {
	return db('users')
		.insert(user, 'id')
		.then(ids => {
			const [id] = ids;
			return findById(id);
		});
}
