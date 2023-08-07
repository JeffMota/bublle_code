-- DropForeignKey
ALTER TABLE "problems_exemples" DROP CONSTRAINT "problems_exemples_problemId_fkey";

-- DropForeignKey
ALTER TABLE "problems_testcase" DROP CONSTRAINT "problems_testcase_problemId_fkey";

-- AddForeignKey
ALTER TABLE "problems_exemples" ADD CONSTRAINT "problems_exemples_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems_testcase" ADD CONSTRAINT "problems_testcase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
