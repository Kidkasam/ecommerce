import React, { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Hero1 from '../../assets/img/hero4.png';
import Banner from '../../assets/img/banner/b1.jpg';
import Banner1 from '../../assets/img/blog/b2.jpg';
import Banner2 from '../../assets/img/banner/b17.jpg';

import './Home.css';

const slides = [
  {
    title: "70% Off!",
    subtitle: "Grab your favorite products now",
    img: Hero1,
    btnText: "Shop Now",
  },
  {
    title: "50% Off!",
    subtitle: "Limited time offer",
    img: Banner2,
    btnText: "Explore",
  },
  {
    title: "30% Off!",
    subtitle: "Don't miss out",
    img: Banner1,
    btnText: "Buy Now",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div>
      
      <section className="hero">
        <img src={slides[index].img} alt={slides[index].title} />
        <div className="overlay">
          <h1>{slides[index].title}</h1>
          <p>{slides[index].subtitle}</p>
          <button className="cta-btn">{slides[index].btnText}</button>
        </div>
        <button className="arrow prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="arrow next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </section>

      
      <section className="banners">
        <img src={Banner} alt="Banner" />
      </section>
    </div>
  );
};

export default Home;
