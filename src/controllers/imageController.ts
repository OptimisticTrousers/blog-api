import path from "path";
import { Request, Response, NextFunction } from "express";

const image_detail = (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, `../../public/${req.params.imageName}`));
};

export default {
  image_detail,
};
