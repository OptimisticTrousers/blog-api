import express from "express";
import postRouter from "./post";
import categoryRouter from "./category";
import tagRouter from "./tag";
import imageRouter from "./image";
const router = express.Router();

// routes
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagRouter);
router.use("/images", imageRouter);

export default router;
