/*
 * @Author: your name
 * @Date: 2021-06-08 14:17:52
 * @LastEditTime: 2021-06-16 17:48:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/functionPower.actions.js
 */
/* eslint-disable import/prefer-default-export */



export const fetchActionsInCustomizePage = function fetchActionsInCustomizePage(params) {
   $network
    .post('/p/cs/fetchActionsInCustomizePage', params.params)
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const queryMenuPermission = function queryMenuPermission(params) {
   $network
    .post('/p/cs/queryMenuPermission', params.params)
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const copyPermission = function copyPermission(params) {
   $network
    .post('/p/cs/copyPermission', params.params)
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const savePermission = function savePermission(params) {
   $network
    .post('/p/cs/savePermission', params.params)
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const cgroupsquery = function cgroupsquery(params) {
   $network
    .post('/p/cs/cgroupsquery', params.params)
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const getMenuTree = function getMenuTree(params) {
   $network
    .post('/p/cs/getMenuTree')
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};

export const groupTreeload = function groupTreeload(params) {

 
   $network
    .post('/p/cs/groupTreeload')
    .then((res) => {
      if (typeof params.success === 'function') {
        params.success(res);
      }
    });
};
