import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const userRepository = {
    async getAll() {
        return prisma.user.findMany();
    },
    async getUser (user) {
        return prisma.user.findUnique({
            where: { username: user.username }
        });
    },
    async postUser(user) {
        return prisma.user.upsert({
            where: { username: user.username },
            update: { user: user },
            create: user
        });
    }
}

export default userRepository;