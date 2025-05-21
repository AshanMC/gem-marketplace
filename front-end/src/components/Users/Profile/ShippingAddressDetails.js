import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAddressAction } from "../../../redux/slices/users/usersSlice";
import { toast } from "react-toastify";

export default function ShippingAddressForm() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.users);
  const existing = profile?.ShippingAddress || {};

  const [formData, setFormData] = useState({
    firstname: existing.firstname || "",
    lastname: existing.lastname || "",
    address: existing.address || "",
    city: existing.city || "",
    province: existing.province || "",
    postalCode: existing.postalCode || "",
    phone: existing.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateShippingAddressAction(formData))
      .unwrap()
      .then(() => {
        toast.success("Shipping address updated successfully");
      })
      .catch((err) => {
        toast.error(err || "Failed to update shipping address");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Update Shipping Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="border p-2 rounded col-span-full"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          placeholder="Province"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="border p-2 rounded col-span-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow"
      >
        {loading ? "Updating..." : "Save Address"}
      </button>
    </form>
  );
}
