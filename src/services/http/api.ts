import axios from "axios";
import Cookies from "js-cookie";

type T = (token: string) => any;
const api = axios.create({
  baseURL: "http://localhost:5001",
});

let isRefreshing = false;
let refreshSubscribers: T[] = [];

function subscribeTokenRefresh(callback: T) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const token = params.get("token");

    if (
      error?.response?.status === 401
    ) {
      return Promise.reject(error);
    }
    if (error.config.url.includes("/auth/token")) {
      Cookies.remove("gitaRefreshToken");
      Cookies.remove("gitaAuth");
      if (token) {
        window.location.href = `/register?token=${token}`;
      } else {
        window.location.href = "/";
      }
      return Promise.reject(error);
    }

    if (
      typeof error?.response?.data?.detail === "string" &&
      (error?.response?.data?.detail || "")?.toLowerCase() ===
        "not authenticated"
    ) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          const refreshTokenResponse = await axios.get("/auth/token", {
            headers: {
              Authorization: Cookies.get("refresh-token")
            },
          })
          .then((result) => {
            return { data: result.data, status: result.status };
          })
          .catch((error) => {
            throw error;
          });
          
          if (refreshTokenResponse.status === 200) {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 50);

            Cookies.set(
              "gitaAuth",
              JSON.stringify({
                authorization: `Bearer ${refreshTokenResponse.data.access_token}`,
              }),
              { expires: date },
            );
            date.setHours(date.getHours() + 6);
            Cookies.set(
              "gitaRefreshToken",
              JSON.stringify({
                authorization: `Bearer ${refreshTokenResponse.data.refresh_token}`,
              }),
              { expires: date },
            );

            originalRequest.headers.authorization = `Bearer ${refreshTokenResponse.data.access_token}`;
            isRefreshing = false;
            onTokenRefreshed(originalRequest.headers.authorization);
            return api(originalRequest);
          } else {
            if (token) {
              window.location.href = `/register?token=${token}`;
            } else {
              window.location.href = "/";
            }
            return Promise.reject(error);
          }
        } else {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.authorization = token;
              resolve(api(originalRequest));
            });
          });
        }
      }
    }
    return Promise.reject(error);
  },
);
export default api;
