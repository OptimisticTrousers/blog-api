import { Router } from "express";
import post_controller from "../controllers/blogController";

const router: Router = Router();

router
  .route("/")
  .get(post_controller.post_list)
  .post(post_controller.post_create_post);

router
  .route("/:postId")
  .get(post_controller.post_detail)
  .put(post_controller.post_update_put)
  .delete(post_controller.post_update_delete);

export default router;
