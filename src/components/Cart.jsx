import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/apiService";
import toast from "react-hot-toast";

export const Cart = () => {
  const [items, setItems] = useState([
    { id: "1", name: "Macbook air m1", price: 120000, quantity: 0 },
    { id: "2", name: "Philips hair dryer", price: 1000, quantity: 0 },
    { id: "3", name: "Philips timmer", price: 1100, quantity: 0 },
    { id: "4", name: "Motorola TV 32 INCH", price: 20000, quantity: 0 },
    { id: "5", name: "Sony TV 43 INCH", price: 50000, quantity: 0 },
  ]);

  // Fetch cart items (simulate backend interaction for now)
  const fetchCart = async () => {
    try {
      const response = await api.get("/cart"); // Replace with your backend API
      setItems(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateItem = async (item, quantity, prevValue) => {
    setItems(items.map((i) => (i.id === item.id ? { ...item, quantity } : i)));
    try {
      toast.loading("updating...");
      await api.post("/cart/update", {
        userId: "123",
        item: { ...item, quantity },
      });
      toast.dismiss()
      toast.success("updated :)");
    } catch (err) {
      toast.dismiss()
      toast.error("updation failed:<");
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...item, quantity: prevValue } : i
        )
      );
    }
  };

  const handleAddItem = async (item) => {
    setItems(items.map((i) => (i.id === item.id ? { ...item, quantity:1 } : i)));
    try {
      toast.loading("adding to cart");
      await api.post("/cart/add", {
        userId: "123",
        item: { ...item, quantity:1 },
      });
      toast.dismiss()
      toast.success("added:)");
    } catch (err) {
      toast.dismiss()
      toast.error("addition failed:(");
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...item, quantity: 0 } : i
        )
      );
    }
  };

  const handleRemoveItem = async (name) => {
    await axios.put("/cart/update", {
      userId: "123",
      item: { name, quantity: 0 },
    });
    fetchCart();
  };

  // Separate items based on quantity
  const zeroQuantityItems = items.filter((item) => item.quantity === 0);
  const selectedItems = items.filter((item) => item.quantity > 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Cart</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Items with Quantity 0 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Items</h3>
          <ul className="space-y-4">
            {zeroQuantityItems.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center bg-gray-100 rounded-lg shadow p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleAddItem(item, item.quantity + 1, item.quantity)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Items with Quantity > 0 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            You Selected
          </h3>
          <ul className="space-y-4">
            {selectedItems.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center bg-gray-100 rounded-lg shadow p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateItem(
                        item,
                        item.quantity + 1,
                        item.quantity
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateItem(
                        item,
                        Math.max(0, item.quantity - 1),
                        item.quantity
                      )
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
        </div>
      </div>
    </div>
  );
};
