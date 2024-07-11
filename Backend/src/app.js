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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import healthRouter from "./routes/healthcheck.routes.js";
import commentRoute from "./routes/comment.routes.js";
import playlistRoute from "./routes/playlist.routes.js";

app.use("/users", userRouter);

app.use("/videos", videoRouter);

app.use("/tweet", tweetRouter);

app.use("/health", healthRouter);

app.use("/comment", commentRoute);

app.use("/playlist", playlistRoute);

export { app };
