import { createUser, getUser, getUserID } from "@/controller/UserController";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        if (req.query.uid) {
         await getUserID(req, res);
        } else {
         await getUser(req, res);
        }
        break;
      case "POST":
        await createUser(req, res);
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
