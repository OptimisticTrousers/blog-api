import express from "express";
import postRouter from "./post";
import categoryRouter from "./category";
import tagRouter from "./tag";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/login", authController.login_post);
router.post("/logout", authController.logout_post);
router.get("/user", authController.user_detail);
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagRouter);

export default router;
