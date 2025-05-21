import { useSelector } from "react-redux";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import ShippingAddressDetails from "../../Users/Profile/ShippingAddressDetails";
import { useEffect } from "react";

export default function OrderPayment() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.users);
  const shippingAddress = profile?.ShippingAddress;
  const token = profile?.token || JSON.parse(localStorage.getItem("userInfo"))?.token;

  useEffect(() => {
    const cleanCart = cartItems.filter(item => item.type === "product" || item.type === "accessory");
    if (cleanCart.length !== cartItems.length) {
      localStorage.setItem("cartItems", JSON.stringify(cleanCart));
    }
  }, [cartItems]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
  };

  const createOrderSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        orderItems: cartItems,
        shippingAddress,
        totalPrice: calculateTotalPrice(),
      };

      console.log("🚚 Sending Order:", orderPayload);

      const response = await axios.post(`${baseURL}/orders`, orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.href = response.data.url; // Stripe redirect
    } catch (error) {
      console.error("Order creation failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <ShippingAddressDetails />
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems?.map((product) => (
                    <li key={product._id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product?.images?.[0] ||
                            product?.image ||
                            product?.imageUrl ||
                            "https://via.placeholder.com/80"
                          }
                          alt={product.name || "Product"}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                            <p className="mt-1 text-sm text-gray-500">Qty: {product.qty}</p>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            $ {product?.price} x {product?.qty}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Sub Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      $ {calculateTotalPrice()}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    onClick={createOrderSubmitHandler}
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Confirm Payment - ${calculateTotalPrice()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}