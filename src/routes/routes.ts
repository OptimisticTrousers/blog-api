import express from "express";
import postRouter from "./post";
import categoryRouter from "./category";
import tagRouter from "./tag";
import imageRouter from "./image";
import passport from "passport";
import User from "../models/user";
import bcrypt from "bcryptjs";
const router = express.Router();

// routes
// router.post("/register", (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
//     if (err) {
//       return next(err);
//     }

//     const user = new User({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     user.save();
//   });
// });
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.get("/user", (req, res) => {
  console.log(req.user);
  res.json({ user: req.user ? req.user : null });
});
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagRouter);
router.use("/images", imageRouter);

export default router;
