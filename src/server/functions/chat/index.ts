import { ChatRepository } from "../../repositories/chat/chatRepository";

const chatRepo = new ChatRepository();

export async function getChatById(id: string) {
	return chatRepo.findById(id);
}

export async function getChats() {
	return chatRepo.findAll();
}
