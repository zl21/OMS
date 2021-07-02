import businessButton from 'professionalComponents/businessButton'
import businessForm from 'professionalComponents/businessForm'
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
            label: '物流单号',
            style: 'input',
            width: '7',
            value: 'EXPRESS_CODE',
            columns: ['EXPRESS_CODE'],
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            label: '退货单号',
            style: 'input',
            width: '7',
            value: 'OC_B_RETURN_BILL_NO',
            columns: ['OC_B_RETURN_BILL_NO'],
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            style: 'input', //输入框类型
            label: '平台单号', //输入框前文字
            value: 'SOURCE_CODE', //输入框的值
            columns: ['SOURCE_CODE'],
            width: '7',
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            style: 'input', //输入框类型
            label: '收货人', //输入框前文字
            value: 'RECEIVER_NAME', //输入框的值
            columns: ['RECEIVER_NAME'],
            width: '7',
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            style: 'input', //输入框类型
            label: '买家昵称', //输入框前文字
            value: 'BUYER_NICK', //输入框的值
            columns: ['BUYER_NICK'],
            width: '7',
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
          {
            style: 'input', //输入框类型
            label: '收货人手机', //输入框前文字
            value: 'RECEIVER_MOBILE', //输入框的值
            columns: ['RECEIVER_MOBILE'],
            width: '7',
            maxlength: 11,
            AuotData: [], //匹配的选项
            regx: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
          },
        ],
      },
      // searchBtn
      searchBtn: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '查找',
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
            text: ' 取消',
            btnclick: () => {
              this.$parent.$parent.closeConfirm()
            }, // 按钮点击事件
          },
          {
            text: '确认',
            btnclick: () => {
              let reqdata = JSON.parse(JSON.stringify(this.tabdata))
              if (this.componentData.type == 2) {
                reqdata.RETURN_ORDER_ITEM_LIST = this.rowlist
              }
              console.log(reqdata);
              this.$parent.$parent.closeConfirm(reqdata, this.componentData.type)
            }, // 按钮点击事件
          },
        ],
      },
      columns10: [],
      data9: [],
      tabdata: [],
      rowlist: {},
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
    expand(e, s) {
     // console.log(e);
    },
    fnrow(v) {
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
                  console.log(val);
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
      ]


      this.columns10 = typeArr.concat(data.TABTH).filter((item, index) => {
        if (item.key != "ID") {
          return item
        }
      })
      this.data9 = data.RETURN_ORDER_LIST

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
              title: '序号',
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
