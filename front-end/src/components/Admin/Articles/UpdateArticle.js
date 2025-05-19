import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateArticle() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/articles/${id}`).then((res) => {
      const { title, description } = res.data;
      setFormData({ title, description, image: null });
    });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) form.append("image", formData.image);

    await axios.put(`http://localhost:5000/api/v1/articles/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Article updated!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border px-3 py-2 rounded"
        />
        <input type="file" name="image" onChange={handleChange} />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Article
        </button>
      </form>
    </div>
  );
}
