import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";
import {
  generateUPILink,
  submitPaymentProof,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/upi-link", authUser, generateUPILink);
router.post("/proof", authUser, upload.single("screenshot"), submitPaymentProof);
router.put("/verify/:paymentId", verifyCaptainAccess, verifyPayment);

export default router;
