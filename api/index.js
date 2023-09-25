import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import testRouter from "./Routes/test.js";
import questionRouter from "./Routes/question.js";

dotenv.config();

// get environment variables
const PORT = process.env.PORT;
const URI = process.env.URI;

// create express app
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// create routes
app.get("/", (req, res) => {
  res.send("This is api for TestManiac App");
});

app.use("/tests", testRouter);
app.use("/questions", questionRouter);

// connect to momgodb and run server
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
