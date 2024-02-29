import { deleteBuku, getBuku, getBukuID, updateBuku } from "@/controller/BukuController";
import addBook from "./addbook";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.uid) {
           await getBukuID(req, res);
          } else {
           await getBuku(req, res);
          }
          break;
        case "POST":
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

  export {
    addBook,
  }