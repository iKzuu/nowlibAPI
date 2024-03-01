import { addUlasan, deleteUlasan, getUlasan, getUlasanID, updateUlasan } from "@/controller/UlasanController";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.id) {
           await getUlasanID(req, res);
          } else {
           await getUlasan(req, res);
          }
          break;
        case "POST":
            await addUlasan(req, res);
          break;
        case "PATCH":
            await updateUlasan(req, res);
          break;
        case "DELETE":
            await deleteUlasan(req, res);
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