/*
  Warnings:

  - You are about to drop the `_AccountToTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccountToTransaction" DROP CONSTRAINT "_AccountToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToTransaction" DROP CONSTRAINT "_AccountToTransaction_B_fkey";

-- DropTable
DROP TABLE "_AccountToTransaction";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
