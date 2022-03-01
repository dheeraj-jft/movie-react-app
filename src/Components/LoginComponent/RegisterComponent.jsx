import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Form,Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { BASE_URL } from '../properties';

const RegisterComponent = () => {


  let [newCredentials, setnewCredentials] = useState({
    username:'',
    password:'',
    retypePassword:''
  });

  const navigate = useNavigate();

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
    if(usernameValidation()===false){
      return alert('please type a valid username');
    }
    else if(!newCredentials.password){
        return alert('password field is empty');
    }
   else if(!newCredentials.retypePassword){
      return alert(' retype password field is empty');
    }
   else if(newCredentials.password != newCredentials.retypePassword){
      return alert('Password not matched');
    }
    else {
      var user= { username: newCredentials.username,password : newCredentials.password };

    axios.post(`${BASE_URL}/register`,user).then(response => {
      const data = response.data;
      alert(data);
      navigate('/login');    
      
    }).catch((error =>{
      if(error.response.status != 200){
        alert("Error: Username already exists");
    }
    }));

    
    }
    
    
  }
const  usernameValidation=()=>{
    
    if(!newCredentials.username){
        return false;
    }
    return true;
}

  return (
    <>
    <div className='add-card'>
      <Card className='bg-light justify-content-center flex-between'>
      <Container className='m-5 border-4 w-75 align-items-center'>
    <Form onSubmit={submitEvent}>
    <h3>Register User </h3>
    <Form.Group className="mb-3" controlId="formBasicusername">
    <Form.Label>username</Form.Label>
    <Form.Control onChange={inputEvents}  name='username' type="text" placeholder="Enter username" />
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
  <Button type='submit' id='login' variant='primary'>Register</Button>
  </div>
</Form>
</Container>
</Card>
</div>
    </>
  )
}

export default RegisterComponent