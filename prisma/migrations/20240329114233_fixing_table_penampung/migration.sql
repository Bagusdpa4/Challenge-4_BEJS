/*
  Warnings:

  - You are about to drop the column `accountId` on the `transaction_on_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `transaction_on_accounts` table. All the data in the column will be lost.
  - Added the required column `destination_account_id` to the `transaction_on_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_account_id` to the `transaction_on_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_on_accounts" DROP CONSTRAINT "transaction_on_accounts_accountId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_on_accounts" DROP CONSTRAINT "transaction_on_accounts_transactionId_fkey";

-- AlterTable
ALTER TABLE "transaction_on_accounts" DROP COLUMN "accountId",
DROP COLUMN "transactionId",
ADD COLUMN     "destination_account_id" INTEGER NOT NULL,
ADD COLUMN     "source_account_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_AccountToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToTransaction_AB_unique" ON "_AccountToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToTransaction_B_index" ON "_AccountToTransaction"("B");

-- AddForeignKey
ALTER TABLE "transaction_on_accounts" ADD CONSTRAINT "transaction_on_accounts_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_on_accounts" ADD CONSTRAINT "transaction_on_accounts_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToTransaction" ADD CONSTRAINT "_AccountToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToTransaction" ADD CONSTRAINT "_AccountToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
