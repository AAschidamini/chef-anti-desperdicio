import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import type { User } from "../../domain/entities/user";
import type { UserRepository } from "../../domain/repositories/user-repository";

const users: User[] = [
  {
    id: randomUUID(),
    name: "Usuário Demo",
    email: "demo@chefantidesperdicio.com",
    passwordHash: bcrypt.hashSync("demo123", 10),
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

export class InMemoryUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return users.find((user) => user.id === id) ?? null;
  }

  async create(user: User): Promise<User> {
    users.push(user);
    return user;
  }
}
