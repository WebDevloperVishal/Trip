import express from "express";
import {
  searchDestinations,
  getCategories,
  getByCategory,
  addDestination,
  updateDestination,
  getAllDestinations,
  getDestinationById,
} from "../controllers/destination.controller.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();

router.get("/", getAllDestinations);


router.get("/search", searchDestinations);


router.get("/categories", getCategories);


router.get("/category/:category", getByCategory);


router.get("/:id", getDestinationById);


router.post("/add", verifyCaptainAccess, addDestination);


router.put("/:id", verifyCaptainAccess, updateDestination);

export default router;
