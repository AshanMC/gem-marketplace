import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";
import Footer from "../Footer.js/Footer";
import { motion } from "framer-motion";
import welcomeImage from "./Home1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlice";
import { fetchAccessoriesAction } from "../../redux/slices/accessories/accessorySlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories = [] } = useSelector((state) => state.categories || {});
  const { accessories = [] } = useSelector((state) => state.accessories || {});

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-12"
      >
        <div className="relative w-fit mx-auto mb-6">
          <motion.img
            src={welcomeImage}
            alt="Gemora Welcome"
            className="w-[1500px] h-[700px] rounded-xl shadow-2xl object-cover"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-black/40 rounded-xl" />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold italic tracking-wide drop-shadow-xl">
              Welcome to Gemora
            </h2>
            <p className="mt-3 text-lg md:text-xl text-gray-200 drop-shadow">
              Where elegance meets rarity
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition duration-300"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-4"
      >
        <HomeCategories />
      </motion.div>

      {/* Trending Products */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-800">
          Latest Products
        </h2>
        <HomeProductTrending />
      </motion.div>

      {/* Shop by Accessory */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/30 backdrop-blur-sm py-16"
      >
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gray-800">
            Shop by Accessory
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Explore premium gem accessories designed to impress.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {accessories.slice(0, 3).map((item) => (
              <motion.div
                key={item._id}
                className="bg-white/40 backdrop-blur-md rounded-lg p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/accessories/${item._id}`)}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-44 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-indigo-900 mb-1 truncate">
                  {item.name}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
