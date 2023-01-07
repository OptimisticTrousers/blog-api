import User from "./models/user";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";

export default function (passport: any) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err: any, user: any) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        console.log(user.password, password);
        done(null, user)
        // bcrypt.compare(password, user.password, function (err, res) {
        //   console.log(res)
        //   if (res) {
        //     // passwords! log user in
        //     return done(null, user);
        //   } else {
        //     // passwords do not match!
        //     return done(null, false);
        //   }
        // });
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err) {
        //     return done(err);
        //   }
        //   if (result) {
        //     // passwords match! log user in
        //     return done(null, user);
        //   }
        //   // passwords do not match!
        //   return done(null, false);
        // });
      });
    })
  );

  passport.serializeUser((user: any, cb: any) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id: any, cb: any) => {
    User.findOne({ _id: id }, (err: any, user: any) => {
      cb(err, user);
    });
  });
}
