import { Router } from "express";
import tag_controller from "../controllers/tagController";

const router: Router = Router();

router.route("/").get(tag_controller.tag_list).post(tag_controller.tag_create);

router
  .route(":tagId")
  .get(tag_controller.tag_detail)
  .put(tag_controller.tag_update)
  .delete(tag_controller.tag_delete);

export default router;
