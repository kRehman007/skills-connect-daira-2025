import { prisma } from "@/server/prisma/config";
import { Chat, Prisma } from "@prisma/client";

export class ChatRepository {
  async create(data: Prisma.ChatCreateInput): Promise<Chat> {
    return prisma.chat.create({ data });
  }

  async findById(id: string): Promise<Chat | null> {
    return prisma.chat.findUnique({ where: { id } });
  }

  async findAll(): Promise<Chat[]> {
    return prisma.chat.findMany();
  }

  async delete(id: string): Promise<Chat> {
    return prisma.chat.delete({ where: { id } });
  }
}