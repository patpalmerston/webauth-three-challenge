import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import PrivateRoute from './components/routing/PrivateRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Users from './components/users/Users'

import './App.css';

function App(props) {
  
  return (
    <Router>

    <div className="App">
      <header className="App-header">
        <Route 
          path='/login'
          render={props => <Login {...props} />}
        />
        <Route 
          path='/register'
          render={props => <Register {...props} />}
        />
        <PrivateRoute path='/users' component={Users} />
       
        
      </header>
    </div>
    </Router>
  );
}

export default App;
