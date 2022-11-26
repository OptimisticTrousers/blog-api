import { Router, Response, Request, NextFunction} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json()
})

export default router;