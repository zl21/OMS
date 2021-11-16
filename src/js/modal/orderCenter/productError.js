import BC from 'burgeonComponents'
const { Components } = BC
Vue.component('drpInputPro', Components.Fkinput)

export default {
  components: {},
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
    this.query();
  },
  mounted() {
  },
  data() {
    return {
      itemdata_list: [],
      loading: false,
      resultArr: [],
      tableConfig: {
        indexColumn: true, // 是否显示序号
        // isShowSelection: true, // 是否存在多选
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '452',
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [], // 勾选数据
        data: [],
        columns: [
          // {
          //   key: 'ID',
          //   title: '序号'
          // },
          {
            key: 'CP_C_SHOP_TITLE',
            title: $i18n.t('table_label.shopName') // 店铺名称
          },
          {
            key: 'SKU_NUMIID',
            title: '平台规格ID'
          },
          {
            key: 'NUM_IID',
            title: '平台商品ID'
          },
          {
            key: 'PT_PRO_TITLE',
            title: '平台商品名称'
          },
          {
            key: 'PS_C_SKU_ECODE',
            title: '系统SKU编码',
            render: (h, params) => {
              const self = this;
              return h('div', {
                style: {
                  width: '150px'
                }
              }, [
                h('drpInputPro', {
                  props: {
                    style: 'popInput',
                    version: '1.4',
                    isActive: true,
                    itemdata:
                      self.itemdata_list[params.index]
                    // {
                    //   colid: 171591,
                    //   colname: 'CP_C_REGION_PROVINCE_ID',
                    //   fkdisplay: 'drp',
                    //   isfk: true, // 是否有fk键
                    //   isnotnull: true, // 是否必填
                    //   name: '',
                    //   readonly: false, // 是否可编辑，对应input   readonly属性
                    //   pid: params.row.PS_C_SKU_ID,
                    //   valuedata: params.row.PS_C_SKU_ECODE,
                    // },
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    getFkChooseItem: (val) => {
                      console.log(val);
                      if (val.ID) { //下拉选中时间
                        params.row.PS_C_SKU_ECODE = val.ECODE.val
                        params.row.PS_C_SKU_ID = val.ID.val
                        this.tableConfig.data[params.index] = params.row;
                        this.getResult(val, params.row, val.ID.val, val.ECODE.val);
                        console.log('val:', val);
                        console.log('params:', params);
                      } else if (val.id) {  //失去焦点时间
                        params.row.PS_C_SKU_ECODE = val.value
                        params.row.PS_C_SKU_ID = val.id
                        this.tableConfig.data[params.index] = params.row;
                        this.getResult(val, params.row, val.id, val.value);
                        // let arr = [];
                        // this.resultArr.forEach(item=>{
                        //   if(item.ID !== params.row.ID){
                        //     arr.push(item)
                        //   }
                        // });
                        // this.resultArr = arr;
                      } else { //模糊搜索事件
                        params.row.PS_C_SKU_ECODE = val.valuedata
                        params.row.PS_C_SKU_ID = val.pid
                        this.tableConfig.data[params.index] = params.row;
                        this.getResult(val, params.row, val.pid, val.valuedata);
                        // let arr = [];
                        // this.resultArr.forEach(item=>{
                        //   if(item.ID !== params.row.ID){
                        //     arr.push(item)
                        //   }
                        // });
                        // this.resultArr = arr;
                      }
                    },
                  },
                })
              ])
            }
          },
          {
            key: 'OUTER_IID',
            title: '商家商品编码'
          },
          {
            key: 'OUTER_SKU_ID',
            title: '商家规格编码'
          },
          {
            key: '',
            title: '系统SKU名称'
          }
        ]
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
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          res.data.data.OC_B_ORDER_EXCEPTION.forEach(item => {
            self.itemdata_list.push({
              serviceId: 'r3-cp',
              colid: 171591,
              colname: 'CP_C_REGION_PROVINCE_ID',
              fkdisplay: 'drp',
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: '',
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: item.PS_C_SKU_ID,
              valuedata: item.PS_C_SKU_ECODE,
            })
          })
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
      self.loading = true;
      self.service.orderCenter.batchSaveOcBOrderException(self.resultArr).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          $omsUtils.msgTips(self, 'success', res.data.message, 0);
          this.$parent.$parent.closeConfirm();
        } else {
          $omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
        self.loading = false;
      });
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
    },
    getResult(val, data, id, code) {
      const self = this;
      //如果结果数据为空,则直接push数组
      if (self.resultArr.length) {
        //判断是否已经操作过该ID数据
        if (self.resultArr.some(item => item.ID == data.ID)) {
          self.resultArr.forEach(item => {
            if (item.ID == data.ID) {
              item.PS_C_SKU_ID = id;
              item.PS_C_SKU_ECODE = code;
            }
          })
        } else {
          let obj = {
            EXCEPTION_TYPE: data.EXCEPTION_TYPE,// 处理异常类型
            ID: data.ID,
            PS_C_SKU_ID: id,// 省市区选择的id
            PS_C_SKU_ECODE: code// 省市区选择的name
          }
          self.resultArr.push(obj);
        }
      } else {
        let obj = {
          EXCEPTION_TYPE: data.EXCEPTION_TYPE,// 处理异常类型
          ID: data.ID,
          PS_C_SKU_ID: id,// 省市区选择的id
          PS_C_SKU_ECODE: code// 省市区选择的name
        };
        self.resultArr.push(obj);
      }
    }
  }
};