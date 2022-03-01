import React from 'react'
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg';
import {IoIosAdd, IoIosSearch} from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
  const navigate = useNavigate();

   const handleLogout=()=>{
    localStorage.clear();
    alert("You are Logged out");
    navigate('/home');
    
  }

  const notLoginIn = <>
  <Nav.Link  className='login' as={Link} to='/register'>Register</Nav.Link>    
  <Nav.Link  className='login' as={Link} to='/login'>Login</Nav.Link> </>;

  const isLoggedin = <> 
  <Nav.Link  className='login' as={Link} to='/deactivated'>Deactivated Movies & Shows</Nav.Link>    
  <Nav.Link  className='login' onClick={()=>{handleLogout()}} >Logout</Nav.Link>
  </>;

  const LoggednavLink =
    <NavDropdown title="Actions" id="navbarScrollingDropdown">
    <NavDropdown.Item as={Link} to='/add'><IoIosAdd className='addIcon'/>Add</NavDropdown.Item>
    <NavDropdown.Item as={Link} to='/search'><IoIosSearch className='searchIcon' /> Search</NavDropdown.Item>
  </NavDropdown>
  

   
  return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand as={Link} to="/home">MovieShow.com</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link  as={Link} to='/home'>Home</Nav.Link>
        {
          (localStorage.getItem("user-item"))? LoggednavLink : <></>
        }
        
      </Nav>
      {
        (localStorage.getItem("user-item"))? isLoggedin :notLoginIn
      }

    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}

export default NavBar