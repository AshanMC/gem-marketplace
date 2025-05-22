import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../redux/slices/products/productSlice";
import { Link } from "react-router-dom";

const HomeProductTrending = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state?.products || {});

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  if (loading) return <p className="text-center text-white">Loading trending products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.slice(0, 8).map((product) => (
        <Link
          to={`/products/${product._id}`}
          key={product._id}
          className="bg-white/10 backdrop-blur rounded p-4 shadow hover:shadow-lg transition text-stone-500"
        >
          <img
            src={product?.images?.[0]}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-stone-700 truncate">{product.description}</p>
          <p className="text-orange-300 mt-1">Rs. {product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomeProductTrending;
