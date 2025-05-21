import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ fullname, email, password }));
  };

  const { user, error, loading } = useSelector((state) => state.users);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Create an Account
          </h3>
          <p className="text-gray-500 mb-6">
            Signing up is quick and easy — let’s get started!
          </p>

          {error && <ErrorMsg message={error?.message} />}

          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Full Name</label>
              <input
                name="fullname"
                value={fullname}
                onChange={onChangeHandler}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">Password</label>
              <input
                name="password"
                value={password}
                onChange={onChangeHandler}
                type="password"
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
                  Register
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Right: Background Image */}
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

export default RegisterForm;
