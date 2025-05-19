import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticleAction, resetArticleCreate } from "../../../redux/slices/articles/articleSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddArticle = () => {
  const dispatch = useDispatch();
  const { loading, error, isCreated } = useSelector((state) => state.articles);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    dispatch(createArticleAction(formData));
  };

  useEffect(() => {
    if (isCreated) {
      setTimeout(() => {
        MySwal.fire({
          title: "Article Created!",
          text: "The article has been added successfully.",
          icon: "success",
          confirmButtonColor: "#6b46c1",
        });
        dispatch(resetArticleCreate());
        setTitle("");
        setDescription("");
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
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
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
          {loading ? "Adding..." : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
