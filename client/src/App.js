import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthForm from './components/auth/AuthForm';
import { AuthContext } from './components/auth/auth';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const existingToken = localStorage.getItem("token") || "";
  const existingUsername = localStorage.getItem("username") || "";
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);

  const setUserName = (data) => {
    if(!data) {
      localStorage.removeItem('username');
      setUsername();
    } else {
      localStorage.setItem('username', data);
      setUsername(data);
    }
  }

  const setToken = (data) => {
    if(!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', JSON.stringify(authToken));
      setAuthToken(data);
    }
  }

  return (
    <AuthContext.Provider value={{authToken, setAuthToken: setToken, username, setUserName: setUserName}}>
      <BrowserRouter>
        <div className='App'>
          <AuthForm />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
    
  )

}

export default App;
