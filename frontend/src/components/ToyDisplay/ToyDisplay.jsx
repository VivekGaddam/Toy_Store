import React, { useContext } from 'react';
import './ToyDisplay.css';
import ToyItem from '../ToyItem/ToyItem'
import { StoreContext } from '../../Context/StoreContext';

const ToyDisplay = ({ category }) => {
  const { toy_list } = useContext(StoreContext); // food_list is actually toy_list now

  return (
    <div className="toy-display" id="toy-display">
      <h2>Top Picks For You</h2>
      <div className="toy-display-list">
        {toy_list.map((item) =>
          category === 'All' || category === item.category ? (
            <ToyItem
              key={item._id}
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ToyDisplay;
