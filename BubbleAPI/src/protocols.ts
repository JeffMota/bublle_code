import { users } from "@prisma/client";

export type createUserType = Omit<users, 'id' | 'createAt'>
export type signInParams = Omit<users, 'id' | 'createAt' | 'userName'>