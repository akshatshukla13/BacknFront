import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(CookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

import userRouter from "./routes/user.router.js";


app.use("/users", userRouter);

export { app };
