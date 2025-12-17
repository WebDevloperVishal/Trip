import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Destination from "../models/destination.model.js";
import Trip from "../models/trip.model.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("fullname email profileImage createdAt");
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users", error: err.message });
  }
};


export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({ success: true, destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching destinations", error: err.message });
  }
};


export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("user", "fullname email profileImage")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching trips", error: err.message });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "fullname email")
      .populate("bookingId", "amount status");
    const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    res.status(200).json({ success: true, total, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching payments", error: err.message });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullname email")
      .populate("trip", "destination days travellers budget")
      .populate("payment", "status amount")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching bookings", error: err.message });
  }
};


export const getPendingVerificationBookings = async (req, res) => {
  try {
    const pending = await Booking.find({ status: "pending_verification" })
      .populate("user", "fullname email")
      .populate("trip", "destination days travellers budget")
      .populate("payment", "status amount");

    res.status(200).json({
      success: true,
      count: pending.length,
      bookings: pending,
    });
  } catch (err) {
    console.error("Error fetching pending verification bookings:", err);
    res.status(500).json({ success: false, message: "Error fetching pending verification bookings" });
  }
};

export const markBookingVerified = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("payment", "status")
      .populate("user", "fullname email");

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    booking.status = "confirmed";
    await booking.save();

    if (booking.payment) {
      const payment = await Payment.findById(booking.payment._id);
      payment.status = "verified";
      await payment.save();
    }

    res.status(200).json({
      success: true,
      message: "Booking marked as verified successfully",
      booking,
    });
  } catch (err) {
    console.error("Error verifying booking:", err);
    res.status(500).json({ success: false, message: "Error verifying booking" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment)
      return res.status(404).json({ success: false, message: "Payment not found" });

    payment.status = "verified";
    await payment.save();

    const booking = await Booking.findOneAndUpdate(
      { _id: payment.bookingId },
      { status: "confirmed" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error verifying payment", error: err.message });
  }
};


export const getAllUsersWithTrips = async (req, res) => {
  try {
    const users = await User.find().select("fullname email profileImage createdAt");
    const trips = await Trip.find()
      .populate("user", "fullname email profileImage")
      .sort({ createdAt: -1 });

    const userTrips = users.map((user) => {
      const plannedTrips = trips
        .filter((t) => t.user?._id?.toString() === user._id.toString())
        .map((t) => ({
          _id: t._id,
          user: t.user, 
          destination: t.destination,
          days: t.days,
          travellers: t.travellers,
          budget: t.budget,
          status: t.status,
          transport: t.transport,
          stay: t.stay,
          tripDate: t.tripDate || t.createdAt,
        }));

      return {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImage:
          user.profileImage ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        totalTrips: plannedTrips.length,
        trips: plannedTrips,
      };
    });

    res.status(200).json({
      success: true,
      message: "All users with planned trips fetched successfully",
      count: userTrips.length,
      data: userTrips,
    });
  } catch (err) {
    console.error("Error fetching user trips:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching user trips" });
  }
};


export const getUpcomingTrips = async (req, res) => {
  try {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingTrips = await Trip.find({
      createdAt: { $gte: today, $lte: nextWeek },
    }).populate("user", "fullname email");

    res.status(200).json({
      success: true,
      count: upcomingTrips.length,
      trips: upcomingTrips,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching upcoming trips" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting trip" });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting booking" });
  }
};
