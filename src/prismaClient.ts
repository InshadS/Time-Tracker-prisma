import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// this code can be used for primitive logging and to check performamce of queries
// prisma.$use(async (params, next) => {
//   const before = Date.now();

//   const result = await next(params);

//   const after = Date.now();

//   console.log(
//     `Query ${params.model}.${params.action} took ${after - before}ms`
//   );

//   return result;
// });

export default prisma;
