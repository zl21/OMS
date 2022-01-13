
export const omsStore = {
  namespaced: true,
  state: {
    platformStyle: '3',
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
export default omsStore;
