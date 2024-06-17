-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "board" JSONB[],
    "currentPlayer" JSONB NOT NULL,
    "playerX" JSONB NOT NULL,
    "playerO" JSONB NOT NULL,
    "winState" JSONB NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);
