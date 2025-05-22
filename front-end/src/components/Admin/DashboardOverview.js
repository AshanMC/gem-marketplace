import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderStatsAction,
  fetchAllUsersAction,
  fetchAllOrdersAction,
} from "../../redux/slices/dashboard/dashboardSlice";

export default function DashboardOverview() {
  const dispatch = useDispatch();
  const { stats, todaySales, usersCount, orders } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchOrderStatsAction());
    dispatch(fetchAllUsersAction());
    dispatch(fetchAllOrdersAction());
  }, [dispatch]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Users</h3>
          <p className="text-2xl font-semibold">{usersCount}</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Orders</h3>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Sales</h3>
          <p className="text-2xl font-semibold">Rs. {Math.round(stats?.totalSales || 0)}</p>
        </div>
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Today's Sales</h3>
          <p className="text-2xl font-semibold">Rs. {Math.round(todaySales)}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold px-6 py-4 bg-gray-100 border-b">Recent Orders</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-sm text-gray-800">{order._id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.user?.fullname || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-800">Rs. {order.totalPrice}</td>
                <td className="px-6 py-4 text-sm text-gray-800 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
