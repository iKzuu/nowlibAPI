import { addKoleksi, deleteKoleksi, getKoleksi, getKoleksiID } from "@/controller/KoleksiController";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.id) {
            await getKoleksiID(req, res);
          } else {
            await getKoleksi(req, res);
          }
          break;
        case "POST":
            await addKoleksi(req, res);
          break;
        case "PATCH":
          break;
        case "DELETE":
            await deleteKoleksi(req, res);
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