import prisma from "../../prisma/client";

export async function getCategoryID(req, res) {
    const { uid } = req.query;
  
    try {
      let kategoribuku = await prisma.kategoribuku.findUnique({
        where: {
          KategoriID: parseInt(uid),
        }
      });
  
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
    const {skip} = req.query;
    const skipValue = skip ? Number(skip) : 0;

    try {
        let kategoribuku = await prisma.kategoribuku.findMany({
            skip: skipValue,
            select: {
                NamaKategori: true,
            }
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

  //Get Relasi ID
  export async function getRelasiID(req, res) {
    const { uid } = req.query;
  
    try {
      let kategoribukurelasi = await prisma.kategoribukurelasi.findUnique({
        where: {
          KategorirelasiID: parseInt(uid),
        }
      });
  
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

  //Get Relasi
//   export async function getRelasi(req, res) {
//     const {skip} = req.query;
//     const skipValue = skip ? Number(skip) : 0;

//     try {
//         let kategoribukurelasi = await prisma.kategoribukurelasi.findMany({
//             skip: skipValue,
//             select: {
//                 KategoriID: true,
//                 BookID: true,
//                 GenreID: true,
//             }
//         });

//         let count = await prisma.kategoribuku.count();

//         res.status(200).json({
//             message: "kategori relasi found successfully",
//             total: count,
//             data: kategoribukurelasi,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Internal server error",
//             error: error,
//         });
//     }
// }

export async function getRelasi(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
      let kategoribukurelasi = await prisma.kategoribukurelasi.findMany({
          skip: skipValue,
          select: {
              Buku: {
                  select: {
                      Judul: true,
                      Penulis: true,
                      Penerbit: true
                  }
              },
              Kategoribuku: {
                  select: {
                      NamaKategori: true
                  }
              },
              Genre: {
                  select: {
                      Namagenre: true
                  }
              }
          }
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


