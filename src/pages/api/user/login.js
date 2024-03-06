import { login } from "@/controller/UserController";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
  try {
    middleware(req, res, cors);
    if (req.method === "POST") {
      await login(req, res);
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
