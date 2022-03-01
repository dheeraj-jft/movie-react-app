import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react';
import { BASE_URL } from './properties';
import { Navigate, useNavigate } from 'react-router-dom';
import SearchCardComponent from './CardComponent/SearchCardComponent';

const DeactivatedMovieComp = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("user-item");
    useEffect(() => {
      if(!token){
          navigate('/login');
      }
      else{
        getDeactivateMovies();
      }

    }, []);
    

    const [movie, setmovie] = useState([]);

    const getDeactivateMovies= ()=>{

    axios.get(`${BASE_URL}/movie/deactivated`,{headers :{Authorization : token}})
    .then(response=>{
        const data = response.data;
        setmovie(data);
    }).catch(error =>{
      console.log(error);
      alert(error.response.data);
    });
};


  return (
    <>

<h2 style={{marginTop:40}}>Deactivated Movies/Shows</h2>    
      
      { movie.length>0?( <SearchCardComponent movie={movie} showEnableIcon={true} getDeactivateMovies={getDeactivateMovies} /> ): ( <h3><b>No Result Found</b></h3>)
      }

    </>

  )
}

export default DeactivatedMovieComp