import { createRelasi, deleteRelasi, editRelasi, getRelasi, getRelasiID } from "@/controller/KategoriController";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.id) {
            await getRelasiID(req, res);
          } else {
            await getRelasi(req, res);
          }
          break;
        case "POST":
            await createRelasi(req, res);
          break;
        case "PATCH":
            await editRelasi(req, res);
          break;
        case "DELETE":
            await deleteRelasi(req, res);
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