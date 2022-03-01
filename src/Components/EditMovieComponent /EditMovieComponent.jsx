import React, {useState, useEffect,useMemo} from 'react'
import { Form,Button, Container, Card, FormControl } from 'react-bootstrap'
import './EditCard.css'
import { BASE_URL } from '../properties'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const CountrySelector=(props)=> {

  const [value] = props.country;
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    console.log(value); 
    props.setCountry(value?.label);
  }

  return <Select name="country" options={options} value={value?value.label:value} onChange={changeHandler} />
}

const EditMovieComponent = () => {
  const {showId} = useParams();
  const token = localStorage.getItem("user-item");
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate("/login");
    }
  },);

  
  let [movie, setmovie] = useState({
    type :"movie",
    title : "",
    director : "",
    releaseYear: "",
    cast: "",
    country: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: ""
  });

  const getMovieData=()=>{
    axios.get(`${BASE_URL}/movie/byId/${showId}`,{headers :{Authorization : token}}).then(response => {
      const data = response.data;
      setmovie(data);
      
  });
  }

  useEffect(() => {
    getMovieData();
  }, []);

  function setCountry(data){
    setmovie((preValue)=>{
      return{
        ...preValue,
        country : data
      }
      
    })
  }

  const inputEvents = (event) =>{
    const {value, name} = event.target;
    setmovie((preValue)=>{
      return{
        ...preValue,
        [name] : value,
      }
    });
  }
  const submit = (event) =>{
    event.preventDefault();
    
    console.log(movie);
    if(movie.type && movie.cast && movie.country && movie.description
       && movie.director && movie.duration && movie.listedIn 
       && movie.rating && movie.releaseYear && movie.title)
       {
  axios.put(`${BASE_URL}/movie/${showId}`, movie,{headers :{Authorization : token}}).then(response=>{
    alert(response.data);
  });
        navigate('/home');

  }
  else if(!movie.type)
      {
        alert("Please choose type");
       }
       else if(!movie.title)
        {
        alert("Please enter movie name");
       }
       else if(!movie.director)
        {
        alert("Please enter director's name");
       }
       else if(!movie.cast)
        {
        alert("Please enter cast ");
       }
       else if(!movie.country)
        {
        alert("Please select a country");
       }
       else if(!movie.releaseYear)
        {
        alert("Please enter release year");
       }
       else if(!movie.rating)
      {
        alert("Please select a rating");
       }
       else if(!movie.duration)
      {
        alert("Please enter movie's duration");
       }
       else if(!movie.listedIn)
      {
        alert("Please enter Listed in / Genre");
       }
       else if(!movie.description)
      {
        alert("Please enter some description");
       }
       else{
         alert("Please fill form data")
       }
  }
  

  return (
  
    <>
      <div className='add-card'>
      <Card className='bg-light w-75 justify-content-center flex-between'>
      <Container className='m-5 border-4 w-75 align-items-center'>
    <Form onSubmit={submit}>
    <h3>Edit movie</h3>
    <Form.Group>
    <Form.Label>Select a type</Form.Label>
      <Form.Select name='type' onChange={inputEvents} value={movie.type} aria-label="Select type">
        <option value="movie">Movie</option>
        <option value="show">Show</option>
      </Form.Select> 
  </Form.Group>
  <br></br>
  
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Movie Title</Form.Label>
    <Form.Control onChange={inputEvents} name='title' value={movie.title} type="text" placeholder="Enter movie title (movie name)" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Director's name</Form.Label>
    <Form.Control onChange={inputEvents}  name='director'value={movie.director} type="text" placeholder="Enter director's name" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Cast</Form.Label>
    <Form.Control onChange={inputEvents}  name='cast' type="text" value={movie.cast} placeholder="Enter cast name in comma seprated eg.(john, mike)" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Release Country</Form.Label>
    <CountrySelector onChange={inputEvents} country={movie.country} value={movie.country} setCountry={setCountry} name="country" /> 
  </Form.Group>
  {/* Date added -- Todays date do it using java. */}

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Release Year</Form.Label>
    <Form.Control onChange={inputEvents} name='releaseYear' type="number" value={movie.releaseYear} placeholder="Enter a year" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Rating</Form.Label>
    <Form.Select onChange={inputEvents} name='rating' value={movie.rating} aria-label="Select rating">
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="TV-14">TV-14</option>
        <option value="TV-MA">TV-MA</option>
        <option value="TV-PG">TV-PG</option>
      </Form.Select> 
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Duration</Form.Label>
    <Form.Control type="text" onChange={inputEvents} name='duration' value ={ movie.duration} placeholder="Enter Duration eg. (120 Minutes, 7 Seasons)" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Listed in / Genre</Form.Label>
    <Form.Control type="text" onChange={inputEvents} name='listedIn' value= {movie.listedIn} placeholder="Enter Genre" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Description</Form.Label>
    <FormControl onChange={inputEvents} name='description' as="textarea" value= {movie.description} rows={3} placeholder="Enter movie's description" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Save & Submit
  </Button>
</Form>
</Container>
</Card>
</div>
</>
  )
}

export default EditMovieComponent