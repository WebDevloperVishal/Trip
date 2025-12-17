import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getPendingBlogs,
  approveBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();


router.post("/create", upload.single("image"), authUser, createBlog);


router.get("/", getAllBlogs);


router.get("/pending/all", verifyCaptainAccess, getPendingBlogs);
router.put("/approve/:id", verifyCaptainAccess, approveBlog);
router.delete("/:id", verifyCaptainAccess, deleteBlog);


router.get("/:id", getBlogById);

export default router;
