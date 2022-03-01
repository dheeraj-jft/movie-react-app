import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { useState } from 'react'
import NavBar from './Components/NavbarComponent/NavBar';
import { Route, Routes } from 'react-router-dom';
import AddModalComponent from './Components/AddMovieComponent/AddModalComponent';
import Home from './Components/HomeComponent/Home';
import EditMovieComponent from './Components/EditMovieComponent /EditMovieComponent';
import SearchComponent from './Components/SearchComponent/SearchComponent';
import Error from './Components/ErrorComponent/Error';
import './App.css'
import LoginComponent from './Components/LoginComponent/LoginComponent';
import RegisterComponent from './Components/LoginComponent/RegisterComponent';
import DeactivatedMovieComp from './Components/DeactivatedMovieComp';

const App = () => {

  return (
    <>
    <NavBar/>
      <Routes>
        <Route default path="/home" element={<Home/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/add" element={<AddModalComponent/>}></Route>
        <Route path="/edit/:showId" element={<EditMovieComponent/>}></Route>
        <Route path="/search" element={<SearchComponent/>}></Route>
        <Route path="/login" element={<LoginComponent/>}> </Route>
        <Route path="/register" element={<RegisterComponent/>}> </Route>
        <Route path="/deactivated" element={<DeactivatedMovieComp/>}> </Route>
        
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </>
  )
}

export default App
