import { logout } from "@/controller/UserController";

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      await logout(req, res);
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
