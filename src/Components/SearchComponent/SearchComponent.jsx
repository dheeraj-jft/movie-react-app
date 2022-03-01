import React, {useState, useEffect} from 'react'
import {Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import {FcSearch} from 'react-icons/fc'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchCardComponent from '../CardComponent/SearchCardComponent';
import { BASE_URL } from '../properties';

const SearchComponent = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("user-item")){
      navigate("/login");
    }
  },);
  

    const [value, setvalue] = useState("");
    const [movie, setmovie] = useState({});
    const [result, setresult] = useState({});

    

    const inputEvent = (event) =>{
        const data = event.target.value;
      
        setvalue(data);
        if(data === ''){
           return setresult({});
        }
        const results = movie.filter(item => {
          if(item.title.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
              return item;
          }
        else if(item.director.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
            return item;
        }
        else if(item.description.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
          return item;
        }
        else if(item.cast.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
          return item;
        }
        else if(item.listedIn.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
          return item;
        }
        else if(item.type.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
          return item;
        }
        else if(item.country.toLocaleLowerCase().includes(data.toLocaleLowerCase())){
          return item;
        }
        return null;
        });
        setresult(results);
    }

    const getAllMovies = () => {
      const token = localStorage.getItem("user-item");
      axios.get(`${BASE_URL}/movie`,{headers :{Authorization : token}}).then(response => {
        const data = response.data;
        setmovie(data);
      });
      }

    useEffect(() => {  
        getAllMovies();
    },[]);

  return (
    <>

<div className='container'>
<h2 className='h2'>Search Movies</h2>    
      <Form className="m-5">
      <FormGroup>
      <Row>
      
      <Col xs="10" md="11">
        <FormControl
          type="search"
          placeholder="Search in movies"
          className="me-2"
          aria-label="Search"
          value={value}
          onChange={inputEvent}

        />
        </Col>
        <Col xs="1" md="1">
        <FormLabel> <FcSearch size="30" /></FormLabel>
        </Col>
        </Row>
        </FormGroup>
      </Form>    
      
      </div>
      
      {
        result.length > 0? ( <SearchCardComponent movie={result} /> ): ( <h3><b>No Result Found</b></h3>)
        
      }
    </>
  )
}

export default SearchComponent;