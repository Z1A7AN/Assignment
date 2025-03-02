import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h1>This is a Backend of Globetrotter</h1>`);
});

import DestinationRouter from "./routes/destination.routes.js";
import UserRouter from "./routes/user.routes.js";

app.use("/api/v1/destinations", DestinationRouter);
app.use("/api/v1/users", UserRouter);

export {app};