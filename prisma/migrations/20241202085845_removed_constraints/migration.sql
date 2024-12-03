-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_user_id_fkey";

-- DropIndex
DROP INDEX "Inventory_user_id_key";
