-- CreateTable
CREATE TABLE "Dre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "receita" TEXT,
    "despesa" TEXT,
    "valor" REAL
);
