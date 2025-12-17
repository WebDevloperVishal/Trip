import express from "express";
import { body } from "express-validator";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  getUserProfile,
  uploadProfileImage,
  updateUserCredentials,
  forgotPassword,
  resetPassword,
  logoutUser,
  verifyResetToken,
} from "../controllers/user.controller.js";

import {
  getUserDashboard,
  updateUserProfile,
  cancelUserTrip,
} from "../controllers/userDashboard.controller.js";

const router = express.Router();


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
  registerUser
);


router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);


router.post("/logout", authUser, logoutUser);


router.get("/profile", authUser, getUserProfile);


router.post(
  "/upload-profile",
  authUser,
  upload.single("profileImage"),
  uploadProfileImage
);

router.put("/update-credentials", authUser, updateUserCredentials);


router.put(
  "/update-profile",
  authUser,
  upload.single("profileImage"),
  updateUserProfile
);


router.get("/dashboard", authUser, getUserDashboard);


router.delete("/cancel-trip/:id", authUser, cancelUserTrip);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-reset/:token", verifyResetToken);

export default router;
