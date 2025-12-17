import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";


export const generateUPILink = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    const merchantUPI = process.env.UPI_ID;
    const name = "VitalTrip";

    const upiLink = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tn=Trip%20Booking`;

    const payment = await Payment.create({
      bookingId,
      user: req.user._id,
      upiLink,
      amount,
    });

    res.status(200).json({ success: true, upiLink, payment });
  } catch (err) {
    console.error("UPI link error:", err);
    res.status(500).json({ success: false, message: "Failed to generate UPI link" });
  }
};

export const submitPaymentProof = async (req, res) => {
  try {
    const { paymentId, utr } = req.body;
    const screenshot = req.file ? `uploads/${req.file.filename}` : null;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.utr = utr;
    if (screenshot) payment.screenshot = screenshot;
    payment.status = "paid";
    await payment.save();

    res.status(200).json({ success: true, message: "Payment proof submitted", payment });
  } catch (err) {
    console.error("Proof upload error:", err);
    res.status(500).json({ success: false, message: "Error uploading proof" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "verified";
    await payment.save();

    await Booking.findOneAndUpdate(
      { _id: payment.bookingId },
      { status: "confirmed", payment: payment._id }
    );

    res.status(200).json({ success: true, message: "Payment verified & booking confirmed" });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
