import Trip from "../models/trip.model.js";
import User from "../models/user.model.js";
import Destination from "../models/destination.model.js";

export const createTrip = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { destination, days, travellers, budget, transport, stay, itinerary } = req.body;
    const trip = await Trip.create({
      user: userId,
      destination,
      days,
      travellers,
      budget,
      transport,
      stay,
      itinerary: Array.isArray(itinerary) ? itinerary.join(", ") : itinerary,
    });

    res.status(201).json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ message: "Server error creating trip", error: err.message });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const userId = req.user._id;
    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user trips" });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("user", "fullname email");
    res.status(200).json({ success: true, count: trips.length, trips });
  } catch (err) {
    res.status(500).json({ message: "Error fetching all trips" });
  }
};

export const cancelTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    trip.status = "cancelled";
    await trip.save();
    res.json({ message: "Trip cancelled successfully", trip });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling trip" });
  }
};

export const saveTrip = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { destinationId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!destinationId)
      return res.status(400).json({ success: false, message: "Destination ID required" });

    const destination = await Destination.findById(destinationId);
    if (!destination)
      return res.status(404).json({ success: false, message: "Destination not found" });

    const existing = await Trip.findOne({ user: userId, destination: destination.name });
    if (existing)
      return res.status(400).json({ success: false, message: "Trip already saved" });

    const savedTrip = await Trip.create({
      user: userId,
      destination: destination.name,
      destinationCoords: destination.coordinates,
      status: "saved",
      tripDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Trip saved successfully",
      savedTrip,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save trip",
      error: err.message,
    });
  }
};

export const getSavedTrips = async (req, res) => {
  try {
    const userId = req.user?._id;
    const trips = await Trip.find({ user: userId, status: "saved" }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved trips" });
  }
};
