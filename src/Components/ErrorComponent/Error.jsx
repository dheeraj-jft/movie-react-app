import React from 'react'
import './Error.css'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();
  return (
    <div id="divError">
<h1 id="oops">Oops</h1>
<p id="wrong"> This page does no longer exist, or it never had. </p>
<button className="homebutton" onClick={()=>{navigate('/home')}}>GO BACK HOME</button>  
</div>
  )
}

export default Error