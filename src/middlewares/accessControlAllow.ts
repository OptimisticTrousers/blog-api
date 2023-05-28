import { Request, NextFunction, Response } from "express";
import { config } from "dotenv";

config();

const accessControlAllow = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "production"
      ? "https://optimistic-blog-cms.netlify.app"
      : "http://localhost:5173"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "POST,PUT,GET,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

export default accessControlAllow;
