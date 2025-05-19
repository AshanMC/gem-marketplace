import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateAccessory() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    stockQty: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/accessories/${id}`).then((res) => {
      const { name, description, category, price, brand, stockQty } =
        res.data.accessory;
      setFormData({ name, description, category, price, brand, stockQty });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/v1/accessories/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Accessory updated!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Accessory</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded"
          placeholder="Description"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Category"
        />
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Brand"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
        />
        <input
          name="stockQty"
          value={formData.stockQty}
          onChange={handleChange}
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="Stock Quantity"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Update Accessory
        </button>
      </form>
    </div>
  );
}
