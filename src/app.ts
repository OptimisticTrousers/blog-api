import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import logger from "morgan";
import cors from "cors";

const app: Application = express();

const mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());

// routes
app.use("/blogs");

app.listen(process.env.PORT, () => console.log("Server running"));
