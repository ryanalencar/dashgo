import { createContext, ReactNode, useContext, useMemo } from "react";
import { _api } from "../services/api";

export type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  const signIn = async (data: SignInCredentials) => {
    try {
      const response = await _api.post("sessions", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
