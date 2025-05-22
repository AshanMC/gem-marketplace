import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAccessoryAction,
  updateAccessoryAction,
  resetAccessoryState,
} from "../../../redux/slices/accessories/accessorySlice";
import Swal from "sweetalert2";

export default function UpdateAccessory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { accessory, isUpdated, loading, error } = useSelector((state) => state.accessories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQty: "",
  });

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchAccessoryAction(id));
    return () => {
      dispatch(resetAccessoryState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (accessory && accessory._id === id) {
      setFormData({
        name: accessory.name || "",
        description: accessory.description || "",
        price: accessory.price || "",
        stockQty: accessory.stockQty || "",
      });
      setPreviewImages(accessory.images || []);
    }
  }, [accessory, id]);

  useEffect(() => {
    if (isUpdated) {
      Swal.fire("Updated!", "Accessory updated successfully", "success");
      navigate("/admin/manage-accessories");
    }
  }, [isUpdated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const newFiles = [...e.target.files];
    setFiles(newFiles);

    // Preview
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stockQty", formData.stockQty);

    files.forEach((file) => {
      data.append("files", file);
    });

    dispatch(updateAccessoryAction({ id, formData: data }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Edit Accessory</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stockQty"
              value={formData.stockQty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Upload New Image(s)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600"
          />
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {previewImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="h-20 w-28 object-cover border rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold shadow-md"
        >
          {loading ? "Updating..." : "Update Accessory"}
        </button>
      </form>
    </div>
  );
}
