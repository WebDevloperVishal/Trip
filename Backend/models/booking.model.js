import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    trip: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip", 
      required: true 
    },

    amount: { 
      type: Number, 
      required: true 
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    payment: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Payment" 
    },

    paidAt: { 
      type: Date 
    },

    verificationNotes: { 
      type: String 
    },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
