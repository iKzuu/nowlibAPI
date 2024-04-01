/*
  Warnings:

  - You are about to alter the column `Status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `peminjaman` MODIFY `Status` ENUM('sedangpinjam', 'selesai', 'belumselesai') NOT NULL DEFAULT 'sedangpinjam';
