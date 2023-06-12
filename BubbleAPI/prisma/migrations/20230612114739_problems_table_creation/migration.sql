-- CreateTable
CREATE TABLE "problems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems_levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "problems_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems_exemples" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "problems_exemples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "problems_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems_exemples" ADD CONSTRAINT "problems_exemples_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
