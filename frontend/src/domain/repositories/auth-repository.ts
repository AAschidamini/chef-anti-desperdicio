import type {
  AuthCredentials,
  AuthSession,
  RegisterData,
} from "@/domain/entities/user";

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  register(data: RegisterData): Promise<AuthSession>;
  logout(): Promise<void>;
}
