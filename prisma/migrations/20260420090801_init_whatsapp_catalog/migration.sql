-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slugFR" TEXT NOT NULL,
    "slugEN" TEXT NOT NULL,
    "nameFR" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nameFR" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,
    "descFR" TEXT NOT NULL DEFAULT '',
    "descEN" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "materialFR" TEXT NOT NULL DEFAULT '',
    "materialEN" TEXT NOT NULL DEFAULT '',
    "originFR" TEXT NOT NULL DEFAULT '',
    "originEN" TEXT NOT NULL DEFAULT '',
    "careFR" TEXT NOT NULL DEFAULT '',
    "careEN" TEXT NOT NULL DEFAULT '',
    "tagFR" TEXT NOT NULL DEFAULT '',
    "tagEN" TEXT NOT NULL DEFAULT '',
    "imgUrl" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsletterLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'FR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME
);

-- CreateTable
CREATE TABLE "CollaborationSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slugFR_key" ON "Category"("slugFR");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slugEN_key" ON "Category"("slugEN");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterLead_email_key" ON "NewsletterLead"("email");
