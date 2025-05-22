import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessoriesAction } from "../../../redux/slices/accessories/accessorySlice";
import { addToCart } from "../../../redux/slices/Cart/cartSlice";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Accessories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessories = [], loading, error } = useSelector((state) => state.accessories || {});
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  const handlePriceChange = (e) => {
    const value = +e.target.value;
    setPriceRange([0, value]);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.images?.[0],
        type: "accessory",
        qtyLeft: item.totalQty,
      })
    );
  };

  const filteredAccessories = accessories.filter(
    (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
  );

  return (
    <div className="bg-gradient-to-br from-purple-200 via-blue-100 to-yellow-200 min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-10">
        <motion.h1
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Accessories
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar: Price Filter */}
          <motion.div
            className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
            <label className="block text-sm mb-2">
              Max Price: Rs.{priceRange[1].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="1000000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full mb-6"
            />
            <button
              onClick={clearFilters}
              className="mt-4 bg-red-500 hover:bg-red-600 w-full text-white py-2 rounded"
            >
              Clear Filters
            </button>
          </motion.div>

          {/* Accessories Grid */}
          <motion.div
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {loading ? (
              <p className="col-span-3 text-center">Loading accessories...</p>
            ) : error ? (
              <p className="col-span-3 text-red-500 text-center">{error}</p>
            ) : filteredAccessories.length === 0 ? (
              <p className="col-span-3 text-center">No accessories found.</p>
            ) : (
              filteredAccessories.map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-xl transition"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                  <p className="text-orange-400 font-semibold text-lg">Rs.{item.price}</p>
                  <button
                    onClick={() => navigate(`/accessories/${item._id}`)}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 w-full py-2 text-white rounded transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 bg-green-600 hover:bg-green-700 w-full py-2 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
