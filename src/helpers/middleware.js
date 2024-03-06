import Cors from "cors";
import dotenv from "dotenv";
import next from "next";

dotenv.config();

export const cors = Cors({
  methods: ["GET", "POST", "PATCH", "HEAD", "PUT", "DELETE"],
  origin: "*",
  credentials: true,
  allowedHeaders: "*",
});

export function middleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function apiKey(req, res) {
  const api = req.headers["x-api-key"];

  const keyValue = process.env.API_KEY;

  if (api !== keyValue) {
    return res.status(401).json({ message: "Unauthorize" });
  } else {
    return res.status(200);
  }
}