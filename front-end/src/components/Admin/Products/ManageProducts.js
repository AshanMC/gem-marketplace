import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction, deleteProductAction } from "../../../redux/slices/products/productSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import { Link } from "react-router-dom";

export default function ManageProducts() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAction(id)).then(() => dispatch(fetchProductsAction()));
    }
  };

  return (

    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {loading && <LoadingComponent />}
      {error && <ErrorMsg message={error} />}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">Rs. {product.price}</td>
                  <td className="px-6 py-4">{product.totalQty}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 space-x-3">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
