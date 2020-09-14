<template>
  <div class="orderManager-box">
    <div class="btn">
      <jordanBtn :btnConfig="btnConfig"></jordanBtn>
    </div>
    <div class="from">
      <div class="from_loading" v-show="isShowFromLoading">
        <Spin></Spin>
      </div>
      <IntegrateSearchFilter
        id="IntegrateSearchFilter"
        class="IntegrateSearchFilter"
        v-model="selectValue"
        @on-search="search"
        @on-clear-all="clearAll"
        @on-clear-item="clearItem"
        :searchMethod="searchMethod"
        :tagList="tagList"
        :dropDownList="dropList"
        v-if="isShowSeniorOrOrdinary"
      ></IntegrateSearchFilter>
      <!-- trigger="click" -->
      <jordanForm
        style="margin-top:10px;"
        v-show="!isShowSeniorOrOrdinary"
        :formConfig="formConfig"
      ></jordanForm>
      <jordanBtn
        style="margin-left:80px;margin-top:10px;justify-content: flex-end"
        :btnConfig="btnsSearch"
        v-show="!isShowSeniorOrOrdinary"
      ></jordanBtn>
      <div class="from-folding" @click="shutDownOrbounceOff">
        <i :class="iconDownIcon"></i>
      </div>
    </div>
    <div class="table">
      <jordanLabel
        class="jordanLabel"
        :labelList="labelList"
        :labelDefaultValue="labelDefaultValue"
        @labelClick="labelClick"
      ></jordanLabel>
      <jordan-action-table
        class="jordan-action-table"
        :jordanTableConfig="jordanTableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-drag-drop="onDragDrop"
        @table-refresh-detail="tableRefreshDetail"
      ></jordan-action-table>
    </div>
    <dir></dir>
    <!-- 公共弹框 -->
    <jordanModal
      :title="publicBouncedConfig.confirmTitle"
      :titleAlign="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :batchClosed="publicBouncedConfig.batchClosed"
      :keepAlive="publicBouncedConfig.keepAlive"
      :excludeString="publicBouncedConfig.excludeString"
      :componentData="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    ></jordanModal>
    <!-- 导入 -->
    <jordanModal
      :title="importTable.confirmTitle"
      :titleAlign="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keepAlive="importTable.keepAlive"
      :excludeString="importTable.excludeString"
      :componentData="importTable.componentData"
    ></jordanModal>
    <!-- 导出 -->
    <Modal v-model="warningModal" title="警告" width="420" @on-ok="warningOk" :mask="true">
      <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p>
    </Modal>
    <Modal v-model="distributeLogisticsModal" title="警告" width="420" @on-ok="distributeLogistics" :mask="true">
      <p>是否确定重新分配物流?</p>
    </Modal>
    <Modal v-model="distributeWarehouseModal" title="警告" width="420" @on-ok="distributeWarehouse" :mask="true">
      <p>是否确定重新分配仓库?</p>
    </Modal>
    <Modal v-model="batchReturnOrderModal" title="警告" width="420" @on-ok="doBatchReturnOrder" @on-cancel="onBatchReturnOrderCancel" :mask="true">
      <p>批量生成退换货订单，是否继续?</p>
      <br/>
      <div class="orderContent">
        <jordanForm :formConfig="batchReturnFormConfig"></jordanForm>
      </div>
    </Modal>
    <Modal v-model="updateSendWmsFlagModal" title="标记传仓" width="300" @on-ok="updateSendWms" @on-cancel="updateSendWmsCancel" :mask="true">
      <div class="orderContent">
        <jordanForm :formConfig="updateSendWmsFormConfig"></jordanForm>
      </div>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import jordanActionTable from '@/jordanComponent/jordanActionTable'
  import jordanBtn from '@/jordanComponent/jordanButton'
  import jordanLabel from '@/jordanComponent/jordanLabel'
  import jordanTable from '@/jordanComponent/jordanTable'
  import jordanForm from '@/jordanComponent/jordanForm'
  import jordanModal from '@/jordanComponent/JDialog'
  import {buttonPermissionsMixin} from '@/assets/js/mixins/buttonPermissions'
  import {isFavoriteMixin} from '@/assets/js/mixins/isFavorite'
  import {dataAccessMixin} from '@/assets/js/mixins/dataAccess'
  import publicDialogConfig from './publicConfig/publicDialog.js'
  import labelListConfig from './publicConfig/labelList.js'
  import orderLogo from './publicConfig/orderLogo.js'

  import aTable from '@/jordanComponent/table/agGridTable.vue'
  import unzipXv from '@/assets/js/dataToSmall.js'

export default {
  components: {
    jordanBtn,
    jordanForm,
    jordanTable,
    jordanLabel,
    jordanActionTable,
    jordanModal
  },
  mixins: [isFavoriteMixin, buttonPermissionsMixin,dataAccessMixin],
  watch: {
    publicBouncedConfig(newvalue, oldvalue) {
      this.publicBouncedIndex = newvalue;
    }
  },
  data() {
    return {
      // 弹框配置 导入
      importTable: {
        refFuns: "confirmFun",
        confirmTitle: "导入",
        titleAlign: "center", //设置标题是否居中 center left
        width: "600",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "importTable", //组件名称
        url: "publicDialog/importTable",
        keepAlive: true,
        excludeString: "importTable", //将name传进去，确认不缓存
        componentData: {}
      },
      warningModal: false, // 警告弹框
      distributeLogisticsModal: false, // 警告弹框
      distributeWarehouseModal: false, // 警告弹框
      updateSendWmsFlagModal: false, // 警告弹框
      checkedFlag:false,
      batchReturnOrderModal: false, // 警告弹框
      // 清除高级搜索中的数据
      clearFromListValue: false,
      // 状态json
      statusData: {
        label: "全部",
        value: "0",
        isShow: true
      },
      // tag 搜索
      queryInfoData: [],
      // 高级搜索
      highSearchData: [],
      // 标签
      labelData: [],

      // 表格选中数据
      selection: [],
      //from loading
      isShowFromLoading: false,
      // 弹框判断
      publicBouncedIndex: {
        name: "testModal"
      },
      // 公共弹框
      publicBouncedConfig: {},
      // 判断显示高级搜索还是正常搜素
      isShowSeniorOrOrdinary: true,
      // icon 样式
      iconDownIcon: "iconfont iconbj_down",

      // tabs
      // 设置tabs默认值
      labelDefaultValue: "0",
      // 设置tabs列表
      labelList: labelListConfig,
      // 表格
      jordanTableConfig: {
        //配合拖拽事件使用
        // ellipsis: true,
        // 控制是否可以单选
        // highlightRow:true,
        // 自定义操作列
        renderArr: [
          {
            title: "旗帜",
            key: "ORDER_FLAG",
            // draggable: true,
            render: (h, params) => {
              let imgSrc = "";
              if (!params.row.ORDER_FLAG) {
                imgSrc = require("@/assets/image/img/0.png");
              } else {
                imgSrc = require(`@/assets/image/img/${params.row.ORDER_FLAG}.png`);
              }
              if (!params.row.SELLER_MEMO) {
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      "align-items": "center"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: imgSrc
                      },
                      style: {
                        width: "14px",
                        height: "auto",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          // "是否确认修改备注！"
                          let self = this;
                          self.publicBouncedConfig = Object.assign(
                            publicDialogConfig.changeRemarkConfig,
                            {
                              componentData: {
                                ids: params.row.ID,
                                status: `${params.row.ORDER_STATUS}`
                              }
                            }
                          );
                          setTimeout(() => {
                            self.$children
                              .find(item => item.name === "changeRemark")
                              .openConfirm();
                          }, 100);
                        }
                      }
                    })
                  ]
                );
              } else {
                return h(
                  "Poptip",
                  {
                    props: {
                      placement: "bottom",
                      trigger: "hover",
                      transfer: true
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: imgSrc
                      },
                      style: {
                        width: "14px",
                        height: "auto",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          // "是否确认修改备注！"
                          let self = this;
                          self.publicBouncedConfig = Object.assign(
                            publicDialogConfig.changeRemarkConfig,
                            {
                              componentData: {
                                ids: params.row.ID,
                                status: `${params.row.ORDER_STATUS}`,
                                ORDER_FLAG: params.row.ORDER_FLAG,
                                SELLER_MEMO: params.row.SELLER_MEMO
                              }
                            }
                          );
                          setTimeout(() => {
                            self.$children
                              .find(item => item.name === "changeRemark")
                              .openConfirm();
                          }, 100);
                        }
                      }
                    }),
                    h(
                      "p",
                      {
                        slot: "content"
                      },
                      params.row.SELLER_MEMO
                    )
                  ]
                );
              }
            }
          },
          {
            title: "订单标识",
            sortable: true,
            // draggable: true,
            align: "center",
            key: "ORDER_TAG",
            render: (h, params) => {
              if (params.row.ORDERTAGLIST) {
                params.row.ORDERTAGLIST.forEach((ORDERTAGLISTItem, Index) => {
                  ORDERTAGLISTItem.message = orderLogo[ORDERTAGLISTItem.text];
                });
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      cursor: "pointer",
                      padding: "6px 8px"
                    }
                  },
                  [
                    params.row.ORDERTAGLIST.map(item => {
                      return h(
                        "Poptip",
                        {
                          props: {
                            placement: "right",
                            trigger: "hover",
                            width: "100%",
                            transfer: true
                          }
                        },
                        [
                          h(
                            "div",
                            {
                              style: {
                                border: `1px solid ${item.clr}`,
                                color: item.clr,
                                fontSize: "10px",
                                borderRadius: "6px",
                                padding: "2px 2px",
                                marginRight: "4px",
                                cursor: "pointer"
                              }
                            },
                            item.text
                          ),
                          h(
                            "span",
                            {
                              slot: "content"
                            },
                            item.message
                          )
                        ]
                      );
                    })
                  ]
                );
              }
            }
          },
          {
            title: "平台单号",
            align: "center",
            key: "SOURCE_CODE",
            render: (h, params) => {
              if (params.row.SOURCE_CODE) {
                let arrs = params.row.SOURCE_CODE.split(",");
                let len = arrs.length;
                let sourceCode = "";
                arrs.map((item, index) => {
                  sourceCode += item + (index + 1 === len ? "" : " , ");
                });
                return h("div", [
                  h(
                    "Poptip",
                    {
                      props: {
                        placement: "bottom",
                        transfer: true,
                        trigger: "hover"
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            width: "200px",
                            "white-space": "nowrap",
                            "text-overflow": "ellipsis",
                            overflow: "hidden",
                            cursor: "pointer",
                            color:
                            params.row.ORDER_STATUS ===
                                this.orderStatus.orderCancel ||
                              params.row.ORDER_STATUS ===
                                this.orderStatus.orderSystemInvalid
                                ? "#c5c5c5"
                                : params.row.SYSREMARK === null || !params.row.SYSREMARK ? "#0F8EE9" : 'red'
                          }
                        },
                        sourceCode
                      ),
                      h(
                        "span",
                        {
                          slot: "content"
                        },
                        sourceCode
                      )
                    ]
                  )
                ]);
              }
            }
          },
          {
            title: "收货地址",
            key: "REGION_RECEIVER_ADDRESS",
            render: (h, params) => {
              return h("span", [
                h(
                  "Poptip",
                  {
                    props: {
                      placement: "bottom",
                      transfer: true,
                      trigger: "hover"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          width: "300px",
                          "white-space": "nowrap",
                          "text-overflow": "ellipsis",
                          overflow: "hidden"
                        }
                      },
                      params.row.REGION_RECEIVER_ADDRESS
                    ),
                    h(
                      "span",
                      {
                        slot: "content"
                      },
                      params.row.REGION_RECEIVER_ADDRESS
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "商品信息",
            align: "center",
            width: 610,
            ellipsis: false,
            key: "QUERYORDERITEMRESULTLIST",
            render: (h, params) => {
              if (
                params.row.QUERYORDERITEMRESULTLIST &&
                params.row.QUERYORDERITEMRESULTLIST.length !== 0
              ) {
                var popList = [];
                params.row.QUERYORDERITEMRESULTLIST.map((item, index) => {
                  let ecode = item.ecode || "商品";
                  let sizes = item.sizes || "尺寸";
                  let clrs = item.clrs || "颜色";
                  let dataArr = [];
                  let dataMore = this.reaptData(
                    params.row.QUERYORDERITEMRESULTLIST
                  );
                  dataArr.push(item);
                  // BUG  超过6还是会展示...   add  by  wdq 20190612
                  if (index > 2) return;
                  if (index == 2) {
                    dataMore = dataMore.splice(2);
                    return (popList[2] = {
                      jsonShow: `更多`,
                      data: dataMore
                    });
                  }
                  popList[index] = {
                    jsonShow: `${ecode} , ${sizes} , ${clrs}`,
                    data: dataArr
                  };
                });
                let goodsThead = [
                  {
                    key: "image",
                    render: (h, params) => {
                      let imgSrc = params.row.image
                        ? params.row.image
                        : require("@/assets/image/img/defaultphoto.png");
                      return h("div", [
                        h("img", {
                          attrs: {
                            src: imgSrc
                          },
                          style: {
                            width: "20px",
                            height: "auto",
                            cursor: "pointer"
                          }
                        })
                      ]);
                    }
                  },
                  {
                    render: (h, params) => {
                      return h("div", [
                        h(
                          "span",
                          `${params.row.ecode},${params.row.sizes},${params.row.clrs}`
                        )
                      ]);
                    }
                  },
                  {
                    render: (h, params) => {
                      return h("span", params.row.price.toFixed(2));
                    }
                  },
                  {
                    key: "qty"
                  },
                  {
                    render: (h, params) => {
                      return h("span", params.row.realAmt.toFixed(2));
                    }
                  },
                  {
                    key: "weight"
                  }
                ];
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      "justify-content": "space-between"
                    }
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          width: "86%",
                          "padding-bottom": "6px",
                          display: "flex",
                          "flex-wrap": "wrap"
                        }
                      },
                      popList.map((item, index) => {
                        // 缺货标识
                        let lostGoods = false;
                        // 缺货数量
                        let qtyLost = item.data.reduce((cur, next) => {
                          if (next.qtyLost > 0) {
                            lostGoods = false;
                          } else {
                            lostGoods = true;
                          }
                          return cur + next.qtyLost;
                        }, 0);
                        return h(
                          "div",
                          {
                            style: {
                              padding: "6px 4px 0px 4px"
                            }
                          },
                          [
                            h(
                              "div",
                              {
                                style: {
                                  padding: "4px 6px",
                                  border: "1px solid #d3d3d3",
                                  position: "relative",
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  background: item.data[0].refundStatus===6?'#e6e6e6':'none'
                                }
                              },
                              [
                                h("span", {}, item.jsonShow),
                                h(
                                  "div",
                                  {
                                    style: {
                                      "min-width": "16px",
                                      height: "16px",
                                      "line-height": "13px",
                                      border: "1px solid #DCDEE2",
                                      borderRadius: "9px",
                                      backgroundColor: "#84C9E2",
                                      "font-size": "6px",
                                      position: "absolute",
                                      top: "-6px",
                                      right: "-8px",
                                      zIndex: "1",
                                      color: "white"
                                    }
                                  },
                                  item.data.reduce((cur, next) => {
                                    return cur + next.qty;
                                  }, 0)
                                ),
                                h(
                                  "div",
                                  {
                                    style: {
                                      "min-width": "16px",
                                      height: "16px",
                                      "line-height": "13px",
                                      border: "1px solid #DCDEE2",
                                      borderRadius: "9px",
                                      backgroundColor: "#fd6442",
                                      "font-size": "6px",
                                      position: "absolute",
                                      top: "14px",
                                      right: "-8px",
                                      zIndex: "1",
                                      color: "white",
                                      visibility: lostGoods
                                        ? "hidden"
                                        : "visible"
                                    }
                                  },
                                  qtyLost
                                )
                              ]
                            )
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
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          marginLeft: "10px"
                        }
                      },
                      [
                        h(
                          "span",
                          {
                            style: {
                              cursor: "pointer"
                            },
                            on: {
                              click: () => {
                                let self = this;
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
                                      order: params.row
                                    }
                                  }
                                );

                                setTimeout(() => {
                                  self.$children
                                    .find(item => item.name === "goodsDetail")
                                    .openConfirm();
                                }, 100);

                                setTimeout(() => {
                                  this.$children
                                    .find(item => item.name === "goodsDetail")
                                    .$children[0].$children[1].getData();
                                }, 200);
                              }
                            }
                          },
                          "详情"
                        ),
                        h("i", {
                          class: "burgeon-icon iconfont iconyoujiantou-copy"
                        })
                      ]
                    )
                  ]
                );
              }
            }
          },
          {
            title: "系统备注",
            key: "SYSREMARK",
            render: (h, params) => {
              return h("span", [
                h(
                  "Poptip",
                  {
                    props: {
                      placement: "bottom",
                      transfer: true,
                      trigger: "hover"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          width: "300px",
                          "white-space": "nowrap",
                          "text-overflow": "ellipsis",
                          overflow: "hidden"
                        }
                      },
                      params.row.SYSREMARK
                    ),
                    h(
                      "span",
                      {
                        slot: "content"
                      },
                      params.row.SYSREMARK
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "买家昵称",
            align: "center",
            key: "USER_NICK",
            // width: 220,
            ellipsis: true,
            render: (h, params) => {
              if (params.row.PLATFORM === 2) {
                return h("div", [
                  h(
                    "div",
                    {
                      style: {
                        padding: "4px 6px",
                        display: "flex",
                        flexDirection: "column"
                      }
                    },
                    [
                      h("p", [
                        h("i", {
                          class:
                            "burgeon-icon iconfont iconjo_wang iconwangwang",
                          style: {
                            fontSize: "14px",
                            color: "#62A2F2",
                            marginRight: "4px"
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
                            }
                          }
                        }),
                        h("span", `${params.row.USER_NICK}`)
                      ])
                      // h("p", params.row.CP_C_SHOP_TITLE || "")
                    ]
                  )
                ]);
              } else {
                return h(
                  "div",
                  {
                    style: {
                      padding: "4px 6px",
                      display: "flex",
                      flexDirection: "column"
                    }
                  },
                  [
                    h("p", params.row.USER_NICK || "")
                    // h("p", params.row.CP_C_SHOP_TITLE || "")
                  ]
                );
              }
            }
          },
          {
            title: "收货信息",
            key: "JOIN_RECEIVER_ADDRESS",
            align: "center",
            ellipsis: true,
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        let self = this;
                        let param = {
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
                          }
                        };

                        self.publicBouncedConfig =
                          publicDialogConfig.receivingInformationConfig;
                        self.publicBouncedConfig.componentData = param;
                        setTimeout(() => {
                          self.$children
                            .find(item => item.name === "resolveAddress")
                            .openConfirm();
                        }, 100);
                      }
                    }
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          padding: "4px 6px",
                          display: "flex",
                          flexDirection: "column"
                        }
                      },
                      [
                        h(
                          "p",
                          `${params.row.RECEIVER_NAME},${params.row.RECEIVER_MOBILE},
                            ${params.row.CP_C_REGION_PROVINCE_ENAME}${params.row.CP_C_REGION_CITY_ENAME}${params.row.CP_C_REGION_AREA_ENAME}`
                        ),
                        h("p", `${params.row.RECEIVER_ADDRESS}`)
                      ]
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "下单时间",
            key: "ORDER_DATE",
            render: (h, params) => {
              if (!params.row.ORDER_DATE) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(params.row.ORDER_DATE)
                );
              }
            }
          },
          {
            title: "付款时间",
            key: "PAY_TIME",
            render: (h, params) => {
              if (!params.row.PAY_TIME) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(params.row.PAY_TIME)
                );
              }
            }
          },
          {
            title: "创建时间",
            key: "CREATIONDATE",
            render: (h, params) => {
              if (!params.row.CREATIONDATE) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(params.row.CREATIONDATE)
                );
              }
            }
          },
          {
            title: "审核时间",
            key: "AUDIT_TIME",
            render: (h, params) => {
              if (!params.row.AUDIT_TIME) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(params.row.AUDIT_TIME)
                );
              }
            }
          },
          {
            title: "配货时间",
            key: "DISTRIBUTION_TIME",
            render: (h, params) => {
              if (!params.row.DISTRIBUTION_TIME) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(
                    params.row.DISTRIBUTION_TIME
                  )
                );
              }
            }
          },
          {
            title: "扫描出库时间",
            key: "SCAN_TIME",
            render: (h, params) => {
              if (!params.row.SCAN_TIME) {
                return h("span", "");
              } else {
                return h(
                  "span",
                  this.standardTimeConversiondateToStr(params.row.SCAN_TIME)
                );
              }
            }
          }
        ],
        //设置总条数
        total: 0,
        // 条数
        pageSize: 20,
        // 页数
        current: 1,
        // 请求搜索json
        searchObject: {},
        searchMethod: "", //请求方法
        componentData: {},
        // 加载中
        loading: false,
        //是否存在操作列
        isShowAction: false,
        // 是否存在序号列
        indexColumn: true,
        // 是否存在多选框
        isShowSelection: true,
        // 是否修改搜索框为select
        isSearchText: true,
        //isSearchText为false的情况下使用 搜索框list
        searchSelectList: [],
        pageShow: true, //控制分页是否显示
        // btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        isShowRefreshBtn: true, //控制是否显示刷新按钮
        isShowAddDetailBtn: false, //是否存在新增明细
        isShowDeleteDetailBtn: false, //控制是否显示删除明细
        isShowImportBtn: false, //控制是否显示导入
        isShowExportBtn: false, //控制是否显示导出
        width: "", // 表格宽度
        height: 440, // 表格高度
        border: false, //是否显示纵向边框
        pageSizeOpts: [20, 40, 60, 80], // 每页条数切换的配置
        columns: [],
        data: []
      },
      // 普通搜索
      dropList: [],
      tagList: [
        {
          label: "标签", // 标签字段名称
          column: "tag", // 标签字段
          trigger: "", // 触发方式
          list: [] // 选项
        }
      ],
      selectValue: [],
      // 表单搜索
      btnsSearch: {
        typeAll: "error", //按钮统一风格样式
        buttons: [
          {
            text: "搜索", //按钮文本
            btnclick: () => {
              this.loadData();
            } //按钮点击事件
          },
          {
            text: "清除", //按钮文本
            btnclick: () => {
              const _this = this;
              _this.clearFromListValue = true;
              _this.queryInfoData = [];
              _this.labelData = [];
              _this.getHeaderList();
            } //按钮点击事件
          }
        ]
      },
      // 列表按钮
      // btnConfig: {
      //   typeAll: "error", //按钮统一风格样式
      //   buttons: []
      // },
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        loading: false, //按钮加载
        buttons: [
          {
            text: "新增", //按钮文本
            btnclick: () => {
              this.$store.commit("customize/TabHref", {
                id: -1,
                type: "action",
                name: "orderManageAdd",
                label: "订单管理新增",
                back: true
                // query: query
              });
            } //按钮点击事件
          },
          {
            text: "审核", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                axios({
                  url: "/p/cs/auditing",
                  method: "post",
                  cancelToken: true,
                  data: { ids: ids, type: "1", isCheck: 0 }
                }).then(function(res) {
                  if (res.data.code === 0) {
                    // self.$Message.success(res.data.message);
                    self.$Modal.success({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                    self.selection = [];
                    self.getData();
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要审核的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "反审核", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                axios({
                  url: "/p/cs/auditingContrary",
                  method: "post",
                  cancelToken: true,
                  data: { ids: ids, type: "1" }
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要反审核的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          // {
          //   text: "WMS撤回", //按钮文本
          //   btnclick: () => {
          //     let self = this;
          //     if (self.selection.length > 0) {
          //       self.btnConfig.loading = true;
          //       let ids = [];
          //       self.selection.map((item, index) => {
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
          //             title: "提示",
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
            text: "修改物流", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                let CP_C_PHY_WAREHOUSE_ID = [];
                let isOmniChannel = 0;
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  CP_C_PHY_WAREHOUSE_ID[index] = item.CP_C_PHY_WAREHOUSE_ID;
                  isOmniChannel = item.RESERVE_BIGINT12
                });
                let fromdata = new FormData();
                fromdata.append("ids", ids);
                axios({
                  url: "/p/cs/checkOrderBeforeLogistics",
                  method: "post",
                  cancelToken: true,
                  data: fromdata
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig =
                      publicDialogConfig.modifyLogisticsConfig;
                    self.publicBouncedConfig.componentData = {
                      ids: ids,
                      cLogisticsId: 0,
                      isOmniChannel:isOmniChannel,
                      platform:self.selection[0].PLATFORM,
                      CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID[0]
                    };
                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === "modifyLogistics")
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要修改物流记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "丢单复制", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 1) {
                let query = {
                  orderCopy: true,
                  id: self.selection[0].ID
                };
                self.$store.commit("customize/TabHref", {
                  id: -1,
                  type: "action",
                  name: "orderManageAdd",
                  label: "订单管理新增",
                  query: query
                });
              } else {
                self.$Message.warning({
                  content: "请选择一条需要复制的订单！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "开票通知", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 0) {
                self.$Message.warning("请选择需要开票的订单");
                return;
              } else if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = self.sonList(self.selection, "ID"); // 选中订单的单据号
                let fromdata = new FormData();
                fromdata.append("param", JSON.stringify({ IDS: ids }));
                axios({
                  url: "/p/cs/checkAddOrderInvoicing",
                  method: "post",
                  cancelToken: true,
                  data: fromdata
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.$store.commit("customize/TabOpen", {
                      id: -1,
                      type: "action",
                      name: "invoiceNoticetAdd",
                      label: "开票通知编辑",
                      query: {
                        highSearchData: JSON.stringify({
                          type: "Input",
                          queryName: "ID",
                          value: res.data.data.join()
                        }),
                        isOrder: "ture",
                        id: -1
                      }
                    });
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                  self.btnConfig.loading = false;
                });
              }
            } //按钮点击事件
          },
          {
            text: "记录发票", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 1) {
                self.btnConfig.loading = true;
                let id = self.sonList(self.selection, "ID").join(); // 选中订单的单据号
                let fromdata = new FormData();
                fromdata.append("param", JSON.stringify({ ID: id }));
                axios({
                  url: "/p/cs/checkRecordInvoicing",
                  method: "post",
                  cancelToken: true,
                  data: fromdata
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig = Object.assign(
                      publicDialogConfig.makeOutInvoiceConfig,
                      {
                        componentData: res.data.data
                      }
                    );
                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === "makeOutInvoice")
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Message.warning(res.data.message);
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning("请选择一条订单");
              }
            } //按钮点击事件
          },
          {
            text: "修改仓库", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                let CP_C_SHOP_ID = [];
                let isOmniChannel = 0;
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  CP_C_SHOP_ID[index] = item.CP_C_SHOP_ID;
                  isOmniChannel = item.RESERVE_BIGINT12
                });
                let fromdata = new FormData();
                fromdata.append("ids", ids);
                axios({
                  url: "/p/cs/checkOrderBeforeWarehouse",
                  method: "post",
                  cancelToken: true,
                  data: fromdata
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig =
                      publicDialogConfig.changeWarehouseConfig;
                    self.publicBouncedConfig.componentData = {
                      ids: ids,
                      isOmniChannel:isOmniChannel,
                      CP_C_SHOP_ID: CP_C_SHOP_ID[0]
                    };
                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === "changeWarehouse")
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要修改发货仓库记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "订单取消", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                this.$Modal.info({
                  title: '提示',
                  content: '是否确定取消订单？',
                  mask: true,
                  showCancel: true,
                  okText: '取消',
                  cancelText: '确定',
                  onCancel: () => {
                    axios({
                      url: "/p/cs/billCancel",
                      method: "post",
                      cancelToken: true,
                      data: { ids: ids, type: "1" }
                    }).then(function(res) {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.getData();
                        self.selection = [];
                      } else {
                        self.$Modal.error({
                          title: "提示",
                          content: res.data.message,
                          cancelType: true,
                          titleAlign: "left",
                          mask: true,
                          draggable: true,
                          keyDown: event => {
                            if (event.keyCode == 27 || event.keyCode == 13) {
                              self.$Modal.remove();
                            }
                          }
                        });
                      }
                      self.btnConfig.loading = false;
                    });
                  },
                  onOk: () => {
                    self.btnConfig.loading = false;
                  }
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要取消的订单！",
                  duration: 5,
                  top: 80
                });
              }
            }
          },
          {
            text: "订单拦截", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                let param = {
                  ids: ids
                };
                axios({
                  url: "/p/cs/orderInterception",
                  method: "post",
                  cancelToken: true,
                  data: param
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要拦截的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "拆分订单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 1) {
                if (
                  (self.selection[0].PLATFORM === 4 &&
                    self.selection[0].PAY_TYPE === 2) ||
                  self.selection[0].PLATFORM === 7 ||
                  self.selection[0].PLATFORM === 50
                ) {
                  self.$Message.warning({
                    content:
                      "交易平台为当当，唯品会jitx，京东（货到付款）的订单不允许拆单！",
                    duration: 5,
                    top: 80
                  });
                  return;
                }
                if (
                  self.selection[0].IS_INRETURNING === 1 ||
                  self.selection[0].IS_INTERECEPT === 1
                ) {
                  self.$Message.warning({
                    content: "拦截、退款中的订单不允许拆单！",
                    duration: 5,
                    top: 80
                  });
                  return;
                }
                if (
                  self.selection[0].ORDER_STATUS ===
                    self.orderStatus.orderUnconfirmed ||
                  self.selection[0].ORDER_STATUS ===
                    self.orderStatus.orderOutofstock
                ) {
                  self.$store.commit("customize/TabHref", {
                    id: self.selection[0].ID,
                    type: "action",
                    name: "splitOrder",
                    label: "订单拆分",
                    query: {
                      id: self.selection[0].ID,
                      shopId: self.selection[0].CP_C_SHOP_ID,
                      tabTitle: "订单拆分"
                    }
                  });
                } else {
                  self.$Message.warning({
                    content: "只允许拆分未确认和缺货状态的订单！",
                    duration: 5,
                    top: 80
                  });
                }
              } else {
                self.$Message.warning({
                  content: "一次只能对一个订单进行拆分！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "添加赠品", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                let isAddGit = true;
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  if (item.PLATFORM === 50) {
                    isAddGit = false;
                  }
                });
                if (!isAddGit) {
                  self.$Message.warning({
                    content: "选择的订单中存在JITX订单, 不允许添加赠品！",
                    duration: 5,
                    top: 80
                  });
                  return;
                }
                let param = {
                  ids: ids
                };
                axios({
                  url: "/p/cs/checkGit",
                  method: "post",
                  cancelToken: true,
                  data: param
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.publicBouncedConfig =
                      publicDialogConfig.addGiftsConfig;
                    self.publicBouncedConfig.componentData = {
                      objid: ids
                    };
                    setTimeout(() => {
                      self.$children
                        .find(item => item.name === "addGifts")
                        .openConfirm();
                    }, 100);
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要添加赠品的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "新增退单", //按钮文本
            // 新增退单跳转页面
            btnclick: () => {
              let self = this;
              if (self.selection.length === 0) {
                self.$Message.warning({
                  content: "请选择需要新增退单记录！",
                  duration: 5,
                  top: 80
                });
                return false;
              }
              if (self.selection.length > 1) {
                self.$Message.warning({
                  content: "请选择一条记录！",
                  duration: 5,
                  top: 80
                });
                return false;
              }
              if (
                //已取消，系统作废
                self.selection[0].ORDER_STATUS == 7 ||
                self.selection[0].ORDER_STATUS == 8
              ) {
                self.$Message.warning({
                  content: `${self.selection[0].ID}订单需要生成退换货单的订单状态不能已取消、系统作废！`,
                  duration: 5,
                  top: 80
                });
                return false;
              } else if (
                //“待分配”、“未确认”、“缺货”、“已审核”、“传WMS中”、“配货中
                self.selection[0].ORDER_STATUS == 1 || //未确认
                self.selection[0].ORDER_STATUS == 2 || //缺货
                self.selection[0].ORDER_STATUS == 3 || //已审核
                self.selection[0].ORDER_STATUS == 4 || //配货中
                self.selection[0].ORDER_STATUS == 50 || //待分配
                self.selection[0].ORDER_STATUS == 21 //待传wms
              ) {
                self.$Message.warning({
                  content: `${self.selection[0].ID}订单需要发货后才能新增退单!`,
                  duration: 5,
                  top: 80
                });
                return false;
              }
              self.$store.commit("customize/TabOpen", {
                id: -1,
                type: "action",
                name: "returngood",
                label: "退换货订单新增",
                query: {
                  id: -1,
                  orderHrefReturnid: self.selection[0].ID,
                  isOrderHrefReturn: "order",
                  tabTitle: "退换货订单新增"
                }
              });
              // self.selection = [];
            } //按钮点击事件
          },
          {
            text: "修改备注", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                let ids = [];
                let ORDER_STATUS = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  ORDER_STATUS[index] = item.ORDER_STATUS;
                });
                self.publicBouncedConfig =
                  publicDialogConfig.changeRemarkConfig;
                self.publicBouncedConfig.componentData = {
                  ids: ids,
                  status: ORDER_STATUS
                };
                setTimeout(() => {
                  self.$children
                    .find(item => item.name === "changeRemark")
                    .openConfirm();
                }, 100);
              } else {
                self.$Message.warning({
                  content: "请选择需要修改备注的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          // {
          //   text: "工单", //按钮文本
          //   btnclick: () => {} //按钮点击事件
          // },
          {
            text: "缺货重新占单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                axios({
                  url: "/p/cs/queryshortagSearchOrder",
                  method: "post",
                  cancelToken: true,
                  data: { ids: ids }
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要缺货重新占单的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "福袋缺货重抽", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                axios({
                  url: "/p/cs/queryFortuneBagShortage",
                  method: "post",
                  cancelToken: true,
                  data: { ids: ids }
                }).then(function(res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode == 27 || event.keyCode == 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要福袋缺货重新占单的记录！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "复制订单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 1) {
                let query = {
                  copyOrder: true,
                  id: self.selection[0].ID
                };
                self.$store.commit("customize/TabHref", {
                  id: -1,
                  type: "action",
                  name: "orderManageAdd",
                  label: "订单管理新增",
                  query: query
                });
              } else {
                self.$Message.warning({
                  content: "请选择一条需要复制的订单！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "备注导入", //按钮文本
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: "OUT_OF_STOCK_MEMO"
              };
              _this.importTable.confirmTitle = "备注导入";
              _this.$children
                .find(item => item.name === "importTable")
                .openConfirm();
            } //按钮点击事件
          },
          {
            text: "查询分配物流", //按钮文本
            btnclick: () => {
              this.distributeLogisticsModal = true;
            } //按钮点击事件
          },
          {
            text: "查询分配仓库", //按钮文本
            btnclick: () => {
              this.distributeWarehouseModal = true;
            } //按钮点击事件
          },
          {
            text: "选中分配物流", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 0) {
                self.$Message.warning({
                  content: "请选择需要重新分配物流的订单！",
                  duration: 5,
                  top: 80
                });
                return;
              }
              self.distributeLogisticsModal = true;
              self.checkedFlag = true;
            } //按钮点击事件
          },

          {
            text: "选中分配仓库", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length === 0) {
                self.$Message.warning({
                  content: "请选择需要重新分配仓库的订单！",
                  duration: 5,
                  top: 80
                });
                return;
              }
              self.distributeWarehouseModal = true;
              self.checkedFlag = true;
            } //按钮点击事件
          },
          {
            text: "更改为平台发货", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                self.btnConfig.loading = true;
                let ids = [];
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                });
                let param = {
                  ids: ids
                };
                axios({
                  url: "/p/cs/doManualDeliveryOrder",
                  method: "post",
                  cancelToken: true,
                  data: param
                }).then(function (res) {
                  if (res.data.code === 0) {
                    self.$Message.success(res.data.message);
                    self.getData();
                    self.selection = [];
                  } else {
                    self.$Modal.error({
                      title: "提示",
                      content: res.data.message,
                      cancelType: true,
                      titleAlign: "left",
                      mask: true,
                      draggable: true,
                      keyDown: event => {
                        if (event.keyCode === 27 || event.keyCode === 13) {
                          self.$Modal.remove();
                        }
                      }
                    });
                  }
                  self.btnConfig.loading = false;
                });
              }else {
                self.$Message.warning({
                  content: "请选择需要更改为平台发货的记录！",
                  duration: 5,
                  top: 80
                });
              }
            }
          },
          {
            text: "批量退单", //按钮文本
            btnclick: () => {
              let self = this;
              if (self.selection.length > 0) {
                try{
                  self.checkBatchReturnOrder(self.selection);
                }catch(err){
                  self.$Message.error(err.message);
                  return;
                }
                self.batchReturnOrderModal = true;
              }else {
                self.$Message.warning({
                  content: "请选择需要批量退单的记录！",
                  duration: 5,
                  top: 80
                });
              }
            }
          },
          {
            text: "释放库存", //按钮文本
            btnclick: () => {
              let self = this;
              let ids = [];
              let statusFlag = false;
              if (self.selection.length > 0) {
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  if (item.ORDER_STATUS != 1) {
                    statusFlag = true;
                  }
                });
                if (statusFlag) {
                  self.$Message.warning({
                    content: "选择的订单中存在非未确认订单, 不允许释放库存！",
                    duration: 5,
                    top: 80
                  });
                  return;
                }
                self.btnConfig.loading = true;
                this.$Modal.info({
                  title: '提示',
                  content: '是否确定将选择的订单占用的库存释放？',
                  mask: true,
                  showCancel: true,
                  okText: '取消',
                  cancelText: '确定',
                  onCancel: () => {
                    axios({
                      url: "/p/cs/releaseInventory",
                      method: "post",
                      cancelToken: true,
                      data: { ids: ids }
                    }).then(function(res) {
                      if (res.data.code === 0) {
                        self.$Message.success(res.data.message);
                        self.getData();
                        self.selection = [];
                      } else {
                        self.$Modal.error({
                          title: "提示",
                          content: res.data.message,
                          cancelType: true,
                          titleAlign: "left",
                          mask: true,
                          draggable: true,
                          keyDown: event => {
                            if (event.keyCode === 27 || event.keyCode === 13) {
                              self.$Modal.remove();
                            }
                          }
                        });
                      }
                      self.btnConfig.loading = false;
                    });
                  },
                  onOk: () => {
                    self.btnConfig.loading = false;
                  }
                });
              } else {
                self.$Message.warning({
                  content: "请选择需要库存释放的订单！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "修改传仓标识", //按钮文本
            btnclick: () => {
              let self = this;
              let ids = [];
              let statusFlag = false;
              if (self.selection.length > 0) {
                self.selection.map((item, index) => {
                  ids[index] = item.ID;
                  if (item.ORDER_SOURCE !== '手工新增') {
                    statusFlag = true;
                  }else if (item.ORDER_STATUS !== 1 && item.ORDER_STATUS !== 2) {
                    statusFlag = true;
                  }
                });
                if (statusFlag) {
                  self.$Message.warning({
                    content: "选择的订单中存在非手工新增订单或者状态非未确认或缺货, 不允许修改传仓标识！",
                    duration: 5,
                    top: 80
                  });
                  return;
                }
                self.updateSendWmsFormConfig.formValue.MARK_SENDWMS = true;
                self.updateSendWmsFlagModal = true;
              } else {
                self.$Message.warning({
                  content: "请选择需要修改传仓标识的订单！",
                  duration: 5,
                  top: 80
                });
              }
            } //按钮点击事件
          },
          {
            text: "导入", //按钮文本
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = { tableName: "OC_B_ORDER" };
              _this.$children
                .find(item => item.name === "importTable")
                .openConfirm();
            } //按钮点击事件
          },
          {
            text: "导出", //按钮文本
            btnclick: () => {
              this.exportClick();
            } //按钮点击事件
          },
          {
            icon: "iconfont iconbj_setup", //按钮图标
            btnclick: () => {
              let self = this;
              if (self.iconDownIcon === "iconfont iconbj_down") {
                self.iconDownIcon = "iconfont iconbj_up";
              } else {
                self.iconDownIcon = "iconfont iconbj_down";
              }
              self.isShowSeniorOrOrdinary = true;
              self.publicBouncedConfig = {
                ...publicDialogConfig.dropSortConfig
              };
              setTimeout(() => {
                self.$children
                  .find(item => item.name === "setFromDrag")
                  .openConfirm();
              }, 100);
            } //按钮点击事件
          },
          {
            icon: "iconfont iconbj_col", //按钮图标
            name: "收藏",
            btnclick: () => {
              let self = this;
              self.setFavorite();
            } //按钮点击事件
          }
        ]
      },
      batchReturnFormConfig: {
        formValue: {
          IS_BACK:false
        },
        formData: [
          {
            style: 'checkbox',  //勾选框类型
            label: '是否原退',    //前面的文字
            value: 'IS_BACK', //输入框的值
            width: '6', //所占的宽度
            checked: false,  //是否勾选控制
          }
        ]
      },
      updateSendWmsFormConfig: {
        formValue: {
          MARK_SENDWMS:true
        },
        formData: [
          {
            style: 'checkbox',  //勾选框类型
            label: '标记传仓',    //前面的文字
            value: 'MARK_SENDWMS', //输入框的值
            width: '24', //所占的宽度
            checked: true,  //是否勾选控制
          }
        ]
      },
      // 高级搜索表单
      formConfig: {
        formValue: {},
        formData: []
      },
      // 状态枚举
      orderStatus: {
        orderUnconfirmed: 1, // 未确认
        waitDistribution: 50, // 待分配
        audited: 3, // 已审核
        waitSendWMS: 21, // 待传wms
        distributioning: 4, // 配货中
        orderOutofstock: 2, // 缺货
        orderCancel: 7, // 已取消
        orderSystemInvalid: 8 // 系统作废
      },
      formValObj: {},
      isExport: false
    };
  },
  activated() {
    // 获取默认数据
    this.jordanTableConfig.current = 1;
    // this.selection = [];
    // this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions("btnConfig","orderManager");
    });
    // 获取普通搜索的标签数据
    // this.getSearchData();
    // 获取from数据
    // this.getFromData();
    this.getHeaderList();
    if (this.$route.query.type === "workID") {
      this.searchMethod("workID");
      this.selectValue = [];
    } else {
      setTimeout(() => {
        this.searchMethod();
      }, 500)
    }

    // // 获取默认数据
    // 计算高度
    let self = this;
    self.setTableHeight();
  },
  methods: {
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      // 清除高级搜索
      _this.formConfig.formValue = {
        ID: "",
        SOURCE_CODE: "",
        EXPRESSCODE: "",
        RECEIVER_NAME: "",
        RECEIVER_MOBILE: "",
        BUYER_MESSAGE: "",
        PS_C_SKU_ECODE: "",
        SELLER_MEMO: "",
        QTY_ALL: {
          value1: "",
          value2: ""
        },
        BILL_NO: "",
        USER_NICK: "",
        ORDER_AMT: {
          value1: "",
          value2: ""
        }
      };
      let fromdata = new FormData();
      const params = {
        table: "OC_B_ORDER",
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      fromdata.append("param", JSON.stringify(params));
      axios({
        url: "/p/cs/getSeniorQueryCondition",
        // url: "/p/cs/queryListConfig",
        method: "post",
        data: fromdata
      }).then(res => {
        // 高级查询
        let formData = [];
        if (res.data.data) {
          res.data.data.highSearch.map((item, index) => {
            if (item.type === "date") {
              formData[index] = {
                style: item.tabth.isfilter ? "date" : "", //输入框类型
                type: "datetimerange", //文本框类型的input
                label: item.tabth.name, //输入框前文字
                value: item.tabth.colname, //输入框的值
                // format: "yyyy-MM-dd hh:mm:ss",
                width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: "md-alarm", //输入框后带的图标,暂只有输入框支持
                placeholder: "", //占位文本，默认为请输入
                ghost: false, //是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, //表单回车事件
                iconclick: () => {}, //点击icon图标事件
                clearable: true
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
            }
            if (item.type === "propInput") {
              formData[index] = {
                style: item.tabth.isfilter ? "popInput" : "", //输入框弹框单多选
                width: "6",
                itemdata: {
                  col: 1,
                  colid: item.tabth.colid,
                  colname: item.tabth.colname, //当前字段的名称
                  datelimit: "all",
                  display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                  fkdisplay: item.tabth.fkdisplay, //外键关联类型
                  fkdesc: item.tabth.fkdesc,
                  inputname: "CP_C_STORE_IDS:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
                  isfk: true, //是否有fk键
                  isnotnull: false, //是否必填
                  isuppercase: false, //是否转大写
                  length: 65535, //最大长度是多少
                  name: item.tabth.name, //input前面显示的lable值
                  readonly: false, //是否可编辑，对应input   readonly属性
                  reftable: item.tabth.reftable,
                  reftableid: item.tabth.reftableid,
                  row: 1,
                  statsize: -1,
                  type: item.tabth.type, //这个是后台用的
                  valuedata: "" //这个是选择的值
                }
              };
              if (item.tabth.precolnameslist) formData[index].itemdata.precolnameslist = item.tabth.precolnameslist ? item.tabth.precolnameslist : []
            }
            if (item.type === "text") {
              formData[index] = {
                style: item.tabth.isfilter ? "input" : "", //输入框类型
                label: item.tabth.name, //输入框前文字
                value: item.tabth.colname, //输入框的值
                width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: "", //输入框后带的图标,暂只有输入框支持
                clearable: true,
                placeholder: "", //占位文本，默认为请输入
                ghost: false, //是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, //表单回车事件
                iconclick: () => {} //点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = "";
            }
            if (item.type === "number") {
              formData[index] = {
                // style: item.tabth.isfilter ? "input" : "", //输入框类型
                style: item.tabth.isfilter ? "bothInput" : "", //输入框类型
                label: item.tabth.name, //输入框前文字
                value: item.tabth.colname, //输入框的值
                clearable: true,
                regx: _this.determineTheRegular(item.tabth.colname),
                width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                icon: "", //输入框后带的图标,暂只有输入框支持
                placeholder: "", //占位文本，默认为请输入
                ghost: false, //是否关闭幽灵按钮，默认开启
                inputenter: () => {
                  _this.loadData();
                }, //表单回车事件
                iconclick: () => {} //点击icon图标事件
              };
              _this.formConfig.formValue[item.tabth.colname] = {
                value1: "", //第一个数字框绑定的值
                value2: "" //第二个数字框绑定的值
              };
            }
            if (item.type === "select") {
              formData[index] = {
                style: item.tabth.isfilter ? "select" : "", //下拉框类型
                label: item.tabth.name, //下拉框前的值
                width: "6", //所占宽度宽度
                placeholder: "", //占位文本，默认为请输入
                value: item.tabth.colname, //输入框的值
                multiple: true, //布尔值,下拉框是否开启多选,默认为不开启
                selectChange: () => {}, //选中事件，默认返回选中的值
                options: _this.converSelect(item.tabth.combobox)
              };
              _this.formConfig.formValue[item.tabth.colname] = [];
            }
          });
          _this.formConfig.formData = formData;
          // 表头赋值
          // debugger
          res.data.data.tableHeader.forEach(ele => (ele.align = "center"));
          _this.jordanTableConfig.columns = res.data.data.tableHeader;

          // 下拉数据 定义
          let dropList = [];
          res.data.data.queryInfo.forEach((item, index) => {
            if (item.type === "Select") {
              dropList[index] = {
                label: item.displayName, //字段名称
                column: item.queryName, //字段
                placeholder: "", // 占位文本
                type: item.type === "date" ? "DatePicker" : item.type, //类型
                componentAttribute: {
                  multiple: true,
                  "label-in-value": true
                }, // 组件属性
                list: item.list, //选项
                value: "" //选中值
              };
            } else if (item.type === "DropDownSelectFilter") {
              dropList[index] = {
                label: item.displayName, //字段名称
                column: item.queryName, //字段
                placeholder: "", // 占位文本
                type: item.type, //类型 item.type
                value: "",
                componentAttribute: {
                  totalRowCount: 0,
                  single: false, // 是否是单选
                  data: {
                    start: 0,
                    tabth: [],
                    row: []
                  },
                  pageSize: 10,
                  AutoData: []
                }, // 组件属性
                componentEvent: {
                  "on-popper-show": e => {
                    let premtype = '';
                    if (item.selectTab.tabth.name === '店铺') {
                      premtype = 'CP_C_SHOP_PERMISSION_ID';
                    } else if (item.selectTab.tabth.name === '发货仓库') {
                      premtype = 'CP_C_MAIN_STORE_ID';
                    }
                    let params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: 0,
                      range: 10,
                      "precolnameslist":[
                        {
                          "iswrite":"false",
                          "refcol":"ID",
                          "premtype":premtype
                        }
                      ],
                    };
                    let data = new URLSearchParams();
                    data.append("searchdata", JSON.stringify(params));
                    axios({
                      url: "/p/cs/QueryList",
                      method: "post",
                      data: data
                    }).then(function(res) {
                      dropList[index].componentAttribute.data = res.data.datas;
                      dropList[index].componentAttribute.totalRowCount =
                        res.data.datas.totalRowCount;
                    });
                  },
                  "on-page-change": e => {
                    let premtype = '';
                    if (item.selectTab.tabth.name === '店铺') {
                      premtype = 'CP_C_SHOP_PERMISSION_ID';
                    } else if (item.selectTab.tabth.name === '发货仓库') {
                      premtype = 'CP_C_MAIN_STORE_ID';
                    }
                    let params = {
                      isdroplistsearch: true,
                      refcolid: item.selectTab.tabth.colid,
                      fixedcolumns: {},
                      startindex: (e - 1) * 10,
                      range: 10,
                      "precolnameslist":[
                        {
                          "iswrite":"false",
                          "refcol":"ID",
                          "premtype":premtype
                        }
                      ],
                    };
                    let data = new URLSearchParams();
                    data.append("searchdata", JSON.stringify(params));
                    axios({
                      url: "/p/cs/QueryList",
                      method: "post",
                      data: data
                    }).then(function(res) {
                      dropList[index].componentAttribute.data = res.data.datas;
                      dropList[index].componentAttribute.totalRowCount =
                        res.data.datas.totalRowCount;
                    });
                  }
                }
              };
            } else {
              dropList[index] = {
                label: item.displayName, //字段名称
                column: item.queryName, //字段
                placeholder: "", // 占位文本
                type: item.type === "date" ? "DatePicker" : item.type, //类型
                componentAttribute:
                  item.type === "date"
                    ? {
                        type: "datetimerange",
                        value: _this.getCurrentTime(), // ["2018-09-07 09:09:09","2018-09-07 09:09:10"]
                        isEmitOnChange: true
                      }
                    : {}, // 组件属性
                componentEvent: {
                  "on-enter": () => {
                    setTimeout(() => {
                      _this.searchMethod();
                    }, 100);
                  }
                }, //组件事件
                list: item.list, //选项
                value: "" //选中值
              };
            }
            if (item.queryName === "PAY_TIME") {
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
          let tagList = [];
          res.data.data.label.map((item, index) => {
            tagList[index] = {
              label: item.text,
              value: item.val + "",
              key: item.key,
              sort: item.sort,
              trigger: "click"
            };
          });
          _this.tagList[0].list = tagList;
          _this.setSearchOption();
        }
      });
    },
    // 展开 并获取from页面数据
    shutDownOrbounceOff() {
      let self = this;
      self.isShowFromLoading = true;
      if (self.iconDownIcon === "iconfont iconbj_down") {
        // 打开高级搜索
        self.iconDownIcon = "iconfont iconbj_up";
        self.labelData = [];
        self.queryInfoData = [];
        self.clearFromListValue = true;
        self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
      } else {
        // 关闭高级搜索
        self.clearFromListValue = false;
        self.iconDownIcon = "iconfont iconbj_down";
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
      setTimeout(() => {
        var slideBox = document.getElementById("IntegrateSearchFilter");
        if (slideBox) {
          setTimeout(() => {
            var pageUl = document.querySelector(".burgeon-dropdown-menu")
              .childNodes[0];
            pageUl.click();
          }, 200);
        }
      }, 100);
    },
    // 判断使用正则
    determineTheRegular(val) {
      let regx = "";
      switch (val) {
        case "ORDER_AMT": // 订单金额
          regx = /^[1-9][0-9]{0,}$/;
          break;
        case "QTY_ALL": // 商品数量
          regx = /^[1-9][0-9]{0,}$/;
          break;
        default:
          regx = "";
      }
      return regx;
    },
    // 获取当前时间
    getCurrentTime() {
      let self = this;
      let timestamp = Date.parse(new Date());
      let SevenDaysTimestamp = Date.parse(new Date()) - 7 * 24 * 3600 * 1000;
      let defaultTimeArr = [];
      defaultTimeArr[0] = `${self.dateLong2String(
        SevenDaysTimestamp
      )} 00:00:00`;
      defaultTimeArr[1] = `${self.dateLong2String(timestamp)} 23:59:59`;
      return defaultTimeArr;
    },
    // 时间戳转化yyyy-mm-dd
    dateLong2String(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    // 数组标准时间转换成yyyy-mm-dd格式
    getTimesValue(time) {
      let timeValue = "";
      var dateone = new Date(time[0]).toJSON();
      var datetwo = new Date(time[1]).toJSON();
      var dateTimeOne = new Date(+new Date(dateone) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      var dateTimeTwo = new Date(+new Date(datetwo) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      timeValue = `${dateTimeOne}~${dateTimeTwo}`;

      if (timeValue === "1970-01-01 08:00:00~1970-01-01 08:00:00") {
        timeValue = "";
      }
      return timeValue;
    },

    // 时间戳转化为yyyy-mm-dd hh:mm:ss
    standardTimeConversiondateToStr(val) {
      var dateTime = new Date(val);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1; //js从0开始取
      var date = dateTime.getDate();
      var hour = dateTime.getHours();
      var minutes = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        second
      );
    },
    // 刷新按钮
    tableRefreshDetail() {
      this.getData();
    },
    //设置表格高度
    setTableHeight() {
      let self = this;
      const contentWidth = document.getElementsByClassName("main-content")[0]
        .clientWidth;
      const contentHeight = document.getElementsByClassName("main-content")[0]
        .clientHeight;
      let sumHeight = 25;
      sumHeight += document.getElementsByClassName("btn")[0].clientHeight;
      sumHeight += document.getElementsByClassName("from")[0].clientHeight;
      sumHeight += document.getElementsByClassName("jordan-label-box")[0]
        .clientHeight;
      sumHeight += document.getElementsByClassName("page-box")[0].clientHeight;
      let tableHeight = contentHeight - sumHeight;
      this.jordanTableConfig.height = tableHeight - 40;
    },

    // 字段选项组转换
    converSelect(val) {
      let list = [];
      val.map((item, index) => {
        list[index] = {
          label: item.limitdesc,
          value: item.limitval
        };
      });
      return list;
    },
    /*用于数据深拷贝*/
    reaptData(obj) {
      //深拷贝
      if (obj instanceof Array) {
        //array
        let temp = [];
        obj.forEach((item, index) => {
          let temp2 = [];
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
      } else {
        //obj
        let temp = {};
        for (var item in obj) {
          temp[item] = obj[item];
        }
        return temp;
      }
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
    //检索项方法
    searchMethod(isWork) {
      // 取的标签值
      let label = [];
      let queryInfo = [];
      this.selectValue.map((item, index) => {
        if (item.column === "tag") {
          label = item.selectedList;
        } else {
          if (item.type === "DatePicker") {
            queryInfo[index] = {
              type: "date",
              displayName: item.label,
              queryName: item.column,
              list: item.list,
              value: item.value
            };
          } else if (item.type === "Select") {
            queryInfo[index] = {
              type: item.type,
              displayName: item.label,
              queryName: item.column,
              value: item.value,
              list: item.selectedList
            };
          } else if (item.type === "DropDownSelectFilter") {
            queryInfo[index] = {
              type: item.type,
              displayName: item.label,
              queryName: item.column,
              value: item.value,
              list: item.selectedList
            };
          } else {
            queryInfo[index] = {
              type: item.type,
              displayName: item.label,
              queryName: item.column,
              value: item.value.replace(/(^\s*)|(\s*$)/g, ""),
              list: item.list
            };
          }
        }
      });
      let labelData = [];
      label.map((item, index) => {
        labelData[index] = {
          val: item.value,
          text: item.label,
          sort: item.sort,
          key: item.key
        };
      });
      if (this.$route.query.type === "workID" && isWork === "workID") {
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
    distributeLogistics(){
      if(this.checkedFlag){
        this.distributeLogisticsByChecked();
        this.checkedFlag = false;
      }else{
        this.distributeLogisticsByQuery();
      }
    },
    distributeLogisticsByQuery(){
      let self = this;
      self.selection = [];
      if (self.clearFromListValue) self.queryInfoData = [];
      let param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current
        },
        label: self.labelData, //标签
        queryInfo: self.queryInfoData, //普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      let searchdata ={
        table:"OC_B_ORDER",
        column_include_uicontroller:true,
        fixedcolumns:param
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "重新分配物流");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "重新分配物流");
      axios({
        url: "/p/cs/reallocateLogistics",
        method: "post",
        cancelToken: true,
        data: fromdata
      }).then(res=>{
        this.$Message.success("后台重新分配物流中...");
      })
    },
    distributeLogisticsByChecked(){
      let self = this;
      self.btnConfig.loading = true;
      let ids = [];
      self.selection.map((item, index) => {
        ids[index] = item.ID;
      });
      let param = {
        ids: ids,
      };
      let searchdata ={
        table:"OC_B_ORDER",
        column_include_uicontroller:true,
        fixedcolumns:param
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "重新分配物流");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "重新分配物流");
      axios({
        url: "/p/cs/selectReallocateLogistics",
        method: "post",
        data: fromdata
      }).then(function(res) {
        self.$Message.success("后台重新分配物流中...");
        self.btnConfig.loading = false;
      });
    },
    distributeWarehouse(){
      if(this.checkedFlag){
        this.distributeWarehouseByChecked();
        this.checkedFlag = false;
      }else{
        this.distributeWarehouseByQuery();
      }
    },
    distributeWarehouseByChecked(){
      let self = this;
      self.btnConfig.loading = true;
      let ids = [];
      self.selection.map((item, index) => {
        ids[index] = item.ID;
      });
      let param = {
        ids: ids,
      };
      let searchdata ={
        table:"OC_B_ORDER",
        column_include_uicontroller:true,
        fixedcolumns:param
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "重新分配仓库");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "重新分配仓库");
      axios({
        url: "/p/cs/selectReallocateWarehouse",
        method: "post",
        data: fromdata
      }).then(function(res) {
        self.$Message.success("后台重新分配仓库中...");
        self.btnConfig.loading = false;
      });
    },

    distributeWarehouseByQuery(){
      let self = this;
      self.selection = [];
      if (self.clearFromListValue) self.queryInfoData = [];
      let param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current
        },
        label: self.labelData, //标签
        queryInfo: self.queryInfoData, //普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      let searchdata ={
        table:"OC_B_ORDER",
        column_include_uicontroller:true,
        fixedcolumns:param
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "重新分配仓库");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "重新分配仓库");
      axios({
        url: "/p/cs/reallocateWarehouse",
        method: "post",
        cancelToken: true,
        data: fromdata
      }).then(res=>{
        this.$Message.success("后台重新分仓库中...");
      })
    },
    loadData() {
      let arr = [];
      this.formConfig.formData.map((item, index) => {
        if (item.style === "popInput") {
          arr[index] = {
            type: "Select",
            queryName: item.itemdata.colname,
            value: item.itemdata.pid === undefined ? "" : item.itemdata.pid
          };
        }
      });
      let keyArr = [];
      for (let key in this.formConfig.formValue) {
        this.formConfig.formData.map((item, index) => {
          if (item.style !== "popInput") {
            if (key === item.value) {
              if (item.style === "date") {
                keyArr[index] = {
                  type: item.style,
                  queryName: item.value,
                  value: this.getTimesValue(this.formConfig.formValue[key])
                };
              } else if (item.style === "input") {
                keyArr[index] = {
                  type: "Input",
                  queryName: item.value,
                  value: this.formConfig.formValue[key]
                };
              } else if (item.style === "bothInput") {
                keyArr[index] = {
                  type: "Input",
                  queryName: item.value,
                  value: `${this.formConfig.formValue[key].value1.replace(
                    /(^\s*)|(\s*$)/g,
                    ""
                  )}~${this.formConfig.formValue[key].value2.replace(
                    /(^\s*)|(\s*$)/g,
                    ""
                  )}`
                };
              } else if (item.style === "select") {
                keyArr[index] = {
                  type: "Select",
                  queryName: item.value,
                  value:
                    this.formConfig.formValue[key].join(",") === "bSelect-all"
                      ? ""
                      : this.formConfig.formValue[key].join(",")
                };
              }
            }
          }
        });
      }
      let highSearchData = [...this.notempty(arr), ...keyArr];
      this.highSearchData = this.notempty(highSearchData);
      this.jordanTableConfig.current = 1;
      this.getData();
    },

    //  获取页面数据
    async getData() {
      let self = this;
      self.selection = [];
      self.jordanTableConfig.loading = true;
      if (self.clearFromListValue) self.queryInfoData = [];
      let param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current
        },
        label: self.labelData, //标签
        queryInfo: self.queryInfoData, //普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      try {
        let res = await axios({
          url: "/p/cs/getOrderList",
          method: "post",
          cancelToken: true,
          data: fromdata
        });
        self.jordanTableConfig.loading = false;
        if (res.data.code === 0) {
          if (!res.data.data) {
            self.jordanTableConfig.data = [];
            self.jordanTableConfig.total = 0;
          } else {
            self.jordanTableConfig.total = res.data.data.totalSize;
            self.jordanTableConfig.data = res.data.data.queryOrderResultList;
            self.jordanTableConfig.data.forEach(item => {
              if (
                item.ORDER_STATUS === self.orderStatus.orderCancel ||
                item.ORDER_STATUS === self.orderStatus.orderSystemInvalid
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
            top: 80
          });
        }
      } catch (err) {}
    },
    checkBatchReturnOrder(selection){
      let self = this;
      if(selection.length > 80){
        throw new Error('请选择不超过80笔订单的数据！');
      }
      for(let i=0; i < selection.length; i++){
        let item = selection[i];
        if (item.ORDER_STATUS === self.orderStatus.orderCancel || item.ORDER_STATUS === self.orderStatus.orderSystemInvalid ){
          throw new Error(item.ID + '订单需要生成退换货单的订单状态不能已取消、系统作废！');
        }else if(item.ORDER_STATUS === self.orderStatus.waitDistribution || item.ORDER_STATUS === self.orderStatus.orderUnconfirmed  || item.ORDER_STATUS === self.orderStatus.orderOutofstock  || item.ORDER_STATUS === self.orderStatus.audited  || item.ORDER_STATUS === self.orderStatus.waitSendWMS  || item.ORDER_STATUS === self.orderStatus.distributioning){
          throw new Error('存在未发货订单,不能进行批量新增退换货订单操作！');
        }
      }
    },
    onBatchReturnOrderCancel(){
      this.batchReturnFormConfig.formValue.IS_BACK = false;
    },
    updateSendWmsCancel(){
      // this.updateSendWmsFormConfig.formValue.MARK_SENDWMS = false;
    },
    doBatchReturnOrder(){
      let self = this;
      self.btnConfig.loading = true;
      let ids = [];
      self.selection.map((item, index) => {
        ids[index] = item.ID;
      });
      let param = {
        ids: ids,
        is_back: self.batchReturnFormConfig.formValue.IS_BACK
      };
      let searchdata ={
        table:"OC_B_ORDER",
        column_include_uicontroller:true,
        fixedcolumns:param
      };
      let fromdata = new FormData();
      fromdata.append("searchdata", JSON.stringify(searchdata));
      fromdata.append("filename", "批量退单");
      fromdata.append("filetype", " .xlsx");
      fromdata.append("showColumnName", true);
      fromdata.append("menu", "批量退单");
      axios({
        url: "/p/cs/doBatchReturnOrder",
        method: "post",
        cancelToken: true,
        data: fromdata
      }).then(function (res) {
        self.batchReturnFormConfig.formValue.IS_BACK = false;
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          // self.selection = [];
          self.$store.commit("customize/TabOpen", {
            id: res.data.data,
            type: "singleView",
            name: "singleView",
            label: "我的任务",
            query: {
              id: res.data.data,
              pid: "10010",
              ptitle: "我的任务",
              ptype: "table",
              tabTitle: "我的任务",
              tableName: "CP_C_TASK"
            }
          });
        } else {
          self.$Modal.error({
            title: "提示",
            content: res.data.message,
            cancelType: true,
            titleAlign: "left",
            mask: true,
            draggable: true,
            keyDown: event => {
              if (event.keyCode === 27 || event.keyCode === 13) {
                self.$Modal.remove();
              }
            }
          });
        }
        self.btnConfig.loading = false;
      });
    },
    updateSendWms(){
      let self = this;
      self.btnConfig.loading = true;
      let ids = [];
      self.selection.map((item, index) => {
        ids[index] = item.ID;
      });
      axios({
        url: "/p/cs/updateSendWmsFlag",
        method: "post",
        cancelToken: true,
        data: { ids: ids,MARK_SENDWMS: this.updateSendWmsFormConfig.formValue.MARK_SENDWMS }
      }).then(function(res) {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.getData();
          self.selection = [];
        } else {
          self.$Modal.error({
            title: "提示",
            content: res.data.message,
            cancelType: true,
            titleAlign: "left",
            mask: true,
            draggable: true,
            keyDown: event => {
              if (event.keyCode === 27 || event.keyCode === 13) {
                self.$Modal.remove();
              }
            }
          });
        }
        self.btnConfig.loading = false;
      });
    },
    //  获取页面数据
    async getData1() {
      let self = this;
      self.jordanTableConfig.loading = true;
      if (self.clearFromListValue) self.queryInfoData = [];
      if (
        self.$route.query.type == "workID" &&
        self.$route.query.ID !== undefined
      ) {
        let arr = [
          { type: "Input", queryName: "ID", value: self.$route.query.ID }
        ];
        if (!self.highSearchData.length)
          self.highSearchData = self.highSearchData.concat(arr);
      } else {
        if (!self.highSearchData.length)
          self.highSearchData = JSON.parse(self.$route.query.param);

        if (self.$route.query.label !== undefined) {
          self.labelData = JSON.parse(self.$route.query.label);
        }
      }

      let param = {
        page: {
          pageSize: self.jordanTableConfig.pageSize,
          pageNum: self.jordanTableConfig.current
        },
        label: self.labelData, //标签
        queryInfo: self.queryInfoData, //普通搜索
        status: self.statusData,
        highSearch: self.highSearchData
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      try {
        let res = await axios({
          url: "/p/cs/getOrderList",
          method: "post",
          cancelToken: true,
          data: fromdata
        });
        self.jordanTableConfig.loading = false;
        if (res.data.code === 0) {
          if (!res.data.data) {
            self.jordanTableConfig.data = [];
            self.jordanTableConfig.total = 0;
          } else {
            self.jordanTableConfig.total = res.data.data.totalSize;
            self.jordanTableConfig.data = res.data.data.queryOrderResultList;
            self.jordanTableConfig.data.forEach(item => {
              if (
                item.ORDER_STATUS === self.orderStatus.orderCancel ||
                item.ORDER_STATUS === self.orderStatus.orderSystemInvalid
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
            top: 80
          });
        }
      } catch (err) {}
      this.selectValue = [];
    },
    // 标准时间转化为yyyy-mm-dd
    standardTimeConversion(val) {
      var d = new Date(val);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
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
      this.$store.commit("customize/TabHref", {
        id: -1,
        type: "action",
        name: "orderManageDetail",
        label: "订单管理编辑",
        query: {
          id: row.ID
        } //row.id
      });
    },
    //返回置换两行索引
    onDragDrop(columns) {
      this.jordanTableConfig.columns = columns;
    },
    /**
     * 扩展Array方法, 去除数组中空白数据
     */
    notempty(val) {
      var arr = [];
      val.map((val, index) => {
        //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
        if (val !== "" && val != undefined) {
          arr.push(val);
        }
      });
      return arr;
    },

    // 导出
    exportClick() {
      const _this = this;
      if (_this.selection.length) {
        if (this.isExport) return this.$Message.error("有一项导出正在进行中");
        this.isExport = true;
        let ids = [];
        for (let i = 0; i < _this.selection.length; i++) {
          ids.push(_this.selection[i].ID);
        }
        let fromdata = new FormData();
        let idList = { idList: ids };
        fromdata.append("param", JSON.stringify(idList));
        axios({
          url: "/p/cs/exportOcBOrder",
          method: "post",
          data: fromdata
        }).then(res => {
          this.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            let mes = res.data.message || "导出成功！";
            _this.$Message.success(mes);
            _this.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            let err = res.data.message || "失败！";
            _this.$Message.error(err);
          }
        });
      } else {
        if (_this.jordanTableConfig.data.length === 0)
          return _this.$Message.error("列表没有数据,无法导出!");
        if (_this.statusData.value == 0) {
          _this.warningModal = true;
        } else {
          _this.warningOk();
        }
      }
    },

    // 警告框确认
    warningOk() {
      const _this = this;
      if (this.isExport) return this.$Message.error("有一项导出正在进行中");
      this.isExport = true;
      let param = {
        page: {
          pageSize: 999999,
          pageNum: 1
        },
        label: _this.labelData, //标签
        queryInfo: _this.queryInfoData, //普通搜索
        status: _this.statusData,
        highSearch: _this.highSearchData
      };
      let fromdata = new FormData();
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/p/cs/exportOcBOrder",
        method: "post",
        data: fromdata
      }).then(res => {
        this.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          let mes = res.data.message || "导出成功！";
          _this.$Message.success(mes);
          _this.downloadUrlFile(res.data.data);
          // return (window.location = res.data.data);
        } else {
          let err = res.data.message || "失败！";
          _this.$Message.error(err);
        }
      });
    },
    // 数组对象根据子元素某各个key合并分组
    sonList(arr, key) {
      let obj = [];
      arr.map(item => {
        obj.push(item[key]);
      });
      return obj;
    },
    // 导出
    downloadUrlFile(src) {
      var download_file = {};
      if (typeof download_file.iframe == "undefined") {
        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = "none";
    }
  }
};
</script>

<style  lang='less'>
.burgeon-poptip-body-content {
  overflow-x: unset !important;
  overflow-y: unset !important;
}

.orderManager-box {
  .IntegrateSearchFilter {
    .popSelect
      .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-single
      .burgeon-select-selected-value {
      height: 35px !important;
      line-height: 35px !important;
    }
    .burgeon-select-selection-head {
      height: 35px !important;
      line-height: 35px !important;
    }
    .popSelect
      .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-placeholder,
    .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-selected-value {
      height: 35px !important;
      line-height: 35px !important;
    }
    .burgeon-integrate-search-filter-search-item-list {
      display: flex;
      align-items: center;
    }
    .burgeon-integrate-search-filter-search-item-title {
      display: flex;
      align-items: center;
    }
    .burgeon-input-icon {
      height: 35px !important;
      line-height: 35px !important;
    }
    .burgeon-integrate-search-filter-valid {
      width: 440px !important;
    }
    .burgeon-integrate-search-filter-valid .burgeon-input {
      height: 35px !important;
    }
    .burgeon-select-selection {
      height: 35px !important;
      line-height: 35px !important;
    }
    .burgeon-date-picker {
      width: 440px !important;
    }
    .burgeon-input .burgeon-input-default {
      height: 35px !important;
    }
  }
  .heigtFromListValue {
    height: 217px;
  }
  .burgeon-select-selection-head {
    height: 26px !important;
    line-height: 26px !important;
  }
  .burgeon-poptip {
    display: flex !important;
    align-items: center !important;
  }
  .burgeon-poptip-rel {
    display: flex !important;
    align-items: center !important;
  }
  /*.burgeon-table-cell {*/
  /*overflow: inherit !important;*/
  /*}*/
  // .burgeon-table td {
  //   height: 50px !important;
  // }
  .btn {
    margin-top: 8px;
  }
  .jordanLabel {
    margin-top: 8px;
  }
  .jordan-action-table {
    border-bottom: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
    border-left: 1px solid #dcdee2;
    padding: 5px 8px;
  }
  .from {
    border: 1px solid #d3d3d3;
    padding: 8px 10px;
    position: relative;
    .burgeon-col-span-6 {
      width: 20% !important;
    }
  }
  .from_loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
  .from-folding {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 3px 10px;
    background-color: #ed4014;
    color: white;
    font-size: 10px;
    z-index: 1001 !important;
  }

  .iconwangwang {
    animation: myfirst 2s infinite;
  }

  .orderTag {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @keyframes myfirst {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(-2px, -4px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
  // 按钮icon偏移问题
  .btn .burgeon-btn > .burgeon-icon {
    margin-left: 3px;
  }
}
.tableFooter {
  padding: 10px 10px 10px 0px;
  .tableFooter_border {
    padding: 2px 4px;
    border: 1px solid red;
  }
}
.burgeon-fkrp-select {
  width: 100%;
}
.burgeon-fkrp-select-icon {
  top: 9px !important;
}
</style>
