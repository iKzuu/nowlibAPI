import { addBook } from "@/controller/BukuController";

export default async function handler(req, res) {
  try {

    if (req.method === "POST") {
        await addBook(req, res);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end("Method ${req.method} Not Allowed");
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}