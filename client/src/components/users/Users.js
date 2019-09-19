import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Users = () => {
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		axiosWithAuth()
			.get('http://localhost:5000/api/users')
			.then(res => {
				console.log(res);
				setUserList(res.data);
			})
			.catch(err => console.log(err));
	};
	return (
		<div>
			{userList.map(user => {
				return (
				<h1>{user.username}</h1>);
			})}
		</div>
	);
};

export default Users;
