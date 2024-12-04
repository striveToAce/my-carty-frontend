import React, { useEffect, useState } from 'react';
import axios from '../services/apiService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

  const fetchCart = async () => {
    // Mock cart fetch
    const response = await axios.get('/cart'); // Replace with your backend API
    setCartItems(response.data || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddItem = async () => {
    await axios.post('/cart/add', { userId: '123', item: newItem });
    fetchCart();
  };

  const handleUpdateItem = async (name, quantity) => {
    await axios.put('/cart/update', { userId: '123', item: { name, quantity } });
    fetchCart();
  };

  const handleRemoveItem = async (name) => {
    await axios.put('/cart/update', { userId: '123', item: { name, quantity: 0 } });
    fetchCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.name}
            className="flex justify-between items-center bg-gray-100 rounded-lg shadow p-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">Price: ${item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateItem(item.name, item.quantity + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                +
              </button>
              <button
                onClick={() =>
                  handleUpdateItem(item.name, Math.max(0, item.quantity - 1))
                }
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                -
              </button>
              <button
                onClick={() => handleRemoveItem(item.name)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Item</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border rounded p-2 w-1/3"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="border rounded p-2 w-1/3"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;