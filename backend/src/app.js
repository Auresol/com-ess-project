import express from "express";
import cors from "cors";

import auth from "./routes/authRoute.js";
import game from "./routes/gameRoute.js";
import jwtVerifier from "./middlewares/jwtVerifier.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", auth);
app.use("/game", jwtVerifier, game);

app.use("/" , jwtVerifier , (req, res) =>{
  res.send("Test");
});
export default app;
