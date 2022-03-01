import axios from 'axios';
import React, { useState } from 'react'
import { Badge, Card, Row, Col, Modal, Button } from 'react-bootstrap';
import { AiFillFlag, AiOutlineFlag, AiOutlineVideoCamera } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { GiSandsOfTime } from 'react-icons/gi';
import { GoPerson } from 'react-icons/go';
import {IoMdAddCircle} from 'react-icons/io'
import { Navigate } from 'react-router-dom';
import { BASE_URL } from '../properties';

const SearchCardComponent = (props) => {
      
    const movie = props.movie;
    const showEnableButton = props.showEnableIcon;
    const [showId, setShowId] = useState('');
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setShowId(id);
  };

    const restoreEvent = () =>{
      const token = localStorage.getItem("user-item");
      axios.put(`${BASE_URL}/movie/activate/${showId}`, movie,{headers :{Authorization : token}}).then(response=>{
        alert(response.data);
        setShow(false);
        props.getDeactivateMovies();
      })
      .catch(error =>{
        console.log(error);
        alert(error.response.data);
      });
    } 
  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restore Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to restore this movie/show ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={restoreEvent} >
            Restore
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="w-100 justify-content-center"lg={3}>
            {movie.map((item, id) => {
              return (
                <Card className="bg-light" key={id}>

                  <Card.Header>
                  <Row>
                  <Col>
                  <span >Type: {item.type}</span><br></br>
                  </Col>
                  {  
                    showEnableButton==true ? <><Col>
        <span className='enableIcon'><IoMdAddCircle size={25} onClick={()=>handleShow(item.showId)}/></span>
        </Col></> : <></>
                  }
                  <Col>
                  <span className='releaseYear'> Relase Year: {item.releaseYear}</span>
                  </Col>
                  
                  </Row>
                  </Card.Header>
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
                      <span><AiOutlineVideoCamera /><b> Director</b>: {item.director}</span><br></br>
                      <span><GoPerson /> <b>Cast</b>: {item.cast}</span>
                      <br></br>
                      <br></br>

                      <span><CgDetailsMore /> <b>Description </b>: {item.description} </span><br></br><br></br>
                      
                    </Card.Text>
                    <span><AiFillFlag/> <b>Country</b>: </span>
                      {
                    
                        item.country.split(',').map((country, idx) =>{
                        return(<small key={idx}><Badge bg="dark">{country}</Badge>{' '}</small>);
                      })
                    }
                    
                    
                  </Card.Body>
                  <Card.Footer><span><GiSandsOfTime /> <b>Duration:</b> {item.duration}</span><span className='rating'> Rating :{item.rating}</span></Card.Footer>
                </Card>
              );
            })
            }
          </Row>

    </>
  )
}

export default SearchCardComponent