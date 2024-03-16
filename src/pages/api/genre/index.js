import { getGenre, getGenreID, createGenre, updateGenre, deleteGenre } from "@/controller/GenreController";

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case "GET":
          if (req.query.id) {
            await getGenreID(req, res);
          } else {
            await getGenre(req, res);
          }
          break;
        case "POST":
            await createGenre(req, res);
          break;
        case "PATCH":
            await updateGenre(req, res);
          break;
        case "DELETE":
            await deleteGenre(req, res);
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