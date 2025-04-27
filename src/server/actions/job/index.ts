"use server";

import { JobRepository } from "@/server/repositories/job/jobRepository";
import { Prisma } from "@prisma/client";

const jobRepository = new JobRepository();

export async function createJob(data: Prisma.JobCreateInput) {
  return jobRepository.create(data);
}

export async function updateJob(id: string, data: Prisma.JobUpdateInput) {
  return jobRepository.update(id, data);
}

export async function deleteJob(id: string) {
  return jobRepository.delete(id);
}
