// 页面本身分页
export const customPagingMixins = {
  data(){
    return{
      // 默认分页5条
      pageSize:5,
      // 默认当前值为第一页
      page:1,
      // 原数组
      arr:[],
      // 新数组
      newArr:[],
      // 新数组map集合
      newArrMap:{},
      //原数组map集合
      arrMap:{}
    }
  },
  methods: {
    customPagingFun(arr,pageSizes,tableConfig,tableConfigName) {
      this.arr = arr;
      tableConfig.total = arr.length;
      let newArr = [];
      let pageInit = 0;
      for(let i = 0; arr.length / pageSizes > i; i++){
        newArr[i] = arr.slice(pageInit+pageSizes*i, pageInit+pageSizes+pageSizes*i)
      }
      // this.newArr = newArr;
      this.arrMap[tableConfigName] = arr;
      this.newArrMap[tableConfigName] = newArr;
      tableConfig.data = this.newArrMap[tableConfigName][0];
    },
    // 分页change 事件
    mixinPageChange(val, tableConfig,tableConfigName) {
      this.page = val;
      tableConfig.data = this.newArrMap[tableConfigName][val-1];
    },
    // 切换分页条数
    mixinPageSizeChange(arr, val, tableConfig ,tableConfigName) {
      this.arr = arr;
      this.pageSize = val;
      this.customPagingFun(this.arr,this.pageSize,tableConfig,tableConfigName);
    },
    mixinTableArr(tableConfigName){
      return this.arrMap[tableConfigName];
    }
  }
};
