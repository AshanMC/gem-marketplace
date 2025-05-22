import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../redux/slices/products/productSlice";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categorySlice";
import { addToCart } from "../../../redux/slices/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = +e.target.value;
    setPriceRange([0, value]);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000000]);
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qtyLeft: product.totalQty,
      })
    );
  };

  const filteredProducts = products.filter((Product) => {
    const matchesCategory = selectedCategory
      ? Product.category === selectedCategory
      : true;
    const matchesPrice =
      Product.price >= priceRange[0] && Product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-purple-200 via-blue-100 to-yellow-200 min-h-screen text-white pb-10"
    >
      <Navbar />

      <div className="text-zinc-700 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Our Products
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="mb-6">
              <label className="block text-sm mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full p-2 text-black rounded-md"
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm mb-1">
                Max Price: Rs.{priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="1000000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full"
              />
            </div>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-red-400 hover:bg-red-600 w-full text-white py-2 rounded"
            >
              Clear Filters
            </button>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-white col-span-3 text-center">No products found.</p>
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-xl transition"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <img
                    src={product?.images?.[0]}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-zink-600 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <p className="text-orange-400 font-semibold text-lg">
                    Rs.{product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-2 bg-orange-300 hover:bg-orange-400 w-full py-2 text-white rounded"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 bg-green-400 hover:bg-green-500 w-full py-2 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
