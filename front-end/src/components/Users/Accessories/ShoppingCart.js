import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  changeQty,
} from "../../../../redux/slices/Cart/cartSlice";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleQtyChange = (id, qty) => {
    dispatch(changeQty({ id, qty: Number(qty) }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="bg-gradient-to-b from-white to-black min-h-screen text-gray-900">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24">
        <h1 className="text-3xl font-bold text-white text-center mb-12">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-white">
            Your cart is empty.{" "}
            <Link to="/products" className="text-blue-400 underline">
              Browse products
            </Link>
          </p>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex gap-6 items-center bg-white/10 backdrop-blur p-4 rounded-xl shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Rs. {item.price.toLocaleString()} x {item.qty}
                      </p>
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-300">Qty:</label>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQtyChange(item._id, e.target.value)
                          }
                          className="rounded p-1 text-sm text-black"
                        >
                          {[...Array(item.qtyLeft).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="ml-auto text-red-500 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between text-white mb-2">
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-400 my-4"></div>
              <div className="flex justify-between font-semibold text-white text-lg">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <Link
                to="/order-payment"
                className="block w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white text-center py-3 rounded-md font-semibold transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
