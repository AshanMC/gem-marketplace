import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccessoriesAction,
  deleteAccessoryAction,
} from "../../../redux/slices/accessories/accessorySlice";
import { Link } from "react-router-dom";

export default function ManageAccessories() {
  const dispatch = useDispatch();
  const { accessories, loading, error } = useSelector((state) => state.accessories);

  useEffect(() => {
    dispatch(fetchAccessoriesAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this accessory?")) {
      dispatch(deleteAccessoryAction(id)).then(() => {
        dispatch(fetchAccessoriesAction());
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Accessories</h1>

      {loading && <p>Loading accessories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3">Image</th>
            <th className="text-left px-6 py-3">Name</th>
            <th className="text-left px-6 py-3">Price</th>
            <th className="text-left px-6 py-3">Stock</th>
            <th className="text-left px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accessories.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="px-6 py-4">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-16 w-24 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 font-semibold">{item.name}</td>
              <td className="px-6 py-4">Rs. {item.price.toLocaleString()}</td>
              <td className="px-6 py-4">{item.stockQty}</td>
              <td className="px-6 py-4 space-x-4">
                <Link
                  to={`/admin/edit-accessory/${item._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
