import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { updateProductAction } from "../../../redux/slices/products/productSlice";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    weight: "",
    totalQty: "",
    description: "",
    category: "",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/${id.trim()}`);
        const product = data.product;
        setFormData({
          name: product.name || "",
          price: product.price || 0,
          weight: product.weight || "",
          totalQty: product.totalQty || "",
          description: product.description || "",
          category: product.category || "",
          images: product.images || [],
        });
        setImagePreview(product.images || []);
      } catch (err) {
        toast.error("❌ Failed to load product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("weight", formData.weight);
      form.append("totalQty", formData.totalQty);
      form.append("description", formData.description);
      form.append("category", formData.category);

      formData.images.forEach((img) => {
        if (typeof img === "object") {
          form.append("files", img); // multer expects "files"
        } else {
          form.append("existingImages", img);
        }
      });

      await dispatch(updateProductAction({ id: id.trim(), formData: form })).unwrap();

      // ✅ SweetAlert success popup
      Swal.fire({
        title: "Success!",
        text: "Product updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/manage-products");
      });

    } catch (err) {
      toast.error("❌ Failed to update product");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Total Quantity</label>
          <input
            type="number"
            name="totalQty"
            value={formData.totalQty}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md file:bg-blue-500 file:text-white"
          />
          <div className="flex flex-wrap gap-4 mt-3">
            {imagePreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Preview"
                className="h-20 w-20 rounded-md object-cover border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
          Update Product
        </button>
      </form>
    </div>
  );
}
