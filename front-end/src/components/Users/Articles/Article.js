import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticleByIdAction } from "../../../redux/slices/articles/articleSlice";
import Navbar from "../../Navbar/Navbar";
import { motion } from "framer-motion";

export default function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticleByIdAction(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6 text-center text-white">Loading article...</p>;
  if (error) return <p className="p-6 text-center text-red-400">{error}</p>;

  return (
    <div className="bg-gradient-to-br from-purple-200 via-blue-100 to-yellow-200 min-h-screen text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        {article && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            <motion.h1
              className="text-slate-600 text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {article.title}
            </motion.h1>

            <motion.p
              className="text-zinc-500 text-lg  leading-relaxed whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {article.description}
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
