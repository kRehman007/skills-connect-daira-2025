import { prisma } from "@/server/prisma/config";
import { Proposal, ProposalStatus, Prisma, Job, User } from "@prisma/client";

export type ProposalDto = Proposal & {
	job: Job;
	worker: Pick<User, "id" | "firstName" | "lastName" | "email" | "avatar">;
};

export class ProposalRepository {
	async create(data: Prisma.ProposalCreateInput): Promise<Proposal> {
		return prisma.proposal.create({
			data,
		});
	}

	async findById(id: string): Promise<ProposalDto | null> {
		return prisma.proposal.findUnique({
			where: { id },
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
		});
	}

	async findAll(params?: {
		status?: ProposalStatus;
		jobId?: string;
		workerId?: string;
		offset?: number;
		limit?: number;
	}): Promise<ProposalDto[]> {
		return prisma.proposal.findMany({
			where: {
				status: params?.status,
				jobId: params?.jobId,
				workerId: params?.workerId,
			},
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
			orderBy: { id: "desc" },
			skip: params?.offset ?? 0,
			take: params?.limit ?? 10,
		});
	}

	async update(
		id: string,
		data: Prisma.ProposalUpdateInput
	): Promise<ProposalDto> {
		return prisma.proposal.update({
			where: { id },
			data,
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
		});
	}

	async delete(id: string): Promise<void> {
		const proposal = await prisma.proposal.findUnique({
			where: { id },
		});

		if (!proposal) {
			return;
		}

		await prisma.proposal.delete({
			where: { id },
		});
	}

	async findByJobId(jobId: string): Promise<ProposalDto[]> {
		return prisma.proposal.findMany({
			where: { jobId },
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
			orderBy: { id: "desc" },
		});
	}

	async findByWorkerId(workerId: string): Promise<ProposalDto[]> {
		return prisma.proposal.findMany({
			where: { workerId },
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
			orderBy: { id: "desc" },
		});
	}

	async updateStatus(id: string, status: ProposalStatus): Promise<ProposalDto> {
		return prisma.proposal.update({
			where: { id },
			data: { status },
			include: {
				job: true,
				worker: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
						skills: true,
					},
				},
			},
		});
	}
}
