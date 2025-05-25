import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice.js";
import ErrorMsg from "../../ErrorMsg/ErrorMsg.js";
import LoadingComponent from "../../LoadingComp/LoadingComponent.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345",
  });

  const { email, password } = formData;
  const { error, loading, userInfo } = useSelector((state) => state?.users?.userAuth);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  useEffect(() => {
  if (userInfo) {
    Swal.fire({
      icon: "success",
      title: "Login successful!",
      timer: 1500,
      showConfirmButton: false,
    });

    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath);
    }
  }, [userInfo, navigate]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 flex items-center justify-center py-16 px-4">
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">
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
          <p className="text-gray-500 mb-8">Welcome back!</p>

          {error && <ErrorMsg message={error} />}

          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeHandler}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none transition"
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
                  className="w-full bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white py-3 rounded-md text-lg font-semibold shadow-lg transition"
                >
                  Login
                </motion.button>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Create one
              </button>
            </p>
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
              'url("https://res.cloudinary.com/dcj5ifk4o/image/upload/v1748164749/788134_lyz1rg.jpg")',
          }}
        ></motion.div>
      </div>
    </section>
  );
};

export default Login;
