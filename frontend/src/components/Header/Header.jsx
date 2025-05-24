import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <div className='toy-header'>
      <div className='toy-header-content'>
        <h1>Discover Joy in Every Toy</h1>
        <p>Unwrap smiles with our handpicked collection of toys that spark imagination and fun for every age!</p>
        <button>Explore Toys</button>
      </div>
      <img className="toy-header-image" src={assets.header_img} alt="toys banner" />
    </div>
  );
};

export default Header;
