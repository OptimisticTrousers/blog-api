import { Router } from "express";
import post_controller from "../controllers/postController";
import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const router: Router = Router();

router
  .route("/")
  .get(post_controller.post_list)
  .post(upload.single("image"), post_controller.post_create);

router
  .route("/:postId")
  .get(post_controller.post_detail)
  .put(upload.single("image"), post_controller.post_update)
  .delete(post_controller.post_delete);

export default router;
