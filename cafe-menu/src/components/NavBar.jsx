import React from 'react'
import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
        <div className='nav-brand'>Cafe House</div>
        <ul className='nav-items'>
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <button className='nav-button'>Order Now</button>
      
    </div>
  )
}

export default NavBar
