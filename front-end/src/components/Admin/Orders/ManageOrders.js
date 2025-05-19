import React from "react";

const ManageOrders = ({ orders = [] }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">
        Manage Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No orders available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Amount (Rs)</th>
                <th className="px-5 py-3 text-left">Payment</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {order._id}
                  </td>
                  <td className="px-5 py-3">{order.user?.fullname || "Unknown"}</td>
                  <td className="px-5 py-3">Rs. {order.totalPrice}</td>
                  <td className="px-5 py-3">
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </td>
                  <td className="px-5 py-3">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">Delivered</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="px-5 py-3 space-x-2">
                    {!order.isDelivered && (
                      <button
                        onClick={() => alert("Mark this as delivered")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
                      >
                        Mark Delivered
                      </button>
                    )}
                    <button
                      onClick={() => alert("Delete order")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Optional Pagination */}
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

export default ManageOrders;
