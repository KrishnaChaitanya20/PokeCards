import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const login = () => {
    const url=process.env.REACT_APP_BASE_URL+'/isuser';
    const body={
      "username":username,
      "password":password
    }
    const method='POST';
    const headers={'Content-Type': 'application/json'};

      return async ()=>{
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if(data.status===200 && data.message==='success'){
          setUsername(username);
          setPassword(password);
          setIsLoggedIn(true);
          return true;
        }
        else{
          return false;
        }
      }
  }
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, username, setUsername, password, setPassword , login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};