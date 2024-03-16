import { createCategory, getKategori, getCategoryID, editKategori, deleteKategori } from "@/controller/KategoriController";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
    try {
      middleware(req,res,cors)
      switch (req.method) {
        case "GET":
          if (req.query.id) {
            await getCategoryID(req, res);
          } else {
            await getKategori(req, res);
          }
          break;
        case "POST":
            await createCategory(req, res);
          break;
        case "PATCH":
            await editKategori(req,res);
          break;
        case "DELETE":
            await deleteKategori(req, res);
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