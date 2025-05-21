import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

export default function ThanksForOrdering() {
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/orders/${orderId}`);
        setOrder(data.order);
      } catch (err) {
        console.error("Failed to load order", err);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <img
          src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
          alt="Confirmation Hero"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>

            {order && (
              <>
                <dl className="mt-16 text-sm font-medium">
                  <dt className="text-gray-900">Tracking number</dt>
                  <dd className="mt-2 text-indigo-600">{order._id}</dd>
                </dl>

                <ul
                  role="list"
                  className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="flex space-x-6 py-6">
                      <img
                        src={item.images?.[0] || item.image || item.imageUrl || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                      />
                      <div className="flex-auto space-y-1">
                        <h3 className="text-gray-900">{item.name}</h3>
                        <p>Qty: {item.qty}</p>
                      </div>
                      <p className="flex-none font-medium text-gray-900">${item.price}</p>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                  <div className="flex justify-between">
                    <dt>Total</dt>
                    <dd className="text-gray-900">${order.totalPrice}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Status</dt>
                    <dd className="text-gray-900">{order.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Payment</dt>
                    <dd className="text-gray-900">{order.paymentStatus}</dd>
                  </div>
                </dl>

                <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                  <div>
                    <dt className="font-medium text-gray-900">Shipping Address</dt>
                    <dd className="mt-2">
                      <address className="not-italic">
                        <span className="block">{order.shippingAddress?.address}</span>
                        <span className="block">{order.shippingAddress?.city}, {order.shippingAddress?.province}</span>
                        <span className="block">{order.shippingAddress?.postalCode}</span>
                      </address>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Payment Method</dt>
                    <dd className="mt-2">
                      <p className="text-gray-900">{order.paymentMethod}</p>
                      <p>{order.currency?.toUpperCase()}</p>
                    </dd>
                  </div>
                </dl>
              </>
            )}

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                to="/"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}