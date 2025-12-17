import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upiLink: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    utr: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "verified"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
