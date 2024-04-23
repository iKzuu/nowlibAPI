import prisma from "../../prisma/client";
import fs from "fs";

export async function getBuku(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let buku = await prisma.buku.findMany({
      skip: skipValue,
      select: {
        BookID: true,
        Judul: true,
        Tahunterbit: true,
        Penulis: true,
        Jumlahhlmn: true,
        Penerbit: true,
        Deskripsi: true,
        Gambar: true,
        Kategoribukurelasi: {
          select: {
            KategorirelasiID: true,
            Kategoribuku: true,
          },
        },
      },
    });

    let count = await prisma.buku.count();

    res.status(200).json({
      message: "Buku found successfully",
      total: count,
      data: buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getBukuID(req, res) {
  const { id } = req.query;

  try {
    let buku = await prisma.buku.findUnique({
      where: {
        BookID: parseInt(id),
      },
      include: {
        Kategoribukurelasi: {
          select: {
            Kategoribuku: {
              select: {
                KategoriID: true,
                NamaKategori: true,
              }
            },
            Genre: {
              select: {
                GenreID: true,
                Namagenre: true,
              }
            }
          },
        },
        Ulasan: {
          include : {
            User: {
              select : {
                Profile: true,
                Namalengkap: true,
                Username: true,
                Alamat: true,
                Email: true,
                Role: true,
              }
            }
          }
        },
      },
    });

    buku.Ulasan = buku.Ulasan.map((item) => ({
      ...item,
      Tglreview: item.Tglreview.toISOString().substring(0, 10),
    }));

    if (!buku) {
      res.status(401).json({
        message: "Buku tidak di temukan",
        data: buku,
      });
    }

    res.status(200).json({
      message: "Book found successfully",
      data: buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

// nambahin buku
// export async function addBook(req, res) {
//   const {
//     Judul,
//     Tahunterbit,
//     Penulis,
//     Jumlahhlmn,
//     Penerbit,
//     Gambar,
//     Deskripsi,
//   } = req.body;

//   try {
//     let buku = await prisma.buku.create({
//       data: {
//         Judul,
//         Tahunterbit,
//         Penulis,
//         Jumlahhlmn: parseInt(Jumlahhlmn),
//         Penerbit,
//         Gambar,
//         Deskripsi,
//       },
//     });
//     res.status(201).json({
//       message: "Book added successfully",
//       data: buku,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error,
//     });
//   }
// }

export async function addBook(req, res) {
  const {
    Judul,
    Tahunterbit,
    Penulis,
    Jumlahhlmn,
    Penerbit,
    Gambar,
    Deskripsi,
    NamaKategori,
    Namagenre,
  } = req.body;

  try {
    // Mencari ID Kategori berdasarkan NamaKategori
    const kategoribuku = await prisma.kategoribuku.findFirst({
      where: {
        NamaKategori: NamaKategori,
      },
    });

    if (!kategoribuku) {
      return res.status(404).json({
        message: "Kategori not found",
      });
    }

    // Mencari ID Genre berdasarkan Namagenre
    const genre = await prisma.genre.findFirst({
      where: {
        Namagenre: Namagenre,
      },
    });

    if (!genre) {
      return res.status(404).json({
        message: "Genre not found",
      });
    }

    let buku = await prisma.buku.create({
      data: {
        Judul,
        Tahunterbit,
        Penulis,
        Jumlahhlmn: parseInt(Jumlahhlmn),
        Penerbit,
        Gambar,
        Deskripsi,
        Kategoribukurelasi: {
          create: {
            Kategoribuku: {
              connect: { KategoriID: kategoribuku.KategoriID }
            },
            Genre: {
              connect: { GenreID: genre.GenreID }
            }
          }
        }
      },
    });

    res.status(201).json({
      message: "Book added successfully",
      data: buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}


// Update a book by ID
export async function updateBuku(req, res) {
  const { id } = req.query;
  const {
    Judul,
    Penulis,
    Tahunterbit,
    Jumlahhlmn,
    Penerbit,
    Gambar,
    Deskripsi,
  } = req.body;

  try {
    let buku = await prisma.buku.findUnique({
      where: { BookID: parseInt(id) },
    });

    if (!buku) {
      res.status(401).json({
        message: "data yang anda maksud tidak ada www",
      });
    }

    let dataToUpdate = {};
    if (Judul) dataToUpdate.Judul = Judul;
    if (Penulis) dataToUpdate.Penulis = Penulis;
    if (Tahunterbit) dataToUpdate.Tahunterbit = Tahunterbit;
    if (Jumlahhlmn) dataToUpdate.Jumlahhlmn = Jumlahhlmn;
    if (Penerbit) dataToUpdate.Penerbit = Penerbit;
    if (Gambar) dataToUpdate.Gambar = Gambar;
    if (Deskripsi) dataToUpdate.Deskripsi = Deskripsi;

    await prisma.buku.update({
      where: { BookID: parseInt(id) },
      data: dataToUpdate,
    });

    buku = await prisma.buku.findUnique({
      where: { BookID: parseInt(id) },
    });

    res.status(200).json({
      message: "Book updated successfully",
      data: buku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//deleteBuku
export async function deleteBuku(req, res) {
  const { id } = req.query;

  try {
    let buku = await prisma.buku.findUnique({
      where: {
        BookID: parseInt(id),
      },
    });

    if (!buku) {
      res.status(401).json({
        message: "data tidak ditemukan atau mungkin sudah di hapus CMIIW :3",
      });
    }

    await prisma.buku.delete({
      where: {
        BookID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
