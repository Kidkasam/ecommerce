import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const shipping = 15;
    const total = cartTotal + shipping;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Mocking a payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="checkout-success"
            >
                <div className="success-card">
                    <FaCheckCircle size={60} color="#4CAF50" />
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for shopping with KFITS. Your order #KF-5291 is being processed.</p>
                    <button onClick={() => navigate('/')} className="back-home-btn">Return Home</button>
                </div>
            </motion.div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="empty-checkout">
                <h2>Your bag is empty</h2>
                <p>Add some items to your bag before checking out.</p>
                <button onClick={() => navigate('/products')} className="shop-btn">Go to Catalog</button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-form-section">
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handlePlaceOrder}
                    >
                        <section className="checkout-section">
                            <div className="section-header">
                                <FaShieldAlt /> <h3>Contact Information</h3>
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="email@address.com" required />
                            </div>
                        </section>

                        <section className="checkout-section">
                            <div className="section-header">
                                <FaTruck /> <h3>Shipping Address</h3>
                            </div>
                            <div className="row">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="John" required />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Address</label>
                                <input type="text" placeholder="123 Street Ave" required />
                            </div>
                            <div className="row">
                                <div className="input-group">
                                    <label>City</label>
                                    <input type="text" placeholder="London" required />
                                </div>
                                <div className="input-group">
                                    <label>Zip Code</label>
                                    <input type="text" placeholder="W1A 1AA" required />
                                </div>
                            </div>
                        </section>

                        <section className="checkout-section">
                            <div className="section-header">
                                <FaCreditCard /> <h3>Payment Method</h3>
                            </div>
                            <div className="card-mock-input">
                                <div className="input-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" required />
                                </div>
                                <div className="row">
                                    <div className="input-group">
                                        <label>Expiry</label>
                                        <input type="text" placeholder="MM/YY" required />
                                    </div>
                                    <div className="input-group">
                                        <label>CVC</label>
                                        <input type="text" placeholder="XXX" required />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className={`place-order-btn ${isProcessing ? 'loading' : ''}`}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing Payment...' : `Complete Purchase - $${total.toFixed(2)}`}
                        </button>
                    </motion.form>
                </div>

                <div className="checkout-summary-section">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-summary-card"
                    >
                        <h3>Order Summary</h3>
                        <div className="mini-item-list">
                            {cart.map(item => (
                                <div className="mini-item" key={item.id}>
                                    <div className="mini-img"><img src={item.img} alt="" /></div>
                                    <div className="mini-info">
                                        <span>{item.title}</span>
                                        <p>Qty: {item.qty} × ${item.price}</p>
                                    </div>
                                    <span className="mini-price">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-details">
                            <div className="row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div className="row"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                            <div className="row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
