import Router, { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

import { _api } from "../../services/apiClient";

import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from "./types";

let authChannel: BroadcastChannel;

const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(null, "dashgo.token");
  destroyCookie(null, "dashgo.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        case "signIn":
          router.push("/dashboard");
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      _api
        .get("me")
        .then((res) => {
          const { email, permissions, roles } = res.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async (data: SignInCredentials) => {
    try {
      const response = await _api.post("sessions", data);
      const { permissions, roles, email, token, refreshToken } = response.data;

      setCookie(null, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(null, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ email, permissions, roles });

      _api.defaults.headers["Authorization"] = `Bearer ${token}`;
      router.push("/dashboard");

      authChannel.postMessage("signIn");
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
