import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import Footer from "../../components/footer/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  const updateQty = (id, newQty) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };


  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };


  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart </h1>
        <Link to="/" className="back-btn">
          ← Back to Shop
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.title} />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        
        </>
      )}
    </div>
    
  );
};

export default Cart;
