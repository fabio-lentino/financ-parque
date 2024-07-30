-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "data" DATETIME,
    "descricao" TEXT,
    "item" TEXT,
    "conta" TEXT,
    "valor" REAL,
    "formaDePagamento" TEXT,
    "status" TEXT,
    "saldo" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
