import React from 'react'

function Navbar() {
  return (
  <nav className="nav">
    <a href="/" className='site-title'>
      MLB App
    </a>
    <u1>
      <li>
        <a href='/predict'>Predict</a>
      </li>
      <li>
        <a href='/compare'>Compare</a>
      </li>
      <li>
        <a href='/about'>About</a> 
      </li>
    </u1>
  </nav>
  )
}
 
export default Navbar