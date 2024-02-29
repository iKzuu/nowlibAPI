/*
  Warnings:

  - You are about to drop the `riwayatpinjam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `riwayatpinjam` DROP FOREIGN KEY `Riwayatpinjam_BookID_fkey`;

-- DropForeignKey
ALTER TABLE `riwayatpinjam` DROP FOREIGN KEY `Riwayatpinjam_PinjamID_fkey`;

-- DropForeignKey
ALTER TABLE `riwayatpinjam` DROP FOREIGN KEY `Riwayatpinjam_UserID_fkey`;

-- DropTable
DROP TABLE `riwayatpinjam`;
