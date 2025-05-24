import React, { useContext } from 'react';
import './ToyItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const ToyItem = ({ image, name, price, desc, id, category }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    return (
        <div className='toy-item'>
            <div className='toy-item-img-container'>
                <img className='toy-item-image' src={`${url}/images/${image}`} alt={name} />
                {!cartItems[id] ? (
                    <img className='add-btn' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to Cart" />
                ) : (
                    <div className="toy-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
                    </div>
                )}
            </div>
            <div className="toy-item-info">
                <div className="toy-item-name-category">
                    <p className="toy-name">{name}</p>
                    <span className="toy-category">{category}</span>
                </div>
                <p className="toy-item-desc">{desc}</p>
                <p className="toy-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default ToyItem;
