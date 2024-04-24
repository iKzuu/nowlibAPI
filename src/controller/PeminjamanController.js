import prisma from "../../prisma/client";
// import cron from "node-cron";
// import sinon from "sinon";

export async function getPeminjaman(req, res) {
  const { skip } = req.query;
  const skipValue = skip ? Number(skip) : 0;

  try {
    let peminjaman = await prisma.peminjaman.findMany({
      skip: skipValue,
      select: {
        PinjamID: true,
        InvoiceID: true,
        UserID: true,
        BookID: true,
        TglPeminjaman: true,
        TglPengembalian: true,
        Status: true,
        Buku: true,
        User: {
          select: {
            Namalengkap: true,
            Alamat: true,
            Email: true,
            Username: true,
            Role: true,
          },
        },
      },
    });

    peminjaman = peminjaman.map((item) => ({
      ...item,
      TglPeminjaman: item.TglPeminjaman.toISOString().substring(0, 10),
      TglPengembalian: item.TglPengembalian.toISOString().substring(0, 10),
    }));

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
        PinjamID: parseInt(id), // Assuming UserID is a numeric field
      },
      select: {
        PinjamID: true,
        InvoiceID: true,
        UserID: true,
        BookID: true,
        TglPeminjaman: true,
        TglPengembalian: true,
        Status: true,
        Buku: true,
        User: {
          select: {
            Namalengkap: true,
            Username: true,
            Alamat: true,
            Email: true,
            Role: true,
          },
        },
        // Buku: {
        //     select: {
        //         BookID: true,
        //         Judul: true,
        //         Tahunterbit: true,
        //         Penulis: true,
        //         Jumlahhlmn: true,
        //         Penerbit: true,
        //         Deskripsi: true,
        //         Gambar: true,
        //     }
        // },
      },
    });

    if (!peminjaman) {
      res.status(401).json({
        message: "Peminjaman tidak di temukan",
        data: peminjaman,
      });
    }

    peminjaman.TglPeminjaman = new Date(peminjaman.TglPeminjaman)
      .toISOString()
      .split("T")[0];
    peminjaman.TglPengembalian = new Date(peminjaman.TglPengembalian)
      .toISOString()
      .split("T")[0];

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

    const user = await prisma.user.findUnique({
      where: {
        UserID: parseInt(userId),
      },
      select: {
        UserID: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        data: [],
      });
    }

    let peminjaman = await prisma.peminjaman.findMany({
      where: {
        UserID: parseInt(userId), // Assuming UserID is a numeric field
      },
      select: {
        PinjamID: true,
        InvoiceID: true,
        UserID: true,
        BookID: true,
        TglPeminjaman: true,
        TglPengembalian: true,
        Status: true,
        User: {
          select: {
            Namalengkap: true,
            Username: true,
            Alamat: true,
            Email: true,
          },
        },
        Buku: true,
      },
    });

    if (peminjaman.length === 0) {
      return res.status(200).json({
        message: "Peminjaman Kosong",
        data: [],
      });
    }

    peminjaman = peminjaman.map((item) => ({
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
  const { UserID, BookID, TglPengembalian } = req.body;
  const TglPeminjaman = new Date();

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(TglPengembalian)) {
    return res.status(400).json({
      message: "Format tanggal harus yyyy-mm-dd",
    });
  }

  try {
    // Generate a unique invoice ID
    const invoiceID = `INV/NWLB/${Math.floor(Math.random() * 1000000)}`;

    // Menghitung jumlah peminjaman yang dilakukan user perharinya
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const countPeminjaman = await prisma.peminjaman.count({
      where: {
        UserID: parseInt(UserID),
        TglPeminjaman: {
          gte: today,
        },
      },
    });

    // Membatasi jumlah peminjaman menjadi maksimal 3 buku per hari
    if (countPeminjaman >= 3) {
      return res.status(404).json({
        message: "Anda sudah mencapai batas peminjaman pada hari ini",
      });
    }

    // Memeriksa pengguna apakah meminjam buku yang sama
    const existingPeminjaman = await prisma.peminjaman.findFirst({
      where: {
        UserID: parseInt(UserID),
        BookID: parseInt(BookID),
        Status: {
          not: "selesai", // Memerikas peminjaman yang belum selesai atau masih berstatus sedangpinjam,tunggukonfirmasi,belumkembali
        },
      },
    });

    if (existingPeminjaman) {
      return res.status(401).json({
        message: "Anda saat ini masih meminjam buku yang sama",
      });
    }

    let peminjaman = await prisma.peminjaman.create({
      data: {
        UserID: parseInt(UserID),
        BookID: parseInt(BookID),
        TglPeminjaman,
        TglPengembalian: new Date(TglPengembalian),
        InvoiceID: invoiceID, // Include the auto-generated invoice ID
      },
    });

    res.status(201).json({
      message: "Buku terpinjam",
      data: peminjaman,
      invoiceID: invoiceID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

// Endpoint untuk admin mengonfirmasi peminjaman & pengembalian buku

export async function konfirmasiPeminjaman(req, res) {
  const { InvoiceID } = req.body;

  try {
    // Mengambil peminjaman berdasarkan InvoiceID
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { InvoiceID },
    });

    if (!peminjaman) {
      return res.status(404).json({
        message: "Peminjaman tidak ditemukan",
      });
    }

    // Mengupdate status peminjaman menjadi "selesai" dan isConfirmed menjadi true
    await prisma.peminjaman.update({
      where: { InvoiceID },
      data: { Status: "sedangpinjam", isConfirmed: true },
    });

    res.status(200).json({
      message: "Peminjaman buku telah dikonfirmasi",
    });
  } catch (error) {
    console.error("Error confirming pengembalian buku:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Fungsi untuk mengubah status peminjaman yang sudah selesai
async function updatePeminjamanStatus() {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        TglPengembalian: {
          lt: new Date(), // Memeriksa peminjaman yang TglPengembalian-nya sudah lewat
        },
        Status: "sedangpinjam", // Memeriksa peminjaman yang masih dalam status "Sedang Pinjam"
      },
    });

    if (peminjaman && peminjaman.length > 0) {
      await Promise.all(
        peminjaman.map(async (p) => {
          await prisma.peminjaman.update({
            where: { PinjamID: p.PinjamID },
            data: { Status: "belumkembali" },
          });
        })
      );
    }
  } catch (error) {
    console.error("Error updating peminjaman status:", error);
  }
}

// Fungsi untuk menjalankan updatePeminjamanStatus() setiap jam sekali
setInterval(updatePeminjamanStatus, 60000); // 3600000 milidetik = 1 jam

//konfirmasi pengembalian buku
export async function konfirmasiPengembalian(req, res) {
  const { InvoiceID } = req.body;

  try {
    // Mengambil peminjaman berdasarkan InvoiceID
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { InvoiceID },
    });

    if (!peminjaman) {
      return res.status(404).json({
        message: "Peminjaman tidak ditemukan",
      });
    }

    // Mengupdate status peminjaman menjadi "selesai" dan isConfirmed menjadi true
    await prisma.peminjaman.update({
      where: { InvoiceID },
      data: { Status: "selesai", isConfirmed: true },
    });

    res.status(200).json({
      message: "Pengembalian buku telah dikonfirmasi",
    });
  } catch (error) {
    console.error("Error confirming pengembalian buku:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

//untuk ngetest aja sih
export async function getPeminjamanSedangPinjamUserID(req, res) {
  const { userId } = req.query;

  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        UserID: parseInt(userId),
        Status: "sedangpinjam",
      },
      include: {
        User: {
          select: {
            Namalengkap: true,
            Username: true,
            Alamat: true,
            Email: true,
          },
        },
        Buku: true,
      },
    });

    res.status(200).json({
      message: "Peminjaman ditemukan",
      data: peminjaman,
    });
  } catch (error) {
    console.error("Error getting peminjaman:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
