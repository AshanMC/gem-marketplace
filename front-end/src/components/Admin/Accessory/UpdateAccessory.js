import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAccessoryAction,
  updateAccessoryAction,
} from "../../../redux/slices/accessories/accessorySlice";

export default function UpdateAccessory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { accessory, isUpdated, error } = useSelector(
    (state) => state.accessories
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQty: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchAccessoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (accessory) {
      setFormData({
        name: accessory.name || "",
        description: accessory.description || "",
        price: accessory.price || "",
        stockQty: accessory.stockQty || "",
      });
    }
  }, [accessory]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Accessory updated successfully");
      navigate("/admin/manage-accessories");
    }
    if (error) {
      toast.error(error);
    }
  }, [isUpdated, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForm = new FormData();
    updatedForm.append("name", formData.name);
    updatedForm.append("description", formData.description);
    updatedForm.append("price", formData.price);
    updatedForm.append("stockQty", formData.stockQty);
    if (file) {
      updatedForm.append("image", file);
    }
    dispatch(updateAccessoryAction({ id, formData: updatedForm }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Update Accessory
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQty"
            value={formData.stockQty}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Image</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Update Accessory
        </button>
      </form>
    </div>
  );
}
