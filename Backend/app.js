import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import tripGuideRoutes from "./routes/tripGuide.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import routeRoutes from "./routes/route.routes.js";

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trip-guides", tripGuideRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Trip Backend Running Successfully!");
});


// app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log("Registered route:", r.route.path);
//   } else if (r.name === "router") {
//     r.handle.stack.forEach((layer) => {
//       if (layer.route && layer.route.path) {
//         console.log(`${r.regexp} -> ${layer.route.path}`);
//       }
//     });
//   }
// });


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


app.use(errorHandler);

export default app;
