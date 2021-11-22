/*
 * @Author: your name
 * @Date: 2021-08-30 17:27:11
 * @LastEditTime: 2021-09-13 14:11:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/assets/js/fkRequest.js
 */
import R3 from '@syman/burgeon-r3';
import service from '@/service/index';

export const fkQueryList = function fkQueryList(params) {
  const query = new FormData();
  query.append('searchdata', JSON.stringify(params.searchObject));
  service.common.QueryList(query).then((res) => {
    if (typeof params.success === 'function') {
      params.success(res);
    }
  });
};



export const fkFuzzyquerybyak = function fkFuzzyquerybyak(params) {
  service.common.fuzzyquerybyak(R3.urlSearchParams(params));
};
