import { prisma } from "@/server/prisma/config";
import { Review, Prisma, Job, User } from "@prisma/client";

export type ReviewDto = Review & {
    job: Job;
    client: Pick<User, "id" | "firstName" | "lastName" | "email" | "avatar">;
    worker: Pick<User, "id" | "firstName" | "lastName" | "email" | "avatar">;
};

export class ReviewRepository {
    async create(data: Prisma.ReviewCreateInput): Promise<ReviewDto> {
        return prisma.review.create({
            data,
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async findById(id: string): Promise<ReviewDto | null> {
        return prisma.review.findUnique({
            where: { id },
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async findAll(params?: {
        clientId?: string;
        workerId?: string;
        jobId?: string;
        offset?: number;
        limit?: number;
    }): Promise<ReviewDto[]> {
        return prisma.review.findMany({
            where: {
                clientId: params?.clientId,
                workerId: params?.workerId,
                jobId: params?.jobId,
            },
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            skip: params?.offset ?? 0,
            take: params?.limit ?? 10,
        });
    }

    async update(id: string, data: Prisma.ReviewUpdateInput): Promise<ReviewDto> {
        return prisma.review.update({
            where: { id },
            data,
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async delete(id: string): Promise<void> {
        const review = await prisma.review.findUnique({
            where: { id },
        });

        if (!review) {
            return;
        }

        await prisma.review.delete({
            where: { id },
        });
    }

    async findByJobId(jobId: string): Promise<ReviewDto | null> {
        return prisma.review.findUnique({
            where: { jobId },
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async findByClientId(clientId: string): Promise<ReviewDto[]> {
        return prisma.review.findMany({
            where: { clientId },
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    async findByWorkerId(workerId: string): Promise<ReviewDto[]> {
        return prisma.review.findMany({
            where: { workerId },
            include: {
                job: true,
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
                worker: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
}