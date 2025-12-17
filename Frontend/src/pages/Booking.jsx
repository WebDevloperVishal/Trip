import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const tripId = location.state?.tripId || null;
  const defaultAmount = location.state?.amount || 1000;

  const [amount, setAmount] = useState(defaultAmount);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const getAuthHeader = () => {
    const token =
      localStorage.getItem("userToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("captainToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (!user) {
      toast.warn("Please login first to continue booking!");
      navigate("/auth");
    } else if (tripId) {
      handleBookNow(); 
    } else {
      toast.error("Invalid trip data!");
      navigate("/plan-trip");
    }
  }, [user]);

  
  const handleBookNow = async () => {
    try {
      setBookingLoading(true);
      const res = await api.post(
        "/bookings/create",
        { tripId, amount },
        { headers: getAuthHeader() }
      );

      setPaymentInfo(res.data);
      toast.success("Booking created! Please complete your payment.");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

 
  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.payment.upiString);
      toast.success("UPI string copied!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  
  const handleConfirmPayment = async () => {
    if (!paymentInfo?.booking?._id) return;
    try {
      setConfirming(true);
      await api.post(
        `/bookings/confirm/${paymentInfo.booking._id}`,
        {},
        { headers: getAuthHeader() }
      );
      toast.success("Payment submitted for verification!");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Confirm error:", err);
      toast.error("Payment confirmation failed!");
    } finally {
      setConfirming(false);
    }
  };

  const handleCancel = () => {
    toast.info("Booking cancelled.");
    navigate("/plan-trip");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-teal-50 p-6">
      <div className="bg-white shadow-2xl rounded-3xl border border-gray-200 p-8 w-full max-w-md text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Complete Your Payment
        </h2>
        <p className="text-gray-500 mb-6">
          Scan the QR below using any UPI app to pay securely.
        </p>

        
        {!paymentInfo ? (
          <div className="text-gray-500 italic py-20">
            {bookingLoading
              ? "Generating your UPI QR..."
              : "Preparing your booking..."}
          </div>
        ) : (
          <>
            {/* QR Display */}
            <div className="bg-gray-50 p-4 rounded-2xl shadow-inner border mb-5 flex flex-col items-center">
              <img
                src={paymentInfo.payment.qrUrl}
                alt="UPI QR Code"
                className="w-56 h-56 object-contain rounded-xl mb-3"
              />
              <div className="text-sm bg-gray-100 rounded-md py-2 px-3 break-all shadow-inner text-gray-700">
                {paymentInfo.payment.upiString}
              </div>
            </div>

           
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <button
                onClick={handleCopyUPI}
                className="px-5 py-2 text-sm font-medium bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                Copy UPI
              </button>

              <a
                href={`upi://pay?${paymentInfo.payment.upiString.split("upi://pay?")[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Open UPI App
              </a>
            </div>

           
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmPayment}
                disabled={confirming}
                className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
              >
                {confirming ? "Confirming..." : "Confirm Payment"}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 rounded-full font-semibold text-gray-700 bg-gray-100 border hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
