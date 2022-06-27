import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../hooks/useAuth";

type FailedRequestError = {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequestError[] = [];

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function setupAPIClient(ctx: GetServerSidePropsContext = null) {
  let cookies = parseCookies(ctx);
  const _api = axios.create({
    baseURL: "http://localhost:3333/",
    headers: {
      Authorization: `Bearer ${cookies["dashgo.token"]}`,
    },
  });

  _api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);
          const { "dashgo.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            _api
              .post("refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: _refreshToken } = response.data;

                setCookie(ctx, "dashgo.token", token, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });
                setCookie(ctx, "dashgo.refreshToken", _refreshToken, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });

                _api.defaults.headers["Authorization"] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => {
                  request.onFailure(err);
                });
                failedRequestsQueue = [];

                if (typeof window === "undefined") {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(_api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (typeof window === "undefined") {
            signOut();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return _api;
}
