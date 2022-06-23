import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type FailedRequestError = {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
};

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue: FailedRequestError[] = [];

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const _api = axios.create({
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
        cookies = parseCookies();
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

              setCookie(null, "dashgo.token", token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });
              setCookie(null, "dashgo.refreshToken", _refreshToken, {
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
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              _api.defaults.headers["Authorization"] = `Bearer ${token}`;

              resolve(_api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        destroyCookie(null, "dashgo.token");
        destroyCookie(null, "dashgo.refreshToken");
      }
    }
  }
);
