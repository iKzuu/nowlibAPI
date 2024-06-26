import { getPeminjamanUserID } from "@/controller/PeminjamanController";
import { cors, middleware } from "@/helpers/middleware";


export default async function handler(req, res) {
  try {
    middleware(req, res, cors);
    if (req.method === "GET") {
      await getPeminjamanUserID(req, res);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("Method ${req.method} Not Allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}