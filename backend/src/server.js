import app from "./app.js";
import './config/db.js';

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("There was an unhandled rejection", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
