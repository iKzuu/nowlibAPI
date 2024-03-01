/*
  Warnings:

  - You are about to drop the column `BookID` on the `genre` table. All the data in the column will be lost.
  - Added the required column `GenreID` to the `Kategoribukurelasi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `genre` DROP FOREIGN KEY `Genre_BookID_fkey`;

-- AlterTable
ALTER TABLE `genre` DROP COLUMN `BookID`;

-- AlterTable
ALTER TABLE `kategoribukurelasi` ADD COLUMN `GenreID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Kategoribukurelasi` ADD CONSTRAINT `Kategoribukurelasi_GenreID_fkey` FOREIGN KEY (`GenreID`) REFERENCES `Genre`(`GenreID`) ON DELETE CASCADE ON UPDATE CASCADE;
