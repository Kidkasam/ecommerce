import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Contact from './pages/contact/Contact';



const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Home />
              <Products />
              <Footer />
            
              
            </>
          } 
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
      
      </Routes>
    </div>
  );
}

export default App;
