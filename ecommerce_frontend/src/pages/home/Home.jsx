import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';
import Hero1 from '../../assets/img/hero4.png';
import Banner2 from '../../assets/img/banner/b17.jpg';
import Banner1 from '../../assets/img/blog/b2.jpg';

import './Home.css';

const slides = [
  {
    title: "New Season Arrivals",
    subtitle: "Discover the latest trends in premium menswear. Up to 80% Off for a limited time.",
    img: Hero1,
    btnText: "Shop Collection",
  },
  {
    title: "Sustainable Fashion",
    subtitle: "Eco-friendly fabrics meeting modern silhouettes. 50% Off this week.",
    img: Banner2,
    btnText: "Explore More",
  },
  {
    title: "The Weekend Edit",
    subtitle: "Comfort meets classic style. Grab your essentials now.",
    img: Banner1,
    btnText: "Browse Now",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="home-page">
      <section className="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="slide"
          >
            <img src={slides[index].img} alt={slides[index].title} />
            <div className="hero-overlay">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {slides[index].title}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {slides[index].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="hero-cta"
                onClick={() => navigate('/products')}
              >
                {slides[index].btnText}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="slider-arrow prev" onClick={prevSlide}><FaChevronLeft /></button>
        <button className="slider-arrow next" onClick={nextSlide}><FaChevronRight /></button>
      </section>

      <section className="features-grid">
        <div className="feature-item">
          <FaShippingFast size={32} />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over $150</p>
          </div>
        </div>
        <div className="feature-item">
          <FaUndo size={32} />
          <div>
            <h4>Easy Returns</h4>
            <p>30-day money-back guarantee</p>
          </div>
        </div>
        <div className="feature-item">
          <FaShieldAlt size={32} />
          <div>
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="feature-item">
          <FaHeadset size={32} />
          <div>
            <h4>24/7 Support</h4>
            <p>Dedicated customer service</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

