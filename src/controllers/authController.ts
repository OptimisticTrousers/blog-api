import { NextFunction, Response } from "express";
import passport from "passport";
import { MyRequest } from "../atoms";

const logout_post = (req: any, res: Response, next: NextFunction) => {
  req.logout((err: Error) => {
    if (err) {
      next(err);
    }
    res.send("Logged out!");
  });
};

const login_post = (req: any, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err: Error) => {
        if (err) {
          return next(err);
        }
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
};

const user_detail = (req: any, res: Response) => {
  res.json({ user: req.user ? req.user : null });
};

export default {
  login_post,
  logout_post,
  user_detail,
};
