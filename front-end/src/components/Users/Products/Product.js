import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/Cart/cartSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/${id}`);
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product?.images?.[0],
      qtyLeft: product.totalQty,
    };
    dispatch(addToCart(item));
  };

  if (loading)
    return <div className="text-center py-20 text-lg text-white">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="bg-gradient-to-b from-purple-50 to-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden shadow-xl border border-white/10"
          >
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className="w-full h-[450px] object-cover"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-wide">{product?.name}</h1>
            <p className="text-2xl text-orange-400 font-semibold">
              Rs. {product?.price}
            </p>
            <div className="text-sm text-purple-100 space-y-1">
              <p>
                Weight:{" "}
                <span className="font-medium">{product?.weight} carats</span>
              </p>
              <p>
                In Stock:{" "}
                <span className="font-medium">{product?.totalQty}</span>
              </p>
            </div>
            <p className="text-md text-white/80 leading-relaxed mt-4">
              {product?.description}
            </p>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-6 w-max bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
