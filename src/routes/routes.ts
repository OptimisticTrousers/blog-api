import express from "express";
import postRouter from "./post";
import categoryRouter from "./category";
import tagRouter from "./tag";
const router = express.Router();

// routes
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagRouter);

export default router;
