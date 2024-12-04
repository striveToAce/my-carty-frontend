import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <nav className="flex justify-between bg-gray-800 text-white p-4 rounded-lg mb-6">
          <div>
            <Link to="/" className="mr-4 hover:underline">
              Cart
            </Link>
            <Link to="/checkout" className="mr-4 hover:underline">
              Checkout
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          </div>
        </nav>
        <Toaster position="top-right" reverseOrder={false} />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;