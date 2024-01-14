-- CreateEnum
CREATE TYPE "PRICE" AS ENUM ('CHEAP', 'REGULAR', 'EXPENSIVE');

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "main_image" TEXT NOT NULL,
    "images" TEXT[],
    "descrition" TEXT NOT NULL,
    "open_time" TEXT NOT NULL,
    "close_time" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" "PRICE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
