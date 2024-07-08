import connectDB from "./database/index.js";
import dotenv from "dotenv";
// import express from "express";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
// const app = express();

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Listening at port: ", PORT);
      console.log("URL : ", `http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log("Express Error:", err);
  });

//   console.log(process.env);
