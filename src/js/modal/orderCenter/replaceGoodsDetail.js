// import axios from 'axios';
export default {
  components: {},
  data() {
    return {
      radioValue: '2',
      searchValue: '',
      tableConfig: {
        indexColumn: true,
        columns: [{
          key: 'skuEcode',
          title: $i18n.t('table_label.code_SKU'), // SKU编码
        },
        {
          key: 'spuEcode',
          title: $i18n.t('table_label.itemNo01'), // SPU编码
        },
        {
          key: 'spuEname',
          title: $i18n.t("table_label.itemNo02"), // SPU名称
        },
        {
          key: 'skuEname',
          title: $i18n.t('form_label.skuName'), // SKU名称
        },
        {
          key: 'brandEname',
          title: '品牌',
        },
        {
          key: 'classifyEname',
          title: '商品分类',
        }],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        isShowSelection: true, // 是否显示checkedbox
        highlightRow: true, // 高亮单选必须结合它
        multiple: false //false 单选
      },
      data: [],
      currentSkuEcode: '',
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          },
        ]
      },
    };
  },
  props: {
    componentData: {
      type: Object
    }
  },
  mounted() {
    console.log('componentData:', this.componentData);
  },
  methods: {
    // 选中某一项时触发
    onSelect(v) {
      //  this.skuEcodes = v[0].skuEcode
      console.log(v)
    },
    // 取消选中某一项时触发
    onSelectCancel() { },
    // 点击全选时触发
    onSelectAll() { },
    // 点击取消全选时触发
    onSelectAllCancel() { },
    // 单击某一行时触发
    onRowClick(row) {
      this.currentSkuEcode = row.skuEcode
    },
    // 单击某二行时触发
    onRowDblclick() { },
    // 分页change 事件
    pageChange(val) {
      console.log(val);
      this.tableConfig.current = val;
      this.search();
    },
    // 切换分页条数
    pageSizeChange(val) {
      console.log(val);
      this.tableConfig.pageSize = val;
      this.search();
    },
    tableDeleteDetail() { },
    // 搜索
    search() {
      // sku查询
      const self = this;
      let data = {
        skuEcode: self.searchValue,
        size: this.tableConfig.pageSize || 10,
        current: this.tableConfig.current || 1,
      }
      axios({
        method: 'post',
        url: '/r3-ps/p/cs/ps/pro/v1/selectSkuProBySkuEcodeList',
        data,
      }).then((res) => {
        self.tableConfig.data = res.data.data.records;
        self.tableConfig.total = res.data.data.total
      })
    },
    // 替换
    async confirm() {
      console.log('self.tableConfig.data:', this.tableConfig.data);
      const self = this;
      if (self.tableConfig.data.length == 0) {
        // sku不能为空!
        self.$Message.warning($i18n.t('modalTips.cg'));
        return;
      }
      if (!this.currentSkuEcode) {
        // 请选中一条单据!
        self.$Message.warning($i18n.t('modalTips.d8'));
        return;
      }
      console.log(this.componentData);
      let params = {
        orderList: this.componentData.orderList,
        skuEcodes: [this.componentData.oldSuk, this.currentSkuEcode],
        spuIds: this.componentData.spuIds
      }
      this.btnConfig.buttons[1].disabled = true;
      const { data: { code, message, data } } = await this.service.orderCenter.replaceOrderByPro(params);
      setTimeout(() => {
        this.btnConfig.buttons[1].disabled = false;
      }, 5000);
      console.log(code, message, data);
      if (code === 0) {
        self.$Message.success(message);
        self.$parent.$parent.closeConfirm();
        self.$parent.$parent.$parent.$parent.$parent.getDetailsData();
      } else if (code === -1) {
        this.$Modal.confirm({
          title: "message",
          width: 500,
          className: 'ark-dialog',
          mask: true,
          render: h => h('div', {
          }, data[0].message)
        });
      }
      // else if(data && code ===  -1){
      //     self.$Modal.confirm({
      //       title: message,
      //       width: 500,
      //       className:'ark-dialog',
      //       render: h => h('Table', {
      //           props: {
      //             columns: [
      //               {
      //                 title: 'ID',
      //                 key: 'orderId'
      //               },
      //               {
      //                 title: '单据编号',
      //                 key: 'billNo'
      //               }, 
      //               {
      //                 title: '提示信息',
      //                 key: 'message'
      //               }
      //             ],
      //             data
      //           }
      //         })
      //     });
      // }
    }
  }
};
