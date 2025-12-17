import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  confirmBookingPayment,   
} from "../controllers/booking.controller.js";

const router = express.Router();


router.post("/create", authUser, createBooking);

router.get("/my-bookings", authUser, getUserBookings);


router.put("/cancel/:id", authUser, cancelBooking);

router.post("/confirm/:id", authUser, confirmBookingPayment);

export default router;
