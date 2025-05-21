import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchAccessoriesAction,
  updateAccessoryAction,
} from "../../../redux/slices/accessories/accessorySlice";

export default function UpdateAccessory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessories } = useSelector((state) => state.accessories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQty: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const accessory = accessories.find((a) => a._id === id);
    if (accessory) {
      setFormData({
        name: accessory.name,
        description: accessory.description,
        price: accessory.price,
        stockQty: accessory.stockQty,
        image: null,
      });
      setPreview(accessory.images?.[0]);
    }
  }, [accessories, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stockQty", formData.stockQty);
    if (formData.image) form.append("image", formData.image);

    dispatch(updateAccessoryAction({ id, formData: form })).then((res) => {
      if (!res.error) {
        Swal.fire({
          icon: "success",
          title: "Accessory updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/admin/manage-accessories"), 1600);
      }
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Update Accessory
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accessory Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
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
            rows="4"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (LKR)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQty"
              value={formData.stockQty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
        </div>

        {preview && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview Image
            </label>
            <img
              src={preview}
              alt="Preview"
              className="h-28 rounded-md border object-cover"
            />
          </div>
        )}

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
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
          >
            Update Accessory
          </button>
        </div>
      </form>
    </div>
  );
}
