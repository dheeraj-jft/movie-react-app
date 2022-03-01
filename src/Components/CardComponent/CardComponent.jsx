import React from 'react'
import { useState, useEffect, } from 'react'
import axios from 'axios';
import { Card, Button, Modal, Badge, ButtonGroup, Row} from 'react-bootstrap';
import { GoPerson } from 'react-icons/go'
import { AiOutlineVideoCamera, AiFillEdit, AiFillDelete, AiFillFlag } from 'react-icons/ai'
import { CgDetailsMore } from 'react-icons/cg'
import { GiSandsOfTime } from 'react-icons/gi'
import './CardComponent.css'
import { BASE_URL } from '../properties';
import {useNavigate} from 'react-router-dom';



const CardComponent = () => {


  const navigate = useNavigate();
  const [movie, setmovie] = useState([]);
  const [show, setShow] = useState(false);
  const [showId, setShowId] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleDelete = (showId) => {
    setShowId(showId);
    handleShow();
  }
  const token = localStorage.getItem("user-item");

  useEffect(() => {
      getAllMovies();
  }, [])

  const getAllMovies = () => {
    axios.get(`${BASE_URL}/movie`).then(response => {
      const data = response.data;
      setmovie(data);
    });
  }

  const deleteMovie = (showId) => {
    axios.delete(`${BASE_URL}/movie/${showId}`,{headers :{Authorization : token}})
      .then(response => {
        if (response.status === 200) {
          getAllMovies();
          handleClose();
        }
      });
  }


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this movie</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { deleteMovie(showId) }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="w-100 justify-content-center"lg={3}>
            {movie.map((item, id) => {
              return (
                <Card className="bg-light" key={id}>
                  <Card.Header><span >Type: {item.type}</span><span className='releaseYear'> Relase Year: {item.releaseYear}</span></Card.Header>
                  <Card.Body>
                  <small>Last modified date: <Badge bg="secondary">{item.dateAdded}</Badge></small>{' '}
                  <br></br>
                  <br></br>
                    <Card.Title><b>{item.title}</b></Card.Title>
                  {
                    
                       item.listedIn.split(',').map((genre, idx) =>{
                         return(<span key={idx}><Badge bg="primary">{genre}</Badge>{' '}</span>);
                       })
                    
                  }
                    <br></br>
                    <br></br>

                    <Card.Text>
                      <br></br>
                      <span><AiOutlineVideoCamera /><b> Director</b>: {item.director}</span><br></br>
                      <span><GoPerson /> <b>Cast</b>: {item.cast}</span>
                      <br></br>
                      <span><CgDetailsMore /> <b>Description </b>: {item.description} </span><br></br>
                    </Card.Text>
                    <span><AiFillFlag/> <b>Country</b>: </span>
                      {
                    
                        item.country.split(',').map((country, idx) =>{
                        return(<small key={idx}><Badge bg="dark">{country}</Badge>{' '}</small>);
                      })
                    }
                    
                  </Card.Body>
                  {
                   localStorage.getItem("user-item") ? <><ButtonGroup>
                    <Button className='btn-warning'onClick={()=> navigate(`/edit/${item.showId}`)}><AiFillEdit /> Edit</Button>{'  '}
                    <Button className='btn-danger' onClick={() => handleDelete(item.showId)}><AiFillDelete /> Delete</Button>{'  '}
                  </ButtonGroup></> : <></>
                  }
                  <Card.Footer><span><GiSandsOfTime /> <b>Duration:</b> {item.duration}</span><span className='rating'> Rating :{item.rating}</span></Card.Footer>
                </Card>
              );
            })
            }
          </Row>

    </>
  );
}
export default CardComponent;
