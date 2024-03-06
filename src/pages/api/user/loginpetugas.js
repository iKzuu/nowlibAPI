import { loginPetugas } from "@/controller/UserController";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
  middleware(req,res,cors);
  try {
    if (req.method === "POST") {
      await loginPetugas(req, res);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end("Method ${req.method} Not Allowed");
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
