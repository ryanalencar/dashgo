import { ReactNode } from "react";

export type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

export type AuthProviderProps = {
  children: ReactNode;
};
