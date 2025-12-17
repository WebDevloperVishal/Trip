import express from "express";
import { body } from "express-validator";
import multer from "multer";
import path from "path";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  forgotPassword,
  resetPassword,
  verifyCaptainResetToken,
  checkOldPasswordCaptain,
  logoutCaptain,
  updateCaptainProfile, 
} from "../controllers/captain.controller.js";

import {
  getAllUsers,
  getAllDestinations,
  getAllTrips,
  getAllPayments,
  getAllBookings,
  getPendingVerificationBookings,
  markBookingVerified,
  verifyPayment,
  deleteUser,
  deleteTrip,
  deleteBooking,
  getAllUsersWithTrips,
  getUpcomingTrips,
} from "../controllers/captainDashboard.controller.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });


router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerCaptain
);


router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  loginCaptain
);


router.get("/profile", verifyCaptainAccess, getCaptainProfile);


router.put(
  "/update-profile",
  verifyCaptainAccess,
  upload.single("profileImage"),
  updateCaptainProfile
);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-reset/:token", verifyCaptainResetToken);
router.post("/check-old-password", checkOldPasswordCaptain);


router.post("/logout", verifyCaptainAccess, logoutCaptain);

//UsersDashboardRoutes
router.get("/dashboard/users", verifyCaptainAccess, getAllUsers);
router.get("/dashboard/users-trips", verifyCaptainAccess, getAllUsersWithTrips);
router.get("/dashboard/upcoming-trips", verifyCaptainAccess, getUpcomingTrips);
router.get("/dashboard/trips", verifyCaptainAccess, getAllTrips);
router.delete("/dashboard/users/:id", verifyCaptainAccess, deleteUser);
router.delete("/dashboard/trips/:id", verifyCaptainAccess, deleteTrip);


router.get("/dashboard/destinations", verifyCaptainAccess, getAllDestinations);


router.get("/dashboard/bookings", verifyCaptainAccess, getAllBookings);
router.get("/dashboard/bookings/pending", verifyCaptainAccess, getPendingVerificationBookings);
router.put("/dashboard/bookings/verify/:id", verifyCaptainAccess, markBookingVerified);
router.delete("/dashboard/bookings/:id", verifyCaptainAccess, deleteBooking);

router.get("/dashboard/payments", verifyCaptainAccess, getAllPayments);
router.put("/dashboard/payments/verify/:paymentId", verifyCaptainAccess, verifyPayment);

export default router;
