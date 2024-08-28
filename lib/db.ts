/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line
  var cachedPrisma: PrismaClient;
}

// Prisma와 데이터베이스 간의 연결을 관리
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
