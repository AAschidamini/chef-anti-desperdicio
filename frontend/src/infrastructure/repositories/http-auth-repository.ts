import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type {
  AuthCredentials,
  AuthSession,
  RegisterData,
} from "@/domain/entities/user";
import { httpClient } from "@/infrastructure/http/http-client";

export class HttpAuthRepository implements AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthSession> {
    return httpClient.post<AuthSession>("/auth/login", credentials);
  }

  register(data: RegisterData): Promise<AuthSession> {
    return httpClient.post<AuthSession>("/auth/register", data);
  }

  async logout(): Promise<void> {
    await httpClient.post<void>("/auth/logout");
  }
}
