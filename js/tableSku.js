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
    async handleSearch(val, cb) {
      const self = this;
      const params = {
        table: this.itemdata.reftable,
        like: val
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      try {
        const { data: { code, data, message } } = await this.service.promotionCenter.selectProInfoLike(serachParams);
        if (code === 0) {
          self.queryList = data;
          cb(self.queryList);
        } else {
          /* this.$message({
            type: 'error',
            message: message || '错误！'
          }); */
          self.queryList = [];
        }
      } catch (error) {
        self.queryList = [];
        cb([]);
        $(`.fkAutocomplete${self.itemdata.colname}`).css('display', 'none');
      }
    },
    /**
     * 选中项目
     */
    handleSelect(val) {
      const obj = val;
      if (obj) {
        // 当前选中项
        this.isSelected = true;
        this.confirmResult(obj);
      } else {
        this.isSelected = false;
      }
    },
    autocompleteEnter() {
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
    autocompleteBlur() {
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
    async blurInQuery() {
      const params = {
        table: this.itemdata.reftable,
        like: this.value
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      try {
        const { data: { code, data } } = await this.service.promotionCenter.selectProInfoLike(serachParams);
        if (code === 0) {
          if (data.length === 0) {
            this.value = [];
            this.queryList = [];
          }
        }
      } catch (error) {
        this.value = [];
        this.queryList = [];
      }
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
    async selectProInfo(id) {
      const params = {
        table: this.itemdata.reftable,
        ids: [id]
      };
      const serachParams = new URLSearchParams();
      serachParams.append('param', JSON.stringify(params));
      const res = await this.service.promotionCenter.selectProInfo(serachParams);
      if (res.data.code !== 0) {
        this.$Message.error(res.data.message);
        // this.$message({
        //   type: 'error',
        //   message: res.data.message
        // });
      }
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
