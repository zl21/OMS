import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';

export default {
  components: {
    businessButton,
    businessActionTable
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      is_click: false,
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: '按照可用数量填充',
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.allFill();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            } // 按钮点击事件
          }
        ]
      },
      abnormalList: [],
      haveDelList: [],
      jordanTableConfig: {
        columns: [
          {
            key: 'psCSkuEcode',
            title: '条码',
            dataAcessKey: 'psCSkuEcode',
          },
          {
            key: 'psCProEcode',
            title: '商品编码',
            dataAcessKey: 'psCProEcode',
          },
          {
            key: 'psCProEname',
            title: '商品名称',
            dataAcessKey: 'psCProEname',
          },
          {
            key: 'qty',
            title: '调拨数量',
            dataAcessKey: 'qty',
            render: (h, params) => {
              const _this = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between'
                  }
                },
                [
                  h('Input', {
                    class: 'qtyRefund',
                    style: {
                      width: '150',
                      height: '100%',
                      // border: '1px solid #dcdee2',
                      'text-align': 'center'
                    },
                    props: {
                      value: params.row.qty,
                      autosize: true
                    },
                    on: {
                      'on-change': e => {
                        params.row.qty = e.target.value;
                        _this.abnormalList.data[params.index] = params.row;
                        _this.abnormalSelectData.forEach(item => {
                          if (item.PS_C_SKU_ECODE === params.row.PS_C_SKU_ECODE) {
                            item.qty = params.row.qty;
                          }
                        });
                      }
                    }
                  })
                ]
              );
            }
          },
          {
            key: 'realQty',
            title: '库存可用数量',
            dataAcessKey: 'realQty',
          }
        ],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        // isShowAddDetailBtn: true,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
      }, // 退货明细
    };
  },
  mounted() {

    const param = {
      objid: this.$route.params.itemId
    }
    R3.network.post('/p/cs/transfer/audit', param).then((res) => {
      if (res.data.code === 0) {
        this.$emit('closeActionDialog');
        // 标准菜单刷新
        document.querySelector('.singleObjectButton').__vue__.clickButtonsRefresh()
        this.$Message.success(res.data.message);
      } else {
        if (res.data.data === undefined) this.$emit('closeActionDialog')
        this.abnormalList = res.data.data;
        this.jordanTableConfig.data = res.data.data;
        // self.$Message.error(res.data.message);
      }
    });
  },
  methods: {
    // 按照可用数量填充
    allFill() {
      this.abnormalList.map(item => {
        item.qty = item.realQty
      })
      const arr = this.abnormalList
      this.jordanTableConfig.data = arr
    },
    // 删除明细
    returnDeleteDetail(){
      console.log(this.abnormalSelectData, this.abnormalList)
      this.haveDelList = this.haveDelList.concat(this.abnormalSelectData)
      this.haveDelList.map(item  => {
        item.qty = 0
      })
      const _this = this;
      if (_this.abnormalSelectData.length == 0 || _this.abnormalSelectData.length == null) {
        _this.$Message.error(_this.vmI18n.t('modalTips.aw')); // 请选择一条需要删除的明细!
      } else {
        const item = _this.jordanTableConfig.data;
        const arr = item.filter(item=>{
          const ecode = _this.abnormalSelectData.map(v => v.id);
          return !ecode.includes(item.id);
        });
        console.log(arr);
        _this.jordanTableConfig.data = arr;
        _this.abnormalList = arr;
        _this.$Message.success(_this.vmI18n.t('modalTips.ay')); // 删除成功
      }
    },
    // 列表勾选
    returnOnSelect(e) {
      this.abnormalSelectData = e;
    },
    // 取消勾选
    returnCancel(e) {
      this.abnormalSelectData = e;
    },// 列表全选
    returnSelectAll(e) {
      this.abnormalSelectData = e;
    },
    // 取消全选
    returnSelectAllCancel(e) {
      this.abnormalSelectData = e;
      this.amountReturned = this.calculateMoney(this.refundDtoList.data, 1).toFixed(2);
      this.returnTotal();
    },
    determine() {
      const self = this;
      const param = {
        objid: this.$route.params.itemId,
        data: this.haveDelList.concat(this.abnormalList)
      }
      R3.network.post('/p/cs/transfer/audit', param).then((res) => {
        if (res.data.code === 0) {
          self.$emit('closeActionDialog');
          self.$Message.success(res.data.message);
          // 标准菜单刷新
          document.querySelector('.singleObjectButton').__vue__.clickButtonsRefresh()
        } else {
          if (res.data.data === undefined) self.$emit('closeActionDialog')
          this.abnormalList = res.data.data;
          this.jordanTableConfig.data = res.data.data;
          // self.$Message.error(res.data.message);
        }
      });
    }
  }
};
