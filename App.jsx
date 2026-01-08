import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";
import AdminSubscriptions from "./pages/AdminSubscriptions";

import PaymentModal from "./components/PaymentModal";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

export default function App() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      {/* Navbar can open modal */}
      <Navbar onOpenPayment={() => setShowPayment(true)} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Plans onSubscribe={() => setShowPayment(true)} />}
        />
        <Route
          path="/plans"
          element={<Plans onSubscribe={() => setShowPayment(true)} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/subscriptions"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminSubscriptions />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Global Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </>
  );
}
