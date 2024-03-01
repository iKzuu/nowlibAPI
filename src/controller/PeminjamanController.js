import prisma from "../../prisma/client";

export async function getPeminjaman(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let peminjaman = await prisma.peminjaman.findMany({
            skip: skipValue,
            select: {
                UserID: true,
                BookID: true,
                TglPeminjaman: true,
                TglPengembalian: true,
                Status: true,
            }
        });

        let count = await prisma.peminjaman.count();

        res.status(200).json({
            message: "Peminjaman found successfully",
            total: count,
            data: peminjaman,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function getPeminjamanID(req, res) {
    const { uid } = req.query;
  
    try {
      let peminjaman = await prisma.peminjaman.findUnique({
        where: {
          PinjamID: parseInt(uid),
        },
        // include: {
        //   Profile: true,
        // },
      });

      if (!peminjaman) {
        return res.status(404).json({ message: "Peminjaman not found" });
      }
  
      res.status(200).json({
        message: "Peminjaman found successfully",
        data: peminjaman,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

export async function createPeminjaman(req, res) {
    const { UserID, BookID, TglPeminjaman, TglPengembalian } = req.body;
  
    try {

      let peminjaman = await prisma.peminjaman.create({
        data: {
          UserID: parseInt(UserID),
          BookID: parseInt(BookID),
          TglPeminjaman : new Date(TglPeminjaman),
          TglPengembalian : new Date(TglPengembalian),
        },
      });
      res.status(201).json({
        message: "Buku terpinjam",
        data: peminjaman,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }