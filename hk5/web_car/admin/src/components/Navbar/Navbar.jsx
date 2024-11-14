import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="/"><img className='logo' src={assets.icon} alt="" /></a>
      <img className='user' src={assets.user} alt="" />
    </div>
  )
}

export default Navbar
