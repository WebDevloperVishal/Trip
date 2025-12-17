import express from "express";
import {
  createTrip,
  getUserTrips,
  cancelTrip,
  getAllTrips,
  saveTrip,
  getSavedTrips,
} from "../controllers/trip.controller.js";

import {
  computeRoute,
  computeAndSaveRouteForTrip,
} from "../controllers/route.controller.js";

import { authUser } from "../middlewares/auth.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();


router.post("/create", authUser, createTrip);
router.get("/my-trips", authUser, getUserTrips);
router.put("/cancel/:id", authUser, cancelTrip);


router.post("/route", authUser, computeRoute);

router.post("/:id/route-cache", authUser, computeAndSaveRouteForTrip);

router.post("/save", authUser, saveTrip);

router.get("/saved", authUser, getSavedTrips);

router.get("/all", verifyCaptainAccess, getAllTrips);

export default router;
