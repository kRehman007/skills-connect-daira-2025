import { MessageRepository } from "../../repositories/message/messageRepository";

const messageRepo = new MessageRepository();

export async function createMessage(data: any) {
	return messageRepo.create(data);
}

export async function deleteMessage(id: string) {
	return messageRepo.delete(id);
}
