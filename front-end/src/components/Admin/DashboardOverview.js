import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
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
        <div className="bg-red-400 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Users</h3>
          <p className="text-2xl font-semibold">{usersCount}</p>
        </div>
        <div className="bg-green-400 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Orders</h3>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="bg-yellow-300 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Total Sales</h3>
          <p className="text-2xl font-semibold">Rs. {Math.round(stats?.totalSales || 0)}</p>
        </div>
        <div className="bg-sky-300 text-white rounded-lg p-6 shadow-md">
          <h3 className="text-sm">Today's Sales</h3>
          <p className="text-2xl font-semibold">Rs. {Math.round(todaySales)}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold px-6 py-4  bg-orange-300 border-b">Recent Orders</h2>
        <table className="min-w-full divide-y divide-pink-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium bg-green-300 text-gray-600">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium bg-green-300 text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium bg-green-300">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium bg-green-300">Status</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-400 divide-y divide-pink-700">
            {[...orders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 text-sm text-zinc-900">{order._id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-900">
                    {order.user?.fullname || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-900">
                    Rs. {order.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-900 capitalize">
                    {order.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
