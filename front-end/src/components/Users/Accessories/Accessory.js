import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAccessoryAction } from "../../../redux/slices/accessories/accessorySlice";
import { createReviewAction } from "../../../redux/slices/reviews/reviewSlice";
import { StarIcon } from "@heroicons/react/24/solid";
import { addToCart } from "../../../redux/slices/Cart/cartSlice";
import Navbar from "../../Navbar/Navbar";

export default function Accessory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accessory } = useSelector((state) => state.accessories);
  const { userInfo: user } = useSelector((state) => state.users.userAuth);

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchAccessoryAction(id));
  }, [dispatch, id, refresh]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("Please login to leave a review");
      return;
    }

    try {
      await dispatch(
        createReviewAction({
          accessoryId: id,
          message: reviewMsg,
          rating: Number(rating),
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
      const msg = err?.message || err;
      if (msg.toLowerCase().includes("already reviewed")) {
        Swal.fire("You already reviewed this accessory", "", "info");
      } else if (msg.toLowerCase().includes("accessory not found")) {
        Swal.fire("Accessory not found", "Please refresh the page.", "warning");
      } else {
        Swal.fire("Error", msg, "error");
      }
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: accessory._id,
        name: accessory.name,
        price: accessory.price,
        image: accessory.images?.[0],
        qtyLeft: accessory.stockQty,
        type: "accessory",
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-yellow-200 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <img
            src={accessory?.images?.[0]}
            alt={accessory?.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-zinc-700 mb-2">{accessory.name}</h2>
          <p className="text-orange-500 font-semibold text-2xl mb-4">
            Rs. {accessory.price?.toLocaleString()}
          </p>
          <p className="text-zinc-600 text-base mb-4">{accessory.description}</p>
          <p className="text-green-600 mb-1">
            <span className="font-semibold">Available:</span> {accessory.stockQty}
          </p>
          <p className="text-yellow-600 mb-4">
            <span className="font-semibold">Sold:</span> {accessory.soldQty}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-medium shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 px-4">
        <h3 className="text-3xl font-bold text-blue-500 mb-6">Reviews</h3>

        {Array.isArray(accessory.reviews) && accessory.reviews.length > 0 ? (
          <ul className="space-y-6">
            {accessory.reviews.map((review, index) => (
              <li key={review._id || index} className="bg-white/10 p-4 rounded shadow">
                <p className="text-orange-500 font-semibold">
                  Name:{" "}
                  <span className="text-gray-800">
                    {review.user?.name || "Unknown"}
                  </span>
                </p>

                <p className="text-gray-800 mt-1">
                  <span className="font-semibold text-orange-500">Message:</span>{" "}
                  {review.message}
                </p>

                <div className="flex items-center mt-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No reviews yet.</p>
        )}

        <form
          onSubmit={handleReviewSubmit}
          className="mt-10 bg-white/10 p-6 rounded-lg space-y-4"
        >
          <h4 className="text-xl font-semibold text-blue-600">Leave a Review</h4>
          <textarea
            className="w-full p-3 rounded text-black"
            rows={4}
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <div>
            <label className="block text-sm mb-1 text-red-500">Rating</label>
            <select
              className="w-full p-2 rounded text-black"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
