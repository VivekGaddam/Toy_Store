import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'; // Keep assets for the logo if it's an image
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

// Import Material-UI Icons
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// You might also consider IconButton from '@mui/material' for better accessibility and ripple effect
import IconButton from '@mui/material/IconButton';


const Navbar = ({ setShowLogin }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <div className='site-header'>
      <Link to='/'><img className='brand-logo' src={assets.logo} alt='Company Logo' /></Link>
      <nav className="main-nav">
        <Link to='/' onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'current-page' : ''}`}>Home</Link>
        <a href='#explore-menu' onClick={() => setActiveTab('menu')} className={`nav-item ${activeTab === 'menu' ? 'current-page' : ''}`}>Our Menu</a>
        <a href='#app-download' onClick={() => setActiveTab('mobile')} className={`nav-item ${activeTab === 'mobile' ? 'current-page' : ''}`}>Mobile App</a>
        <a href='#footer' onClick={() => setActiveTab('contact')} className={`nav-item ${activeTab === 'contact' ? 'current-page' : ''}`}>Get in Touch</a>
      </nav>
      <div className="header-actions">
        {/* Replaced img with Material-UI Icons */}
        <IconButton aria-label="search">
          <SearchIcon style={{ fontSize: '24px', color: '#333d51' }} /> {/* Customize size and color */}
        </IconButton>

        <Link to='/cart' className='cart-icon-wrapper'>
          <IconButton aria-label="shopping basket">
            <ShoppingBasketIcon style={{ fontSize: '24px', color: '#333d51' }} />
          </IconButton>
          <div className={getTotalCartAmount() > 0 ? 'cart-dot' : ''}></div>
        </Link>

        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='user-profile-menu'>
            <IconButton aria-label="profile">
              <AccountCircleIcon style={{ fontSize: '28px', color: '#333d51' }} /> {/* Slightly larger for profile */}
            </IconButton>
            <ul className='profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <ShoppingBagIcon style={{ fontSize: '20px' }} /> <p>My Orders</p>
              </li>
              <hr className='dropdown-separator' />
              <li onClick={handleLogout}>
                <LogoutIcon style={{ fontSize: '20px' }} /> <p>Logout</p>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;