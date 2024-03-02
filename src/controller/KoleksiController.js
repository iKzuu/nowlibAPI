import prisma from "../../prisma/client";

//get Koleksi By ID
export async function getKoleksiID(req, res) {
    const { id } = req.query;
  
    try {
      let koleksi = await prisma.koleksi.findUnique({
        where: { KoleksiID: parseInt(id) },
        select: {
          Buku: {
            select: {
                Judul: true,
                Penulis: true,
                Penerbit: true
            }
          },
        }
      });

      if (!koleksi) {
        res.status(401).json({
          message: "Koleksi tidak di temukan",
          data: koleksi,
        });
      }
  
      res.status(200).json({
        message: "Koleksi found successfully",
        data: koleksi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

//get Koleksi
export async function getKoleksi(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
      let koleksi = await prisma.koleksi.findMany({
          skip: skipValue,
          select: {
              Buku: {
                  select: {
                      Judul: true,
                      Penulis: true,
                      Penerbit: true
                  }
              },
          }
      });

      let count = await prisma.koleksi.count();

      res.status(200).json({
          message: "Koleksi found successfully",
          total: count,
          data: koleksi,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "Internal server error",
          error: error,
      });
  }
}


//menambah Koleksi
export async function addKoleksi(req, res) {

  const { UserID, BookID } = req.body;
  
  try {

    const existingKoleksi = await prisma.koleksi.findFirst({
        where: {
          UserID: parseInt(UserID),
          BookID: parseInt(BookID),
        },
    });
  
      if (existingKoleksi) {
        return res.status(400).json({
          message: "Anda sudah menambahkan ke koleksi",
        });
      }

    let koleksi = await prisma.koleksi.create({
      data: {
        UserID: parseInt(UserID),
        BookID: parseInt(BookID),
      },
    });

    res.status(201).json({
      message: "Koleksi added successfully",
      data: koleksi,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//delete Relasi
export async function deleteKoleksi(req, res) {
  const { id } = req.query;

  try {
    let koleksi = await prisma.koleksi.findUnique({
      where: {
        KoleksiID: parseInt(id),
      },
    });

    if (!koleksi) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.koleksi.delete({
      where: {
        KoleksiID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Koleksi deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}