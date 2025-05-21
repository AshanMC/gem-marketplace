import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import { motion } from "framer-motion";
import baseURL from "../../../utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/Cart/cartSlice";
import { createAccessoryReviewAction } from "../../../redux/slices/accessories/accessorySlice";
import Swal from "sweetalert2";

const Accessory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [accessory, setAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.users?.userAuth?.userInfo);

  useEffect(() => {
    const fetchAccessory = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/accessories/${id}`);
        setAccessory(data?.accessory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accessory:", error);
        setLoading(false);
      }
    };

    fetchAccessory();
  }, [id, refresh]);

  const handleAddToCart = () => {
    const item = {
      _id: accessory._id,
      name: accessory.name,
      price: accessory.price,
      image: accessory.images?.[0],
      qtyLeft: accessory.stockQty,
    };
    dispatch(addToCart(item));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Please login to leave a review");
      return;
    }

    try {
      await dispatch(
        createAccessoryReviewAction({
          accessoryID: accessory._id,
          message: reviewMsg,
          rating,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Review submitted!",
        timer: 1500,
        showConfirmButton: false,
      });
      setReviewMsg("");
      setRating(5);
      setRefresh(!refresh);
    } catch (err) {
      Swal.fire("Error", err.message || "Review failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading accessory details...
      </div>
    );
  }

  if (!accessory) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Accessory not found.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={accessory.images?.[0]}
            alt={accessory.name}
            className="w-full rounded-lg shadow-lg object-cover max-h-[500px]"
          />

          <div>
            <h1 className="text-4xl font-bold text-orange-400 mb-4">{accessory.name}</h1>
            <p className="text-lg text-gray-300 mb-4">{accessory.description}</p>
            <p className="text-xl text-white font-semibold mb-2">Price: Rs.{accessory.price}</p>
            <p className="text-md text-gray-400 mb-6">Stock Available: {accessory.stockQty}</p>

            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16 bg-white text-gray-800 p-8 rounded-lg shadow-xl">
          <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            Customer Reviews
          </h3>

          {accessory.reviews?.length > 0 ? (
            <div className="space-y-6 mb-8">
              {accessory.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="font-semibold text-yellow-600">⭐ {review.rating}/5</div>
                  <p className="text-gray-700 mt-1">{review.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-8">No reviews yet.</p>
          )}

          <form
            onSubmit={handleReviewSubmit}
            className="space-y-4 bg-indigo-50 p-6 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-indigo-800 mb-2">
              Leave a Review
            </h4>
            <textarea
              required
              placeholder="Write your review here..."
              className="w-full p-3 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
            />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border border-indigo-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-400 focus:outline-none"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition shadow-lg"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accessory;
