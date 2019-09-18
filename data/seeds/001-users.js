exports.seed = function(knex) {
	return knex('users').insert([
		{ username: 'pat', password: 'pat' },
		{ username: 'kel', password: 'kel' },
		{ username: 'pay', password: 'pay' }
	]);
};
