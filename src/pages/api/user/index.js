import { getUser, getUserID } from "@/controller/UserController";
import login from "./login";
import register from "./register";
import logout from "./logout";
import loginPetugas from "./loginpetugas";
import createPetugas from "./registerpetugas";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        if (req.query.id) {
         await getUserID(req, res);
        } else {
         await getUser(req, res);
        }
        break;
      case "POST":
        break;
      case "PATCH":
        break;
      case "DELETE":
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        res.status(405).end("Method ${req.method} Not Allowed");
    }
  } catch (error) {
    res.status(200).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export {
  login,
  register,
  logout,
  loginPetugas,
  createPetugas,
}
