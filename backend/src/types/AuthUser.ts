export interface AuthUser {
  id: string | null;
  role: string | null;
}

export interface AuthTokenPayload {
  id: string;
  role: string;
}
