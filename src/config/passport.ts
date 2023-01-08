import User from "../models/user";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import { Error } from "mongoose";
import { UserInterface } from "../atoms";

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne(
        { username: username },
        (err: Error, user: UserInterface) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (result) {
              // passwords match! log user in
              return done(null, user);
            }
            // passwords do not match!
            return done(null, false);
          });
        }
      );
    })
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id }, (err: Error, user: UserInterface) => {
      cb(err, user);
    });
  });
}
