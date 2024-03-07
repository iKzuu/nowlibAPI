import { deleteBuku, getBuku, getBukuID, updateBuku, addBook } from "@/controller/BukuController";
import { cors, middleware } from "@/helpers/middleware";

export default async function handler(req, res) {
    try {
      middleware(req,res,cors)
      switch (req.method) {
        case "GET":
          if (req.query.id) {
           await getBukuID(req, res);
          } else {
           await getBuku(req, res);
          }
          break;
        case "POST":
          await addBook(req, res);
          break;
        case "PATCH":
          await updateBuku(req, res);
          break;
        case "DELETE":
          await deleteBuku(req, res);
          break;
        default:
          res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
          res.status(405).end("Method ${req.method} Not Allowed");
      }
    } catch (error) {
      console.log(error),
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }