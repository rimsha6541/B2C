import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const user_id = userObj ? userObj.id : null;
  const { id } = useParams();
  const navigation = useNavigate();

  const [orders, setOrders] = useState([]);
  const [ordersWithRating, setOrdersWithRating] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}order_details/order_details/${user_id}`
      );

      if (!response.data.error) {
        const ordersWithRating = response.data.data.map(order => ({ ...order, rating: 0 }));
        setOrders(ordersWithRating);
      } else {
        alert(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOrdersWithRating(
      orders.map(order => ({
        ...order,
        rating: order.rating || 0,
      }))
    );
  }, [orders]);

  const handleFeedback = async (pr_id, rating) => {
    try {
      if (user_id !== null) {
        const response = await axios.post('http://127.0.0.1:8000/products/feedback/', {
          product: pr_id,
          user: user_id,
          stars: rating,
        });

        if (!response.data.error) {
          Swal.fire({
            icon: 'success',
            title: response.data.msg,
            showConfirmButton: false,
            timer: 3500,
          });
        } else {
          Swal.fire({
            background: '#ced8e6',
            text: response.data.msg,
            icon: 'warning',
            confirmButtonText: 'Okay',
          });
        }
      } else {
        Swal.fire({
          background: '#ced8e6',
          text: ' Please Login First',
          confirmButtonText: 'Okay',
        });
        navigation('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingClick = (orderIndex, rating) => {
    const updatedOrders = [...ordersWithRating];
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      rating: rating,
    };
    setOrdersWithRating(updatedOrders);
  };

  const formatOrderTime = orderTime => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(orderTime).toLocaleString(undefined, options);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D5E3F0' }}>
      <h1>Order History</h1>
      <div style={{ backgroundColor: '#C9E4EC' }}>
        {ordersWithRating.map((order, index) => (
          <div key={order.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '30px', width: '400px' }}>
            <h2>{order.product.p_name}</h2>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${order.product.p_image}`}
              alt={order.product.p_name}
              style={{ width: '200px', height: '200px', marginBottom: '10px' }}
            />
            <div>
              <span style={{ fontWeight: 'bold' }}>Order Time:</span> {formatOrderTime(order.updated_at)}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Price:</span> ${order.sale_price}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Rating:</span>
              <Rating count={5} value={order.rating} onChange={(newRating) => handleRatingClick(index, newRating)} />
            </div>
            <button onClick={() => handleFeedback(order.product.p_id, order.rating)}>Rate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
