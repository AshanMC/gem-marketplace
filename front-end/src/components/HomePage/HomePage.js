import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";
import Footer from "../Footer.js/Footer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlice";
import { fetchAccessoriesAction } from "../../redux/slices/accessories/accessorySlice";
import { useNavigate } from "react-router-dom";
import Slide1 from "./WImg.jpg";
// import Slide2 from "../../assets/slider2.jpg";
// import Slide3 from "../../assets/slider3.jpg";
// import Slide4 from "../../assets/slider4.jpg";

const sliderImages = [
  Slide1,
  "https://images.unsplash.com/photo-1593032465174-c6b8d35072a2",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a"
];

const sliderMessages = [
  "Where elegance meets rarity",
  "Discover timeless beauty",
  "Elevate your style with gems",
  "Crafted to perfection"
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { categories = [] } = useSelector((state) => state.categories || {});
  const { accessories = [] } = useSelector((state) => state.accessories || {});

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-200 via-blue-100 to-yellow-200 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Slider */}
      <motion.div
        className="relative overflow-hidden w-full h-[500px] md:h-[650px] lg:h-[950px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-700 object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          {currentSlide === 0 ? (
            <>
              <h2 className="text-3xl md:text-5xl font-bold tracking-wide drop-shadow-xl">
                Welcome to Gemora
              </h2>
              <p className="mt-3 text-lg md:text-xl text-gray-200 drop-shadow">
                Where elegance meets rarity
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-5xl font-bold tracking-wide drop-shadow-xl">
                Gemora Collection
              </h2>
              <p className="mt-3 text-lg md:text-xl text-gray-200 drop-shadow">
                {sliderMessages[currentSlide]}
              </p>
            </>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/products")} // Redirect
            className="mt-5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition duration-300"
          >
            Shop Now
          </motion.button>
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
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gray-800">
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
