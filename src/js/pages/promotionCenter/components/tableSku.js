import axios from 'axios';

export default {
  props: {
    itemdata: {
      type: Object
    },
    row: {
      type: Object
    },
    showCol: {
      type: String,
      default: 'PS_C_SKU_ECODE'
    }
  },
  components: {},
  data() {
    return {
      value: '', // 选中值 v-model 绑定
      queryList: [], // 模糊搜索项目
      isSelected: false, // 是否选中项
    };
  },
  watch: {},
  methods: {
    /**
     * 搜索
     * @val 关键字
     * @val 回调
     */
    handleSearch(val, cb) {
      const self = this;
      const params = {
        table: this.itemdata.reftable,
        like: val
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      axios({
        method: 'post',
        url: '/p/cs/pm/v1/selectProInfoLike',
        data: serachParams
      }).then((res) => {
        if (res.data.code === 0) {
          self.queryList = res.data.data;
          cb(self.queryList);
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
          self.queryList = [];
        }
      }).catch(() => {
        // let list = [
        //   {
        //     PS_C_PRO_ECODE: "10020043",
        //     PS_C_SKU_ID: "10020043",
        //     PRICE: 100,
        //     PS_C_PRO_ENAME: "一商商品",
        //     ID: 8171,
        //     PS_C_SKU_ECODE: "00002",
        //     PS_C_PRO_ID: "10020043"
        //   },
        //   {
        //     PS_C_PRO_ECODE: "11120043",
        //     PS_C_SKU_ID: "11120043",
        //     PRICE: 100,
        //     PS_C_PRO_ENAME: "一商测试商品一商测试商品",
        //     ID: 8171,
        //     PS_C_SKU_ECODE: "10002",
        //     PS_C_PRO_ID: "11120043"
        //   }
        // ];
        self.queryList = [];
        cb([]);
        $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
      });
    },
    /**
     * 选中项目
     */
    handleSelect(val) {
      const self = this;
      const obj = val;
      if (obj) {
        // 当前选中项
        this.isSelected = true;
        this.confirmResult(obj);
      } else {
        this.isSelected = fasle;
      }
    },
    autocompleteEnter(evnet) {
      const self = this;
      if (this.isSelected) {
        return true;
      }
      if (this.queryList.length > 0) {
        this.confirmResult(self.queryList[0]);
      } else {
        this.clearResult();
      }
      $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
    },
    autocompleteBlur(event) {
      const self = this;
      setTimeout(() => {
        if (this.isSelected) return;
        if (self.queryList.length > 0) {
          self.confirmResult(self.queryList[0]);
        } else if (self.queryList.length === 0 && self.value === '') {
          self.clearResult();
        } else {
          self.blurInQuery();
        }
        self.queryList = [];
        $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
      }, 500);
    },
    blurInQuery(cb) {
      const self = this;
      const params = {
        table: this.itemdata.reftable,
        like: this.value
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      axios({
        method: 'post',
        url: '/p/cs/pm/v1/selectProInfoLike',
        data: serachParams
      }).then((res) => {
        if (res.data.code === 0) {
          if (res.data.data.length === 0) {
            this.value = [];
            this.queryList = [];
          }
        }
      }).catch(() => {
        this.value = [];
        this.queryList = [];
      });
    },
    keyUp(event) {
      const self = this;
      if (event.keyCode !== 13) {
        self.isSelected = false;
        self.queryList = [];
      }
      if (this.value === '') {
        this.confirmResult();
      }
    },
    /**
     *  批量查询数据
     *  @id  款号id
     */
    selectProInfo(id) {
      const params = {
        table: this.itemdata.reftable,
        ids: [id]
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      axios({
        method: 'post',
        url: '/p/cs/pm/v1/selectProInfo',
        data: serachParams
      }).then((res) => {
        if (res.data.code === 0) {
          console.log(res.data.data);
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      });
    },
    /**
     * 确认选中结果
     */
    confirmResult(item) {
      this.value = String(item[this.showCol]);
      this.$emit('getFilterChooseItem', item, this.row);
    },
    clearResult() {
      this.value = '';
      this.$emit('clearFilterChooseItem', this.row);
    },
    /**
    初始化
     */
    init() {
      this.value = this.row.ECODE;
    }
  },
  mounted() {
    this.init();
  },
  created() {}
};
