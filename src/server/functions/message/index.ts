import { MessageRepository } from "../../repositories/message/messageRepository";

const messageRepo = new MessageRepository();

export async function getMessageById(id: string) {
	return messageRepo.findById(id);
}

export async function getMessages() {
	return messageRepo.findAll();
}

export async function getMessagesByChatId(chatId: string) {
	return messageRepo.findByChatId(chatId);
}
