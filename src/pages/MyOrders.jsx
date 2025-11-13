import React from "react";
import { useLoaderData } from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyOrders = () => {
  const orders = useLoaderData();

  const handleExportPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Table headers
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

    // Optional: Logo
    const img = new Image();
    img.src = "https://i.ibb.co/6mXwYVZ/logo.png"; // replace with your logo
    img.crossOrigin = "anonymous";

    img.onload = () => {
      doc.addImage(img, "PNG", 40, 20, 50, 50); // x, y, width, height
      doc.setFontSize(18);
      doc.text("🐾 My Orders Report", 100, 50);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 100, 65);

      doc.autoTable({
        head: headers,
        body: data,
        startY: 90,
        theme: "grid",
        headStyles: { fillColor: [99, 46, 227], textColor: 255 },
        styles: { fontSize: 11, cellPadding: 6 },
        margin: { left: 40, right: 40 },
      });

      doc.save("my_orders.pdf");
    };

    // If image fails, generate table without logo
    img.onerror = () => {
      doc.setFontSize(18);
      doc.text("🐾 My Orders Report", 40, 50);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 65);

      doc.autoTable({
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
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-primary mb-4 md:mb-0">
          My Orders ({orders.length})
        </h1>
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
          You haven't placed any orders yet 😅
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
