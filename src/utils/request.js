import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20 * 1000
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const res = response.data;
    return Promise.resolve(res);
  },
  error => {
    console.log(error.message);
    return Promise.reject(error);
  }
);

export const request = async (url = "", type = "GET", data = {}) => {
  let result;
  type = type.toUpperCase();
  let requestOptions = {
    url: url,
    method: type
  };
  requestOptions["headers"] = {
    "Content-type": "application/json"
  };
  if (type === "GET") {
    requestOptions["params"] = data;
  } else {
    requestOptions["data"] = data;
  }
  await instance(requestOptions).then(res => {
    result = res;
  });
  return result;
}
