/*
  Warnings:

  - You are about to drop the column `Jumlah_hlmn` on the `buku` table. All the data in the column will be lost.
  - You are about to drop the column `Tahun_terbit` on the `buku` table. All the data in the column will be lost.
  - You are about to drop the column `Tgl_kmbl` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `Tgl_pinjam` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `Tgl_kmbl` on the `riwayatpinjam` table. All the data in the column will be lost.
  - You are about to drop the column `Tgl_pinjam` on the `riwayatpinjam` table. All the data in the column will be lost.
  - You are about to drop the column `Isi_ulasan` on the `ulasan` table. All the data in the column will be lost.
  - You are about to drop the column `Tgl_review` on the `ulasan` table. All the data in the column will be lost.
  - Added the required column `Jumlahhlmn` to the `Buku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tahunterbit` to the `Buku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TglPeminjaman` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TglPengembalian` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TglPeminjaman` to the `Riwayatpinjam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TglPengembalian` to the `Riwayatpinjam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tglreview` to the `Ulasan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ulasan` to the `Ulasan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buku` DROP COLUMN `Jumlah_hlmn`,
    DROP COLUMN `Tahun_terbit`,
    ADD COLUMN `Jumlahhlmn` INTEGER NOT NULL,
    ADD COLUMN `Tahunterbit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `Tgl_kmbl`,
    DROP COLUMN `Tgl_pinjam`,
    ADD COLUMN `TglPeminjaman` DATETIME(3) NOT NULL,
    ADD COLUMN `TglPengembalian` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `riwayatpinjam` DROP COLUMN `Tgl_kmbl`,
    DROP COLUMN `Tgl_pinjam`,
    ADD COLUMN `TglPeminjaman` DATETIME(3) NOT NULL,
    ADD COLUMN `TglPengembalian` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ulasan` DROP COLUMN `Isi_ulasan`,
    DROP COLUMN `Tgl_review`,
    ADD COLUMN `Tglreview` DATETIME(3) NOT NULL,
    ADD COLUMN `Ulasan` VARCHAR(191) NOT NULL;
