import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { toast } from "react-toastify";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch orders!");
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    const headers = [
      ["Product", "Price", "Quantity", "Address", "Date", "Phone"],
    ];
    const data = orders.map((order) => [
      order.productName,
      order.price,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    doc.setFontSize(18);
    doc.text("🐾 My Orders Report", 40, 50);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 65);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 80,
      theme: "grid",
      headStyles: { fillColor: [99, 46, 227], textColor: 255 },
      styles: { fontSize: 11, cellPadding: 6 },
      margin: { left: 40, right: 40 },
    });

    doc.save("my_orders.pdf");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-4">
          🐾 My Orders ({orders.length})
        </h2>
        {orders.length > 0 && (
          <button
            onClick={handleExportPDF}
            className="btn btn-primary flex items-center gap-2">
            Export as PDF
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't placed any orders yet
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-xl shadow-md">
          <table className="table w-full bg-white">
            <thead className="bg-primary/20">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Date</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td>{order.productName}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyOrders;
