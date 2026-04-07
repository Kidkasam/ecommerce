import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import api from "../../api";
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

const placeholderImages = [p1, p2, p3, p4, p5, p6, p7, p8, n1];

const Products = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([{id: "All", name: "All"}]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('products/'),
          api.get('categories/')
        ]);
        
        const fetchedCats = catRes.data.map(c => ({ id: c.id, name: c.name }));
        setCategories([{id: "All", name: "All"}, ...fetchedCats]);

        const mappedProducts = prodRes.data.map((p, index) => {
          const categoryObj = catRes.data.find(c => c.id === p.category);
          
          // Use the uploaded image, or fallback to a placeholder if it's missing (e.g. for testing)
          let finalImage = p.image;
          if (!finalImage) {
              finalImage = placeholderImages[index % placeholderImages.length];
          }

          return {
            id: p.id,
            title: p.name,
            category: categoryObj ? categoryObj.name : "Uncategorized",
            img: finalImage,
            price: parseFloat(p.price),
            description: p.description,
            stock: p.stock
          };
        });
        setProductsData(mappedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = productsData;

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
  }, [activeCategory, search, productsData]);

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
              key={cat.name}
              className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
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

