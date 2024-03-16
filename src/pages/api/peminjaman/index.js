import { createPeminjaman, getPeminjaman, getPeminjamanUserID, getPeminjamanID } from "@/controller/PeminjamanController";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
    try {
      middleware(req, res, cors);
      switch (req.method) {
        case "GET":
          if (req.query.id) {
            await getPeminjamanID(req, res);
          } else {
            await getPeminjaman(req, res);
          }
          break;
        case "POST":
          await createPeminjaman(req, res);
          break;
        case "PATCH":
          break;
        case "DELETE":
          break;
        default:
          res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
          res.status(405).end(`Method ${req.method} Not Allowed`);
      }      
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
