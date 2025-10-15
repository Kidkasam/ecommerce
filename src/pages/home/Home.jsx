import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Hero from '../../assets/img/hero4.png';
import Banner from '../../assets/img/banner/b1.jpg';
import './Home.css'; // Make sure CSS is in this file

const Home = () => {
  const slides = [
    { title: "70% off", img: Hero },
    { title: "50% off", img: Hero },
    { title: "30% off", img: Hero }
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex(prev => (prev + 1) % slides.length);
  const prevSlide = () => setIndex(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <div className='hero'>
        <img src={slides[index].img} alt={slides[index].title} />
        <div className="overlay">
          <h2 className="hero-title">{slides[index].title}</h2>
        </div>
        <div className="btn">
          <button className='prev' onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className='next' onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="banner">
        <img src={Banner} alt="Banner" />
    
      </div>
    </>
  );
}

export default Home;