import Http from 'axios';
import qs from 'qs';

class ServiceBase {
  constructor() {
    this.interceptorsOfReq();
    this.interceptorsOfRes();
  }

  /**
   * get请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  get(url, params) {
    if (params) {
      url += encodeParams(params);
    }
    return Http.get(url).then(res => res.data);
  }

  /**
   * post请求
   * @param url       请求地址
   * @param params    请求参数
   * @returns {Promise.<TResult>}
   */
  post(url, params) {
    return Http.post(url, params).then(res => res.data);
  }

  /*
  * 下载文件
  * */
  downLoad(src, params) {
    let download_file = {};
    if (params) {
      src += qs.stringify(params);
    }
    if (typeof download_file.iframe == "undefined") {
      let iframe = document.createElement("iframe");
      download_file.iframe = iframe;
      document.body.appendChild(download_file.iframe);
    }
    download_file.iframe.src = src;
    download_file.iframe.style.display = "none";
  }

  /**
   * 请求拦截器
   * @returns {number}
   */
  interceptorsOfReq() {
    return Http.interceptors.request.use(
      config => {
        console.log('请求URL== ' + config.url);
        console.log('请求参数==', config.data);
        return config;
      },
      err => {
        return Promise.reject(err);
      });
  }

  /**
   * 响应拦截器
   */
  interceptorsOfRes() {
    Http.interceptors.response.use(function (response) {
      console.log('响应完整数据==', response);
      console.log('响应数据==', response.data);
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }

}

export default ServiceBase;
