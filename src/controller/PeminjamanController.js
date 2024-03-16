import prisma from "../../prisma/client";

export async function getPeminjaman(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let peminjaman = await prisma.peminjaman.findMany({
            skip: skipValue,
            select: {
                PinjamID: true,
                UserID: true,
                BookID: true,
                TglPeminjaman: true,
                TglPengembalian: true,
                Status: true,
                Buku: {
                  select: {
                    BookID : true,
                    Judul: true,
                    Tahunterbit: true,
                    Penulis: true,
                    Jumlahhlmn: true,
                    Penerbit: true,
                    Deskripsi: true,
                    Gambar: true,
                  }
                },
                User : {
                  select : {
                    Namalengkap: true,
                    Alamat: true,
                    Email: true,
                    Username: true,
                    Role: true,
                  }
                }
            }
        });

        let count = await prisma.peminjaman.count();

        res.status(201).json({
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
  const { id } = req.query;

  try {
      let peminjaman = await prisma.peminjaman.findUnique({
          where: {
              PinjamID: parseInt(id) // Assuming UserID is a numeric field
          },
          select: {
              PinjamID: true,
              UserID: true,
              BookID: true,
              TglPeminjaman: true,
              TglPengembalian: true,
              Status: true,
              Buku: {
                  select: {
                      BookID: true,
                      Judul: true,
                      Tahunterbit: true,
                      Penulis: true,
                      Jumlahhlmn: true,
                      Penerbit: true,
                      Deskripsi: true,
                      Gambar: true,
                  }
              },
              User: {
                select : {
                  Namalengkap: true,
                }
              }
          }
      });

      
      if (!peminjaman) {
        res.status(401).json({
          message: "Peminjaman tidak di temukan",
          data: peminjaman,
        });
      }

      res.status(201).json({
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

export async function getPeminjamanUserID(req, res) {
  const { userId } = req.query;

  try {
      let peminjaman = await prisma.peminjaman.findMany({
          where: {
              UserID: parseInt(userId) // Assuming UserID is a numeric field
          },
          select: {
              PinjamID: true,
              UserID: true,
              BookID: true,
              TglPeminjaman: true,
              TglPengembalian: true,
              Status: true,
              Buku: {
                  select: {
                      BookID: true,
                      Judul: true,
                      Tahunterbit: true,
                      Penulis: true,
                      Jumlahhlmn: true,
                      Penerbit: true,
                      Deskripsi: true,
                      Gambar: true,
                  }
              },
              User: {
                select: {
                  UserID: true,
                  Namalengkap: true,
                  Alamat: true,
                  Email: true,
                  Username: true,
                  Role: true,
                }
              }
          }
      });

      if (!peminjaman || peminjaman.length === 0) {
        return res.status(404).json({
          message: "Peminjaman tidak ditemukan",
          data: []
        });
      }

      peminjaman = peminjaman.map(item => ({
        ...item,
        TglPeminjaman: item.TglPeminjaman.toISOString().substring(0, 10),
        TglPengembalian: item.TglPengembalian.toISOString().substring(0, 10),
      }));

      res.status(201).json({
          message: "Peminjaman found successfully",
          data: peminjaman,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "Internal server error",
          error: error.message,
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