import express from "express";
import cors from "cors";

import auth from "./routes/authRoute.js";
import game from "./routes/gameRoute.js";
import user from "./routes/userRoute.js";
import jwtVerifier from "./middlewares/jwtVerifier.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4000'  // Allow requests from this origin
}));

app.use("/auth", auth);
app.use("/game", jwtVerifier, game);
app.use("/user", jwtVerifier, user);

app.use("/" , (req, res) =>{
  res.send("Test");
});
export default app;
