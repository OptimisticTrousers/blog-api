import { Router } from "express";
import image_controller from "../controllers/imageController";

const router: Router = Router();

router
  .route("/:imageName")
  .get(image_controller.image_detail)


export default router;