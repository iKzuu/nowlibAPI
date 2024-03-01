import { getRelasiID, getRelasi } from "@/controller/KategoriController";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { uid } = req.query;
      if (uid) {
        await getRelasiID(req, res);
      } else {
        await getRelasi(req, res);
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
