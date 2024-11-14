import React from 'react'
import './Verticalbar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Verticalbar = () => {
  return (
    <div className='toolbar'>
      <div className="toolbar-options">
        <NavLink to='/add' className="toolbar-option">
          <img className="addicon" src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className="toolbar-option">
          <img className="listicon" src={assets.list_icon} alt="" />
          <p>List Item</p>
        </NavLink>
      </div>
    </div>
  )
}
export default Verticalbar
