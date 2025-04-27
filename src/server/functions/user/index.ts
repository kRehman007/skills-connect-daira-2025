import "server-only";

import { UserRepository } from "@/server/repositories/user/userRepository";

export const userRepository = new UserRepository();

export async function getWorkerJobsStatus(workerId: string) {
	return userRepository.getWorkerJobsStatus(workerId);
}

export async function getWorkerJobsRecord(workerId: string) {
	return userRepository.getWorkerJobsRecord(workerId);
}
