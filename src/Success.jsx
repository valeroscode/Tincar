import React from 'react'
import { Link } from 'react-router-dom';

function Success() {

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '10rem'}}>
    <h1 style={{color: 'black'}}>YOU'RE IN!</h1>
    <h3 style={{color: 'black'}}>Thank you for Subscribing</h3>
    <button style={{color: 'black', backgroundColor: '#ff4c68', border: 'none', padding: '1rem', borderRadius: '7px', 
    fontWeight: '800', width: 'fit-content'}}><Link style={{color: 'white', fontFamily:"Montserrat",
    textDecoration: 'none'}} to={'/'}>Return Home</Link></button>
    </div>
    </>
  )
}

export default Success