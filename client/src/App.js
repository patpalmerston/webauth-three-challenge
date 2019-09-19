import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/users/Users';

import './App.css';

function App(props) {
  function logout() {
    localStorage.clear()
  }
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<NavLink to='/register'>Register</NavLink>
					<NavLink to='/login'>Login</NavLink>
					<NavLink to='/users'>Users</NavLink>
          <NavLink to='/login' onClick={() => logout()}>Log Out</NavLink>

					<Route path='/login' render={props => <Login {...props} />} />
					<Route path='/register' render={props => <Register {...props} />} />
					<PrivateRoute path='/users' component={Users} />
				</header>
			</div>
		</Router>
	);
}

export default App;
