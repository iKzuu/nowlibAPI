import { createCategory, getKategori, getCategoryID, getRelasi, getRelasiID } from "@/controller/KategoriController";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.uid) {
            await getCategoryID(req, res);
          } else {
           await getKategori(req, res);
          }
          break;
        case "POST":
            await createCategory(req, res);
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