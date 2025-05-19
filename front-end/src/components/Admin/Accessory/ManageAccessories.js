import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessoriesAction } from "../../../redux/slices/accessories/accessorySlice";

const ManageAccessories = () => {
  const dispatch = useDispatch();
  const { accessories = [], loading, error } = useSelector((state) => state.accessories || {});

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Manage Accessories
      </h2>

      {loading && <p className="text-center text-gray-500">Loading accessories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {accessories.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No accessories found. Please add some.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Price (Rs)</th>
                <th className="px-5 py-3 text-left">Stock</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {accessories.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-5 py-3">
                    <img
                      src={item?.images?.[0] || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-5 py-3">{item.category}</td>
                  <td className="px-5 py-3">Rs. {item.price}</td>
                  <td className="px-5 py-3">{item.stockQty}</td>
                  <td className="px-5 py-3 space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md transition">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAccessories;
