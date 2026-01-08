import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";
import PaymentModal from "./PaymentModal";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-[#2874f0]">
          SaaS
        </Link>

        {/* Right Menu */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setShowPayment(true)}
            className="hover:text-[#2874f0]"
          >
            Plans
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-[#2874f0]"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#2874f0] font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#fb641b] text-white px-4 py-2 rounded font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </>
  );
}
