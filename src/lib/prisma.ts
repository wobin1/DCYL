import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") {
    // If the cached client is missing new models, force a reset
    if (prisma && !("user" in prisma)) {
        globalForPrisma.prisma = new PrismaClient({ log: ["query"] });
    } else {
        globalForPrisma.prisma = prisma;
    }
}
