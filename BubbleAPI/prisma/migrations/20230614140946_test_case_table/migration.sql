-- CreateTable
CREATE TABLE "problems_testcase" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,

    CONSTRAINT "problems_testcase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "problems_testcase" ADD CONSTRAINT "problems_testcase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
