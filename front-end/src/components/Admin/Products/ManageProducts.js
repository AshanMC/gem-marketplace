import React from "react";
import { Link } from "react-router-dom";

const ManageProducts = ({ products = [], onDelete }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Manage Products
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No products found. Please add some.
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
                <th className="px-5 py-3 text-left">Weight (carats)</th>
                <th className="px-5 py-3 text-left">Quantity</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-5 py-3">
                    <img
                      src={product.image || "https://via.placeholder.com/60"}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-5 py-3">
                    {typeof product.category === "string"
                      ? product.category
                      : product.category?.name || "—"}
                  </td>
                  <td className="px-5 py-3">
                    Rs. {Number(product.price || 0).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    {product.weight ? `${product.weight} ct` : "—"}
                  </td>
                  <td className="px-5 py-3">{product.totalQty || 0}</td>
                  <td className="px-5 py-3 space-x-2">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete?.(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Optional: Pagination or Load More */}
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

export default ManageProducts;
