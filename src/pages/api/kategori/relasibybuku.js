import { getRelasiBookID } from "@/controller/KategoriController";
import { cors, middleware } from "@/helpers/middleware";


export default async function handler(req, res) {
    try{
        middleware(req,res,cors);
        if(req.method === "GET") {
            const { idbuku } = req.query;
            if (!idbuku) {
                return res.status(400).json({message: "Missing idkategori parameter"});
            }
            await getRelasiBookID(req,res, idbuku);
        }else{
            res.setHeader("Allow", ["GET"]);
            res.status(405).end("Method ${req.method} Not Allowed");
        }
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}