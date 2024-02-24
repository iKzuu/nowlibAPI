-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `NamaLengkap` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Alamat` VARCHAR(191) NOT NULL,
    `Role` ENUM('pengguna', 'petugas', 'admin') NOT NULL DEFAULT 'pengguna',

    UNIQUE INDEX `User_Username_key`(`Username`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `BookID` INTEGER NOT NULL AUTO_INCREMENT,
    `Judul` VARCHAR(191) NOT NULL,
    `Tahun_terbit` VARCHAR(191) NOT NULL,
    `Penulis` VARCHAR(191) NOT NULL,
    `Jumlah_hlmn` INTEGER NOT NULL,
    `Penerbit` VARCHAR(191) NOT NULL,
    `Status` ENUM('dipinjam', 'tersedia', 'hilang') NOT NULL DEFAULT 'tersedia',

    PRIMARY KEY (`BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peminjaman` (
    `PinjamID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,
    `Tgl_pinjam` DATETIME(3) NOT NULL,
    `Tgl_kmbl` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`PinjamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ulasan` (
    `UlasanID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,
    `Tgl_review` DATETIME(3) NOT NULL,
    `Isi_ulasan` VARCHAR(191) NOT NULL,
    `Rating` INTEGER NOT NULL,

    PRIMARY KEY (`UlasanID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoribuku` (
    `KategoriID` INTEGER NOT NULL AUTO_INCREMENT,
    `Namakategori` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`KategoriID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoribukurelasi` (
    `KategorirelasiID` INTEGER NOT NULL AUTO_INCREMENT,
    `BookID` INTEGER NOT NULL,
    `KategoriID` INTEGER NOT NULL,

    PRIMARY KEY (`KategorirelasiID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Koleksi` (
    `KoleksiID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,

    PRIMARY KEY (`KoleksiID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riwayatpinjam` (
    `RiwayatID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,
    `PinjamID` INTEGER NOT NULL,
    `Tgl_pinjam` DATETIME(3) NOT NULL,
    `Tgl_kmbl` DATETIME(3) NOT NULL,

    PRIMARY KEY (`RiwayatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `GenreID` INTEGER NOT NULL AUTO_INCREMENT,
    `BookID` INTEGER NOT NULL,
    `Namagenre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`GenreID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ulasan` ADD CONSTRAINT `Ulasan_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ulasan` ADD CONSTRAINT `Ulasan_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kategoribukurelasi` ADD CONSTRAINT `Kategoribukurelasi_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kategoribukurelasi` ADD CONSTRAINT `Kategoribukurelasi_KategoriID_fkey` FOREIGN KEY (`KategoriID`) REFERENCES `Kategoribuku`(`KategoriID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Koleksi` ADD CONSTRAINT `Koleksi_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Koleksi` ADD CONSTRAINT `Koleksi_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayatpinjam` ADD CONSTRAINT `Riwayatpinjam_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayatpinjam` ADD CONSTRAINT `Riwayatpinjam_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Riwayatpinjam` ADD CONSTRAINT `Riwayatpinjam_PinjamID_fkey` FOREIGN KEY (`PinjamID`) REFERENCES `Peminjaman`(`PinjamID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Genre` ADD CONSTRAINT `Genre_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `Buku`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;
