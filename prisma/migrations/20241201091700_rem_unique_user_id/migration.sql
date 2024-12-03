-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive', 'Suspend');

-- DropIndex
DROP INDEX "Reminder_user_id_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Inactive';
