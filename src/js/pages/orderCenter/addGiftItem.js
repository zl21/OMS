import businessButton from 'burgeonComponents/businessButton'
import { OmsForm } from 'burgeonComponents'
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown'
import service from '@/service/index'

export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      vmI18n: $i18n,
      highlight: true,
      formConfig: {
        formValue: {
          BUYER_NICK: '',//买家昵称
          EXPRESS_CODE: '',//物流单号
          OC_B_RETURN_BILL_NO: '',//退货单号
          RECEIVER_MOBILE: '', //收货人手机号
          RECEIVER_NAME: '', //收货人姓名
          SOURCE_CODE: '', //平台单号
        },
        formData: [
          {
            label: $i18n.t('form_label.returnOrder_no'),
            //'退换货单号',
            style: 'input',
            width: '7',
            value: 'OC_B_RETURN_BILL_NO',
            columns: ['OC_B_RETURN_BILL_NO'],
            AuotData: [], //匹配的选项
            // regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            style: 'input', //输入框类型
            label: $i18n.t('form_label.platform_billNo'), // 平台单号 输入框前文字
            value: 'SOURCE_CODE', //输入框的值
            columns: ['SOURCE_CODE'],
            width: '7',
            AuotData: [], //匹配的选项
            //regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            label: $i18n.t('form_label.logisticsOrder_No'),
            //'物流单号',
            style: 'input',
            width: '7',
            value: 'EXPRESS_CODE',
            columns: ['EXPRESS_CODE'],
            AuotData: [], //匹配的选项
            //regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },




          {
            style: 'input', //输入框类型
            label: $i18n.t('table_label.buyerNickname'),
            // '买家昵称', //输入框前文字
            value: 'BUYER_NICK', //输入框的值
            columns: ['BUYER_NICK'],
            width: '7',
            AuotData: [], //匹配的选项
            // regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },

        ],
      },
      // searchBtn
      searchBtn: {
        typeAll: 'default', // 按钮统一风格样式
        // btnsite: 'left', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('btn.search'),
            type: "primary",
            btnclick: () => {
              this.init(1)

            }, // 按钮点击事件
          },
          // {
          //   text: '重置',
          //   btnclick: () => {
          //   }, // 按钮点击事件
          // },
        ],
      },
      BtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'),
            btnclick: () => {
              this.$parent.$parent.closeConfirm()
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('CONFIRM'),
            type:"primary",
            btnclick: () => {
              let reqdata = JSON.parse(JSON.stringify(this.tabdata))
              if (this.componentData.type == 2) {
                if (!this.rowlist) {
                  this.$Message.error($i18n.t('modalTips.gr'));
                  return
                }
                reqdata.RETURN_ORDER_ITEM_LIST = this.rowlist
              }

              if (reqdata.length == 0) {
                this.$Message.error($i18n.t('modalTips.gr'));
                return
              }

              this.$parent.$parent.closeConfirm(reqdata, this.componentData.type)
            }, // 按钮点击事件
          },
        ],
      },
      columns10: [],
      data9: [],
      tabdata: [],
      rowlist: null,
      page: 1,
      total: 10,
      size: 10,

    }
  },
  components: {
    businessForm,
    businessButton,
  },
  props: {
    componentData: {
      type: Object,
    },
  },

  methods: {
    onSizechange(v) {
      this.size = v
      this.init()
    },
    onChange(v) {
      this.page = v
      this.init()
    },

    fnrow(v, index, en) {
      if (this.componentData.type == 2 && !v._disableExpand) {
        this.data9 = this.data9.map(item => {
          if (item.ID == v.ID) {
            item._expanded =  !item._expanded
          } else {
            item._expanded = false
          }
          return item
        })
      }

      this.tabdata = v
    },
    tntable(data) {
      let tabth = data.TABTH_ITEM.filter((item, index) => {
        if (item.key != "ID") {
          return item
        }
      })

      let typeArr = [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return this.$createElement('Table', {
              ref: `currentRowTable${params.index}`,
              props: {
                highlightRow: true,
                columns: tabth,
                data: params.row.RETURN_ORDER_ITEM_LIST
              },
              on: {
                "on-row-click": (val) => {
                  this.rowlist = val
                  this.data9.forEach((em, index) => {
                    if (index != params.index) {
                      this.$refs['currentRowTable' + index] && this.$refs['currentRowTable' + index].clearCurrentRow();
                    }
                  });
                }
              }
            })
          }
        },
        {
          title: $i18n.t('table_label.serialNo'), // 序号
          width: 50,
          key: "index"
        }
      ]

      this.columns10 = typeArr.concat(data.TABTH).filter((item, index) => {
        if (item.key != "ID") {
          return item
        }
      })
 

      this.data9 = data.RETURN_ORDER_LIST.map((item, index) => {
        item.index = index + 1
        if (!item.RETURN_ORDER_ITEM_LIST) {
          item._disableExpand = true
        }
       
        return item
      })

    },
    init(index) {
      let { RECEIVER_MOBILE, BUYER_NICK, RECEIVER_NAME, SOURCE_CODE, OC_B_RETURN_BILL_NO, EXPRESS_CODE } = this.formConfig.formValue
      let data = {
        pageSize: this.size,
        pageNum: this.page,
        RECEIVER_MOBILE,
        BUYER_NICK,
        RECEIVER_NAME,
        SOURCE_CODE,
        OC_B_RETURN_BILL_NO,
        EXPRESS_CODE
      }
      if (index) {
        data.pageNum = index
      }
      service.orderCenter.getMathReturnOrderByPage(data).then(res => {
        if (res.data.code == 0) {
          if (this.componentData.type == 2) {//处理强制匹配逻辑
            this.tntable(res.data.data)
          } else {
            let typeArr = [{
              type: 'index',
              title: $i18n.t('table_label.serialNo'), // 序号
              width: 60,
              align: 'center'
            }]
            this.columns10 = typeArr.concat(res.data.data.TABTH).filter((item, index) => {
              if (item.key != "ID") {
                return item
              }
            })

            this.data9 = res.data.data.RETURN_ORDER_LIST
          }
          let { pageNum, pageSize, total } = res.data.data.PAGE_INFO
          this.size = pageSize
          this.page = pageNum
          this.total = total
        }

      })

    },


  },
  mounted() {
    this.init()

  },
}
