import React from 'react';
import './products.css';
import { FaShoppingCart } from 'react-icons/fa';
import p1 from '../../assets/img/products/f1.jpg';
import p2 from '../../assets/img/products/f2.jpg';
import p3 from '../../assets/img/products/f3.jpg';
import p4 from '../../assets/img/products/f4.jpg';
import p5 from '../../assets/img/products/f5.jpg';
import p6 from '../../assets/img/products/f6.jpg';
import p7 from '../../assets/img/products/f7.jpg';
import p8 from '../../assets/img/products/f8.jpg';
import n1 from '../../assets/img/products/n1.jpg';


const Products = () => {
  const product_slide = [
    { title: "shirt", img: p1 },
    { title: "shirt", img: p2 },
    { title: "shirt", img: p3 },
    { title: "shirt", img: p4 },
    { title: "shirt", img: p5 },
    { title: "shirt", img: p6 },
    { title: "shirt", img: p7 },
    { title: "shirt", img: p8 },
    { title: "shirt", img: n1 }
  ];

  return (
    <>
      <div className='container'>
        <h2>Products</h2>
        <div className="products-grid">
          {product_slide.map((pro, idx) => (
            <div className="pro-card" key={idx}>
              <img src={pro.img} alt={pro.title} />
              <div className="pro-info">
                <h3>{pro.title}</h3>
                <p className="price">$49.99</p>
                <button className="add-btn">
                  <FaShoppingCart />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className='container'>
        <h2>Featured</h2>
        <div className="products-grid">
          {product_slide.map((pro, idx) => (
            <div className="pro-card" key={idx}>
              <img src={pro.img} alt={pro.title} />
              <div className="pro-info">
                <h3>{pro.title}</h3>
                <p className="price">$49.99</p>
                <button className="add-btn">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='container'>
        <h2>New</h2>
        <div className="products-grid">
          {product_slide.map((pro, idx) => (
            <div className="pro-card" key={idx}>
              <img src={pro.img} alt={pro.title} />
              <div className="pro-info">
                <h3>{pro.title}</h3>
                <p className="price">$49.99</p>
                <button className="add-btn">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;