import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

let cookies = parseCookies();

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
          });
      } else {
        destroyCookie(null, "dashgo.token");
        destroyCookie(null, "dashgo.refreshToken");
      }
    }
  }
);
