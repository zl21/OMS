import R3 from '@syman/burgeon-r3';
export const fkQueryList = function fkQueryList(params) {
  R3.network.post('/p/cs/QueryList', R3.urlSearchParams({
    searchdata: params.searchObject
  }), {
    serviceId: params.serviceId
  }).then((res) => {
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
  R3.network.post('/p/cs/fuzzyquerybyak', R3.urlSearchParams(params)).then((res) => {
    console.log(res);
  })
}