/*
  Warnings:

  - Added the required column `code` to the `problems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;
