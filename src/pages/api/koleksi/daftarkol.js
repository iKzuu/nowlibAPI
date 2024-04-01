import { getKoleksiUserID } from "@/controller/KoleksiController";
import { cors, middleware } from "@/helpers/middleware";


export default async function handler(req, res) {
  try {
    middleware(req, res, cors);
    if (req.method === "GET") {
      await getKoleksiUserID(req, res);
    } else {
      res.setHeader("Allow", ["POST"]);
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