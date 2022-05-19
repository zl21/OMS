import axios from 'axios';
import qs from 'qs';
// import { Message} from 'element-ui';
// import store from '../../__config__/store.config';// customize-1.3
// const R3 = window.R3.default;
// import R3 from '@syman/burgeon-r3';

// const { store } = R3;
const { Message } = ELEMENT

// 请求失败
function errorState(error) {
  // if(store.state.CurrentCompent) store.state.CurrentCompent.actionLoading = false;  //隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (error.response && (error.response.status === 200 || error.response.status === 304 || error.response.status === 400)) {
    return error.response;
  } if (error.response && (error.response.status === 403)) {
    // window.sessionStorage.clear();
    window.R3.store.commit('customize/beforeSignout'); // 失去会话提示跳转登录
  } else {
    if (error.response === undefined) return;
    window.R3.store.commit('customize/errorDialog', { // 其它报错
      message: error.response ? error.response.data : ''
    });
  }
}

// 请求成功
function successState(res) {
  // if(store.state.CurrentCompent) store.state.CurrentCompent.actionLoading = false; //隐藏loading
  // 统一判断后端返回的错误码
  const resData = res.data;
  if (resData.code != '0') {
    if (resData.code == '-2') {
      Message({
        message: resData.message,
        type: 'warning'
      });
      return;
    }
    if ((resData.message === undefined && resData.data === undefined)) {
      // 如果不存在message
      // 自定义错误信息,显示全部错误信息
    } else if (resData.ext) {
      let data = null;
      if (resData.ext.msgtype === 3) {
        this.$message({
          message: resData.message,
          type: 'error'
        });
        return;
      }
      if (resData.data) {
        if (resData.data.error) {
          data = resData.data.error;
          if (resData.ext.msgtype === 2) {
            data.unshift({
              message: resData.message
            });
          } else if (resData.ext.msgtype === 1) {

          }
        }
      }
      window.R3.store.commit('customize/errorDialog', { // 其它报错
        message: {
          data,
          message: resData.message
        }
      });
    } else if (resData.data !== undefined) {
      console.log(Object.prototype.toString.call(resData.data));
      // 默认的, 如果有data
      // 且data为数组, 只显示message
      if (Object.prototype.toString.call(resData.data) === '[object Array]') {
        const errorList = [];
        for (const error of resData.data) {
          // 明细判断，id是否为-1，新增
          if (!(error.id && error.id != -1 && error.id != 0) && !(error.objid && error.objid != -1 && error.objid != 0)) {
            errorList.push(error);
          }
        }
        window.R3.store.commit('customize/errorDialog', { // 其它报错
          message: {
            data: errorList,
            message: resData.message
          } // 列表和message错误
        });
      } else if (resData.data && Object.prototype.toString.call(resData.data.error) === '[object Array]') {
        window.R3.store.commit('customize/errorDialog', { // 其它报错
          message: {
            data: resData.data.error
          } // 列表和message错误
        });
      } else if (!Array.isArray(resData.data) && resData.message) {
        // 不是数组,且存在message错误信息
        window.R3.store.commit('customize/errorDialog', { // 其它报错
          message: resData.message // 列表和message错误
        });
      } else {
        // 如果是数组,将错误信息显示到列表中
      }
    } else if (resData.message == '当前记录无明细，不允许审核') {

    } else {
      window.R3.store.commit('customize/errorDialog', { // 其它报错
        message: resData.message // 列表和message错误
      });
    }
  }
}

// 配置axios实例参数
/**
 * 封装请求
 * @param opts : loading 全局加载
 * @param data
 * @returns {Promise}
 */
const httpServer = (opts, data) => {
  const httpDefaultOpts = { // http默认配置
    method: opts.method,
    url: opts.url,
    timeout: 1800000, // 前端30min延时控制
    params: opts.params,
    data: qs.stringify(opts.data),
    headers: opts.type == 'formdata' ? {
      'Content-Type': 'multipart/form-data'
    } : {

    },
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      if (data && typeof data === 'string') {
        try {
          data = JSON.parse(data.replace(/:\s*(\d{16,})(?=\s*[,\}])/g, ':"$1"'));
        } catch (e) {
          data = JSON.parse(data);
        }
      }
      return data;
    }],

  };
  // if(opts.loading && store.state.CurrentCompent) store.state.CurrentCompent.actionLoading = true;
  if (opts.method == 'get' || opts.method == 'GET') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  // 创建axios实例
  const promise = new Promise(((resolve, reject) => {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res);
        resolve(res);
      }
    ).catch(
      (err) => {
        errorState(err);
        reject(err);
      }
    );
  }));

  return promise;
};


// 封装post请求
export function post(url, data = {}, isForm = false) {
  return new Promise((resolve, reject) => {
    const config = {
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        if (data && typeof data === 'string') {
          try {
            data = JSON.parse(data.replace(/:\s*(\d{16,})(?=\s*[,\}])/g, ':"$1"'));
          } catch (e) {
            data = JSON.parse(data);
          }
        }
        return data;
      }],
    };

    if (isForm) {
      data = qs.stringify(data);
    }

    axios.post(url, data, config)
      .then((response) => {
        successState(response);
        resolve(response);
      })
      .catch((err) => {
        errorState(err);
        reject(err);
      });
  });
}

// 封装formdata请求
export function httpFormdata(data = {}) {
  return new Promise((resolve, reject) => {
    axios(data)
      .then((response) => {
        successState(response);
        resolve(response);
      })
      .catch((err) => {
        errorState(err);
        reject(err);
      });
  });
}

// 封装get请求
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    const config = {
      params,
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        if (data && typeof data === 'string') {
          try {
            data = JSON.parse(data.replace(/:\s*(\d{16,})(?=\s*[,\}])/g, ':"$1"'));
          } catch (e) {
            data = JSON.parse(data);
          }
        }
        return data;
      }],
    };
    axios.get(url, config)
      .then((response) => {
        successState(response);
        resolve(response);
      })
      .catch((err) => {
        if (url != '/p/c/getAppTitle') {
          errorState(err);
        }
        reject(err);
      });
  });
}


export default httpServer;
