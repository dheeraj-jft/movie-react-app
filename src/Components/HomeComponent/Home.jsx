import React from 'react'
import CardComponent from '../CardComponent/CardComponent'
import './Home.css'

const Home = () => {

  return (
    <>
    <div>
        <h2 className='h2' style={{marginTop: '30px'}}> Movies / Show </h2>
        <CardComponent/>
        </div>
    </>
  )
}

export default Home