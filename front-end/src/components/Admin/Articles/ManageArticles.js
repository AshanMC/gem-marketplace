import React from "react";
import { Link } from "react-router-dom";

// Optional: pass real data via props
const ManageArticles = ({ articles = [] }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Manage Articles
      </h2>

      {articles.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No articles found. Please add one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Description</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-5 py-3">
                    <img
                      src={article.image || "https://via.placeholder.com/60"}
                      alt={article.title}
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {article.title}
                  </td>
                  <td className="px-5 py-3 truncate max-w-xs text-gray-600">
                    {article.description?.slice(0, 100)}...
                  </td>
                  <td className="px-5 py-3 space-x-2">
                    <Link
                      to={`/admin/articles/edit/${article._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => alert("Delete Article")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Optional pagination */}
          <div className="mt-6 text-right">
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
