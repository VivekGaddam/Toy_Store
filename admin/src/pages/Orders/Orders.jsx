import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-container">
      <h2>All Orders</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <img src={assets.parcel_icon} alt="Parcel" className="order-icon" />

            <div className="order-details">
              <p className="order-food">
                {order.items.map((item, idx) =>
                  `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
                )}
              </p>

              <p className="order-name">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="order-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country},{' '}
                  {order.address.zipcode}
                </p>
              </div>

              <p className="order-phone">{order.address.phone}</p>
            </div>

            <div className="order-info">
              <p><b>Items:</b> {order.items.length}</p>
              <p><b>Total:</b> {currency}{order.amount}</p>
              <select value={order.status} onChange={(e) => statusHandler(e, order._id)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
