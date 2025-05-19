import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccessoryAction } from "../../../redux/slices/accessories/accessorySlice";
import Swal from "sweetalert2";

const AddAccessory = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.accessories?.loading);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockQty: "",
    description: "",
  });
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setImagePreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    files.forEach((file) => data.append("files", file));

    const result = await dispatch(createAccessoryAction(data));

    if (createAccessoryAction.fulfilled.match(result)) {
      Swal.fire({
        title: "✅ Accessory Created!",
        text: "The accessory has been successfully added.",
        icon: "success",
        confirmButtonColor: "#6b46c1",
      }).then(() => {
        window.location.reload(); // 🔁 Reset page
      });
    } else {
      Swal.fire({
        title: "❌ Error",
        text: result.payload || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Add New Accessory</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {[
          { label: "Name", name: "name" },
          { label: "Price", name: "price", type: "number" },
          { label: "Stock Quantity", name: "stockQty", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="w-full h-32 object-cover border rounded shadow-sm"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Adding..." : "Add Accessory"}
        </button>
      </form>
    </div>
  );
};

export default AddAccessory;
