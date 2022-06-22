import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { setCookie } from "nookies";
import { _api } from "../../services/api";
import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from "./types";

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  const signIn = async (data: SignInCredentials) => {
    try {
      const response = await _api.post("sessions", data);
      const { permissions, roles, email, token, refreshToken } = response.data;

      setUser({ email, permissions, roles });
      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
