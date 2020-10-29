import jordanBtn from 'professionalComponents/businessButton';
import businessLabel from 'professionalComponents/businessLabel';
import businessForm from 'professionalComponents/businessForm';
import jordanModal from 'professionalComponents/businessDialog';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import { dataAccessMixin } from '@/assets/js/mixins/dataAccess';
import aTable from 'professionalComponents/agGridTable.vue';
import unzipXv from '@/assets/js/dataToSmall.js';
import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';
import labelListConfig from './publicConfig/labelList.js';
import orderLogo from './publicConfig/orderLogo.js';

export default {
  components: {
    jordanBtn,
    businessForm,
    businessLabel,
    jordanModal,
    aTable,
  },
  mixins: [isFavoriteMixin, buttonPermissionsMixin, dataAccessMixin],
  watch: {
    publicBouncedConfig(newvalue) {
      this.publicBouncedIndex = newvalue;
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      pageLoad: false,
      agTableConfig: {
        tableHeight: '600px',
        agLoading: false,
        columnDefs: [],
        rowData: [],
        renderArr: {
          EXPRESSCODE: (params) => {
            // render渲染的执行方法
            const resultElement = document.createElement('span');
            resultElement.innerText = params.value;
            resultElement.style.color = '#36A2EB';
            resultElement.style.cursor = 'pointer';
            resultElement.onclick = () => {
              const iTop = (window.screen.availHeight - 30 - 800) / 2;
              const iLeft = (window.screen.availWidth - 10 - 1200) / 2;
              window.open(
                `http://www.kuaidi100.com/chaxun?com=${params.data.PY_SHORT_NAME}&nu=${params.data.EXPRESSCODE}`,
                '',
                `height=800, width=1200 , top=${iTop} , left=${iLeft}`
              );
            };
            return resultElement;
          },
          ORDER_TAG: (params) => {
            const resultElement = document.createElement('div');
            params.data.ORDERTAGLIST.forEach((item) => {
              const tag = document.createElement('span');
              tag.innerText = item.text;
              tag.style.color = item.clr;
              tag.style.border = `1px solid${item.clr}`;
              tag.style.margin = '0 2px';
              tag.style.borderRadius = '6px';
              tag.style.padding = '2px';
              resultElement.appendChild(tag);
            });
            return resultElement;
          },
          PAY_TIME: params =>
            // 付款时间
            (params.data.PAY_TIME
              ? this.standardTimeConversiondateToStr(params.data.PAY_TIME)
              : ''),
          AUDIT_TIME: params =>
            // 审核时间
            (params.data.AUDIT_TIME
              ? this.standardTimeConversiondateToStr(params.data.AUDIT_TIME)
              : ''),
          DISTRIBUTION_TIME: params =>
            // 配货时间
            (params.data.AUDIT_TIME
              ? this.standardTimeConversiondateToStr(params.data.AUDIT_TIME)
              : ''),
          CREATIONDATE: params =>
            // 创建时间
            (params.data.CREATIONDATE
              ? this.standardTimeConversiondateToStr(params.data.CREATIONDATE)
              : ''),
          HOLD_RELEASE_TIME: params =>
            // HOLD单释放时间
            (params.data.HOLD_RELEASE_TIME
              ? this.standardTimeConversiondateToStr(
                params.data.HOLD_RELEASE_TIME
              )
              : ''),
          SCAN_TIME: params =>
            // 出库时间
            (params.data.SCAN_TIME
              ? this.standardTimeConversiondateToStr(params.data.SCAN_TIME)
              : ''),
          ORDER_FLAG: (params) => {},
        },
        pagenation: {
          // 设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [50, 200, 500, 2000],
        },
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      warningModal: false, // 警告弹框
      distributeLogisticsModal: false, // 警告弹框
      distributeWarehouseModal: false, // 警告弹框
      batchReturnOrderModal: false, // 警告弹框
      // 清除高级搜索中的数据
      clearFromListValue: false,
      // 状态json
      statusData: {
        label: vmI18n.t('common.all'), // 全部
        value: '0',
        isShow: true,
      },
      // tag 搜索
      queryInfoData: [],
      // 高级搜索
      highSearchData: [],
      sort: [], // 表格排序状态
      // 标签
      labelData: [],

      // 表格选中数据
      selection: [],
      // from loading
      isShowFromLoading: false,
      // 弹框判断
      publicBouncedIndex: {
        name: 'testModal',
      },
      // 公共弹框
      publicBouncedConfig: {},
      // 判断显示高级搜索还是正常搜素
      isShowSeniorOrOrdinary: true,
      // icon 样式
      iconDownIcon: 'iconfont iconbj_down',

      // tabs
      // 设置tabs默认值
      labelDefaultValue: '0',
      // 设置tabs列表
      labelList: labelListConfig,
      // 表格
      jordanTableConfig: {
        // 配合拖拽事件使用
        // ellipsis: true,
        // 控制是否可以单选
        // highlightRow:true,
        // 自定义操作列
        renderArr: [
          {
            title: vmI18n.t('table_label.replicationReason'), // 复制原因
            key: 'COPY_REASON',
          },
          {
            title: vmI18n.t('table_label.flag'), // 旗帜
            key: 'ORDER_FLAG',
            // draggable: true,
            render: (h, params) => {
              let imgSrc = '';
              if (!params.row.ORDER_FLAG) {
                imgSrc = require('@/assets/image/img/0.png');
              } else {
                imgSrc = require(`@/assets/image/img/${params.row.ORDER_FLAG}.png`);
              }

              if (!params.row.SELLER_MEMO) {
                return h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      'align-items': 'center',
                    },
                  },
                  [
                    h('img', {
                      attrs: {
                        src: imgSrc,
                      },
                      style: {
                        width: '14px',
                        height: 'auto',
                        cursor: 'pointer',
                      },
                      on: {
                        click: () => {
                          // "是否确认修改备注！"
                          const self = this;
                          self.publicBouncedConfig = Object.assign(
                            publicDialogConfig.changeRemarkConfig,
                            {
                              componentData: {
                                ids: params.row.ID,
                                status: `${params.row.ORDER_STATUS}`,
                              },
                            }
                          );
                          setTimeout(() => {
                            self.$children
                              .find(item => item.name === 'changeRemark')
                              .openConfirm();
                          }, 100);
                        },
                      },
                    }),
                  ]
                );
              }
              return h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    trigger: 'hover',
                    transfer: true,
                  },
                },
                [
                  h('img', {
                    attrs: {
                      src: imgSrc,
                    },
                    style: {
                      width: '14px',
                      height: 'auto',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        // "是否确认修改备注！"
                        const self = this;
                        self.publicBouncedConfig = Object.assign(
                          publicDialogConfig.changeRemarkConfig,
                          {
                            componentData: {
                              ids: params.row.ID,
                              status: `${params.row.ORDER_STATUS}`,
                              ORDER_FLAG: params.row.ORDER_FLAG,
                              SELLER_MEMO: params.row.SELLER_MEMO,
                            },
                          }
                        );
                        setTimeout(() => {
                          self.$children
                            .find(item => item.name === 'changeRemark')
                            .openConfirm();
                        }, 100);
                      },
                    },
                  }),
                  h(
                    'p',
                    {
                      slot: 'content',
                    },
                    params.row.SELLER_MEMO
                  ),
                ]
              );
            },
          },
          {
            title: vmI18n.t('table_label.orderIdentification'), // 订单标识
            sortable: true,
            // draggable: true,
            align: 'center',
            key: 'ORDER_TAG',
            render: (h, params) => {
              if (params.row.ORDERTAGLIST) {
                params.row.ORDERTAGLIST.forEach((ORDERTAGLISTItem, Index) => {
                  ORDERTAGLISTItem.message = orderLogo[ORDERTAGLISTItem.text];
                });
                return h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      cursor: 'pointer',
                      padding: '6px 8px',
                    },
                  },
                  [
                    params.row.ORDERTAGLIST.forEach(item => h(
                      'Poptip',
                      {
                        props: {
                          placement: 'right',
                          trigger: 'hover',
                          width: '100%',
                          transfer: true,
                        },
                      },
                      [
                        h(
                          'div',
                          {
                            style: {
                              border: `1px solid ${item.clr}`,
                              color: item.clr,
                              fontSize: '10px',
                              borderRadius: '6px',
                              padding: '2px 2px',
                              marginRight: '4px',
                              cursor: 'pointer',
                            },
                          },
                          item.text
                        ),
                        h(
                          'span',
                          {
                            slot: 'content',
                          },
                          item.message
                        ),
                      ]
                    )),
                  ]
                );
              }
            },
          },
          {
            title: vmI18n.t('table_label.platform_orderNo'), // 平台单号
            align: 'center',
            key: 'SOURCE_CODE',
            render: (h, params) => {
              if (params.row.SOURCE_CODE) {
                const arrs = params.row.SOURCE_CODE.split(',');
                const len = arrs.length;
                let sourceCode = '';
                arrs.forEach((item, index) => {
                  sourceCode += item + (index + 1 === len ? '' : ' , ');
                });
                return h('div', [
                  h(
                    'Poptip',
                    {
                      props: {
                        placement: 'bottom',
                        transfer: true,
                        trigger: 'hover',
                      },
                    },
                    [
                      h(
                        'span',
                        {
                          style: {
                            width: '200px',
                            'white-space': 'nowrap',
                            'text-overflow': 'ellipsis',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            color:
                              // eslint-disable-next-line no-nested-ternary
                              params.row.ORDER_STATUS
                                === this.orderStatus.orderCancel
                              || params.row.ORDER_STATUS
                                === this.orderStatus.orderSystemInvalid
                                ? '#c5c5c5'
                                : params.row.SYSREMARK === null
                                  || !params.row.SYSREMARK
                                  ? '#0F8EE9'
                                  : 'red',
                          },
                        },
                        sourceCode
                      ),
                      h(
                        'span',
                        {
                          slot: 'content',
                        },
                        sourceCode
                      ),
                    ]
                  ),
                ]);
              }
            },
          },
          {
            title: vmI18n.t('table_label.shippingAddress'), // 收货地址
            key: 'REGION_RECEIVER_ADDRESS',
            render: (h, params) => h('span', [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    trigger: 'hover',
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        width: '300px',
                        'white-space': 'nowrap',
                        'text-overflow': 'ellipsis',
                        overflow: 'hidden',
                      },
                    },
                    params.row.REGION_RECEIVER_ADDRESS
                  ),
                  h(
                    'span',
                    {
                      slot: 'content',
                    },
                    params.row.REGION_RECEIVER_ADDRESS
                  ),
                ]
              ),
            ]),
          },
          {
            title: vmI18n.t('table_label.goodsInfo'), // 商品信息
            align: 'center',
            width: 610,
            ellipsis: false,
            key: 'QUERYORDERITEMRESULTLIST',
            render: (h, params) => {
              if (
                params.row.QUERYORDERITEMRESULTLIST
                && params.row.QUERYORDERITEMRESULTLIST.length !== 0
              ) {
                const popList = [];
                params.row.QUERYORDERITEMRESULTLIST.forEach((item, index) => {
                  const ecode = item.ecode || vmI18n.t('other.goods'); // 商品
                  const sizes = item.sizes || vmI18n.t('other.sizes'); // 尺寸
                  const clrs = item.clrs || vmI18n.t('other.color'); // 颜色
                  const dataArr = [];
                  let dataMore = this.reaptData(
                    params.row.QUERYORDERITEMRESULTLIST
                  );
                  dataArr.push(item);
                  // BUG  超过6还是会展示...   add  by  wdq 20190612
                  if (index > 2) return;
                  if (index == 2) {
                    dataMore = dataMore.splice(2);
                    popList[2] = {
                      jsonShow: vmI18n.t('other.more'), // 更多
                      data: dataMore,
                    };
                  }
                  popList[index] = {
                    jsonShow: `${ecode} , ${sizes} , ${clrs}`,
                    data: dataArr,
                  };
                });
                // const goodsThead = [
                //   {
                //     key: 'image',
                //     render: (h, params) => {
                //       const imgSrc = params.row.image
                //         ? params.row.image
                //         : require('@/assets/image/img/defaultphoto.png');
                //       return h('div', [
                //         h('img', {
                //           attrs: {
                //             src: imgSrc,
                //           },
                //           style: {
                //             width: '20px',
                //             height: 'auto',
                //             cursor: 'pointer',
                //           },
                //         }),
                //       ]);
                //     },
                //   },
                //   {
                //     render: (h, params) => h('div', [
                //       h(
                //         'span',
                //         `${params.row.ecode},${params.row.sizes},${params.row.clrs}`
                //       ),
                //     ]),
                //   },
                //   {
                //     render: (h, params) => h('span', params.row.price.toFixed(2)),
                //   },
                //   {
                //     key: 'qty',
                //   },
                //   {
                //     render: (h, params) => h('span', params.row.realAmt.toFixed(2)),
                //   },
                //   {
                //     key: 'weight',
                //   },
                // ];
                return h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      'justify-content': 'space-between',
                    },
                  },
                  [
                    h(
                      'div',
                      {
                        style: {
                          width: '86%',
                          'padding-bottom': '6px',
                          display: 'flex',
                          'flex-wrap': 'wrap',
                        },
                      },
                      popList.map((item) => {
                        // 缺货标识
                        let lostGoods = false;
                        // 缺货数量
                        const qtyLost = item.data.reduce((cur, next) => {
                          if (next.qtyLost > 0) {
                            lostGoods = false;
                          } else {
                            lostGoods = true;
                          }
                          return cur + next.qtyLost;
                        }, 0);
                        return h(
                          'div',
                          {
                            style: {
                              padding: '6px 4px 0px 4px',
                            },
                          },
                          [
                            h(
                              'div',
                              {
                                style: {
                                  padding: '4px 6px',
                                  border: '1px solid #d3d3d3',
                                  position: 'relative',
                                  marginLeft: '10px',
                                  marginRight: '10px',
                                  background:
                                    item.data[0].refundStatus === 6
                                      ? '#e6e6e6'
                                      : 'none',
                                },
                              },
                              [
                                h('span', {}, item.jsonShow),
                                h(
                                  'div',
                                  {
                                    style: {
                                      'min-width': '16px',
                                      height: '16px',
                                      'line-height': '13px',
                                      border: '1px solid #DCDEE2',
                                      borderRadius: '9px',
                                      backgroundColor: '#84C9E2',
                                      'font-size': '6px',
                                      position: 'absolute',
                                      top: '-6px',
                                      right: '-8px',
                                      zIndex: '1',
                                      color: 'white',
                                    },
                                  },
                                  item.data.reduce(
                                    (cur, next) => cur + next.qty,
                                    0
                                  )
                                ),
                                h(
                                  'div',
                                  {
                                    style: {
                                      'min-width': '16px',
                                      height: '16px',
                                      'line-height': '13px',
                                      border: '1px solid #DCDEE2',
                                      borderRadius: '9px',
                                      backgroundColor: '#fd6442',
                                      'font-size': '6px',
                                      position: 'absolute',
                                      top: '14px',
                                      right: '-8px',
                                      zIndex: '1',
                                      color: 'white',
                                      visibility: lostGoods
                                        ? 'hidden'
                                        : 'visible',
                                    },
                                  },
                                  qtyLost
                                ),
                              ]
                            ),
                          ]
                          // [
                          //   h(
                          //     "Poptip",
                          //     {
                          //       attrs: {
                          //         id: "poptipId"
                          //       },
                          //       props: {
                          //         placement: "bottom",
                          //         trigger: "hover",
                          //         width: "100%",
                          //         transfer: true
                          //       }
                          //     },
                          //     [
                          //       h(
                          //         "div",
                          //         {
                          //           style: {
                          //             padding: "6px 8px",
                          //             border: "1px solid #d3d3d3",
                          //             position: "releative",
                          //             marginLeft: "10px",
                          //             marginRight: "10px"
                          //           }
                          //         },
                          //         item.jsonShow
                          //       ),
                          //       h(
                          //         "div",
                          //         {
                          //           style: {
                          //             width: "15px",
                          //             height: "15px",
                          //             border: "1px solid #DCDEE2",
                          //             borderRadius: "2px",
                          //             borderRadius: "50%",
                          //             backgroundColor: "#84C9E2",
                          //             fontSize: "10px",
                          //             position: "absolute",
                          //             top: "-6px",
                          //             right: "0px",
                          //             zIndex: "1",
                          //             color: "white"
                          //           }
                          //         },
                          //         item.data.reduce((cur, next) => {
                          //           return cur + next.qty;
                          //         }, 0)
                          //       ),
                          //       h("i-table", {
                          //         slot: "content",
                          //         props: {
                          //           "show-header": false,
                          //           "disabled-hover": true,
                          //           "highlight-row": false,
                          //           "no-data-text": "暂无数据",
                          //           columns: goodsThead,
                          //           data: item.data
                          //         }
                          //       })
                          //     ]
                          //   )
                          // ]
                        );
                      })
                    ),
                    h(
                      'div',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          marginLeft: '10px',
                        },
                      },
                      [
                        h(
                          'span',
                          {
                            style: {
                              cursor: 'pointer',
                            },
                            on: {
                              click: () => {
                                const self = this;
                                // self.publicBouncedConfig =
                                //   publicDialogConfig.goodsDetailConfig;
                                // self.$nextTick(function() {
                                //   self.$set(
                                //     self.publicBouncedConfig.componentData,
                                //     "id",
                                //     params.row.ID
                                //   );
                                //   self.$set(
                                //     self.publicBouncedConfig.componentData,
                                //     "ocBorderDtoID",
                                //     params.row.ID
                                //   );
                                //   self.$set(
                                //     self.publicBouncedConfig.componentData,
                                //     "objid",
                                //     [params.row.ID]
                                //   );
                                // });
                                self.publicBouncedConfig = Object.assign(
                                  publicDialogConfig.goodsDetailConfig,
                                  {
                                    componentData: {
                                      id: params.row.ID,
                                      ocBorderDtoID: params.row.ID,
                                      objid: [params.row.ID],
                                      order: params.row,
                                    },
                                  }
                                );

                                setTimeout(() => {
                                  self.$children
                                    .find(item => item.name === 'goodsDetail')
                                    .openConfirm();
                                }, 100);

                                setTimeout(() => {
                                  this.$children
                                    .find(item => item.name === 'goodsDetail')
                                    .$children[0].$children[1].getData();
                                }, 200);
                              },
                            },
                          },
                          self.vmI18n.t('common.details')
                        ),
                        h('i', {
                          class: 'burgeon-icon iconfont iconyoujiantou-copy',
                        }),
                      ]
                    ),
                  ]
                );
              }
            },
          },
          {
            title: self.vmI18n.t('other.systemNotes'), // 系统备注
            key: 'SYSREMARK',
            render: (h, params) => h('span', [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    trigger: 'hover',
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        width: '300px',
                        'white-space': 'nowrap',
                        'text-overflow': 'ellipsis',
                        overflow: 'hidden',
                      },
                    },
                    params.row.SYSREMARK
                  ),
                  h(
                    'span',
                    {
                      slot: 'content',
                    },
                    params.row.SYSREMARK
                  ),
                ]
              ),
            ]),
          },
          {
            title: vmI18n.t('table_label.buyerNickname'), // 买家昵称
            align: 'center',
            key: 'USER_NICK',
            // width: 220,
            ellipsis: true,
            render: (h, params) => {
              if (params.row.PLATFORM === 2) {
                return h('div', [
                  h(
                    'div',
                    {
                      style: {
                        padding: '4px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                      },
                    },
                    [
                      h('p', [
                        h('i', {
                          class:
                            'burgeon-icon iconfont iconjo_wang iconwangwang',
                          style: {
                            fontSize: '14px',
                            color: '#62A2F2',
                            marginRight: '4px',
                          },
                          on: {
                            click: () => {
                              if (params.row.PLATFORM === 2) {
                                window.open(
                                  `https://amos.alicdn.com/getcid.aw?v=3&uid=${params.row.USER_NICK}&charset=utf-8&site=cntaobao&fromid=cntaobao${params.row.CP_C_SHOP_TITLE}`
                                );
                              } else {
                                // console.log("其他平台订单");
                              }
                            },
                          },
                        }),
                        h('span', `${params.row.USER_NICK}`),
                      ]),
                      // h("p", params.row.CP_C_SHOP_TITLE || "")
                    ]
                  ),
                ]);
              }
              return h(
                'div',
                {
                  style: {
                    padding: '4px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                  },
                },
                [
                  h('p', params.row.USER_NICK || ''),
                  // h("p", params.row.CP_C_SHOP_TITLE || "")
                ]
              );
            },
          },
          {
            title: vmI18n.t('table_label.receivingInfo'), // 收货信息
            key: 'JOIN_RECEIVER_ADDRESS',
            align: 'center',
            ellipsis: true,
            render: (h, params) => h('div', [
              h(
                'span',
                {
                  on: {
                    click: () => {
                      const self = this;
                      const param = {
                        ID: params.row.ID,
                        OLDRECEIVERADDRESS: `${params.row.RECEIVER_NAME},${params.row.RECEIVER_MOBILE},${params.row.CP_C_REGION_PROVINCE_ENAME}${params.row.CP_C_REGION_CITY_ENAME}${params.row.CP_C_REGION_AREA_ENAME}${params.row.RECEIVER_ADDRESS}`,
                        BUYER_MESSAGE: params.row.BUYER_MESSAGE,
                        SELLER_MEMO: params.row.SELLER_MEMO,
                        SYSREMARK: params.row.SYSREMARK,
                        CP_C_REGION_PROVINCE_ID:
                            params.row.CP_C_REGION_PROVINCE_ID,
                        CP_C_REGION_CITY_ID: params.row.CP_C_REGION_CITY_ID,
                        CP_C_REGION_AREA_ID: params.row.CP_C_REGION_AREA_ID,
                        RECEIVER_ADDRESS: params.row.RECEIVER_ADDRESS,
                        RECEIVER_NAME: params.row.RECEIVER_NAME,
                        RECEIVER_MOBILE: params.row.RECEIVER_MOBILE,
                        RECEIVER_PHONE: params.row.RECEIVER_PHONE,
                        RECEIVER_ZIP: params.row.RECEIVER_ZIP,
                        CALLBACK: () => {
                          self.getData();
                        },
                      };

                      self.publicBouncedConfig = publicDialogConfig.receivingInformationConfig;
                      self.publicBouncedConfig.componentData = param;
                      setTimeout(() => {
                        self.$children
                          .find(item => item.name === 'resolveAddress')
                          .openConfirm();
                      }, 100);
                    },
                  },
                },
                [
                  h(
                    'div',
                    {
                      style: {
                        padding: '4px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                      },
                    },
                    [
                      h(
                        'p',
                        `${params.row.RECEIVER_NAME},${params.row.RECEIVER_MOBILE},
                            ${params.row.CP_C_REGION_PROVINCE_ENAME}${params.row.CP_C_REGION_CITY_ENAME}${params.row.CP_C_REGION_AREA_ENAME}`
                      ),
                      h('p', `${params.row.RECEIVER_ADDRESS}`),
                    ]
                  ),
                ]
              ),
            ]),
          },
          {
            title: vmI18n.t('table_label.orderTime'), // 下单时间
            key: 'ORDER_DATE',
            render: (h, params) => {
              if (!params.row.ORDER_DATE) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(params.row.ORDER_DATE)
              );
            },
          },
          {
            title: vmI18n.t('table_label.paymentTime'), // 付款时间
            key: 'PAY_TIME',
            render: (h, params) => {
              if (!params.row.PAY_TIME) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(params.row.PAY_TIME)
              );
            },
          },
          {
            title: vmI18n.t('table_label.creationTime'), // 创建时间
            key: 'CREATIONDATE',
            render: (h, params) => {
              if (!params.row.CREATIONDATE) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(params.row.CREATIONDATE)
              );
            },
          },
          {
            title: vmI18n.t('table_label.auditTime'), // 审核时间
            key: 'AUDIT_TIME',
            render: (h, params) => {
              if (!params.row.AUDIT_TIME) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(params.row.AUDIT_TIME)
              );
            },
          },
          {
            title: vmI18n.t('table_label.distributionTime'), // 配货时间
            key: 'DISTRIBUTION_TIME',
            render: (h, params) => {
              if (!params.row.DISTRIBUTION_TIME) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(
                  params.row.DISTRIBUTION_TIME
                )
              );
            },
          },
          {
            title: vmI18n.t('table_label.scanDeliveryTime'),
            key: 'SCAN_TIME',
            render: (h, params) => {
              if (!params.row.SCAN_TIME) {
                return h('span', '');
              }
              return h(
                'span',
                this.standardTimeConversiondateToStr(params.row.SCAN_TIME)
              );
            },
          },
        ],
        // 设置总条数
        total: 0,
        // 条数
        pageSize: 20,
        // 页数
        current: 1,
        // 请求搜索json
        searchObject: {},
        searchMethod: '', // 请求方法
        componentData: {},
        // 加载中
        loading: false,
        // 是否存在操作列
        isShowAction: false,
        // 是否存在序号列
        indexColumn: true,
        // 是否存在多选框
        isShowSelection: true,
        // 是否修改搜索框为select
        isSearchText: true,
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: true, // 控制分页是否显示
        // btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        isShowRefreshBtn: true, // 控制是否显示刷新按钮
        isShowAddDetailBtn: false, // 是否存在新增明细
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowImportBtn: false, // 控制是否显示导入
        isShowExportBtn: false, // 控制是否显示导出
        width: '', // 表格宽度
        height: 440, // 表格高度
        border: false, // 是否显示纵向边框
        pageSizeOpts: [20, 40, 60, 80], // 每页条数切换的配置
        columns: [],
        data: [],
      },
      // 普通搜索
      dropList: [],
      tagList: [
        {
          label: '标签', // 标签字段名称
          column: 'tag', // 标签字段
          trigger: '', // 触发方式
          list: [], // 选项
        },
      ],
      selectValue: [],
      // 表单搜索
      btnsSearch: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            text: vmI18n.t('btn.search'), // 按钮文本
            btnclick: () => {
              this.loadData();
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.empty'), // 按钮文本
            btnclick: () => {
              const _this = this;
              _this.clearFromListValue = true;
              _this.queryInfoData = [];
              _this.labelData = [];
              _this.getHeaderList();
            }, // 按钮点击事件
          },
        ],
      },
      // 列表按钮
      // btnConfig: {
      //   typeAll: "error", //按钮统一风格样式
      //   buttons: []
      // },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [
          {
            text: vmI18n.t('btn.manualCreation'), // 手工创建
          },
          {
            text: vmI18n.t('btn.add'), // 新增
          },
          {
            text: vmI18n.t('btn.audit'), // 审核
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                this.service.orderCenter.auditOrder({
                  ids,
                  type: '1',
                  isCheck: 0,
                })
                // self.$network
                //   .post("/api/cs/oc/oms/v1/auditOrder", {
                //     ids,
                //     type: "1",
                //     isCheck: 0,
                //   })
                  .then((res) => {
                    if (res.data.code === 0) {
                      // self.$Message.success(res.data.message);
                      self.$Modal.success({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                      self.selection = [];
                      self.getData();
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.a6'), // 请选择需要审核的记录！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.deAudit'), // 反审核
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                self.service.orderCenter.auditOrderReserve({ ids, type: '1' })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/auditOrderReserve', {
                //     ids,
                //     type: '1',
                //   })
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.getData();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: this.vmI18n.t('modalTips.a6'), // 请选择需要反审核的记录！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          // {
          //   text: "WMS撤回", //按钮文本
          //   btnclick: () => {
          //     let self = this;
          //     if (self.selection.length > 0) {
          //       self.btnConfig.loading = true;
          //       let ids = [];
          //       self.selection.forEach((item, index) => {
          //         ids[index] = item.ID;
          //       });
          //       axios({
          //         url: "/p/cs/auditingContrary",
          //         method: "post",
          //         cancelToken: true,
          //         data: { ids: ids,  type: '3'}
          //       }).then(function(res) {
          //         if (res.data.code === 0) {
          //           self.selection = [];
          //           self.getData();
          //           self.$Message.success(res.data.message);
          //         } else {
          //           self.$Modal.error({
          //             title: self.vmI18n.t('modalTitle.tips'),//提示,
          //             content: res.data.message,
          //             cancelType: true,
          //             titleAlign: "left",
          //             mask: true,
          //             draggable: true,
          //             keyDown: event => {
          //               if (event.keyCode == 27 || event.keyCode == 13) {
          //                 self.$Modal.remove();
          //               }
          //             }
          //           });
          //         }
          //         self.btnConfig.loading = false;
          //       });
          //     } else {
          //       self.$Message.warning({
          //         content: "请选择需要WMS撤回记录！",
          //         duration: 5,
          //         top: 80
          //       });
          //     }
          //   } //按钮点击事件
          // },
          {
            text: vmI18n.t('btn.deAudit'), // 批量修改
          },
          {
            text: vmI18n.t('btn.batchModify'), // 批量修改物流
          },
          {
            text: vmI18n.t('btn.lostOrder_copy'), // 丢单复制
          },
          {
            text: vmI18n.t('btn.batch_holdOrder'), // 批量Hold单
          },
          {
            text: vmI18n.t('btn.cancelHold'), // 取消Hold
          },
          {
            text: vmI18n.t('btn.invoice_otice'), // 开票通知
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length === 0) {
                self.$Message.warning(self.vmI18n.t('modalTips.a7')); // 请选择需要开票的订单
              } else if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = self.sonList(self.selection, 'ID'); // 选中订单的单据号
                const fromdata = new FormData();
                fromdata.append('param', JSON.stringify({ IDS: ids }));
                self.service.orderCenter.checkAddOrderInvoicing(fromdata)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/checkAddOrderInvoicing', fromdata)
                  .then((res) => {
                    if (res.data.code === 0) {
                      // self.$store.commit('customize/('TabOpen', {
                      //   id: -1,
                      //   type: 'action',
                      //   name: 'invoiceNoticetAdd',
                      //   label: '开票通知编辑',
                      //   query: {
                      //     highSearchData: JSON.stringify({
                      //       type: 'Input',
                      //       queryName: 'ID',
                      //       value: res.data.data.join(),
                      //     }),
                      //     isOrder: 'ture',
                      //     id: -1,
                      //   },
                      // })
                      R3.store.commit('global/tabOpen', {
                        type: 'C',
                        label: self.vmI18n.t('panel_label.billingNoticeEdit'),
                        customizedModuleName: 'INVOICENOTICETADD',
                        customizedModuleId: '-1',
                        query: {
                          highSearchData: JSON.stringify({
                            type: 'Input',
                            queryName: 'ID',
                            value: res.data.data.join(),
                          }),
                          isOrder: 'ture',
                          id: -1,
                        },
                      });
                    } else {
                      self.$Message.warning(res.data.message);
                    }
                    self.btnConfig.loading = false;
                  });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.invoice_otice'), // 记录发票
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length === 1) {
                self.btnConfig.loading = true;
                const id = self.sonList(self.selection, 'ID').join(); // 选中订单的单据号
                const fromdata = new FormData();
                fromdata.append('param', JSON.stringify({ ID: id }));
                self.service.orderCenter.checkRecordInvoicing(fromdata)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/checkRecordInvoicing', fromdata)
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.publicBouncedConfig = Object.assign(
                        publicDialogConfig.makeOutInvoiceConfig,
                        {
                          componentData: res.data.data,
                        }
                      );
                      setTimeout(() => {
                        self.$children
                          .find(item => item.name === 'makeOutInvoice')
                          .openConfirm();
                      }, 100);
                    } else {
                      self.$Message.warning(res.data.message);
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning(self.vmI18n.t('modalTips.a8')); // 请选择一条订单
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.recordInvoice'), // 批量修改仓库
          },
          {
            text: vmI18n.t('btn.batchModify_warehouse'), // 订单取消
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                this.$Modal.info({
                  title: self.vmI18n.t('modalTitle.tips'), // 提示
                  content: self.vmI18n.t('modalTips.e0'), // 是否确定取消订单？
                  mask: true,
                  showCancel: true,
                  okText: self.vmI18n.t('common.determine'), // 取消
                  cancelText: self.vmI18n.t('common.cancel'), // 确定
                  onCancel: () => {
                    self.service.orderCenter.cancelOrder({ ids, type: '1' })
                    // self.$network
                    //   .post('/api/cs/oc/oms/v1/cancelOrder', { ids, type: '1' })
                      .then((res) => {
                        if (res.data.code === 0) {
                          self.$Message.success(res.data.message);
                          self.getData();
                          self.selection = [];
                        } else {
                          self.$Modal.error({
                            title: self.vmI18n.t('modalTitle.tips'), // 提示
                            content: res.data.message,
                            cancelType: true,
                            titleAlign: 'left',
                            mask: true,
                            draggable: true,
                            keyDown: (event) => {
                              if (event.keyCode == 27 || event.keyCode == 13) {
                                self.$Modal.remove();
                              }
                            },
                          });
                        }
                        self.btnConfig.loading = false;
                      });
                  },
                  onOk: () => {
                    self.btnConfig.loading = false;
                  },
                });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.a9'), // 请选择需要取消的订单！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.orderBlocking'), // 订单拦截
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                const param = {
                  ids,
                };
                self.service.orderCenter.orderInterception(param)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/orderInterception', param)
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.getData();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b1'), // 请选择需要拦截的记录！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.manualMarking'), // 手工打标
          },
          // {
          //   text: '定金预售提前发货'
          // },
          {
            text: vmI18n.t('btn.expedited_shipment'), // 加急发货
          },
          {
            text: vmI18n.t('btn.splitOrder'), // 拆分订单
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length === 1) {
                if (
                  (self.selection[0].PLATFORM === 4
                    && self.selection[0].PAY_TYPE === 2)
                  || self.selection[0].PLATFORM === 7
                  || self.selection[0].PLATFORM === 50
                ) {
                  self.$Message.warning({
                    content: self.vmI18n.t('modalTips.b1'), // 交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单
                    duration: 5,
                    top: 80,
                  });
                  return;
                }
                if (
                  self.selection[0].IS_INRETURNING === 1
                  || self.selection[0].IS_INTERECEPT === 1
                ) {
                  self.$Message.warning({
                    content: self.vmI18n.t('modalTips.b2'), // 拦截、退款中的订单不允许拆单！
                    duration: 5,
                    top: 80,
                  });
                  return;
                }
                if (
                  self.selection[0].ORDER_STATUS
                    === self.orderStatus.orderUnconfirmed
                  || self.selection[0].ORDER_STATUS
                    === self.orderStatus.orderOutofstock
                ) {
                  // self.$store.commit('customize/('TabHref', {
                  //   id: self.selection[0].ID,
                  //   type: 'action',
                  //   name: 'splitOrder',
                  //   label: '订单拆分',
                  //   query: {
                  //     id: self.selection[0].ID,
                  //     tabTitle: '订单拆分',
                  //   },
                  // })
                  self.$store.commit('customize/TabHref', {
                    id: self.selection[0].ID,
                    type: 'action',
                    name: 'splitOrder',
                    label: self.vmI18n.t('panel_label.orderSplit'), // 订单拆分
                    query: {
                      id: self.selection[0].ID,
                      tabTitle: self.vmI18n.t('panel_label.orderSplit'), // 订单拆分
                    },
                  });
                } else {
                  self.$Message.warning({
                    content: self.vmI18n.t('modalTips.b3'), // 只允许拆分待审核和缺货状态的订单！
                    duration: 5,
                    top: 80,
                  });
                }
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b4'), // 一次只能对一个订单进行拆分！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          // {
          //   text: "添加赠品", //按钮文本
          //   btnclick: () => {
          //     let self = this;
          //     self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
          //     if (self.selection.length > 0) {
          //       self.btnConfig.loading = true;
          //       let ids = [];
          //       let isAddGit = true;
          //       self.selection.forEach((item, index) => {
          //         ids[index] = item.ID;
          //         if (item.PLATFORM === 50) {
          //           isAddGit = false;
          //         }
          //       });
          //       if (!isAddGit) {
          //         self.$Message.warning({
          //           content: "选择的订单中存在JITX订单, 不允许添加赠品！",
          //           duration: 5,
          //           top: 80
          //         });
          //         return;
          //       }
          //       let param = {
          //         ids: ids
          //       };
          //       axios({
          //         url: "/api/cs/oc/oms/v1/checkGit",
          //         method: "post",
          //         cancelToken: true,
          //         data: param
          //       }).then(function (res) {
          //         if (res.data.code === 0) {
          //           self.publicBouncedConfig =
          //             publicDialogConfig.addGiftsConfig;
          //           self.publicBouncedConfig.componentData = {
          //             objid: ids
          //           };
          //           setTimeout(() => {
          //             self.$children
          //               .find(item => item.name === "addGifts")
          //               .openConfirm();
          //           }, 100);
          //         } else {
          //           self.$Modal.error({
          //             title: self.vmI18n.t('modalTitle.tips'),//提示,
          //             content: res.data.message,
          //             cancelType: true,
          //             titleAlign: "left",
          //             mask: true,
          //             draggable: true,
          //             keyDown: event => {
          //               if (event.keyCode == 27 || event.keyCode == 13) {
          //                 self.$Modal.remove();
          //               }
          //             }
          //           });
          //         }
          //         self.btnConfig.loading = false;
          //       });
          //     } else {
          //       self.$Message.warning({
          //         content: "请选择需要添加赠品的记录！",
          //         duration: 5,
          //         top: 80
          //       });
          //     }
          //   } //按钮点击事件
          // },
          {
            text: vmI18n.t('btn.new_chargeback'), // 新增退单
            // 新增退单跳转页面
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length === 0) {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b5'), // 请选择需要新增退单记录！
                  duration: 5,
                  top: 80,
                });
                return false;
              }
              if (self.selection.length > 1) {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b6'), // 请选择一条记录！
                  duration: 5,
                  top: 80,
                });
                return false;
              }
              if (
                // 已取消，系统作废
                self.selection[0].ORDER_STATUS == 7
                || self.selection[0].ORDER_STATUS == 8
              ) {
                self.$Message.warning({
                  content: `${self.selection[0].ID}${self.vmI18n.t(
                    'modalTips.b7'
                  )}`, // 订单需要生成退换货单的订单状态不能已取消、系统作废！
                  duration: 5,
                  top: 80,
                });
                return false;
              }
              if (
                // “待分配”、“待审核”、“缺货”、“已审核”、“传WMS中”、“配货中
                self.selection[0].ORDER_STATUS == 1 // 待审核
                || self.selection[0].ORDER_STATUS == 2 // 缺货
                || self.selection[0].ORDER_STATUS == 3 // 已审核
                || self.selection[0].ORDER_STATUS == 4 // 配货中
                || self.selection[0].ORDER_STATUS == 50 // 待分配
                || self.selection[0].ORDER_STATUS == 21 // 待传wms
              ) {
                self.$Message.warning({
                  content: `${self.selection[0].ID}${self.vmI18n.t(
                    'modalTips.b8'
                  )}`, // 订单需要发货后才能新增退单!
                  duration: 5,
                  top: 80,
                });
                return false;
              }
              // self.$store.commit('customize/('TabOpen', {
              //   id: -1,
              //   type: 'action',
              //   name: 'returngood',
              //   label: '退换货单新增',
              //   query: {
              //     id: -1,
              //     orderHrefReturnid: self.selection[0].ID,
              //     isOrderHrefReturn: 'order',
              //     tabTitle: '退换货单新增',
              //   },
              // })

              self.$store.commit('customize/TabOpen', {
                id: -1,
                type: 'action',
                name: 'returngood',
                label: vmI18n.t('panel_label.addReturnOrder'), // 退换货单新增
                query: {
                  id: -1,
                  orderHrefReturnid: self.selection[0].ID,
                  isOrderHrefReturn: 'order',
                  tabTitle: vmI18n.t('panel_label.addReturnOrder'), // 退换货单新增
                },
              });
              // self.selection = [];
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.batchModify_remarks'), // 批量修改备注
          },
          // {
          //   text: "工单", //按钮文本
          //   btnclick: () => {} //按钮点击事件
          // },
          {
            text: vmI18n.t('btn.beOut_of_stock'), // 缺货重新占单
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                self.service.orderCenter.queryshortagSearchOrder({ ids })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/queryshortagSearchOrder', { ids })
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.getData();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.b9'),
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.fubaoOut_of_stock'), // 福袋缺货重新占单
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                self.service.orderCenter.queryFortuneBagShortage({ ids })
                // self.$network
                //   .post('/api/cs/oc/oms/v1/queryFortuneBagShortage', { ids })
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.getData();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode == 27 || event.keyCode == 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.c0'), // 请选择需要福袋缺货重新占单的记录！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          // {
          //   text: "复制订单", //按钮文本
          //   btnclick: () => {
          //     let self = this;
          //     self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
          //     if (self.selection.length === 1) {
          //       let query = {
          //         copyOrder: true,
          //         id: self.selection[0].ID
          //       };
          //       self.$store.commit("customize/TabHref", {
          //         id: -1,
          //         type: "action",
          //         name: "orderManageAdd",
          //         label: "零售发货单新增",
          //         query: query
          //       });
          //     } else {
          //       self.$Message.warning({
          //         content: "请选择一条需要复制的订单！",
          //         duration: 5,
          //         top: 80
          //       });
          //     }
          //   } //按钮点击事件
          // },
          {
            text: vmI18n.t('btn.copyOrder'), // 复制订单
          },
          {
            text: vmI18n.t('btn.wrongCopy'), // 错发复制
          },
          {
            text: vmI18n.t('btn.missedCopy'), // 漏发复制
          },
          {
            text: vmI18n.t('btn.giftDelivery_copy'), // 赠品出库复制
          },
          {
            text: vmI18n.t('btn.original_single_null_and_void_copy'), // 原单无效复制
          },
          {
            text: vmI18n.t('btn.note_import'), // 备注导入
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: 'OUT_OF_STOCK_MEMO',
              };
              _this.importTable.confirmTitle = vmI18n.t('btn.note_import');
              _this.$children
                .find(item => item.name === 'importTable')
                .openConfirm();
            }, // 按钮点击事件
          },
          // {
          //   text: "重新分配快递", //按钮文本
          //   btnclick: () => {
          //     this.distributeLogisticsModal = true;
          //   } //按钮点击事件
          // },
          // {
          //   text: "重新分配仓库", //按钮文本
          //   btnclick: () => {
          //     this.distributeWarehouseModal = true;
          //   } //按钮点击事件
          // },
          {
            text: vmI18n.t('btn.changeTo_platformShipment'), // 更改为平台发货
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                const ids = [];
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                });
                const param = {
                  ids,
                };
                self.service.orderCenter.doManualDeliveryOrder(param)
                // self.$network
                //   .post('/api/cs/oc/oms/v1/doManualDeliveryOrder', param)
                  .then((res) => {
                    if (res.data.code === 0) {
                      self.$Message.success(res.data.message);
                      self.getData();
                      self.selection = [];
                    } else {
                      self.$Modal.error({
                        title: self.vmI18n.t('modalTitle.tips'), // 提示,//提示
                        content: res.data.message,
                        cancelType: true,
                        titleAlign: 'left',
                        mask: true,
                        draggable: true,
                        keyDown: (event) => {
                          if (event.keyCode === 27 || event.keyCode === 13) {
                            self.$Modal.remove();
                          }
                        },
                      });
                    }
                    self.btnConfig.loading = false;
                  });
              } else {
                self.$Message.warning({
                  content: selfvmI18n.t('modalTips.c1'), // 请选择需要更改为平台发货的记录!
                  duration: 5,
                  top: 80,
                });
              }
            },
          },
          {
            text: vmI18n.t('btn.batchModifyGoods'), // 批量改商品
          },
          {
            text: vmI18n.t('btn.replaceGoods'), // 替换商品
          },
          {
            text: vmI18n.t('btn.addGift'), // 添加赠品
          },
          {
            text: vmI18n.t('btn.deleteGift'), // 删除赠品
          },
          {
            text: vmI18n.t('btn.batchSplitOrder'), // 批量拆单
          },
          {
            text: vmI18n.t('btn.appointGoods_splitOrder'), // 指定商品拆单
          },
          {
            text: vmI18n.t('btn.out_of_stock_splitOrder'), // 缺货拆单
          },
          {
            text: vmI18n.t('btn.batch_chargeback'), // 批量退单
            btnclick: () => {
              const self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                try {
                  self.checkBatchReturnOrder(self.selection);
                } catch (err) {
                  self.$Message.error(err.message);
                  return;
                }
                self.batchReturnOrderModal = true;
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.c2'), // 请选择需要批量退单的记录！
                  duration: 5,
                  top: 80,
                });
              }
            },
          },
          {
            text: vmI18n.t('btn.release_inventory'), // 释放库存
            btnclick: () => {
              const self = this;
              const ids = [];
              let statusFlag = false;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              if (self.selection.length > 0) {
                self.selection.forEach((item, index) => {
                  ids[index] = item.ID;
                  if (item.ORDER_STATUS != 1) {
                    statusFlag = true;
                  }
                });
                if (statusFlag) {
                  self.$Message.warning({
                    content: self.vmI18n.t('modalTips.c3'), // 选择的订单中存在非待审核订单, 不允许释放库存！
                    duration: 5,
                    top: 80,
                  });
                  return;
                }
                self.btnConfig.loading = true;
                this.$Modal.info({
                  title: self.vmI18n.t('modalTitle.tips'), // 提示,
                  content: self.vmI18n.t('modalTips.c4'), // 是否确定将选择的订单占用的库存释放？
                  mask: true,
                  showCancel: true,
                  okText: self.vmI18n.t('common.determine'), // 取消
                  cancelText: self.vmI18n.t('common.cancel'), // 确定
                  onCancel: () => {
                    self.service.orderCenter.releaseInventory({ ids })
                    // self.$network
                    //   .post('/p/cs/releaseInventory', { ids })
                      .then((res) => {
                        if (res.data.code === 0) {
                          self.$Message.success(res.data.message);
                          self.getData();
                          self.selection = [];
                        } else {
                          self.$Modal.error({
                            title: self.vmI18n.t('modalTitle.tips'), // 提示,
                            content: res.data.message,
                            cancelType: true,
                            titleAlign: 'left',
                            mask: true,
                            draggable: true,
                            keyDown: (event) => {
                              if (
                                event.keyCode === 27
                                || event.keyCode === 13
                              ) {
                                self.$Modal.remove();
                              }
                            },
                          });
                        }
                        self.btnConfig.loading = false;
                      });
                  },
                  onOk: () => {
                    self.btnConfig.loading = false;
                  },
                });
              } else {
                self.$Message.warning({
                  content: self.vmI18n.t('modalTips.c'), // 请选择需要库存释放的订单！
                  duration: 5,
                  top: 80,
                });
              }
            }, // 按钮点击事件
          },
          {
            text: vmI18n.t('btn.mergeOrders'), // 合并订单
            btnclick: () => {
              this.mergeOrder();
            },
          },
          {
            text: vmI18n.t('btn.cancel_mergeOrders'), // 取消合并订单
            btnclick: () => {
              this.cancelMergeOrder();
            },
          },
          {
            text: vmI18n.t('btn.export'), // 导入
          },
          {
            text: vmI18n.t('btn.import'), // 导出
            btnclick: () => {
              this.exportClick();
            }, // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_setup', // 按钮图标
            btnclick: () => {
              const self = this;
              if (self.iconDownIcon === 'iconfont iconbj_down') {
                self.iconDownIcon = 'iconfont iconbj_up';
              } else {
                self.iconDownIcon = 'iconfont iconbj_down';
              }
              self.isShowSeniorOrOrdinary = true;
              self.publicBouncedConfig = {
                ...publicDialogConfig.dropSortConfig,
              };
              setTimeout(() => {
                self.$children
                  .find(item => item.name === 'setFromDrag')
                  .openConfirm();
              }, 100);
            }, // 按钮点击事件
          },
          {
            icon: 'iconfont iconbj_col', // 收藏图标
            name: vmI18n.t('btn.collection'),
            btnclick: () => {
              const self = this;
              self.setFavorite();
            }, // 按钮点击事件
          },
        ],
      },
      batchReturnFormConfig: {
        formValue: {
          IS_BACK: false,
        },
        formData: [
          {
            style: 'checkbox', // 勾选框类型
            label: vmI18n.t('btn.Whether_returned'), // 前面的文字
            value: 'IS_BACK', // 输入框的值
            width: '6', // 所占的宽度
            checked: false, // 是否勾选控制
          },
        ],
      },
      // 高级搜索表单
      formConfig: {
        formValue: {},
        formData: [],
      },
      // 状态枚举
      orderStatus: {
        orderUnconfirmed: 1, // 待审核
        waitDistribution: 50, // 待分配
        audited: 3, // 已审核
        waitSendWMS: 21, // 待传wms
        distributioning: 4, // 配货中
        orderOutofstock: 2, // 缺货
        orderCancel: 7, // 已取消
        orderSystemInvalid: 8, // 系统作废
      },
      formValObj: {},
      isExport: false,
    };
  },
  activated() {
    // 获取默认数据
    this.jordanTableConfig.current = 1;
    // this.selection = [];
    // this.getData();
  },
  mounted() {
    // 获取普通搜索的标签数据
    // this.getSearchData();
    // 获取from数据
    // this.getFromData();
    this.getHeaderList();
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'orderManager');
    });

    // // 获取默认数据
    // 计算高度
    const self = this;
    self.setTableHeight();
  },
  methods: {
    onSortChanged(val) {
      const obj = {
        key: val[0].colId,
        value: val[0].sort == 'asc',
      };
      this.getData();
    },
    dropDownClickChange(val) {
      const self = this;
      if (val !== '新增') {
        self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      }
      // eslint-disable-next-line default-case
      switch (val) {
        case '新增': {
          R3.store.commit('global/tabOpen', {
            type: 'C',
            label: vmI18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
            customizedModuleName: 'orderManageAdd',
            customizedModuleId: '-1',
          });
          break;
        }
        case '丢单复制': {
          this.copyRouteChange(val);
          break;
        }
        case '导入': {
          self.importTable.componentData = { tableName: 'OC_B_ORDER' };
          self.$children
            .find(item => item.name === 'importTable')
            .openConfirm();
          break;
        }
        case '批量修改物流': {
          if (self.selection.length > 0) {
            self.btnConfig.loading = true;
            const ids = [];
            const CP_C_PHY_WAREHOUSE_ID = [];
            self.selection.forEach((item, index) => {
              ids[index] = item.ID;
              CP_C_PHY_WAREHOUSE_ID[index] = item.CP_C_PHY_WAREHOUSE_ID;
            });
            const fromdata = new FormData();
            fromdata.append('ids', ids);
            self.service.orderCenter.checkOrderBeforeLogistics(fromdata)
            // self.$network
            //   .post('/api/cs/oc/oms/v1/checkOrderBeforeLogistics', fromdata)
              .then((res) => {
                if (res.data.code === 0) {
                  self.publicBouncedConfig = publicDialogConfig.modifyLogisticsConfig;
                  self.publicBouncedConfig.componentData = {
                    ids,
                    cLogisticsId: 0,
                    platform: self.selection[0].PLATFORM,
                    CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID[0],
                  };
                  setTimeout(() => {
                    self.$children
                      .find(item => item.name === 'modifyLogistics')
                      .openConfirm();
                  }, 100);
                } else {
                  self.$Modal.error({
                    title: self.vmI18n.t('modalTitle.tips'), // 提示,
                    content: res.data.message,
                    cancelType: true,
                    titleAlign: 'left',
                    mask: true,
                    draggable: true,
                    keyDown: (event) => {
                      if (event.keyCode == 27 || event.keyCode == 13) {
                        self.$Modal.remove();
                      }
                    },
                  });
                }
                self.btnConfig.loading = false;
              });
          } else {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.c6'), // 请选择需要修改物流记录！
              duration: 5,
              top: 80,
            });
          }
          break;
        }
        case '批量修改仓库': {
          if (self.selection.length > 0) {
            self.btnConfig.loading = true;
            const ids = [];
            const CP_C_SHOP_ID = [];
            self.selection.forEach((item, index) => {
              ids[index] = item.ID;
              CP_C_SHOP_ID[index] = item.CP_C_SHOP_ID;
            });
            const fromdata = new FormData();
            fromdata.append('ids', ids);
            self.service.orderCenter.checkOrderBeforeWarehouse(fromdata)
            // self.$network
            //   .post('/api/cs/oc/oms/v1/checkOrderBeforeWarehouse', fromdata)
              .then((res) => {
                if (res.data.code === 0) {
                  self.publicBouncedConfig = publicDialogConfig.changeWarehouseConfig;
                  self.publicBouncedConfig.componentData = {
                    ids,
                    CP_C_SHOP_ID: CP_C_SHOP_ID[0],
                  };
                  setTimeout(() => {
                    self.$children
                      .find(item => item.name === 'changeWarehouse')
                      .openConfirm();
                  }, 100);
                } else {
                  self.$Modal.error({
                    title: self.vmI18n.t('modalTitle.tips'), // 提示,
                    content: res.data.message,
                    cancelType: true,
                    titleAlign: 'left',
                    mask: true,
                    draggable: true,
                    keyDown: (event) => {
                      if (event.keyCode == 27 || event.keyCode == 13) {
                        self.$Modal.remove();
                      }
                    },
                  });
                }
                self.btnConfig.loading = false;
              });
          } else {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.c7'), // 请选择需要修改发货仓库记录！
              duration: 5,
              top: 80,
            });
          }
          break;
        }
        case '批量修改备注': {
          if (self.selection.length > 0) {
            const ids = [];
            const ORDER_STATUS = [];
            self.selection.forEach((item, index) => {
              ids[index] = item.ID;
              ORDER_STATUS[index] = item.ORDER_STATUS;
            });
            self.publicBouncedConfig = publicDialogConfig.changeRemarkConfig;
            self.publicBouncedConfig.componentData = {
              ids,
              status: ORDER_STATUS,
            };
            setTimeout(() => {
              self.$children
                .find(item => item.name === 'changeRemark')
                .openConfirm();
            }, 100);
          } else {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.c8'), // 请选择需要修改备注的记录！
              duration: 5,
              top: 80,
            });
          }
          break;
        }
        case '定金预售提前发货': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.c9'), // 请选择需要定金预售提前发货的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          const ids = self.selection.map(item => item.ID);
          const publicBouncedConfig = JSON.parse(
            JSON.stringify(publicDialogConfig.depositPresaleConfig)
          );
          publicBouncedConfig.componentData = {
            params: {
              ids,
            },
            pageType: 'deposit',
          };
          self.publicBouncedConfig = publicBouncedConfig;
          this.$nextTick(() => {
            self.$children
              .find(item => item.name === 'manualMarking')
              .openConfirm();
          });
          break;
        }
        case '加急发货': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d0'), // 请选择需要加急发货的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          const ids = self.selection.map(item => item.ID);
          const publicBouncedConfig = JSON.parse(
            JSON.stringify(publicDialogConfig.vipSpeedDispatchConfig)
          );
          publicBouncedConfig.componentData = {
            params: {
              ids,
            },
            pageType: 'vip',
          };
          self.publicBouncedConfig = publicBouncedConfig;
          this.$nextTick(() => {
            self.$children
              .find(item => item.name === 'manualMarking')
              .openConfirm();
          });
          break;
        }
        case '替换商品': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d1'), // 请选择需要替换赠品的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          self.publicBouncedConfig = publicDialogConfig.replaceConfig;
          // 表单筛选条件
          const param = {};
          param.page = {};
          param.page.pageSize = self.jordanTableConfig.pageSize;
          param.page.pageNum = self.jordanTableConfig.current;
          param.label = self.labelData; // 标签
          param.queryInfo = self.queryInfoData; // 普通搜索
          param.status = self.statusData;
          param.highSearch = self.highSearchData;
          // 列表勾选数据
          const ids = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
          });

          self.publicBouncedConfig.componentData.a_1 = param;
          self.publicBouncedConfig.componentData.a_2 = ids;
          setTimeout(() => {
            self.$children
              .find(item => item.name === 'replaceTheGoods')
              .openConfirm();
          }, 100);
          break;
        }
        case '添加赠品': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d2'), // 请选择需要添加赠品的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          self.publicBouncedConfig = publicDialogConfig.pushProduceConfig;
          // 表单筛选条件
          const param = {
            page: {
              pageSize: self.jordanTableConfig.pageSize,
              pageNum: self.jordanTableConfig.current,
            },
            label: self.labelData, // 标签
            queryInfo: self.queryInfoData, // 普通搜索
            status: self.statusData,
            highSearch: self.highSearchData,
          };
          // 列表勾选数据
          const ids = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
          });
          self.publicBouncedConfig.componentData = {
            a_1: param,
            a_2: ids,
          };
          setTimeout(() => {
            self.$children
              .find(item => item.name === 'pushProduce')
              .openConfirm();
          }, 100);
          break;
        }
        case '删除赠品': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d3'), // 请选择需要删除赠品的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          self.publicBouncedConfig = publicDialogConfig.itemDeleteConfig;
          // 表单筛选条件
          const param = {
            page: {
              pageSize: self.jordanTableConfig.pageSize,
              pageNum: self.jordanTableConfig.current,
            },
            label: self.labelData, // 标签
            queryInfo: self.queryInfoData, // 普通搜索
            status: self.statusData,
            highSearch: self.highSearchData,
          };

          // 列表勾选数据
          const ids = [];
          self.selection.forEach((item, index) => {
            ids[index] = item.ID;
          });
          self.publicBouncedConfig.componentData = {
            a_1: param,
            a_2: ids,
          };
          setTimeout(() => {
            self.$children
              .find(item => item.name === 'itemDelete')
              .openConfirm();
          }, 100);
          break;
        }
        case '指定商品拆单': {
          this.sgto();
          break;
        }
        case '缺货拆单': {
          if (self.selection.length > 0) {
            // self.btnConfig.loading = true;
            const ids = [];
            this.pageLoad = true;
            self.selection.forEach((item, index) => {
              ids[index] = item.ID;
              if (item.PLATFORM === 50) {
                isAddGit = false;
              }
            });
            this.service.orderCenter.splitOrder({ ids })
            // this.$network
            //   .post('/api/cs/oc/oms/v1/splitOrder', { ids })
              .then((res) => {
                console.log(res);
                this.pageLoad = false;
                if (res.data.code == 0) {
                  self.$Message.success(res.data.message);
                  self.selection = [];
                  self.getData();
                } else {
                  self.$Message.error(res.data.message);
                }
              });
          } else {
            this.pageLoad = false;
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d4'), // 请选择需要拆单的记录！
              duration: 5,
              top: 80,
            });
          }
          break;
        }
        case '错发复制': {
          this.copyRouteChange(val);
          break;
        }
        case '漏发复制': {
          this.copyRouteChange(val);
          break;
        }
        case '赠品出库复制': {
          this.copyRouteChange(val);
          break;
        }
        case '原单无效复制': {
          this.copyRouteChange(val);
          break;
        }
        case '批量Hold单': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.e2'), // 请选择需要Hold单的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          const ids = self.selection.map(item => item.ID);
          const publicBouncedConfig = JSON.parse(
            JSON.stringify(publicDialogConfig.holdOrderConfig)
          );
          publicBouncedConfig.componentData = {
            ids,
          };
          self.publicBouncedConfig = publicBouncedConfig;
          this.$nextTick(() => {
            self.$children
              .find(item => item.name === 'holdOrderDialog')
              .openConfirm();
          });
          break;
        }
        case '取消Hold': {
          if (self.selection.length === 0) {
            self.$Message.warning({
              content: self.vmI18n.t('modalTips.d5'), // 请选择需要取消Hold单的记录！
              duration: 5,
              top: 80,
            });
            return;
          }
          const data = {
            ids: self.selection.map(item => item.ID),
          };
          this.$Modal.info({
            title: self.vmI18n.t('modalTitle.tips'), // 提示,
            content: self.vmI18n.t('modalTips.e1'), // 是否确定取消Hold？
            mask: true,
            showCancel: true,
            okText: self.vmI18n.t('common.determine'), // 取消
            cancelText: self.vmI18n.t('common.cancel'), // 确定
            onCancel: () => {
              self.btnConfig.loading = true;
              self.service.orderCenter.manualUnHoldOrder(data)
              // self.$network
              //   .post('/api/cs/oc/oms/v1/manualUnHoldOrder', data)
                .then((res) => {
                  self.btnConfig.loading = false;
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                })
                .catch(() => {
                  self.$Message.error(self.vmI18n.t('modalTips.6')); // 服务器请求失败
                  self.btnConfig.loading = false;
                });
            },
          });
          break;
        }
      }
    },
    // 丢单复制、错发复制、漏发复制、赠品出库复制
    copyRouteChange(type) {
      const self = this;
      if (!self.selection.length) {
        // 请先选择需要复制的订单
        self.$Message.warning(this.vmI18n.t('modalTips.a1'));
        return;
      }
      const selectItem = self.selection[0];
      const ORDERSTATUSNAME = selectItem.ORDERSTATUSNAME;
      if (self.selection.length === 1) {
        if (selectItem.COPY_REASON) {
          // 订单只能是原单才能复制
          self.$Message.warning(this.vmI18n.t('modalTips.a2'));

          return;
        }
        // 原单无效复制
        if (type === this.vmI18n.t('btn.original_single_null_and_void_copy')) {
          // 已取消
          if (ORDERSTATUSNAME !== this.vmI18n.t('btn.cancel')) {
            // 非已取消订单，不允许复制
            self.$Message.error(this.vmI18n.t('modalTips.a3'));
            return;
          }
          // 仓库发货
          // 平台发货
        } else if (
          ORDERSTATUSNAME
          !== (this.vmI18n.t('other.warehouseDelivery')
            && this.vmI18n.t('other.platformDelivery'))
        ) {
          // 只能对【仓库发货，平台发货】订单状态的原单进行复制操作
          self.$Message.error(this.vmI18n.t('modalTips.a4'));
          return;
        }
        // 默认是丢单复制的query
        const query = {
          id: selectItem.ID,
          pageTitle: type,
        };
        // 丢单复制
        if (type === this.vmI18n.t('btn.lostOrder_copy')) {
          query.orderCopy = true;
        } else {
          query.copyOrder = true;
        }
        // self.$store.commit('customize/('TabHref', {
        //   id: -1,
        //   type: 'action',
        //   name: 'orderManageAdd',
        //   label: '零售发货单新增',
        //   query: query,
        // })
        R3.store.commit('global/tabOpen', {
          type: 'C',
          label: vmI18n.t('panel_label.add_retail_shipping_order'), // 零售发货单新增
          customizedModuleName: 'ORDERMANAGEADD',
          customizedModuleId: '-1',
        });
      } else {
        self.$Message.warning({
          content: this.vmI18n.t('modalTips.a5'), // 请选择一条需要复制的订单！
          duration: 5,
          top: 80,
        });
      }
    },
    // 指定商品拆单
    sgto() {
      {
        const self = this;
        // 表单筛选条件
        const param = {
          page: {
            pageSize: self.jordanTableConfig.pageSize,
            pageNum: self.jordanTableConfig.current,
          },
          label: self.labelData, // 标签
          queryInfo: self.queryInfoData, // 普通搜索
          status: self.statusData,
          highSearch: self.highSearchData,
        };
        // 列表勾选数据
        // if (self.selection.length == 0) {
        //   self.$Message.warning('请原则需要拆单商品!');
        //   return;
        // }
        const ids = [];
        self.selection.forEach((item, index) => {
          ids[index] = item.ID;
        });
        // self.publicBouncedConfig.componentData = {
        //   a_1: param,
        //   a_2: ids
        // };
        self.publicBouncedConfig = publicDialogConfig.specifyGoodsAssignConfig;
        self.publicBouncedConfig.componentData.a_1 = param;
        self.publicBouncedConfig.componentData.a_2 = ids;
        // self.publicBouncedConfig.componentData = {
        //       objid: ids
        //     };
        setTimeout(() => {
          self.$children
            .find(item => item.name === 'specifyGoodsAssign')
            .openConfirm();
        }, 100);
      }
    },
    // 合并订单
    mergeOrder() {
      const self = this;
      let message = '';
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      const selectionLength = self.selection.length;
      if (selectionLength === 0) {
        self.$Message.warning({
          content: self.vmI18n.t('modalTips.d7'), // 请选择要合并的单据！
          duration: 5,
          top: 80,
        });
        return;
      }
      for (const item of self.selection) {
        if (
          // 待审核  已审核
          item.ORDERSTATUSNAME !== ('待审核' && '已审核')
        ) {
          // 要合并的单据的订单状态只能为待审核或已审核
          message = self.vmI18n.t('modalTips.e7');
          break;
        } else if (item.PAYTYPENAME === '货到付款') {
          // 要合并的单据的付款方式只能为非货到付款
          message = self.vmI18n.t('modalTips.e8');
          break;
        } else if (item.RESERVE_VARCHAR03_NAME !== '非预售') {
          // 要合并的单据的预售状态只能为非预售
          message = self.vmI18n.t('modalTips.e9');
          break;
        } else if (item.CP_C_PHY_WAREHOUSE_ENAME === '') {
          // 要合并的单据的发货仓库只能为非空
          message = self.vmI18n.t('modalTips.f0');
          break;
        }
      }
      if (message.length !== 0) {
        self.$Message.warning({
          content: message,
          duration: 5,
          top: 80,
        });
        return;
      }
      const fromdata = new FormData();
      const param = {
        tableid: self.$route.query.id,
        ids: self.selection.map(val => val.ID),
        menu: '合并订单',
      };
      fromdata.append('param', JSON.stringify(param));
      self.pageLoad = true;
      self.service.orderCenter.mergeOrderOne(fromdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/mergeOrderOne', formdata)
        .then((res) => {
          self.pageLoad = false;
          if (res.data.code === 0) {
            // 合并订单成功
            self.$Message.success(
              res.data.message || self.vmI18n.t('modalTips.f1')
            );
            self.getData();
            self.selection = [];
          } else {
            // 合并订单失败
            self.$Message.error(
              res.data.message || self.vmI18n.t('modalTips.f2')
            );
          }
        })
        .catch(() => {
          self.pageLoad = false;
        });
    },
    // 取消合并订单
    cancelMergeOrder() {
      const self = this;
      const message = '';
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      if (self.selection.length === 0) {
        // 请选择需要操作的单据！
        this.$Message.warning(self.vmI18n.t('modalTips.d8'));
        return;
      }
      for (const item of self.selection) {
        if (!['缺货', '待审核', '已审核'].includes(item.ORDERSTATUSNAME)) {
          // 当前状态异常，不允许操作！
          this.$Message.warning(this.vmI18n.t('modalTips.d9'));
          return;
        }
      }
      const fromdata = new FormData();
      const param = {
        tableid: self.$route.query.id,
        ids: self.selection.map(val => val.ID),
        menu: '取消合并订单',
      };
      fromdata.append('param', JSON.stringify(param));
      self.pageLoad = true;
      self.service.orderCenter.cancelMergeOrder(fromdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/cancelMergeOrder', formdata)
        .then((res) => {
          self.pageLoad = false;
          if (res.data.code === 0) {
            // 取消合并订单成功
            self.$Message.success(
              res.data.message || self.vmI18n.t('modalTips.f3')
            );
            self.getData();
            self.selection = [];
          } else {
            // 取消合并订单失败
            self.$Message.error(
              res.data.message || self.vmI18n.t('modalTips.f4')
            );
          }
        })
        .catch(() => {
          self.pageLoad = false;
        });
    },
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      // 清除高级搜索
      _this.formConfig.formValue = {
        ID: '',
        SOURCE_CODE: '',
        EXPRESSCODE: '',
        RECEIVER_NAME: '',
        RECEIVER_MOBILE: '',
        BUYER_MESSAGE: '',
        PS_C_SKU_ECODE: '',
        SELLER_MEMO: '',
        QTY_ALL: {
          value1: '',
          value2: '',
        },
        BILL_NO: '',
        USER_NICK: '',
        ORDER_AMT: {
          value1: '',
          value2: '',
        },
        PS_C_PRO_ECODE: '', // 商品款号
      };
      const fromdata = new FormData();
      const params = {
        table: 'OC_B_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0,
      };
      fromdata.append('param', JSON.stringify(params));
      _this.jordanTableConfig.loading = true;
      _this.service.orderCenter.getSeniorQueryCondition(fromdata)
      // _this.$network
      //   .post('/api/cs/oc/oms/v1/getSeniorQueryCondition', fromdata)
        .then((res) => {
          // 高级查询
          const formData = [];
          if (res.data.data) {
            res.data.data.highSearch.forEach((item, index) => {
              if (item.type === 'date') {
                formData[index] = {
                  style: item.tabth.isfilter ? 'date' : '', // 输入框类型
                  type: 'datetimerange', // 文本框类型的input
                  label: item.tabth.name, // 输入框前文字
                  value: item.tabth.colname, // 输入框的值
                  // format: "yyyy-MM-dd hh:mm:ss",
                  width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                  icon: 'md-alarm', // 输入框后带的图标,暂只有输入框支持
                  placeholder: '', // 占位文本，默认为请输入
                  ghost: false, // 是否关闭幽灵按钮，默认开启
                  inputenter: () => {
                    _this.loadData();
                  }, // 表单回车事件
                  iconclick: () => {}, // 点击icon图标事件
                  clearable: true,
                };
                _this.formConfig.formValue[item.tabth.colname] = [];
              }
              if (item.type === 'propInput') {
                formData[index] = {
                  style: item.tabth.isfilter ? 'popInput' : '', // 输入框弹框单多选
                  width: '6',
                  itemdata: {
                    col: 1,
                    colid: item.tabth.colid,
                    colname: item.tabth.colname, // 当前字段的名称
                    datelimit: 'all',
                    display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                    fkdisplay: item.tabth.fkdisplay, // 外键关联类型
                    fkdesc: item.tabth.fkdesc,
                    inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                    isfk: true, // 是否有fk键
                    isnotnull: false, // 是否必填
                    isuppercase: false, // 是否转大写
                    length: 65535, // 最大长度是多少
                    name: item.tabth.name, // input前面显示的lable值
                    readonly: false, // 是否可编辑，对应input   readonly属性
                    reftable: item.tabth.reftable,
                    reftableid: item.tabth.reftableid,
                    row: 1,
                    statsize: -1,
                    type: item.tabth.type, // 这个是后台用的
                    valuedata: '', // 这个是选择的值
                  },
                };
                if (item.tabth.precolnameslist) {
                  formData[index].itemdata.precolnameslist = item.tabth
                    .precolnameslist
                    ? item.tabth.precolnameslist
                    : [];
                }
              }
              if (item.type === 'text') {
                formData[index] = {
                  style: item.tabth.isfilter ? 'input' : '', // 输入框类型
                  label: item.tabth.name, // 输入框前文字
                  value: item.tabth.colname, // 输入框的值
                  width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                  icon: '', // 输入框后带的图标,暂只有输入框支持
                  clearable: true,
                  placeholder: '', // 占位文本，默认为请输入
                  ghost: false, // 是否关闭幽灵按钮，默认开启
                  inputenter: () => {
                    _this.loadData();
                  }, // 表单回车事件
                  iconclick: () => {}, // 点击icon图标事件
                };
                _this.formConfig.formValue[item.tabth.colname] = '';
              }
              if (item.type === 'number') {
                formData[index] = {
                  // style: item.tabth.isfilter ? "input" : "", //输入框类型
                  style: item.tabth.isfilter ? 'bothInput' : '', // 输入框类型
                  label: item.tabth.name, // 输入框前文字
                  value: item.tabth.colname, // 输入框的值
                  clearable: true,
                  regx: _this.determineTheRegular(item.tabth.colname),
                  width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                  icon: '', // 输入框后带的图标,暂只有输入框支持
                  placeholder: '', // 占位文本，默认为请输入
                  ghost: false, // 是否关闭幽灵按钮，默认开启
                  inputenter: () => {
                    _this.loadData();
                  }, // 表单回车事件
                  iconclick: () => {}, // 点击icon图标事件
                };
                _this.formConfig.formValue[item.tabth.colname] = {
                  value1: '', // 第一个数字框绑定的值
                  value2: '', // 第二个数字框绑定的值
                };
              }
              if (item.type === 'select') {
                formData[index] = {
                  style: item.tabth.isfilter ? 'select' : '', // 下拉框类型
                  label: item.tabth.name, // 下拉框前的值
                  width: '6', // 所占宽度宽度
                  placeholder: '', // 占位文本，默认为请输入
                  value: item.tabth.colname, // 输入框的值
                  multiple: true, // 布尔值,下拉框是否开启多选,默认为不开启
                  selectChange: () => {}, // 选中事件，默认返回选中的值
                  options: _this.converSelect(item.tabth.combobox),
                };
                _this.formConfig.formValue[item.tabth.colname] = [];
              }
            });
            _this.formConfig.formData = formData;
            const arr = [];
            res.data.data.tableHeader.forEach((item) => {
              const obj = {};
              obj.headerName = item.title;
              obj.field = item.key;
              arr.push(obj);
            });
            _this.agTableConfig.columnDefs = arr;
            _this.jordanTableConfig.loading = false;
            if (this.$route.query.type === 'workID') {
              this.searchMethod('workID');
              this.selectValue = [];
            } else {
              this.searchMethod();
            }

            // 下拉数据 定义
            const dropList = [];
            res.data.data.queryInfo.forEach((item, index) => {
              if (item.type === 'Select') {
                dropList[index] = {
                  label: item.displayName, // 字段名称
                  column: item.queryName, // 字段
                  placeholder: '', // 占位文本
                  type: item.type === 'date' ? 'DatePicker' : item.type, // 类型
                  componentAttribute: {
                    multiple: true,
                    'label-in-value': true,
                  }, // 组件属性
                  list: item.list, // 选项
                  value: '', // 选中值
                };
              } else if (item.type === 'DropDownSelectFilter') {
                dropList[index] = {
                  label: item.displayName, // 字段名称
                  column: item.queryName, // 字段
                  placeholder: '', // 占位文本
                  type: item.type, // 类型 item.type
                  value: '',
                  componentAttribute: {
                    totalRowCount: 0,
                    single: false, // 是否是单选
                    data: {
                      start: 0,
                      tabth: [],
                      row: [],
                    },
                    pageSize: 10,
                    AutoData: [],
                  }, // 组件属性
                  componentEvent: {
                    'on-popper-show': (e) => {
                      const self = this;
                      let premtype = '';
                      if (item.selectTab.tabth.name === '店铺') {
                        premtype = 'CP_C_SHOP_PERMISSION_ID';
                      } else if (item.selectTab.tabth.name === '发货仓库') {
                        premtype = 'CP_C_WAREHOUSE_ID';
                      }
                      const params = {
                        isdroplistsearch: true,
                        refcolid: item.selectTab.tabth.colid,
                        fixedcolumns: {},
                        startindex: 0,
                        range: 10,
                        precolnameslist: [
                          {
                            iswrite: 'false',
                            refcol: 'ID',
                            premtype,
                          },
                        ],
                      };
                      const data = new URLSearchParams();
                      data.append('searchdata', JSON.stringify(params));
                      self.service.orderCenter.QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                        .then((res) => {
                          dropList[index].componentAttribute.data = res.data.datas;
                          dropList[index].componentAttribute.totalRowCount = res.data.datas.totalRowCount;
                        });
                    },
                    'on-page-change': (e) => {
                      const self = this;
                      let premtype = '';
                      if (item.selectTab.tabth.name === '店铺') {
                        premtype = 'CP_C_SHOP_PERMISSION_ID';
                      } else if (item.selectTab.tabth.name === '发货仓库') {
                        premtype = 'CP_C_WAREHOUSE_ID';
                      }
                      const params = {
                        isdroplistsearch: true,
                        refcolid: item.selectTab.tabth.colid,
                        fixedcolumns: {},
                        startindex: (e - 1) * 10,
                        range: 10,
                        precolnameslist: [
                          {
                            iswrite: 'false',
                            refcol: 'ID',
                            premtype,
                          },
                        ],
                      };
                      const data = new URLSearchParams();
                      data.append('searchdata', JSON.stringify(params));
                      self.service.orderCenter.QueryList(data)
                      // self.$network
                      //   .post('/p/cs/QueryList', data)
                        .then((res) => {
                          dropList[index].componentAttribute.data = res.data.datas;
                          dropList[index].componentAttribute.totalRowCount = res.data.datas.totalRowCount;
                        });
                    },
                  },
                };
              } else {
                dropList[index] = {
                  label: item.displayName, // 字段名称
                  column: item.queryName, // 字段
                  placeholder: '', // 占位文本
                  type: item.type === 'date' ? 'DatePicker' : item.type, // 类型
                  componentAttribute:
                    item.type === 'date'
                      ? {
                        type: 'datetimerange',
                        value: _this.getCurrentTime(), // ["2018-09-07 09:09:09","2018-09-07 09:09:10"]
                        isEmitOnChange: true,
                      }
                      : {}, // 组件属性
                  componentEvent: {
                    'on-enter': () => {
                      setTimeout(() => {
                        _this.searchMethod();
                      }, 100);
                    },
                  }, // 组件事件
                  list: item.list, // 选项
                  value: '', // 选中值
                };
              }
              if (item.queryName === 'PAY_TIME') {
                dropList[index].value = `${_this.getCurrentTime()[0]}~${
                  _this.getCurrentTime()[1]
                }`;
                if (_this.selectValue.length === 0) {
                  _this.selectValue.push(dropList[index]);
                }
              }
            });
            _this.dropList = dropList;
            // 标签数据 定义
            const tagList = [];
            res.data.data.label.forEach((item, index) => {
              tagList[index] = {
                label: item.text,
                value: `${item.val}`,
                key: item.key,
                sort: item.sort,
                trigger: 'click',
              };
            });
            _this.tagList[0].list = tagList;
            _this.setSearchOption();
          }
        });
    },
    // 展开 并获取from页面数据
    shutDownOrbounceOff() {
      const self = this;
      self.isShowFromLoading = true;
      if (self.iconDownIcon === 'iconfont iconbj_down') {
        // 打开高级搜索
        self.iconDownIcon = 'iconfont iconbj_up';
        self.labelData = [];
        self.queryInfoData = [];
        self.clearFromListValue = true;
        self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
      } else {
        // 关闭高级搜索
        self.clearFromListValue = false;
        self.iconDownIcon = 'iconfont iconbj_down';
        self.highSearchData = [];
        self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
        // 设置普通搜索默认选项
        self.setSearchOption();
      }
      self.isShowFromLoading = false;
      self.getHeaderList();

      // self.getData();
    },
    // 设置普通搜索默认选项
    setSearchOption() {
      // TODO 调试了下貌似没用到这个方法 暂注释
      // setTimeout(() => {
      //   var slideBox = document.getElementById("IntegrateSearchFilter");
      //   if (slideBox) {
      //     setTimeout(() => {
      //       var pageUl = document.querySelector(".from .burgeon-dropdown-menu")
      //         .childNodes[0];
      //       pageUl.click();
      //     }, 200);
      //   }
      // }, 100);
    },
    // 判断使用正则
    determineTheRegular(val) {
      let regx = '';
      switch (val) {
        case 'ORDER_AMT': // 订单金额
          regx = /^[1-9][0-9]{0,}$/;
          break;
        case 'QTY_ALL': // 商品数量
          regx = /^[1-9][0-9]{0,}$/;
          break;
        default:
          regx = '';
      }
      return regx;
    },
    // 获取当前时间
    getCurrentTime() {
      const self = this;
      const timestamp = Date.parse(new Date());
      const SevenDaysTimestamp = Date.parse(new Date()) - 7 * 24 * 3600 * 1000;
      const defaultTimeArr = [];
      defaultTimeArr[0] = `${self.dateLong2String(
        SevenDaysTimestamp
      )} 00:00:00`;
      defaultTimeArr[1] = `${self.dateLong2String(timestamp)} 23:59:59`;
      return defaultTimeArr;
    },
    // 时间戳转化yyyy-mm-dd
    dateLong2String(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      return `${year}-${month}-${day}`;
    },
    // 数组标准时间转换成yyyy-mm-dd格式
    getTimesValue(time) {
      let timeValue = '';
      const dateone = new Date(time[0]).toJSON();
      const datetwo = new Date(time[1]).toJSON();
      const dateTimeOne = new Date(+new Date(dateone) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
      const dateTimeTwo = new Date(+new Date(datetwo) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
      timeValue = `${dateTimeOne}~${dateTimeTwo}`;

      if (timeValue === '1970-01-01 08:00:00~1970-01-01 08:00:00') {
        timeValue = '';
      }
      return timeValue;
    },

    // 时间戳转化为yyyy-mm-dd hh:mm:ss
    standardTimeConversiondateToStr(val) {
      const dateTime = new Date(val);
      const year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1; // js从0开始取
      let date = dateTime.getDate();
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let second = dateTime.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return `${year}-${month}-${date} ${hour}:${minutes}:${second}`;
    },
    // 刷新按钮
    tableRefreshDetail() {
      this.getData();
    },
    // 设置表格高度
    setTableHeight() {
      // let self = this;
      // const contentWidth = document.getElementsByClassName("main-content")[0]
      //   .clientWidth;
      // const contentHeight = document.getElementsByClassName("main-content")[0]
      //   .clientHeight;
      // let sumHeight = 25;
      // sumHeight += document.getElementsByClassName("btn")[0].clientHeight;
      // sumHeight += document.getElementsByClassName("from")[0].clientHeight;
      // sumHeight += document.getElementsByClassName("jordan-label-box")[0]
      //   .clientHeight;
      // sumHeight += document.getElementsByClassName("page-box")[0].clientHeight;
      // let tableHeight = contentHeight - sumHeight;
      // this.jordanTableConfig.height = tableHeight - 40;
    },

    // 字段选项组转换
    converSelect(val) {
      const list = [];
      val.forEach((item, index) => {
        list[index] = {
          label: item.limitdesc,
          value: item.limitval,
        };
      });
      return list;
    },
    /* 用于数据深拷贝 */
    reaptData(obj) {
      // 深拷贝
      if (obj instanceof Array) {
        // array
        const temp = [];
        obj.forEach((item, index) => {
          const temp2 = [];
          if (item instanceof Array) {
            item.forEach((item2, index) => {
              temp2.push(item2);
            });
            temp.push(temp2);
          } else {
            temp.push(item);
          }
        });
        return temp;
      }
      // obj
      const temp = {};
      for (const item in obj) {
        temp[item] = obj[item];
      }
      return temp;
    },

    // 高级搜索
    search() {},
    // 清除某个检索项值
    clearItem() {
      this.searchMethod();
    },
    // 清除检索项
    clearAll() {
      this.selectValue = [];
      setTimeout(() => {
        this.searchMethod();
      }, 100);
    },
    // 检索项方法
    searchMethod(isWork) {
      // 取的标签值
      let label = [];
      const queryInfo = [];
      this.selectValue.forEach((item, index) => {
        if (item.column === 'tag') {
          label = item.selectedList;
        } else if (item.type === 'DatePicker') {
          queryInfo[index] = {
            type: 'date',
            displayName: item.label,
            queryName: item.column,
            list: item.list,
            value: item.value,
          };
        } else if (item.type === 'Select') {
          queryInfo[index] = {
            type: item.type,
            displayName: item.label,
            queryName: item.column,
            value: item.value,
            list: item.selectedList,
          };
        } else if (item.type === 'DropDownSelectFilter') {
          queryInfo[index] = {
            type: item.type,
            displayName: item.label,
            queryName: item.column,
            value: item.value,
            list: item.selectedList,
          };
        } else {
          queryInfo[index] = {
            type: item.type,
            displayName: item.label,
            queryName: item.column,
            value: item.value.replace(/(^\s*)|(\s*$)/g, ''),
            list: item.list,
          };
        }
      });
      const labelData = [];
      label.forEach((item, index) => {
        labelData[index] = {
          val: item.value,
          text: item.label,
          sort: item.sort,
          key: item.key,
        };
      });
      if (this.$route.query.type === 'workID' && isWork === 'workID') {
        this.selectValue = [];
        this.jordanTableConfig.current = 1;
        this.getData1();
      } else {
        this.queryInfoData = this.notempty(queryInfo);
        this.labelData = this.notempty(labelData);
        this.jordanTableConfig.current = 1;
        this.getData();
      }
    },
    distributeLogistics() {
      const self = this;
      self.selection = [];
      if (self.clearFromListValue) self.queryInfoData = [];
      const param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current,
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.reallocateLogistics(fromdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/reallocateLogistics', fromdata)
        .then((res) => {
          // this.$Message.success("后台重新分配快递中...");
        });
    },
    distributeWarehouse() {
      const self = this;
      self.selection = [];
      if (self.clearFromListValue) self.queryInfoData = [];
      const param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current,
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.reallocateWarehouse(formdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/reallocateWarehouse', formdata)
        .then((res) => {
          // this.$Message.success("后台重新分配快递中...");
        });
    },
    loadData() {
      const arr = [];
      this.formConfig.formData.forEach((item, index) => {
        if (item.style === 'popInput') {
          arr[index] = {
            type: 'Select',
            queryName: item.itemdata.colname,
            value: item.itemdata.pid === undefined ? '' : item.itemdata.pid,
          };
        }
      });
      const keyArr = [];
      for (const key in this.formConfig.formValue) {
        this.formConfig.formData.forEach((item, index) => {
          if (item.style !== 'popInput') {
            if (key === item.value) {
              if (item.style === 'date') {
                keyArr[index] = {
                  type: item.style,
                  queryName: item.value,
                  value: this.getTimesValue(this.formConfig.formValue[key]),
                };
              } else if (item.style === 'input') {
                keyArr[index] = {
                  type: 'Input',
                  queryName: item.value,
                  value: this.formConfig.formValue[key],
                };
              } else if (item.style === 'bothInput') {
                keyArr[index] = {
                  type: 'Input',
                  queryName: item.value,
                  value: `${this.formConfig.formValue[key].value1.replace(
                    /(^\s*)|(\s*$)/g,
                    ''
                  )}~${this.formConfig.formValue[key].value2.replace(
                    /(^\s*)|(\s*$)/g,
                    ''
                  )}`,
                };
              } else if (item.style === 'select') {
                keyArr[index] = {
                  type: 'Select',
                  queryName: item.value,
                  value:
                    this.formConfig.formValue[key].join(',') === 'bSelect-all'
                      ? ''
                      : this.formConfig.formValue[key].join(','),
                };
              }
            }
          }
        });
      }
      const highSearchData = [...this.notempty(arr), ...keyArr];
      this.highSearchData = this.notempty(highSearchData);
      this.jordanTableConfig.current = 1;
      this.getData();
    },

    //  获取页面数据
    async getData() {
      const self = this;
      self.selection = [];
      self.jordanTableConfig.loading = true;
      self.agTableConfig.agLoading = true;
      if (self.clearFromListValue) self.queryInfoData = [];
      const param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current,
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
        sort: self.sort,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      try {
        const res = await self.service.orderCenter.getOrderList(fromdata);
        // const res = await self.$network.post(
        //   '/api/cs/oc/oms/v1/getOrderList',
        //   fromdata
        // );
        self.agTableConfig.agLoading = false;
        if (!res.data.data) {
          self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          // 初始化表格
          self.agTableConfig.pagenation.goodsSum = 0;
          self.agTableConfig.pagenation.total = 0;
          self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, []);
          self.$Message.warning({
            content: res.data.message,
            duration: 5,
            top: 80,
          });
          return;
        }
        // self.jordanTableConfig.loading = false;
        res.data.data = JSON.parse(unzipXv(res.data.data));
        console.log(res.data.data);
        if (res.data.code === 0) {
          if (!res.data.data) {
            self.jordanTableConfig.data = [];
            // self.jordanTableConfig.total = 0;
            self.agTableConfig.pagenation.total = 0;
            self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          } else {
            const queryOrderResultList = res.data.data.queryOrderResultList;
            // self.jordanTableConfig.total = res.data.data.totalSize;
            self.agTableConfig.pagenation.total = res.data.data.totalSize;
            // self.jordanTableConfig.data = res.data.data.queryOrderResultList;
            self.agTableConfig.rowData = queryOrderResultList;
            self.agTableConfig.rowData.forEach((item) => {
              // self.jordanTableConfig.data.forEach(item => {
              if (
                item.ORDER_STATUS === self.orderStatus.orderCancel
                || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid
              ) {
                item.isColorGray = true;
              } else {
                item.isColorGray = false;
              }
            });
            // 统计商品总数
            self.agTableConfig.pagenation.goodsSum = queryOrderResultList.reduce(
              (sum, item) => sum + Number(item.QTY_ALL || 0),
              0
            );
            self.$refs.agGridChild.agGridTable(
              self.agTableConfig.columnDefs,
              self.agTableConfig.rowData
            );
          }
        } else {
          self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          self.$Message.warning({
            content: res.data.message,
            duration: 5,
            top: 80,
          });
        }
      } catch (err) {
        self.jordanTableConfig.loading = false;
        self.agTableConfig.agLoading = false;
      }
    },
    checkBatchReturnOrder(selection) {
      const self = this;
      if (selection.length > 80) {
        throw new Error(self.vmI18n.t('modalTips.f5')); // 请选择不超过80笔订单的数据！;
      }
      for (let i = 0; i < selection.length; i++) {
        const item = selection[i];
        if (
          item.ORDER_STATUS === self.orderStatus.orderCancel
          || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid
        ) {
          // 订单需要生成退换货单的订单状态不能已取消、系统作废！
          throw new Error(`${item.ID}${self.vmI18n.t('modalTips.f6')}`);
        } else if (
          item.ORDER_STATUS === self.orderStatus.waitDistribution
          || item.ORDER_STATUS === self.orderStatus.orderUnconfirmed
          || item.ORDER_STATUS === self.orderStatus.orderOutofstock
          || item.ORDER_STATUS === self.orderStatus.audited
          || item.ORDER_STATUS === self.orderStatus.waitSendWMS
          || item.ORDER_STATUS === self.orderStatus.distributioning
        ) {
          // 存在未发货订单,不能进行批量新增退换货订单操作
          throw new Error(self.vmI18n.t('modalTips.f7'));
        }
      }
    },
    onBatchReturnOrderCancel() {
      this.batchReturnFormConfig.formValue.IS_BACK = false;
    },
    doBatchReturnOrder() {
      const self = this;
      self.btnConfig.loading = true;
      const ids = [];
      self.selection.forEach((item, index) => {
        ids[index] = item.ID;
      });
      const param = {
        ids,
        is_back: self.batchReturnFormConfig.formValue.IS_BACK,
      };
      const searchdata = {
        table: 'OC_B_ORDER',
        column_include_uicontroller: true,
        fixedcolumns: param,
      };
      const fromdata = new FormData();
      fromdata.append('searchdata', JSON.stringify(searchdata));
      fromdata.append('filename', '批量退单');
      fromdata.append('filetype', ' .xlsx');
      fromdata.append('showColumnName', true);
      fromdata.append('menu', '批量退单');
      self.service.orderCenter.doBatchReturnOrder(fromdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/doBatchReturnOrder', formdata)
        .then((res) => {
          self.batchReturnFormConfig.formValue.IS_BACK = false;
          if (res.data.code === 0) {
            self.$Message.success(res.data.message);
            // self.selection = [];
            // self.$store.commit("customize/TabOpen", {
            //   id: res.data.data,
            //   type: 'singleView',
            //   name: 'singleView',
            //   label: '我的任务',
            //   query: {
            //     id: res.data.data,
            //     pid: '10010',
            //     ptitle: '我的任务',
            //     ptype: 'table',
            //     tabTitle: '我的任务',
            //     tableName: 'CP_C_TASK',
            //   },
            // })
            R3.store.commit('global/tabOpen', {
              type: 'V',
              tableName: 'CP_C_TASK',
              label: self.vmI18n.t('other.myMission'),
              tableId: 24386,
              id: res.data.data,
              query: {
                id: res.data.data,
                pid: '10010',
                ptitle: self.vmI18n.t('other.myMission'),
                ptype: 'table',
                tabTitle: self.vmI18n.t('other.myMission'),
                tableName: 'CP_C_TASK',
              },
            });
          } else {
            self.$Modal.error({
              title: self.vmI18n.t('modalTitle.tips'), // 提示
              content: res.data.message,
              cancelType: true,
              titleAlign: 'left',
              mask: true,
              draggable: true,
              keyDown: (event) => {
                if (event.keyCode === 27 || event.keyCode === 13) {
                  self.$Modal.remove();
                }
              },
            });
          }
          self.btnConfig.loading = false;
        });
    },
    //  获取页面数据
    async getData1() {
      const self = this;
      self.jordanTableConfig.loading = true;
      if (self.clearFromListValue) self.queryInfoData = [];
      if (
        self.$route.query.type == 'workID'
        && self.$route.query.ID !== undefined
      ) {
        const arr = [
          { type: 'Input', queryName: 'ID', value: self.$route.query.ID },
        ];
        if (!self.highSearchData.length) { self.highSearchData = self.highSearchData.concat(arr); }
      } else {
        if (!self.highSearchData.length) { self.highSearchData = JSON.parse(self.$route.query.param); }

        if (self.$route.query.label !== undefined) {
          self.labelData = JSON.parse(self.$route.query.label);
        }
      }

      const param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current,
        },
        label: self.labelData, // 标签
        queryInfo: self.queryInfoData, // 普通搜索
        status: self.statusData,
        highSearch: self.highSearchData,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      try {
        const res = await self.service.orderCenter.queryOrderList(fromdata);
        // const res = await self.$network.post(
        //   '/api/cs/oc/oms/v1/queryOrderList',
        //   formdata
        // );
        self.jordanTableConfig.loading = false;
        self.agTableConfig.agLoading = false;
        if (res.data.code === 0) {
          if (!res.data.data) {
            self.jordanTableConfig.data = [];
            self.jordanTableConfig.total = 0;
            self.$refs.agGridChild.AGTABLE.cleanRows(); // 清空表格数据
          } else {
            // self.jordanTableConfig.total = res.data.data.totalSize;
            self.agTableConfig.pagenation.total = res.data.data.totalSize;
            self.jordanTableConfig.data = res.data.data.queryOrderResultList;
            self.jordanTableConfig.data.forEach((item) => {
              if (
                item.ORDER_STATUS === self.orderStatus.orderCancel
                || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid
              ) {
                item.isColorGray = true;
              } else {
                item.isColorGray = false;
              }
            });
          }
        } else {
          self.$Message.warning({
            content: res.data.message,
            duration: 5,
            top: 80,
          });
        }
      } catch (err) {
        self.jordanTableConfig.loading = false;
        self.agTableConfig.agLoading = false;
      }
      this.selectValue = [];
    },
    // 标准时间转化为yyyy-mm-dd
    standardTimeConversion(val) {
      const d = new Date(val);
      const datetime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `;
      return datetime;
    },
    // 分页change 事件
    pageChange(val) {
      this.jordanTableConfig.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.jordanTableConfig.pageSize = val;
      this.getData();
    },
    // 切换标签 执行搜索
    labelClick(item) {
      this.statusData = item;
      this.jordanTableConfig.current = 1;
      this.getData();
    },

    // 选中某一项时触发
    onSelect(selection, row) {
      this.selection = selection;
    },
    // 取消选中某一项时触发
    onSelectCancel(selection, row) {
      this.selection = selection;
    },
    // 点击全选时触发
    onSelectAll(selection) {
      this.selection = selection;
    },

    // 点击取消全选时触发
    onSelectAllCancel(selection) {
      this.selection = selection;
    },
    // 单击某一行时触发
    onRowClick(row, index) {},
    // 单击某二行时触发
    onRowDblclick(row, index) {
      R3.store.commit('global/tabOpen', {
        type: 'C',
        customizedModuleName: 'orderManageDetail',
        customizedModuleId: row.ID,
        label: this.vmI18n.t('panel_label.retailInvoice_details'),
      });
    },
    // 返回置换两行索引
    onDragDrop(columns) {
      this.jordanTableConfig.columns = columns;
    },
    /**
     * 扩展Array方法, 去除数组中空白数据
     */
    notempty(val) {
      const arr = val.filter(val => val !== '' && val !== undefined);
      return arr;
    },

    // 导出校验
    exportClick() {
      const _this = this;
      _this.selection = _this.$refs.agGridChild.AGTABLE.getSelect();
      if (_this.selection.length > 0) {
        this.exportChange(_this.selection);
      } else {
        if (_this.selection.length === 0) {
          this.exportChange(_this.agTableConfig.rowData);
          return;
        }
        // return _this.$Message.error("列表没有数据,无法导出!");
        if (_this.statusData.value == 0) {
          _this.warningModal = true;
        } else {
          _this.warningOk();
        }
      }
    },
    // 导出
    exportChange(list = []) {
      if (this.isExport)
      // 有一项导出正在进行中
      { return this.$Message.error(this.vmI18n.t('modalTips.f8')); }
      this.isExport = true;
      const ids = list.map(item => item.ID);
      const fromdata = new FormData();
      const idList = { idList: ids };
      fromdata.append('param', JSON.stringify(idList));
      this.service.orderCenter.exportOcBOrder(fromdata)
      // this.$network
      //   .post('/api/cs/oc/oms/v1/exportOcBOrder', fromdata)
        .then((res) => {
          this.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            const mes = res.data.message || this.vmI18n.t('modalTips.z2'); // 导出成功！
            this.$Message.success(mes);
            this.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            const err = res.data.message || this.vmI18n.t('modalTips.z3'); // 失败！
            this.$Message.error(err);
          }
        });
    },
    // 警告框确认
    warningOk() {
      const _this = this;
      // 有一项导出正在进行中
      if (this.isExport) { return this.$Message.error(this.vmI18n.t('modalTips.f8')); }
      this.isExport = true;
      const param = {
        page: {
          pageSize: 999999,
          pageNum: 1,
        },
        label: _this.labelData, // 标签
        queryInfo: _this.queryInfoData, // 普通搜索
        status: _this.statusData,
        highSearch: _this.highSearchData,
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      self.service.orderCenter.exportOcBOrder(fromdata)
      // self.$network
      //   .post('/api/cs/oc/oms/v1/exportOcBOrder', fromdata)
        .then((res) => {
          this.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            const mes = res.data.message || this.vmI18n.t('modalTips.z2'); // 导出成功！
            _this.$Message.success(mes);
            _this.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            const err = res.data.message || this.vmI18n.t('modalTips.z3'); // 失败！
            _this.$Message.error(err);
          }
        });
    },
    // 数组对象根据子元素某各个key合并分组
    sonList(arr, key) {
      const obj = [];
      arr.forEach((item) => {
        obj.push(item[key]);
      });
      return obj;
    },
    // 导出
    downloadUrlFile(src) {
      const download_file = {};
      if (typeof download_file.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = 'none';
    },
  },
};
