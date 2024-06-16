import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminLogin } from "../AdminLoginContext"; 
import { Container } from 'react-bootstrap';


const AdminLoginPage = (props) => {
    
    const {setisAdmin ,username, setUsername, password, setPassword  } = useAdminLogin();
    const [showError, setShowError] = useState(false); 
    const navigate = useNavigate();

    const login = async () => { 
      const url = process.env.REACT_APP_BASE_URL + '/isadmin';
      const body = {
          "username": username,
          "password": password
      };
      const method = 'POST';
      const headers = {'Content-Type': 'application/json'};
  
      const response = await fetch(url, {
          method: method,
          headers: headers,
          body: JSON.stringify(body)
      });
      
      const data = await response.json();

      if (data.status === 200 && data.message === 'success') {
          setUsername(username);
          setPassword(password);
          setisAdmin(true);
          navigate(props.to);
      } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
      }
  };

  return (
    <Container>
        <h1>Admin Login</h1>
        {showError && <div>Invalid username or password</div>}
        <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={()=>login()}>Login</button>
    </Container>
  )
}

AdminLoginPage.defaultProps = {
    to: '/'
}


export default AdminLoginPage
