import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Fort", "Beach", "Waterfall", "Temple", "Lake/River", "Hidden Gem"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bestTimeToVisit: {
    type: String,
    default: "All year round",
  },
  accessibility: {
    type: String,
    default: "Easily accessible by road",
  },
  budget: {
    type: String,
    default: "₹1000 - ₹5000",
  },
  routes: [String],
  nearbyHospitals: [String],
  image: {
    type: String,
    default: "https://via.placeholder.com/400x250",
  },
  coordinates: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
  },
});

export default mongoose.model("Destination", destinationSchema);
