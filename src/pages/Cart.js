// pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/productSlice';
import { Link } from 'react-router-dom';
import '../styles/Cart.css'; 

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty.{' '}
          <Link to="/" className="continue-shopping-link">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <img src={item.thumbnail} alt={item.title} className="item-image" />
                  <div>
                    <h2 className="item-title">{item.title}</h2>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-container">
            <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
      <Link to="/" className="back-link">
        &larr; Back to Product Catalog
      </Link>
    </div>
  );
}

export default Cart;
