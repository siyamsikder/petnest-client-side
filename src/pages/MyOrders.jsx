import React from "react";
import { useLoaderData } from "react-router";
import { FaBox, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const MyOrders = () => {
  const orders = useLoaderData();

  return (
    <section className="max-w-6xl mx-auto py-12 px-6 min-h-screen">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        My Orders ({orders.length})
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't placed any orders yet 😅
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 bg-white rounded-2xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaBox className="text-primary" /> {order.productName}
              </h2>
              <p className="flex items-center gap-2 text-gray-600">
                <FaMoneyBillWave className="text-green-500" />{" "}
                {order.price}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />{" "}
                {order.address}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt className="text-blue-500" />{" "}
                {order.date}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Phone:</strong> {order.phone}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              {order.notes && (
                <p className="text-sm text-gray-400 italic mt-1">
                  “{order.notes}”
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
