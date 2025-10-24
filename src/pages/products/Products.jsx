import React from "react";
import "./products.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import p1 from "../../assets/img/products/f1.jpg";
import p2 from "../../assets/img/products/f2.jpg";
import p3 from "../../assets/img/products/f3.jpg";
import p4 from "../../assets/img/products/f4.jpg";
import p5 from "../../assets/img/products/f5.jpg";
import p6 from "../../assets/img/products/f6.jpg";
import p7 from "../../assets/img/products/f7.jpg";
import p8 from "../../assets/img/products/f8.jpg";
import n1 from "../../assets/img/products/n1.jpg";
import Banner2 from "../../assets/img/banner/b2.jpg";
import Banner10 from "../../assets/img/banner/b10.jpg";
import Footer from "../../components/footer/Footer";

const Products = () => {
  const navigate = useNavigate();

  const product_slide = [
    { id: 1, title: "Shirt 1", img: p1, price: 49.99 },
    { id: 2, title: "Shirt 2", img: p2, price: 49.99 },
    { id: 3, title: "Shirt 3", img: p3, price: 49.99 },
    { id: 4, title: "Shirt 4", img: p4, price: 49.99 },
    { id: 5, title: "Shirt 5", img: p5, price: 49.99 },
    { id: 6, title: "Shirt 6", img: p6, price: 49.99 },
    { id: 7, title: "Shirt 7", img: p7, price: 49.99 },
    { id: 8, title: "Shirt 8", img: p8, price: 49.99 },
    { id: 9, title: "Shirt 9", img: n1, price: 49.99 },
  ];

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <>
      <div className="container">
        <h2>Products</h2>
        <div className="products-grid">
          {product_slide.map((pro) => (
            <div className="pro-card" key={pro.id}>
              <Link to={`/products/${pro.id}`}>
                <img src={pro.img} alt={pro.title} />
              </Link>
              <div className="pro-info">
                <h3>{pro.title}</h3>
                <p className="price">${pro.price}</p>
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(pro)}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="banner">
        <img src={Banner2} alt="Banner" />
      </div>

      <div className="container">
        <h2>Featured</h2>
        <div className="products-grid">
          {product_slide.map((pro) => (
            <div className="pro-card" key={pro.id}>
              <Link to={`/products/${pro.id}`}>
                <img src={pro.img} alt={pro.title} />
              </Link>
              <div className="pro-info">
                <h3>{pro.title}</h3>
                <p className="price">${pro.price}</p>
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(pro)}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="banner">
        <img src={Banner10} alt="Banner" />
      </div>
      <Footer/>
    </>
  );
};

export default Products;
