import { db } from "./db";
import { sessions, messages, type InsertSession, type InsertMessage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSession(id: string): Promise<typeof sessions.$inferSelect | undefined>;
  createSession(id: string): Promise<typeof sessions.$inferSelect>;
  updateSession(id: string, data: Partial<InsertSession>): Promise<typeof sessions.$inferSelect>;
  getChatHistory(sessionId: string): Promise<(typeof messages.$inferSelect)[]>;
  addMessage(message: InsertMessage): Promise<typeof messages.$inferSelect>;
}

export class DatabaseStorage implements IStorage {
  async getSession(id: string) {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async createSession(id: string) {
    const [session] = await db.insert(sessions).values({ id }).returning();
    return session;
  }

  async updateSession(id: string, data: Partial<InsertSession>) {
    const [session] = await db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
    return session;
  }

  async getChatHistory(sessionId: string) {
    return await db.select().from(messages).where(eq(messages.sessionId, sessionId));
  }

  async addMessage(message: InsertMessage) {
    const [msg] = await db.insert(messages).values(message).returning();
    return msg;
  }
}

export const storage = new DatabaseStorage();