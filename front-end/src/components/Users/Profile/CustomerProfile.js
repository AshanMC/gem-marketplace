import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ShippingAddressDetails from "./ShippingAddressDetails"

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
    return <div className="text-center mt-10 text-gray-500">No profile data loaded.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-yellow-100 py-10 px-4">
      <motion.h2
        className="text-4xl font-extrabold text-center text-purple-700 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Profile
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Info</h3>
            <p><strong>Full Name:</strong> {user?.fullname}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </motion.div>

          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
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
              className="mb-8"
            >
              <ShippingAddressDetails />
            </motion.div>
          )}

          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
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
    </div>
  );
}
