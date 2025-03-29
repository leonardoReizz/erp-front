import { type DefaultApiResponse } from "./types";
import api from "./api";
import Cookies from "js-cookie";

interface AxiosData {
  url: string;
  data?: any;
  params?: any;
  authorization?: string;
}

export async function get({ url, data, params }: AxiosData) {
  return await api
    .get(url, {
      data,
      params,
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function post({
  url,
  data,
  params,
}: AxiosData): Promise<DefaultApiResponse> {
  return await api
    .post(url, data, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params,
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function put({ url, data, params }: AxiosData) {
  return await api
    .put(url, data, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params,
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}

export async function apiDelete({ url, data, params }: AxiosData) {
  return await api
    .delete(url, {
      data,
      params,
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
    .then((result) => {
      return { data: result.data, status: result.status } as any;
    })
    .catch((error) => {
      throw error;
    });
}
