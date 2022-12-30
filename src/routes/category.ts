import { Router } from "express";
import category_controller from "../controllers/categoryController";

const router: Router = Router();

router
  .route("/")
  .get(category_controller.category_list)
  .post(category_controller.category_create);

router
  .route(":categoryId")
  .get(category_controller.category_detail)
  .put(category_controller.category_update)
  .delete(category_controller.category_delete);

export default router;
