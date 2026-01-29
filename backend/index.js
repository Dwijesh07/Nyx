import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoute from "./routes/summarize.js";

dotenv.config({ path: "./.env" });
console.log("ENV KEY FOUND:", process.env.OPENAI_API_KEY ? "YES" : "NO");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NotMe API running 🚀");
});

app.use("/api/summarize", summarizeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
