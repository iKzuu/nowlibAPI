-- AlterTable
ALTER TABLE `peminjaman` MODIFY `Status` ENUM('tunggukonfirmasi', 'sedangpinjam', 'selesai', 'belumselesai', 'belumkembali') NOT NULL DEFAULT 'tunggukonfirmasi';
