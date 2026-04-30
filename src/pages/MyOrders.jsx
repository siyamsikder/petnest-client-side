import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const token = localStorage.getItem('access-token');
        const res = await fetch(`https://petnest-one.vercel.app/orders?email=${user.email}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders!");
        setLoading(false);
      }
    };
    fetchOrders();
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

  if (loading) return <LoadingSpinner />;

  return (
    <section className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h2 className="text-3xl font-bold text-gray-900">🐾 My <span className="text-primary font-classic">Orders</span></h2>
            {orders.length > 0 && (
              <button
                onClick={handleExportPDF}
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-gray-900/10 hover:shadow-primary/20 flex items-center gap-2">
                Export as PDF
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-400 uppercase text-[10px] tracking-widest font-bold border-b border-gray-100">
                    <th className="pb-4">Product Name</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Qty</th>
                    <th className="pb-4">Address</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Phone</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-6 font-bold text-gray-900">{order.productName}</td>
                      <td className="py-6 font-medium text-primary">{order.price}</td>
                      <td className="py-6">{order.quantity}</td>
                      <td className="py-6 text-sm">{order.address}</td>
                      <td className="py-6 text-sm">{order.date}</td>
                      <td className="py-6 text-sm">{order.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
