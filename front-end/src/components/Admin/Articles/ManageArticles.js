import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesAction,
  deleteArticleAction,
} from "../../../redux/slices/articles/articleSlice";
import { Link } from "react-router-dom";

export default function ManageArticles() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticlesAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticleAction(id)).then(() => {
        dispatch(fetchArticlesAction());
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Articles</h1>

      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-6 py-3">Image</th>
            <th className="text-left px-6 py-3">Title</th>
            <th className="text-left px-6 py-3">Description</th>
            <th className="text-left px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id} className="border-t">
              <td className="px-6 py-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-16 w-24 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 font-semibold">{article.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600 line-clamp-2">
                {article.description}
              </td>
              <td className="px-6 py-4 space-x-4">
                <Link
                  to={`/admin/edit-article/${article._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article._id)}
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
