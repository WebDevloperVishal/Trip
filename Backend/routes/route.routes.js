import express from "express";
import {
  computeRoute,
  computeAndSaveRouteForTrip,
} from "../controllers/route.controller.js";

const router = express.Router();

/**
 * @route   POST /api/route/compute
 * @desc    Compute route between origin and destination
 * @access  Public
 */
router.post("/compute", computeRoute);

/**
 * @route   POST /api/route/compute-and-save/:id
 * @desc    Compute and save route details for an existing trip
 * @access  Public or Protected (depending on your Trip model usage)
 */
router.post("/compute-and-save/:id", computeAndSaveRouteForTrip);

export default router;
