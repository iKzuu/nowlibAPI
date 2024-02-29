/*
  Warnings:

  - The primary key for the `kategoribuku` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `KategoriID` on the `kategoribuku` table. All the data in the column will be lost.
  - You are about to drop the column `KategoriID` on the `kategoribukurelasi` table. All the data in the column will be lost.
  - Added the required column `KategoribukuID` to the `Kategoribuku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KategoribukuID` to the `Kategoribukurelasi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kategoribukurelasi` DROP FOREIGN KEY `Kategoribukurelasi_KategoriID_fkey`;

-- AlterTable
ALTER TABLE `kategoribuku` DROP PRIMARY KEY,
    DROP COLUMN `KategoriID`,
    ADD COLUMN `KategoribukuID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`KategoribukuID`);

-- AlterTable
ALTER TABLE `kategoribukurelasi` DROP COLUMN `KategoriID`,
    ADD COLUMN `KategoribukuID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Kategoribukurelasi` ADD CONSTRAINT `Kategoribukurelasi_KategoribukuID_fkey` FOREIGN KEY (`KategoribukuID`) REFERENCES `Kategoribuku`(`KategoribukuID`) ON DELETE CASCADE ON UPDATE CASCADE;
