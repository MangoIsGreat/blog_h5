import axios from "axios";
import { Component } from "react";
import { BASE_URL } from "./url";
import { encode } from "./encode";
import { Toast } from "antd-mobile";

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
    if (response.data.error_code === 10006) {
      Toast.info("请先登录！", 0.6);

      response.data.error_code = 0;
    }

    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Component.prototype.$axios = axios;

export { axios };
