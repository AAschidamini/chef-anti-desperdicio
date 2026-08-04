import type { AuthRepository } from "@/domain/repositories/auth-repository";
import type {
  AuthCredentials,
  AuthSession,
  RegisterData,
} from "@/domain/entities/user";
import { HttpAuthRepository } from "@/infrastructure/repositories/http-auth-repository";

const SESSION_STORAGE_KEY = "chef-anti-desperdicio:session";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const session = await this.authRepository.login(credentials);
    this.persistSession(session);
    return session;
  }

  async register(data: RegisterData): Promise<AuthSession> {
    const session = await this.authRepository.register(data);
    this.persistSession(session);
    return session;
  }

  async logout(): Promise<void> {
    await this.authRepository.logout();
    this.clearSession();
  }

  getPersistedSession(): AuthSession | null {
    if (typeof window === "undefined") return null;

    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  }

  private persistSession(session: AuthSession): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  private clearSession(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export const authService = new AuthService(new HttpAuthRepository());
