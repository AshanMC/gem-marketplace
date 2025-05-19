import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    totalQty: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/${id}`);
        setFormData({
          name: data.name,
          category: data.category,
          price: data.price,
          weight: data.weight,
          totalQty: data.totalQty,
          description: data.description,
        });
      } catch (err) {
        toast.error("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("weight", formData.weight);
    data.append("totalQty", formData.totalQty);
    data.append("description", formData.description);
    images.forEach((img) => data.append("files", img));

    try {
      await axios.put(`${baseURL}/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("✅ Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("❌ Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Update Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="price"
          placeholder="Price (Rs)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (carats)"
          value={formData.weight}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="totalQty"
          placeholder="Total Quantity"
          value={formData.totalQty}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <textarea
          name="description"
          rows={4}
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="file"
          name="files"
          onChange={handleFileChange}
          multiple
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
