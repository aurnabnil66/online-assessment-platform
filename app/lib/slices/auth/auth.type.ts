export interface User {
  id: string;
  email: string;
  role: "EMPLOYER" | "CANDIDATE";
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
