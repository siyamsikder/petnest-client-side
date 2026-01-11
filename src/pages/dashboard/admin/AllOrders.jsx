import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('access-token');
                const res = await fetch(`https://petnest-one.vercel.app/orders`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Failed to fetch all orders");

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
    }, []);

    const handleExportPDF = () => {
        const doc = new jsPDF("p", "pt", "a4");

        const headers = [
            ["Customer", "Product", "Price", "Quantity", "Date", "Phone"],
        ];
        const data = orders.map((order) => [
            order.userEmail || order.email || "N/A",
            order.productName,
            order.price,
            order.quantity,
            order.date,
            order.phone,
        ]);

        doc.setFontSize(18);
        doc.text("🐾 All System Orders Report", 40, 50);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 65);

        autoTable(doc, {
            head: headers,
            body: data,
            startY: 80,
            theme: "grid",
            headStyles: { fillColor: [99, 46, 227], textColor: 255 },
            styles: { fontSize: 9, cellPadding: 6 },
            margin: { left: 40, right: 40 },
        });

        doc.save("all_orders_report.pdf");
    };

    if (loading) return <LoadingSpinner />;

    return (
        <section className="max-w-7xl mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-secondary">
                        🐾 All System Orders ({orders.length})
                    </h2>
                    <p className="text-gray-500">Overview of all pet adoptions and supply orders across the platform.</p>
                </div>
                {orders.length > 0 && (
                    <button
                        onClick={handleExportPDF}
                        className="btn btn-primary flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                    >
                        Export All as PDF
                    </button>
                )}
            </div>

            {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                    <p className="text-gray-400 text-lg font-medium">No orders found in the system.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <table className="table w-full">
                        <thead className="bg-gray-50 border-none">
                            <tr className="text-gray-500 uppercase text-[11px] tracking-wider">
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                                    <td className="font-medium text-secondary">{order.userEmail || order.email}</td>
                                    <td className="font-bold text-secondary">{order.productName}</td>
                                    <td className="font-bold text-primary">৳{order.price}</td>
                                    <td className="text-center">{order.quantity}</td>
                                    <td className="text-gray-500 text-sm">{order.date}</td>
                                    <td>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg uppercase">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default AllOrders;
