import express from "express";
import {
  getAllUsers,
  getAllDestinations,
  getAllTrips,
  getAllPayments,
  getAllBookings,
  verifyPayment,
  deleteUser,
  deleteTrip,
  deleteBooking,
  getPendingVerificationBookings, 
  markBookingVerified,
  getAllUsersWithTrips,
  getUpcomingTrips,
} from "../controllers/captainDashboard.controller.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();



router.get("/users", verifyCaptainAccess, getAllUsers);
router.delete("/users/:id", verifyCaptainAccess, deleteUser);
router.get("/destinations", verifyCaptainAccess, getAllDestinations);


router.get("/trips", verifyCaptainAccess, getAllTrips);
router.delete("/trips/:id", verifyCaptainAccess, deleteTrip);

router.get("/bookings", verifyCaptainAccess, getAllBookings);
router.delete("/bookings/:id", verifyCaptainAccess, deleteBooking);


router.get("/payments", verifyCaptainAccess, getAllPayments);
router.put("/payments/verify/:paymentId", verifyCaptainAccess, verifyPayment);


router.get("/bookings/pending", verifyCaptainAccess, getPendingVerificationBookings);
router.put("/bookings/verify/:id", verifyCaptainAccess, markBookingVerified);

export default router;
