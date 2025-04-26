import "server-only";
import { JobRepository } from "@/server/repositories/job/jobRepository";
import { JobCategory, JobStatus } from "@prisma/client";

const jobRepository = new JobRepository();

export async function getJobById(id: string) {
	return jobRepository.findById(id);
}

export async function getJobs({
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
}) {
	return jobRepository.findAll({
		status,
		category,
		clientId,
		offset,
		limit,
	});
}

export async function getJobsForClient(clientId: string) {
	return jobRepository.findByClientId(clientId);
}

export async function getJobsForWorker(
	workerId: string,
	options?: {
		offset?: number;
		limit?: number;
	}
) {
	return jobRepository.findJobsForWorker(workerId, options);
}
