// src/components/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import p1 from "../../assets/img/products/f1.jpg";
import p2 from "../../assets/img/products/f2.jpg";
import p3 from "../../assets/img/products/f3.jpg";
import p4 from "../../assets/img/products/f4.jpg";
import p5 from "../../assets/img/products/f5.jpg";
import p6 from "../../assets/img/products/f6.jpg";
import p7 from "../../assets/img/products/f7.jpg";
import p8 from "../../assets/img/products/f8.jpg";
import n1 from "../../assets/img/products/n1.jpg";

import "./productDetail.css";

const ProductsData = [
  { id: 1, title: "Shirt 1", img: p1, price: 49.99, desc: "High-quality cotton shirt, perfect for casual wear." },
  { id: 2, title: "Shirt 2", img: p2, price: 49.99, desc: "Comfortable and stylish shirt for everyday use." },
  { id: 3, title: "Shirt 3", img: p3, price: 49.99, desc: "Trendy shirt with modern design." },
  { id: 4, title: "Shirt 4", img: p4, price: 49.99, desc: "Soft and breathable fabric." },
  { id: 5, title: "Shirt 5", img: p5, price: 49.99, desc: "Classic shirt that never goes out of style." },
  { id: 6, title: "Shirt 6", img: p6, price: 49.99, desc: "Perfect fit for both casual and semi-formal occasions." },
  { id: 7, title: "Shirt 7", img: p7, price: 49.99, desc: "Lightweight and durable shirt." },
  { id: 8, title: "Shirt 8", img: p8, price: 49.99, desc: "Stylish and comfortable for daily wear." },
  { id: 9, title: "Shirt 9", img: n1, price: 49.99, desc: "Premium quality shirt with unique design." },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = ProductsData.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Product not found </p>;

  const handleAddToCart = () => {
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
    <div className="product-details-container">
      <div className="image-section">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="info-section">
        <h1>{product.title}</h1>
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <p className="desc">{product.desc}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart 
        </button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
