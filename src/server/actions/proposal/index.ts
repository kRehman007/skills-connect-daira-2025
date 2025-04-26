"use server";

import { ProposalRepository } from "@/server/repositories/proposal/proposalRepository";
import { Prisma, ProposalStatus } from "@prisma/client";

const proposalRepository = new ProposalRepository();

export function createProposal(data: Prisma.ProposalCreateInput) {
	return proposalRepository.create(data);
}

export function updateProposal(id: string, data: Prisma.ProposalUpdateInput) {
	return proposalRepository.update(id, data);
}

export function deleteProposal(id: string) {
	return proposalRepository.delete(id);
}

export function updateProposalStatus(id: string, status: ProposalStatus) {
	return proposalRepository.updateStatus(id, status);
}
