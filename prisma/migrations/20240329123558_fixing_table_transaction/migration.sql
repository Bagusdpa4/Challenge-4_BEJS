/*
  Warnings:

  - You are about to drop the `transaction_on_accounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `destination_account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_on_accounts" DROP CONSTRAINT "transaction_on_accounts_destination_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_on_accounts" DROP CONSTRAINT "transaction_on_accounts_source_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "destination_account_id" INTEGER NOT NULL,
ADD COLUMN     "source_account_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "transaction_on_accounts";
