import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction, resetCategoryCreate } from "../../../redux/slices/categories/categorySlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddCategory = () => {
  const dispatch = useDispatch();
  const { loading, error, isCreated } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    dispatch(createCategoryAction(formData));
  };

  useEffect(() => {
    if (isCreated) {
      setTimeout(() => {
        MySwal.fire({
          title: "Category Created!",
          text: "The category has been added successfully.",
          icon: "success",
          confirmButtonColor: "#6b46c1",
        });
        dispatch(resetCategoryCreate());
        setName("");
        setImage(null);
      }, 100);
    }
    if (error) {
      MySwal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  }, [isCreated, error, dispatch]);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-10 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
