import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import type { UserRepository } from "../../domain/repositories/user-repository";
import { toPublicUser, type PublicUser } from "../../domain/entities/user";
import { ConflictError, UnauthorizedError } from "../../domain/errors/app-error";
import { env } from "../../infrastructure/config/env";
import type { LoginDto, RegisterDto } from "../dtos/auth-dto";

export interface AuthResult {
  user: PublicUser;
  token: string;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterDto): Promise<AuthResult> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Já existe um usuário com este e-mail.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash,
      role: "staff",
      createdAt: new Date().toISOString(),
    });

    return this.buildAuthResult(user.id, toPublicUser(user));
  }

  async login(data: LoginDto): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError("E-mail ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError("E-mail ou senha inválidos.");
    }

    return this.buildAuthResult(user.id, toPublicUser(user));
  }

  private buildAuthResult(userId: string, user: PublicUser): AuthResult {
    const token = jwt.sign({ sub: userId }, env.jwtSecret, {
      expiresIn: "7d",
    });
    return { user, token };
  }
}
