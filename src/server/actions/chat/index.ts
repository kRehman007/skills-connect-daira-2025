"use server";

import { Prisma } from "@prisma/client";
import { ChatRepository } from "../../repositories/chat/chatRepository";

const chatRepo = new ChatRepository();

export async function createChat(data: Prisma.ChatCreateInput) {
	return chatRepo.create(data);
}

export async function deleteChat(id: string) {
	return chatRepo.delete(id);
}
