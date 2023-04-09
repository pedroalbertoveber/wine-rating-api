/*
  Warnings:

  - Added the required column `rate` to the `WineRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WineRating" ADD COLUMN     "rate" DECIMAL(65,30) NOT NULL;
