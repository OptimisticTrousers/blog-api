import { Router } from "express";
import post_controller from "../controllers/postController";

const router: Router = Router();

router
  .route("/")
  .get(post_controller.post_list)
  .post(post_controller.post_create);

router
  .route("/:postId")
  .get(post_controller.post_detail)
  .put(post_controller.post_update)
  .delete(post_controller.post_delete);

export default router;
