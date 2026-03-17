import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import "./products.css";

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

const ProductsData = [
  { id: 1, title: "Cotton Oxford Shirt", category: "Casual", img: p1, price: 49.99 },
  { id: 2, title: "Slim Fit Linen Shirt", category: "Casual", img: p2, price: 54.99 },
  { id: 3, title: "Modern Polo Shirt", category: "Formal", img: p3, price: 39.99 },
  { id: 4, title: "Classic Dress Shirt", category: "Formal", img: p4, price: 59.99 },
  { id: 5, title: "Over-Sized Streetwear", category: "New Arrival", img: p5, price: 44.99 },
  { id: 6, title: "Denim Rugged Shirt", category: "Casual", img: p6, price: 64.99 },
  { id: 7, title: "Soft Chambray Shirt", category: "Casual", img: p7, price: 49.99 },
  { id: 8, title: "Printed Summer Shirt", category: "New Arrival", img: p8, price: 34.99 },
  { id: 9, title: "Premium Silk Blend", category: "Formal", img: n1, price: 89.99 },
];

const Products = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [filteredProducts, setFilteredProducts] = useState(ProductsData);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Casual", "Formal", "New Arrival"];

  useEffect(() => {
    let result = ProductsData;

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Search
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, search]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="catalog-wrapper">
      <div className="catalog-header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="title-section"
        >
          <h2>{search ? `Search results for "${search}"` : "Our Collection"}</h2>
          <p>Explore our premium selection of quality apparel.</p>
        </motion.div>

        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              variants={container}
              initial="hidden"
              animate="show"
              className="products-grid"
            >
              {filteredProducts.map((pro) => (
                <motion.div variants={item} className="pro-card" key={pro.id}>
                  <Link to={`/products/${pro.id}`} className="img-container">
                    <img src={pro.img} alt={pro.title} />
                    <div className="card-overlay">
                      <span>View Details</span>
                    </div>
                  </Link>
                  <div className="pro-info">
                    <span className="pro-category">{pro.category}</span>
                    <h3>{pro.title}</h3>
                    <div className="price-row">
                      <p className="price">${pro.price}</p>
                      <button className="add-btn" onClick={() => addToCart(pro)}>
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results"
            >
              <FaSearch size={40} color="#ddd" />
              <h3>No products found</h3>
              <p>Try adjusting your search or filters.</p>
              <button onClick={() => { setActiveCategory("All"); }} className="reset-btn">Reset Filters</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="product-banner">
        <img src={Banner2} alt="Offer Banner" />
        <div className="banner-overlay">
          <h3>Summer Collection</h3>
          <p>Up to 60% Off on Selected Items</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;

