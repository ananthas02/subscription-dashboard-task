// src/components/PaymentModal.jsx
export default function PaymentModal({ isOpen, onClose, plan, user }) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Payment Summary
        </h2>

        <div className="space-y-4 text-sm">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <hr />

          <p><strong>Plan:</strong> {plan.name}</p>
          <p><strong>Billing:</strong> {plan.type}</p>
          <p className="text-xl font-bold text-indigo-600">
            Total: ${plan.price}
          </p>
        </div>

        <button
          onClick={() => alert("Payment successful (demo)")}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700
          text-white py-3 rounded-lg text-lg"
        >
          Pay ${plan.price}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-red-500 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
