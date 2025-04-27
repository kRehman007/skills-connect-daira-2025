// import "server-only";
// import { ProposalRepository } from "@/server/repositories/proposal/proposalRepository";
// import { ProposalStatus } from "@prisma/client";

// const proposalRepository = new ProposalRepository();

// export async function getProposalById(id: string) {
// 	return proposalRepository.findById(id);
// }

// export async function getProposalsForJob(
// 	jobId: string,
// 	options?: {
// 		offset?: number;
// 		limit?: number;
// 	}
// ) {
// 	return proposalRepository.findByJobId(jobId, options);
// }

// export async function getProposalsForWorker(
// 	workerId: string,
// 	options?: {
// 		offset?: number;
// 		limit?: number;
// 	}
// ) {
// 	return proposalRepository.findByWorkerId(workerId, options);
// }

// export async function getProposals({
// 	status,
// 	jobId,
// 	workerId,
// 	offset = 0,
// 	limit = 10,
// }: {
// 	status?: ProposalStatus;
// 	jobId?: string;
// 	workerId?: string;
// 	offset?: number;
// 	limit?: number;
// }) {
// 	return proposalRepository.findAll({
// 		status,
// 		jobId,
// 		workerId,
// 		offset,
// 		limit,
// 	});
// }
