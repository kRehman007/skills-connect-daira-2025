import { prisma } from "@/server/prisma/config";
import { Job, JobCategory, JobStatus, Prisma } from "@prisma/client";

export class JobRepository {
	async create(data: Prisma.JobCreateInput): Promise<Job> {
		return prisma.job.create({
			data: {
				...data,
				status: JobStatus.PENDING,
			},
		});
	}

	async findById(id: string): Promise<Job | null> {
		return prisma.job.findUnique({
			where: { id },
		});
	}

	async findAll({
		status,
		category,
		clientId,
		offset = 0,
		limit = 10,
	}: {
		status?: JobStatus;
		category?: JobCategory;
		clientId?: string;
		offset?: number;
		limit?: number;
	}): Promise<Job[]> {
		return prisma.job.findMany({
			where: {
				status,
				category,
				clientId,
			},
			orderBy: { createdAt: "desc" },
			take: limit,
			skip: offset,
		});
	}

	async update(id: string, data: Prisma.JobUpdateInput): Promise<Job> {
		return prisma.job.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<Job | null> {
		const job = await prisma.job.findUnique({
			where: { id },
		});

		if (!job) {
			return null;
		}

		return prisma.job.delete({
			where: { id },
		});
	}

	async findByClientId(clientId: string): Promise<Job[]> {
		return prisma.job.findMany({
			where: { clientId },
			orderBy: { createdAt: "desc" },
		});
	}

	async findJobsForWorker(
		workerId: string,
		options?: {
			offset?: number;
			limit?: number;
		}
	): Promise<Job[]> {
		// First get the worker's skills
		const worker = await prisma.user.findUnique({
			where: { id: workerId },
			select: { skills: true },
		});

		if (!worker?.skills) {
			return [];
		}

		const workerSkills = worker.skills
			.split(",")
			.map((skill) => skill.trim().toLowerCase());

		return prisma.job.findMany({
			where: {
				status: JobStatus.PENDING,
				category: {
					in: workerSkills
						.map((skill) => skill as JobCategory)
						.filter((category) =>
							Object.values(JobCategory).includes(category)
						),
				},
			},
			orderBy: { createdAt: "desc" },
			take: options?.limit ?? 10,
			skip: options?.offset ?? 0,
		});
	}
}
