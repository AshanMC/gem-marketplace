import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAction,
  updateCategoryAction,
} from "../../../redux/slices/categories/categorySlice";
import Swal from "sweetalert2";

export default function UpdateCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const found = categories.find((c) => c._id === id);
    if (found) setName(found.name);
  }, [categories, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction({ id, name })).then((res) => {
      if (!res.error) {
        Swal.fire({
          icon: "success",
          title: "Category updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/admin/manage-category"), 1600);
      }
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Update Category
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter new category name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition shadow-sm"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
