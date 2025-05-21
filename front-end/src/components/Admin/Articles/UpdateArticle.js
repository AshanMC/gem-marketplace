import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import Swal from "sweetalert2";

export default function UpdateArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    axios.get(`${baseURL}/articles/${id}`).then((res) => {
      const { title, description } = res.data;
      setFormData({ title, description, image: null });
    });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) form.append("image", formData.image);

    try {
      await axios.put(`${baseURL}/articles/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Article updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/admin/manage-articles");
      }, 1600);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Update Article
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write a short description..."
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-indigo-600 hover:file:bg-indigo-700"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
}
