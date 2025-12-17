import express from "express";
import { getTripGuide } from "../controllers/tripGuide.controller.js";
const router = express.Router();

router.get("/guide", getTripGuide);

export default router;
