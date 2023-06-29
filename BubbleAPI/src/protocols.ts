import { problems, problems_exemples, problems_testcase, users } from "@prisma/client";

export type createUserType = Omit<users, 'id' | 'createAt'>
export type signInParams = Omit<users, 'id' | 'createAt' | 'userName'>
export type inputProblemType = Omit<problems, 'id' | 'createdAt'>
export type inputExempleType = Omit<problems_exemples, 'id' | 'problemId'>
export type inputTestCaseType = Omit<problems_testcase, 'id' | 'problemId'>