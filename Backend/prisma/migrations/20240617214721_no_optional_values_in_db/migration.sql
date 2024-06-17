/*
  Warnings:

  - Made the column `playerX` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `playerO` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "game" ALTER COLUMN "playerX" SET NOT NULL,
ALTER COLUMN "playerO" SET NOT NULL;
