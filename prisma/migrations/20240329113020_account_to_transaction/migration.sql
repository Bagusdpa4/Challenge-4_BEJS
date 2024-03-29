/*
  Warnings:

  - Made the column `user_id` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_on_accounts" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "transaction_on_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_on_accounts" ADD CONSTRAINT "transaction_on_accounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_on_accounts" ADD CONSTRAINT "transaction_on_accounts_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
