import prisma from "../../prisma/client";

export async function getBuku(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let buku = await prisma.buku.findMany({
            skip: skipValue,
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
        // include: {
        //   Profile: true,
        // },
      });

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


  // export async function addBook(req, res) {
  //   upload.single('Gambar')(req, res, async (err) => {
  //     if (err) {
  //       return res.status(500).json({ message: 'Error uploading file' });
  //     }
  
  //     const { Judul, Tahunterbit, Penulis, Jumlahhlmn, Penerbit, Deskripsi } = req.body;
  //     const imagePath = `/uploads/${req.file.originalname}`;
  
  //     try {
  //       let buku = await prisma.buku.create({
  //         data: {
  //           Judul,
  //           Tahunterbit,
  //           Penulis,
  //           Jumlahhlmn: parseInt(Jumlahhlmn),
  //           Penerbit,
  //           Gambar: imagePath,
  //           Deskripsi,
  //         },
  //       });
  //       res.status(201).json({
  //         message: 'Book added successfully',
  //         data: buku,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json({
  //         message: 'Internal server error',
  //         error: error,
  //       });
  //     }
  //   });
  // }


  // nambahin buku
  export async function addBook(req, res) {

    const { Judul, Tahunterbit, Penulis, Jumlahhlmn, Penerbit, Gambar, Deskripsi} = req.body;
    
    try {
      let buku = await prisma.buku.create({
        data: {
          Judul,
          Tahunterbit,
          Penulis,
          Jumlahhlmn: parseInt(Jumlahhlmn),
          Penerbit,
          Gambar,
          Deskripsi,
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
    const { Judul, Penulis, Tahunterbit, Jumlahhlmn, Penerbit, Gambar, Deskripsi } = req.body;
  
    try {
      let buku = await prisma.buku.findUnique({
        where: { BookID: parseInt(id) },
      });

      if (!buku) {
        res.status(401).json({
          message: "data yang anda maksud tidak ada www",
        });
      }

      await prisma.buku.update({
        where: { BookID: parseInt(id) },
        data: {
            Judul,
            Tahunterbit,
            Penulis,
            Jumlahhlmn: parseInt(Jumlahhlmn),
            Penerbit,
            Gambar,
            Deskripsi,
        },
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
      }
    });

    if (!buku) {
      res.status(401).json({
        message: "data tidak ditemukan atau mungkin sudah di hapus CMIIW :3",
      });
    }

    await prisma.buku.delete({
      where: {
        BookID: parseInt(id),
      }
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