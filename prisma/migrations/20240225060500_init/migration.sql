/*
  Warnings:

  - You are about to drop the column `Status` on the `buku` table. All the data in the column will be lost.
  - You are about to alter the column `Status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `buku` DROP COLUMN `Status`;

-- AlterTable
ALTER TABLE `peminjaman` MODIFY `Status` ENUM('dipinjam', 'tersedia', 'hilang') NOT NULL DEFAULT 'dipinjam';
