import prisma from "../../prisma/client";

//Menambah Genre
export async function createGenre(req, res) {

    const { Namagenre } = req.body;
    
    try {
      let genre = await prisma.genre.create({
        data: {
          Namagenre,
        },
      });
      res.status(201).json({
        message: "Kategori added successfully",
        data: genre,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function getGenreID(req, res) {
    const { uid } = req.query;
  
    try {
      let genre = await prisma.genre.findUnique({
        where: {
          GenreID: parseInt(uid),
        }
      });
  
      res.status(200).json({
        message: "Genre found successfully",
        data: genre,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }

  export async function getGenre(req, res) {
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let genre = await prisma.genre.findMany({
            skip: skipValue,
            select: {
                Namagenre: true,
            }
        });

        let count = await prisma.genre.count();

        res.status(200).json({
            message: "genre found successfully",
            total: count,
            data: genre,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

export async function updateGenre(req, res) {
  const { id } = req.query;
  const { Judul, Penulis, Tahunterbit, Jumlahhlmn, Penerbit } = req.body;

  try {
    let buku = await prisma.buku.update({
      where: { BookID: parseInt(id) },
      data: {
          Judul,
          Tahunterbit,
          Penulis,
          Jumlahhlmn: parseInt(Jumlahhlmn),
          Penerbit,
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
export async function deleteGenre(req, res) {
const { id } = req.query;

try {
  await prisma.buku.delete({
    where: {
      BookID: parseInt(id),
    }
  })

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
