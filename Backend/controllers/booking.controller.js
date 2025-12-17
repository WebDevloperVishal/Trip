import Booking from "../models/booking.model.js";
import Trip from "../models/trip.model.js";


export const createBooking = async (req, res) => {
  try {
    const { tripId, amount } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const booking = await Booking.create({
      user: req.user._id,
      trip: tripId,
      amount,
    });

    // Mock payment info
    const upiString = `upi://pay?pa=vitaltrip@upi&pn=VitalTrip&am=${amount}&cu=INR&tn=Trip%20Booking`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      upiString
    )}&size=300x300`;

    res.status(201).json({
      success: true,
      booking,
      payment: {
        qrUrl,
        upiString,
        amount,
        instructions: "Scan the QR using any UPI app to complete payment.",
      },
    });
  } catch (err) {
    console.error("Booking create error:", err);
    res.status(500).json({ message: "Server error while booking" });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("trip")
      .populate("payment");

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Cancel booking error:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};


export const confirmBookingPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    booking.status = "pending_verification";
    booking.verificationNotes =
      "User clicked 'I have paid'. Awaiting admin check.";
    await booking.save();

    console.log("Booking pending verification:", booking._id);
    res.json({
      success: true,
      message: "Payment submitted! Awaiting admin verification.",
      booking,
    });
  } catch (err) {
    console.error("Confirm booking payment error:", err);
    res.status(500).json({ message: "Failed to confirm payment" });
  }
};
