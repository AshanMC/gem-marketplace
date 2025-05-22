import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGemRequestAction } from "../../../redux/slices/gemRequests/gemRequestSlice";
import Swal from "sweetalert2";

export default function RequestGem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.gemRequest);

  const [formData, setFormData] = useState({
    gemName: "",
    weight: "",
    description: "",
    neededDate: "",
    minPrice: "",
    maxPrice: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { gemName, weight, description, neededDate, minPrice, maxPrice } = formData;
    const expectedPrice = `${minPrice} - ${maxPrice}`;

    try {
      await dispatch(
        createGemRequestAction({
          gemName,
          weight: parseFloat(weight),
          description,
          neededDate,
          expectedPrice,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your gem request has been sent successfully.",
        confirmButtonText: "Back to Home",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md font-semibold",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });

      setFormData({
        gemName: "",
        weight: "",
        description: "",
        neededDate: "",
        minPrice: "",
        maxPrice: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error || "Please try again.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Request a Custom Gem
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Gem Name</label>
            <input
              type="text"
              name="gemName"
              value={formData.gemName}
              required
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              placeholder="e.g. Sapphire"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Weight (carats)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              required
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              placeholder="e.g. 2.5"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Needed By (Date)</label>
            <input
              type="date"
              name="neededDate"
              value={formData.neededDate}
              required
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Expected Price Range (Rs.)</label>
            <div className="flex gap-3">
              <input
                type="number"
                name="minPrice"
                value={formData.minPrice}
                placeholder="Min"
                required
                onChange={onChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                placeholder="Max"
                required
                onChange={onChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              placeholder="Describe the gem you're looking for..."
              required
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 hover:from-orange-500 hover:to-red-600 text-white py-3 rounded-md text-lg font-semibold shadow-lg transition"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
