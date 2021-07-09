import R3 from '../../../static/r3.publish/r3.min.js';
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

// export const fkFuzzyquerybyak = function fkFuzzyquerybyak(params) {
//   vm.$network.post('/p/cs/fuzzyquerybyak', vm.$urlSearchParams({
//     searchdata: params.searchObject
//   }), {
//     serviceId: params.serviceId
//   }).then((res) => {
//     if (typeof params.success === 'function') {
//       res.data.data = res.data && res.data.data;
//       params.success(res);
//     }
//   });
// };

export const fkFuzzyquerybyak = function fkFuzzyquerybyak(params) {
  // R3.network.post('/p/cs/fuzzyquerybyak', R3.urlSearchParams(params)).then((res) => {
  //   console.log(res);
  // })
  service.common.fuzzyquerybyak(R3.urlSearchParams(params));
};
