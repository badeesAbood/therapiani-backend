/*
  Warnings:

  - Added the required column `created_at` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
