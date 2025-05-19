import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";
import Footer from "../Footer.js/Footer";
import { motion } from "framer-motion";
import welcomeImage from "./Home1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories = [], loading } = useSelector((state) => state.categories || {});

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-white to-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-12 bg-gradient-to-r from-white to-black shadow-lg"
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
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl tracking-[.2em] italic font-bold drop-shadow-lg">
              Welcome to Gemora
            </h2>
            <p className="mt-2 text-lg tracking-[.2em] italic md:text-xl drop-shadow-md">
              Where elegance meets rarity
            </p>
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
              Shop Now
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
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
      >
        <section className="py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider">Shop by Accessory</h2>
          <p className="text-lg text-gray-300 mb-10">Explore premium gem accessories designed to impress.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {[
              { title: "Bracelet", text: "Elegance around your wrist." },
              { title: "Gem Pouch", text: "Store your treasures in style." },
              { title: "Brooch", text: "A symbol of timeless beauty." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.text}</p>
              </div>
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
