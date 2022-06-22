import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
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

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      _api.get("me").then((res) => {
        const { email, permissions, roles } = res.data;
        setUser({ email, permissions, roles });
      });
    }
  }, []);

  const signIn = async (data: SignInCredentials) => {
    try {
      const response = await _api.post("sessions", data);
      const { permissions, roles, email, token, refreshToken } = response.data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ email, permissions, roles });

      _api.defaults.headers["Authorization"] = `Bearer ${token}`;
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
