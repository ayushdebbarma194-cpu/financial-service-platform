import { api } from "./api";
import { AuthUser } from "./auth-store";

interface AuthResponse {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  register: (name: string, email: string, password: string, referralCode?: string) =>
    api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
      ...(referralCode && { referralCode }),
    }),

  logout: (refreshToken?: string) =>
    api.post("/auth/logout", { refreshToken }),

  me: () => api.get<AuthUser>("/auth/me"),
};
