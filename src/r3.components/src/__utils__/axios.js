// 全局添加axios拦截器,重复请求取消上次请求
import axios from 'axios';
// import md5 from 'js-md5';
import md5 from 'md5';
// const axiosForCustomize = axios.create();
const CancelToken = axios.CancelToken;

const pending = [];
const addRequest = (p) => {
  pending.push(p);
};

const removeRequest = (config) => {
  pending.forEach((item) => {
    if (item.u === md5(config.url + config.data || '')) item.c();
  });
};


axios.interceptors.request.use((config) => {
  if (config.url && config.data && config.cancelToken) {
    removeRequest(config);
    config.cancelToken = new CancelToken(((c) => {
      const p = { u: md5(config.url + config.data || ''), c };
      addRequest(p);
    }));
  }
  return config;
},
(err) => {
  const error = err;
  return Promise.reject(error);
},);
