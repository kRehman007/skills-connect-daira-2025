import { prisma } from "@/server/prisma/config";
import { Message, Prisma } from "@prisma/client";

export class MessageRepository {
  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return prisma.message.create({ data });
  }

  async findById(id: string): Promise<Message | null> {
    return prisma.message.findUnique({ where: { id } });
  }

  async findByChatId(chatId: string): Promise<Message[]> {
    return prisma.message.findMany({ where: { chatId } });
  }

  async findAll(): Promise<Message[]> {
    return prisma.message.findMany();
  }

  async delete(id: string): Promise<Message> {
    return prisma.message.delete({ where: { id } });
  }
}