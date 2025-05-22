import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";
import ShippingAddressDetails from "./ShippingAddressDetails";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector((state) => state.users);
  const user = profile?.user ?? profile;
  const orders = user?.orders || [];

  useEffect(() => {
    if (!user?._id) dispatch(getUserProfileAction());
  }, [dispatch, user]);

  if (!profile || Object.keys(profile).length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-gray-500 text-lg">No profile data available.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 py-10 px-4">
        <motion.div
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-10">
            My Profile
          </h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-y-10">
              {/* Personal Info */}
              <motion.div
                className="rounded-lg bg-white shadow border border-gray-200 p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                <p className="mb-2"><strong>Full Name:</strong> {user?.fullname}</p>
                <p><strong>Email:</strong> {user?.email}</p>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                className="rounded-lg bg-white shadow border border-gray-200 p-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Shipping Address</h3>
                {user?.hasShippingAddress ? (
                  <div className="space-y-1">
                    <p><strong>Address:</strong> {user?.ShippingAddress?.address}</p>
                    <p><strong>City:</strong> {user?.ShippingAddress?.city}</p>
                    <p><strong>Province:</strong> {user?.ShippingAddress?.province}</p>
                    <p><strong>Postal Code:</strong> {user?.ShippingAddress?.postalCode}</p>
                    <p><strong>Phone:</strong> {user?.ShippingAddress?.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No shipping address added yet.</p>
                )}
              </motion.div>

              {!user?.hasShippingAddress && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <ShippingAddressDetails />
                </motion.div>
              )}

              {/* Orders Table */}
              <motion.div
                className="rounded-lg bg-white shadow border border-gray-200 p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">My Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">{order._id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">Rs. {order.totalPrice}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{order.status || 'Pending'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
