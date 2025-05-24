import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <h2>Menu</h2>
      </div>
      <div className="nav-items">
        <NavLink to='/add' className="nav-link">
          <img src={assets.add_icon} alt="Add" />
          <span>Add</span>
        </NavLink>
        <NavLink to='/list' className="nav-link">
          <img src={assets.order_icon} alt="List" />
          <span>List</span>
        </NavLink>
        <NavLink to='/orders' className="nav-link">
          <img src={assets.order_icon} alt="Orders" />
          <span>Orders</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Sidebar
