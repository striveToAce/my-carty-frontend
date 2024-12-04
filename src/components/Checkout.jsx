import React, { useState } from 'react';
import axios from 'axios';

export const Checkout = () => {
  const [cartSummary, setCartSummary] = useState({});
  const [discountCode, setDiscountCode] = useState('');

  const handleCheckout = async () => {
    const response = await axios.post('/cart/checkout', {
      userId: '123',
      discountCode,
    });
    setCartSummary(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h2>
      <div className="bg-gray-100 rounded-lg shadow p-4">
        <p className="text-lg font-semibold">Total: ${cartSummary.total || '0'}</p>
        <p className="text-gray-500">Discount Applied: ${cartSummary.discountApplied || '0'}</p>
        <p className="text-green-500 font-semibold">{cartSummary.message || ''}</p>
      </div>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="border rounded p-2 w-2/3"
        />
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply Discount
        </button>
      </div>
    </div>
  );
};