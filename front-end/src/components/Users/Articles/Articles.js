import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesAction } from "../../../redux/slices/articles/articleSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/Navbar";

export default function Articles() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticlesAction());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-white to-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading */}
        <motion.h1
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Articles
        </motion.h1>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-lg text-gray-200">Loading articles...</p>
        )}
        {error && (
          <p className="text-center text-red-400 font-medium">{error}</p>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <Link to={`/articles/${article._id}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold text-white line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                  {article.description}
                </p>
                <p className="mt-4 text-orange-400 text-sm font-semibold hover:underline">
                  Read more →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
