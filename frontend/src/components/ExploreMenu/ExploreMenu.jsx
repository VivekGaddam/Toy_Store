import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='toy-explore-menu' id='explore-menu'>
      <h1>Explore Our Toy Categories</h1>
      <p className='toy-explore-menu-text'>
        Find the perfect toy for every age and imagination. From plush friends to building blocks, we’ve got something magical for everyone.
      </p>
      <div className='toy-explore-menu-list'>
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
            key={index}
            className={`toy-explore-menu-item ${category === item.menu_name ? 'active' : ''}`}
          >
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
