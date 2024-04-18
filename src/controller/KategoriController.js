import prisma from "../../prisma/client";

export async function getCategoryID(req, res) {
  const { id } = req.query;

  try {
    let kategoribuku = await prisma.kategoribuku.findUnique({
      where: {
        KategoriID: parseInt(id),
      },
      include: {
        Kategoribukurelasi: {
          select: {
            KategorirelasiID: true,
            Buku: true,
          },
        },
      },
    });

    if(!kategoribuku) {
      res.status(401).json({
        message: "Kategori tidak ada",
      });
    }

    res.status(200).json({
      message: "Kategori found successfully",
      data: kategoribuku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getKategori(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let kategoribuku = await prisma.kategoribuku.findMany({
      skip: skipValue,
      select: {
        NamaKategori: true,
      },
    });

    let count = await prisma.kategoribuku.count();

    res.status(200).json({
      message: "kategori found successfully",
      total: count,
      data: kategoribuku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//Menambah Kategori
export async function createCategory(req, res) {
  const { NamaKategori } = req.body;

  try {
    let kategoribuku = await prisma.kategoribuku.create({
      data: {
        NamaKategori,
      },
    });
    res.status(201).json({
      message: "Kategori added successfully",
      data: kategoribuku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//edit Kategori
export async function editKategori(req, res) {
  const { id } = req.query;
  const { NamaKategori } = req.body;

  try {
    let kategoribuku = await prisma.kategoribuku.update({
      where: { KategoriID: parseInt(id) },
      data: {
        NamaKategori,
      },
    });

    if (!kategoribuku) {
      res.status(401).json({
        message: "Kategori not found",
      });
    }

    res.status(200).json({
      message: "Kategori edited successfully",
      data: kategoribuku,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//delete Kategori
export async function deleteKategori(req, res) {
  const { id } = req.query;

  try {
    let kategoribuku = await prisma.kategoribuku.findUnique({
      where: {
        KategoriID: parseInt(id),
      },
    });

    if (!kategoribuku) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.kategoribuku.delete({
      where: {
        KategoriID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Kategori deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//====================================================== Buat Misah Aja ===========================================================

export async function getRelasiID(req, res) {
  const { id } = req.query;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.findUnique({
      where: { KategorirelasiID: parseInt(id) },
      select: {
        Buku: {
          select: {
            BookID: true,
            Judul: true,
            Penulis: true,
            Penerbit: true,
            Gambar: true,
            Deskripsi: true,
            Tahunterbit: true,
            Jumlahhlmn: true,
          },
        },
        Kategoribuku: {
          select: {
            KategoriID: true,
            NamaKategori: true,
          },
        },
        Genre: {
          select: {
            GenreID: true,
            Namagenre: true,
          },
        },
      },
    });

    if (!kategoribukurelasi) {
      res.status(401).json({
        message: "Relasi tidak di temukan",
        data: kategoribukurelasi,
      });
    }

    res.status(200).json({
      message: "Kategori relasi found successfully",
      data: kategoribukurelasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getRelasiBookID(req, res) {
  const { idbuku } = req.query;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.findMany({
      where: { BookID: parseInt(idbuku) },
      select: {
        Buku: {
          select: {
            BookID: true,
            Judul: true,
            Penulis: true,
            Penerbit: true,
            Gambar: true,
          },
        },
        Kategoribuku: {
          select: {
            KategoriID: true,
            NamaKategori: true,
          },
        },
        Genre: {
          select: {
            GenreID: true,
            Namagenre: true,
          },
        },
      },
    });

    if (!kategoribukurelasi || kategoribukurelasi.length === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan",
        data: [],
      });
    }

    res.status(201).json({
      message: "Kategori relasi found successfully",
      data: kategoribukurelasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getRelasiKategoriID(req, res) {
  const { idkategori } = req.query;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.findMany({
      where: { KategoriID: parseInt(idkategori) },
      select: {
        Buku: true,
        Kategoribuku: true,
        Genre: {
          select: {
            GenreID: true,
            Namagenre: true,
          },
        },
      },
    });

    if (!kategoribukurelasi || kategoribukurelasi.length === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan",
        data: [],
      });
    }

    let count = await prisma.kategoribukurelasi.count();

    res.status(201).json({
      message: "Kategori relasi found successfully",
      total: count,
      data: kategoribukurelasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getRelasi(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.findMany({
      skip: skipValue,
      select: {
        KategorirelasiID: true,
        Buku: {
          select: {
            BookID: true,
            Judul: true,
            Penulis: true,
            Penerbit: true,
            Gambar: true,
            Deskripsi: true,
          },
        },
        Kategoribuku: {
          select: {
            KategoriID: true,
            NamaKategori: true,
          },
        },
        Genre: {
          select: {
            GenreID: true,
            Namagenre: true,
          },
        },
      },
    });

    let count = await prisma.kategoribuku.count();

    res.status(200).json({
      message: "kategori relasi found successfully",
      total: count,
      data: kategoribukurelasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//membuat relasi
export async function createRelasi(req, res) {
  const { KategoriID, BookID, GenreID } = req.body;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.create({
      data: {
        KategoriID: parseInt(KategoriID),
        BookID: parseInt(BookID),
        GenreID: parseInt(GenreID),
      },
    });
    res.status(201).json({
      message: "Kategori added successfully",
      data: kategoribukurelasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
// Edit relasi
export async function editRelasi(req, res) {
  const { id } = req.query;
  const { KategoriID, BookID, GenreID } = req.body;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.update({
      where: { KategorirelasiID: parseInt(id) },
      data: {
        KategoriID: parseInt(KategoriID),
        BookID: parseInt(BookID),
        GenreID: parseInt(GenreID),
      },
    });

    res.status(200).json({
      message: "Relasi edited successfully",
      data: kategoribukurelasi,
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
export async function deleteRelasi(req, res) {
  const { id } = req.query;

  try {
    let kategoribukurelasi = await prisma.kategoribukurelasi.findUnique({
      where: {
        KategorirelasiID: parseInt(id),
      },
    });

    if (!kategoribukurelasi) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.kategoribukurelasi.delete({
      where: {
        KategorirelasiID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Relasi deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
