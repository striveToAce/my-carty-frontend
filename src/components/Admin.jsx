import React, { useState } from "react";
import api from "../utils/apiService";

export const Admin = () => {
  const [stats, setStats] = useState({});
  const [discountCode, setDiscountCode] = useState("");

  const fetchStats = async () => {
    const response = await api.get("/admin/stats");
    setStats(response.data);
  };

  const generateDiscount = async () => {
    const response = await api.post("/admin/discount/generate");
    setDiscountCode(response.data.code);
    fetchStats();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-100 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Store Statistics</h3>
          <p>Total Items Purchased: {stats.totalItemsPurchased || 0}</p>
          <p>Total Revenue: ${stats.totalRevenue || 0}</p>
          <p>Total Discounts Given: ${stats.totalDiscountsGiven || 0}</p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Generate Discount Code</h3>
          <button
            onClick={generateDiscount}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Generate Code
          </button>
          {discountCode && (
            <p className="text-green-500 font-semibold mt-2">
              New Discount Code: {discountCode}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
