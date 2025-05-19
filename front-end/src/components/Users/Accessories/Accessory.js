import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessoriesAction } from "../../../redux/slices/accessories/accessorySlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { motion } from "framer-motion";

const Accessories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessories = [], loading, error } = useSelector(
    (state) => state.accessories || {}
  );

  const [maxPrice, setMaxPrice] = useState(1000000);

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  const handlePriceChange = (e) => {
    setMaxPrice(+e.target.value);
  };

  const handleClearFilters = () => {
    setMaxPrice(1000000);
  };

  const filteredAccessories = accessories.filter(
    (acc) => acc.price <= maxPrice
  );

  return (
    <div className="bg-gradient-to-b from-white to-black min-h-screen text-white pt-24 pb-10">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">Accessories</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Filters */}
          <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="mb-6">
              <label className="block text-sm mb-1">Max Price: Rs.{maxPrice}</label>
              <input
                type="range"
                min="0"
                max="1000000"
                value={maxPrice}
                onChange={handlePriceChange}
                className="w-full"
              />
            </div>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-red-500 hover:bg-red-600 w-full text-white py-2 rounded"
            >
              Clear Filters
            </button>
          </div>

          {/* Accessories List */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredAccessories.length === 0 ? (
              <p className="text-white col-span-3 text-center">No accessories found.</p>
            ) : (
              filteredAccessories.map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-xl transition"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item?.images?.[0]}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-orange-400 font-semibold text-lg">Rs.{item.price}</p>

                  <button
                    onClick={() => navigate(`/accessories/${item._id}`)}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 w-full py-2 text-white rounded transition"
                  >
                    View Details
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
