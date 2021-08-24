import axios from "axios";
import { Component } from "react";
import { BASE_URL } from "./url";
import { encode } from "./encode";

axios.defaults.baseURL = BASE_URL;

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("user_token");

    if (token) {
      config.headers["Authorization"] = encode(token);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Component.prototype.$axios = axios;

export { axios };
