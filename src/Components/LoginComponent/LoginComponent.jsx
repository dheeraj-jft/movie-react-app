import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Form,Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { BASE_URL } from '../properties';

const LoginComponent = () => {

  const navigate = useNavigate();

  useEffect(() => {
  
    if(localStorage.getItem("user-item")){
      navigate('/home');
  }  
  }, )
  

  let [newCredentials, setnewCredentials] = useState({
    username:'',
    password:'',
    retypePassword:''
  });


  const inputEvents = (event) =>{
    
    const {value, name} = event.target;
    setnewCredentials((preValue)=>{
      return{
        ...preValue,[name] : value,
      }
    });
  }
  const submitEvent = (event) =>{
    event.preventDefault();

    if(!newCredentials.username.trim()){
      return alert('please type a valid username');
    }
    else if(!newCredentials.password.trim()){
        return alert('password field is empty');
    }
   else if(!newCredentials.retypePassword.trim()){
      return alert(' retype password field is empty');
    }
   else if(newCredentials.password != newCredentials.retypePassword){
      return alert('Password not matched');
    }
    else {
      const user= { username: newCredentials.username, password : newCredentials.password };

      axios.post(`${BASE_URL}/authenticate`,user).then(response => {
      const data = response.data;
      localStorage.setItem("user-item",`Bearer ${data.jwttoken}`);
      navigate('/home');
    }
    ).catch((error =>{
      alert(error.response.data);
    }));

    
    }
    
    
  }

  return (
    <>
    <div className='add-card'>
      <Card className='bg-light justify-content-center flex-between'>
      <Container className='m-5 border-4 w-75 align-items-center'>
    <Form onSubmit={submitEvent}>
    <h3>Login </h3>
    <Form.Group className="mb-3" controlId="formBasicusername">
    <Form.Label>Username</Form.Label>
    <Form.Control onChange={inputEvents}  name='username' type="text" placeholder="Enter username address" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={inputEvents}  name='password' type="password" placeholder="Enter password" autoComplete='on'/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicRetypePassword">
    <Form.Label>Retype Password</Form.Label>
    <Form.Control onChange={inputEvents} name='retypePassword' type="password" placeholder="retype password" autoComplete='on' />
  </Form.Group>
  <br></br>
  <div className='text-center'>
  <Button type='submit' id='login' variant='primary'>Login</Button>
  </div>
</Form>
</Container>
</Card>
</div>
    </>
  )
}

export default LoginComponent