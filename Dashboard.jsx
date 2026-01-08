import { useSelector } from "react-redux";
import Layout from "../components/Layout";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const subscription = user?.subscription;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Account Details</h2>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {user?.name || "—"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user?.email || "—"}
          </p>
        </div>

        {/* Subscription Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-3">Subscription</h3>

          <div className="flex items-center gap-3">
            <span className="font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded text-sm ${
                subscription?.status === "active"
                  ? "bg-green-100 text-green-700"
                  : subscription?.status === "expired"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {subscription?.status || "No Plan"}
            </span>
          </div>

          {subscription?.plan?.name && (
            <p className="mt-2">
              <span className="font-medium">Plan:</span>{" "}
              {subscription.plan.name}
            </p>
          )}

          {subscription?.expiresAt && (
            <p className="text-sm text-gray-500 mt-2">
              Expires on:{" "}
              {new Date(subscription.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
