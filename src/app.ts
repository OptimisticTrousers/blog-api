import express, { Application } from "express";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes/routes";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./config/passport";
import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import databaseConfig from "./config/db";
import accessControlAllow from "./middlewares/accessControlAllow";

config();

const app: Application = express();

// Configures mongo database
databaseConfig();

app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tonyisern.com",
      "http://localhost:3000",
      "https://optimistic-blog-cms.netlify.app",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET!,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SECRET));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", accessControlAllow, routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server running..."));
