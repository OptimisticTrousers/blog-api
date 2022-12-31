import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import mongoose, { ConnectOptions } from "mongoose";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";
import createError from "http-errors";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes/routes";

config();

const app: Application = express();

const mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(<ErrorRequestHandler>((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send(err.message);
}));

app.listen(process.env.PORT, () => console.log("Server running"));
