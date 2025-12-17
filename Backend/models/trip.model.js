import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationCoords: {
      lat: Number,
      lng: Number,
    }, 
    originCoords: {
      lat: Number,
      lng: Number,
    }, 
    days: Number,
    travellers: Number,
    budget: Number,
    transport: String,
    stay: String,
    itinerary: String,
    status: {
      type: String,
      default: "planned",
    },

    tripDate: { type: Date, default: Date.now },

    routeSummary: {
      distance_meters: Number,
      duration_seconds: Number,
      geometry: {
        type: Object,
      },
      steps: { type: Array },
      createdAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
