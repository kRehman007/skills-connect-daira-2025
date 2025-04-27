import { prisma } from "@/server/prisma/config";

export class UserRepository {
	async findByEmail(email: string) {
		try {
			return prisma.user.findUnique({
				where: {
					email,
				},
			});
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async findById(id: string) {
		try {
			return prisma.user.findUnique({
				where: {
					id,
				},
			});
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// Worker Dashboard APIs
	async getWorkerJobsStatus(workerId: string) {
		try {
			const oneYearAgo = new Date();
			oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

			const jobs = await prisma.job.findMany({
				where: {
					workerId,
					status: "COMPLETED",
					updatedAt: {
						gte: oneYearAgo,
					},
				},
				select: {
					updatedAt: true,
				},
			});

			const jobCountsByMonth = Array.from({ length: 12 }, (_, i) => {
				const date = new Date();
				date.setMonth(date.getMonth() - i);
				const month = date.toLocaleString("default", { month: "long" });
				return { month, count: 0 };
			}).reverse();

			jobs.forEach((job) => {
				const jobMonth = job.updatedAt.toLocaleString("default", {
					month: "long",
				});
				const jobYear = job.updatedAt.getFullYear();
				const currentYear = new Date().getFullYear();

				if (jobYear === currentYear || jobYear === currentYear - 1) {
					const monthData = jobCountsByMonth.find(
						(data) => data.month === jobMonth
					);
					if (monthData) {
						monthData.count++;
					}
				}
			});

			return jobCountsByMonth;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async getWorkerJobsRecord(workerId: string) {
		try {
			const startOfMonth = new Date();
			startOfMonth.setDate(1);
			startOfMonth.setHours(0, 0, 0, 0);

			const endOfMonth = new Date(startOfMonth);
			endOfMonth.setMonth(endOfMonth.getMonth() + 1);

			const jobs = await prisma.job.groupBy({
				by: ["status"],
				where: {
					workerId,
					updatedAt: {
						gte: startOfMonth,
						lt: endOfMonth,
					},
				},
				_count: {
					status: true,
				},
			});

			const result = {
				completed: 0,
				pending: 0,
			};

			jobs.forEach((job) => {
				if (job.status === "COMPLETED") {
					result.completed = job._count.status;
				} else if (job.status === "PENDING") {
					result.pending = job._count.status;
				}
			});

			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
