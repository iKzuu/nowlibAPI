/*
  Warnings:

  - A unique constraint covering the columns `[InvoiceID]` on the table `Peminjaman` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `InvoiceID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Peminjaman_InvoiceID_key` ON `Peminjaman`(`InvoiceID`);
