import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlice";

const HomeCategories = () => {
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector(
    (state) => state?.categories || {}
  );

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  if (loading) return <p className="text-center text-white">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Browse by Categories
      </h2>

      {Array.isArray(categories) && categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Optional image support */}
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-32 w-full object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300">No categories available.</p>
      )}
    </section>
  );
};

export default HomeCategories;
