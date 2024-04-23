import prisma from "../../prisma/client";

export async function getUlasan(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let ulasan = await prisma.ulasan.findMany({
      skip: skipValue,
      select: {
        UserID: true,
        BookID: true,
        Tglreview: true,
        Ulasan: true,
        Rating: true,
      },
    });

    let count = await prisma.ulasan.count();

    res.status(200).json({
      message: "Ulasan found successfully",
      total: count,
      data: ulasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function getUlasanID(req, res) {
  const { id } = req.query;

  try {
    let ulasan = await prisma.ulasan.findUnique({
      where: {
        UlasanID: parseInt(id),
      },
    });

    if (!ulasan) {
      res.status(401).json({
        message: "Ulasan tidak di temukan",
        data: ulasan,
      });
    }

    res.status(200).json({
      message: "Ulasan found successfully",
      data: ulasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export async function addUlasan(req, res) {
  const { UserID, BookID, Ulasan, Rating } = req.body;
  const Tglreview = new Date();

  try {
    let ulasan = await prisma.ulasan.create({
      data: {
        UserID: parseInt(UserID),
        BookID: parseInt(BookID),
        Tglreview,
        Ulasan,
        Rating: parseInt(Rating),
      },
    });

    res.status(201).json({
      message: "Ulasan added successfully",
      data: ulasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//edit Ulasan
export async function updateUlasan(req, res) {
  const { id } = req.query;
  const { Ulasan, Rating } = req.body;

  try {
    let existingUlasan = await prisma.ulasan.findUnique({
      where: { UlasanID: parseInt(id) },
    });

    if (!existingUlasan) {
      return res.status(404).json({ message: "Ulasan not found" });
    }

    let ulasan = await prisma.ulasan.update({
      where: { UlasanID: parseInt(id) },
      data: {
        UserID: existingUlasan.UserID,
        BookID: existingUlasan.BookID,
        Tglreview: existingUlasan.Tglreview,
        Ulasan,
        Rating: parseInt(Rating),
      },
    });

    res.status(200).json({
      message: "Ulasan updated successfully",
      data: ulasan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

//delete Ulasan
export async function deleteUlasan(req, res) {
  const { id } = req.query;

  try {
    let ulasan = await prisma.ulasan.findUnique({
      where: {
        UlasanID: parseInt(id),
      },
    });

    if (!ulasan) {
      res.status(401).json({
        message: "data tidak ada atau mungkin sudah di hapus CMIIW :)",
      });
    }

    await prisma.ulasan.delete({
      where: {
        UlasanID: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Ulasan deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
