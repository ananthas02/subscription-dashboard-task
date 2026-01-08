import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";


const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 6.25,
    type: "monthly",
    features: [
      "1 Registration Type",
      "Email Support",
      "Cancellation & Refunds",
      "Payment Gateway",
      "Basic Reports",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 20.0,
    type: "monthly",
    features: [
      "Unlimited Registrations",
      "Analytics",
      "Priority Email",
      "100 Email Invites",
      "Advanced Reports",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 38.0,
    type: "yearly",
    features: [
      "API Access",
      "Dedicated Support",
      "Custom SLA",
      "App Access",
      "Priority Support",
    ],
  },
];

export default function Plans() {

  const [showPayment, setShowPayment] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const filteredPlans =
    filter === "all" ? PLANS : PLANS.filter((p) => p.type === filter);

  return (
    <Layout>
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl font-semibold text-gray-900">
          Event Registration Software Packages & Pricing
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Perfect for events where attendees need to register or pay to attend.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-8 shadow-lg border transition
              ${plan.featured
                ? "bg-gradient-to-b from-blue-500 to-indigo-700 text-white scale-105"
                : "bg-white"
              }`}
          >
            <h2 className="text-lg font-semibold">{plan.name}</h2>

            <p
              className={`text-4xl font-bold mt-4 ${plan.featured ? "text-white" : "text-gray-900"
                }`}
            >
              ${plan.price}
            </p>

            <p
              className={`text-sm mt-1 ${plan.featured ? "text-blue-100" : "text-gray-500"
                }`}
            >
              Per Attendee / {plan.type}
            </p>

            <ul
              className={`mt-6 space-y-3 text-sm ${plan.featured ? "text-blue-100" : "text-gray-600"
                }`}
            >
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <button
              onClick={() => {
                if (!user) {
                  alert("Please login to continue");
                  return;
                }
                setSelectedPlan(plan);
                setShowPayment(true);
              }}
              className={`mt-8 w-full py-2 rounded-lg font-semibold transition
    ${plan.featured
                  ? "bg-white text-indigo-600 hover:bg-gray-100"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              Get started
            </button>
            <PaymentModal
              isOpen={showPayment}
              onClose={() => setShowPayment(false)}
              plan={selectedPlan}
              user={user}
            />


          </div>
        ))}
      </div>

      {/* Payment Section */}
      {selectedPlan && (
        <div className="bg-white rounded-2xl shadow p-10 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Payment Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Plan:</strong> {selectedPlan.name}
              </p>
              <p>
                <strong>Billing:</strong> {selectedPlan.type}
              </p>
              <p className="text-xl font-semibold text-indigo-600">
                Total: ${selectedPlan.price}
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Payment successful (demo)")}
            className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700
            text-white py-3 rounded-lg text-lg"
          >
            Pay ${selectedPlan.price}
          </button>
        </div>
      )}
    </Layout>
  );
}
