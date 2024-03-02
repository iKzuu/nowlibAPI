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
    const { id } = req.query;
  
    try {
      let genre = await prisma.genre.findUnique({
        where: {
          GenreID: parseInt(id),
        }
      });

      if (!genre) {
        res.status(401).json({
          message: "Genre tidak di temukan",
          data: genre,
        });
      }
  
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

//edit Genre
export async function updateGenre(req, res) {
  const { id } = req.query;
  const { Namagenre } = req.body;

  try {
    let genre = await prisma.genre.findUnique({
      where: { GenreID: parseInt(id) },
    });

    if (!genre) {
      res.status(401).json({
        message: "Genre yang anda maksud tidak ada"
      });
    }

    await prisma.genre.update({
      where: { GenreID: parseInt(id) },
      data: {
        Namagenre,
      },
    });

    res.status(200).json({
      message: "Genre edited successfully",
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

//delete Genre
export async function deleteGenre(req, res) {
  const { id } = req.query;

  try {
    let genre = await prisma.genre.findUnique({
      where: {
        GenreID: parseInt(id),
      },
    });

    if (!genre) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.genre.delete({
      where: {
        GenreID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Genre deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
