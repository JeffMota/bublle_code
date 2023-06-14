/*
  Warnings:

  - Added the required column `functionStr` to the `problems_testcase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "problems_testcase" ADD COLUMN     "functionStr" TEXT NOT NULL;
