/*
  Warnings:

  - Added the required column `repeat` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "repeat" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
