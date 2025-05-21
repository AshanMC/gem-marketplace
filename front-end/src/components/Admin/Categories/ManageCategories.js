import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAction,
  deleteCategoryAction,
} from "../../../redux/slices/categories/categorySlice";
import { Link } from "react-router-dom";

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id)).then(() => {
        dispatch(fetchCategoriesAction());
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3">Image</th>
            <th className="text-left px-6 py-3">Name</th>
            <th className="text-left px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="px-6 py-4">
                {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="h-16 w-24 object-cover rounded"
              />
            )};
              </td>
              <td className="px-6 py-4 font-semibold">{cat.name}</td>
              <td className="px-6 py-4 space-x-4">
                <Link
                  to={`/admin/edit-category/${cat._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(cat._id)}
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
