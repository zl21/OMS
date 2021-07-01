import businessActionTable from 'professionalComponents/businessActionTable';
  import businessButton from 'professionalComponents/businessButton';
  import loading from 'professionalComponents/loading.vue';

  export default {
    components: {
      businessActionTable,
      businessButton,
      loading
    },
    computed: {
      type() {
        let type;
        switch (this.$parent.title) {
        case '售价异常审批':
          type = 5; 
          break;
        case '异常商品修改':
          type = 3;
          break;
        case '异常地址匹配':
          type = 12;
          break;
        }
        return type;
      }
    },
    created() {
    },
    mounted() {
      this.query();
      console.log();
    },
    data() {
      return {
        vmI18n:$i18n,
        loading: false,
        tableConfig: {
          indexColumn: true, // 是否显示序号
          isShowSelection: true, // 是否存在多选
          pageShow: true, // 控制分页是否显示
          searchInputShow: false, // 控制搜索框是否显示
          width: '', // 表格宽度
          border: true, // 是否显示纵向边框
          total: 0, // 设置总条数
          pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
          pageSize: 10, // 默认每页条数100条，产品要求
          pageIndex: 1, // 页码
          totalData: [],
          selectionData: [], // 勾选数据
          data: [],
          columns: []
        },
        selectionData: [],
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              text: $i18n.t('common.cancel'), // 取消 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$parent.$parent.closeConfirm();
              } // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              text: $i18n.t('common.determine'), // 确定 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.datermine();
              } // 按钮点击事件
            }
          ]
        }
      };
    },
    methods: {
      query() {
        const self = this;
        self.loading = true;
        self.service.orderCenter.getOcBOrderExceptions({
          EXCEPTION_TYPE: self.type,
          range: self.tableConfig.pageSize,
          startindex: self.tableConfig.pageIndex
        }).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            if (self.type == 5) {
              self.tableConfig.columns = res.data.data.TABTH;
            }
            self.tableConfig.data = res.data.data.OC_B_ORDER_EXCEPTION;
            self.tableConfig.total = res.data.data.totalRowCount;
          }
          self.loading = false;
        });
      },
      onSelect(sel) {
        this.selectionData = sel;
      },
      datermine() {
        const self = this;
        if (!self.selectionData.length) {
          $omsUtils.msgTips(self, 'warning', '请勾选需要处理的异常商品', 0);
        } else {
          const arr = self.selectionData.map(item=>{
            const obj = {};
            obj.EXCEPTION_TYPE = item.EXCEPTION_TYPE;
            obj.ID = item.ID;
            return obj;
          });
          self.loading = true;
          self.service.orderCenter.batchSaveOcBOrderException(arr).then(res=>{
            console.log(res);
            if (res.data.code == 0) {
              $omsUtils.msgTips(self, 'success', res.data.message, 0);
              this.$parent.$parent.closeConfirm();
            } else {
              $omsUtils.msgTips(self, 'error', res.data.message, 0);
            }
            self.loading = false;
          });
        }
      },
      pageChange(val) {
        console.log(val);
        this.tableConfig.pageIndex = val;
        this.query();
      },
      pageSizeChange(val) {
        console.log(val);
        this.tableConfig.pageSize = val;
        this.query();
      }
    }
  };