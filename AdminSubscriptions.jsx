import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  // Demo data (replace with API later)
  useEffect(() => {
    setSubscriptions([
      {
        id: 1,
        user: "John Doe",
        email: "john@example.com",
        plan: "Pro",
        amount: "$1.50",
        status: "Active",
        startDate: "2026-01-01",
      },
      {
        id: 2,
        user: "Alice Smith",
        email: "alice@example.com",
        plan: "Basic",
        amount: "$1.25",
        status: "Expired",
        startDate: "2025-12-10",
      },
      {
        id: 3,
        user: "Robert Fox",
        email: "robert@example.com",
        plan: "Prepaid",
        amount: "$2.00",
        status: "Active",
        startDate: "2026-01-05",
      },
    ]);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Subscriptions
          </h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {sub.user}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {sub.email}
                  </td>
                  <td className="px-4 py-3">
                    {sub.plan}
                  </td>
                  <td className="px-4 py-3">
                    {sub.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sub.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {sub.startDate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-indigo-600 hover:underline text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
