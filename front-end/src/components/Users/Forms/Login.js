import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice.js";
import ErrorMsg from "../../ErrorMsg/ErrorMsg.js";
import LoadingComponent from "../../LoadingComp/LoadingComponent.js";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  const { error, loading } = useSelector((state) => state?.users?.userAuth);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 flex items-center justify-center py-16 px-4">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Login to Your Account
          </h3>
          <p className="text-gray-500 mb-8">Welcome back, we've missed you!</p>

          {error && <ErrorMsg message={error?.message} />}

          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeHandler}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangeHandler}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            <div>
              {loading ? (
                <LoadingComponent />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-md text-lg font-semibold transition"
                >
                  Login
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Right: Image Banner */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
          }}
        ></motion.div>
      </div>
    </section>
  );
};

export default Login;
