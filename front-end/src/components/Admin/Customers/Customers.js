import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlice";
import moment from "moment";


export default function Customers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customers</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading users...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Registered</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{user.fullname}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {moment(user.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.orders?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
