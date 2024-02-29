/*
  Warnings:

  - The primary key for the `kategoribuku` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `KategoribukuID` on the `kategoribuku` table. All the data in the column will be lost.
  - You are about to drop the column `Namakategori` on the `kategoribuku` table. All the data in the column will be lost.
  - You are about to drop the column `KategoribukuID` on the `kategoribukurelasi` table. All the data in the column will be lost.
  - Added the required column `KategoriID` to the `Kategoribuku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NamaKategori` to the `Kategoribuku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KategoriID` to the `Kategoribukurelasi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kategoribukurelasi` DROP FOREIGN KEY `Kategoribukurelasi_KategoribukuID_fkey`;

-- AlterTable
ALTER TABLE `kategoribuku` DROP PRIMARY KEY,
    DROP COLUMN `KategoribukuID`,
    DROP COLUMN `Namakategori`,
    ADD COLUMN `KategoriID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `NamaKategori` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`KategoriID`);

-- AlterTable
ALTER TABLE `kategoribukurelasi` DROP COLUMN `KategoribukuID`,
    ADD COLUMN `KategoriID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Kategoribukurelasi` ADD CONSTRAINT `Kategoribukurelasi_KategoriID_fkey` FOREIGN KEY (`KategoriID`) REFERENCES `Kategoribuku`(`KategoriID`) ON DELETE CASCADE ON UPDATE CASCADE;
