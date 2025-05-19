import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createProductAction, resetAddState } from "../../../redux/slices/products/productSlice";

const MySwal = withReactContent(Swal);

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    weight: "",
    totalQty: "",
  });

  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setImagePreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    files.forEach((file) => data.append("files", file));
    dispatch(createProductAction(data));
  };

  useEffect(() => {
    if (isAdded) {
      MySwal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been created successfully.",
        confirmButtonColor: "#6366F1",
      });
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        weight: "",
        totalQty: "",
      });
      setFiles([]);
      setImagePreviews([]);
      dispatch(resetAddState());
    }

    if (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error,
        confirmButtonColor: "#EF4444",
      });
    }
  }, [isAdded, error, dispatch]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Add a New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        {["name", "description", "category", "price", "weight", "totalQty"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === "price" || field === "weight" || field === "totalQty" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        ))}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt="preview" className="rounded-lg shadow-md object-cover h-36 w-full" />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
