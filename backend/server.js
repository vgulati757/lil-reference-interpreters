import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.error(`MongoDB Connection Error: ${error}`));

  
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
