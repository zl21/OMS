
export const jordanStore = {
  namespaced: true,
  state: {
    platformStyle: '3',
    sch_type_id: '',
    scheme_dataInit: [],
  },
  mutations: {
    changePlatform(state, n) {
      state.platformStyle = n;
    },
    scheme_dataRecover(state, n) {
      state.scheme_dataInit = n;
    }
  },
};
export default jordanStore;
