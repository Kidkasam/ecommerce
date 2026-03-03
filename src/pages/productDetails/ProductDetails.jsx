import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

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
  { id: 1, title: "Cotton Oxford Shirt", category: "Casual", img: p1, price: 49.99, desc: "A timeless classic crafted from premium heavyweight cotton. Features a tailored fit and breathable weave, perfect for layering or wearing on its own." },
  { id: 2, title: "Slim Fit Linen Shirt", category: "Casual", img: p2, price: 54.99, desc: "Stay cool and sharp with our signature linen blend. Relaxed yet refined, this shirt is designed for summer days and evening retreats." },
  { id: 3, title: "Modern Polo Shirt", category: "Formal", img: p3, price: 39.99, desc: "The essential bridge between athletic comfort and professional style. Made with a pique-knit fabric that maintains its shape wash after wash." },
  { id: 4, title: "Classic Dress Shirt", category: "Formal", img: p4, price: 59.99, desc: "Elegance defined. Our wrinkle-resistant dress shirt features a crisp collar and pearlized buttons for a polished, authoritative look." },
  { id: 5, title: "Over-Sized Streetwear", category: "New Arrival", img: p5, price: 44.99, desc: "Bold, boxy, and unapologetically modern. This heavyweight jersey shirt brings urban edge to your everyday rotations." },
  { id: 6, title: "Denim Rugged Shirt", category: "Casual", img: p6, price: 64.99, desc: "Built to last. This stone-washed denim shirt only gets better with age, offering a rugged silhouette that pairs perfectly with boots." },
  { id: 7, title: "Soft Chambray Shirt", category: "Casual", img: p7, price: 49.99, desc: "The versatility of denim with the softness of a tee. A lightweight essential that transitions seamlessly through every season." },
  { id: 8, title: "Printed Summer Shirt", category: "New Arrival", img: p8, price: 34.99, desc: "Vibrant and airy. This lightweight viscose shirt features a custom hand-drawn print designed for beach vacations and weekend vibes." },
  { id: 9, title: "Premium Silk Blend", category: "Formal", img: n1, price: 89.99, desc: "Luxurious texture meets modern tailoring. This silk-blend shirt offers a subtle sheen and an incredibly soft hand-feel for high-stakes events." },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = ProductsData.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return (
    <div className="not-found-container">
      <p>Product not found</p>
      <button onClick={() => navigate('/products')}>Back to Catalog</button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="product-details-page"
    >
      <div className="product-details-container">
        <div className="image-section">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={product.img}
            alt={product.title}
          />
        </div>
        <div className="info-section">
          <button className="back-nav-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>

          <span className="info-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price">${Number(product.price).toFixed(2)}</p>
          <p className="desc">{product.desc}</p>

          <div className="feature-list">
            <div className="feature"><FaCheck size={12} /> Premium Fabric</div>
            <div className="feature"><FaCheck size={12} /> Ethical Sourcing</div>
            <div className="feature"><FaCheck size={12} /> Free Shipping</div>
          </div>

          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            <FaShoppingCart /> Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;

