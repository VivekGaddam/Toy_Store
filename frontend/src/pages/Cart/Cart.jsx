import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    url,
    toy_list,
    menu_list,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-header">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {toy_list.map((item) =>
          cartItems[item._id] > 0 ? (
            <div key={item._id} className="cart-items-row">
              <img src={url + "/images/" + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{currency}{item.price.toFixed(2)}</p>
              <div>{cartItems[item._id]}</div>
              <p>{currency}{(item.price * cartItems[item._id]).toFixed(2)}</p>
              <button
                className='cart-remove-btn'
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeFromCart(item._id)}
              >
                ×
              </button>
            </div>
          ) : null
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Summary</h2>
          <div>
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>{currency}{getTotalCartAmount().toFixed(2)}</span>
            </div>
            <hr />
            <div className="cart-total-row">
              <span>Delivery Fee</span>
              <span>{currency}{getTotalCartAmount() === 0 ? '0.00' : deliveryCharge.toFixed(2)}</span>
            </div>
            <hr />
            <div className="cart-total-row total-amount">
              <strong>Total</strong>
              <strong>{currency}{getTotalCartAmount() === 0 ? '0.00' : (getTotalCartAmount() + deliveryCharge).toFixed(2)}</strong>
            </div>
          </div>
          <button
            disabled={getTotalCartAmount() === 0}
            className='checkout-btn'
            onClick={() => navigate('/order')}
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className='promocode-input'>
            <input type="text" placeholder='Promo code' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
