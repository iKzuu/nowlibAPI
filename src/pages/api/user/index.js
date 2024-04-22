import { editUser, getUser, getUserID } from "@/controller/UserController";
import login from "./login";
import register from "./register";
import logout from "./logout";
import loginPetugas from "./loginpetugas";
import createPetugas from "./registerpetugas";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
  try {
    middleware(req, res, cors);
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
        await editUser (req, res);
        break;
      case "DELETE":
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        res.status(405).end("Method ${req.method} Not Allowed");
    }
  } catch (error) {
    res.status(500).json({
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
