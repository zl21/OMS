<!--退换入库列表-->
<template>
  <div class="returnstoreage tableList">
    <!-- <input  type='hidden'  :value=IsDisabled /> -->
    <jordanButton :btnConfig="btnConfig"></jordanButton>
    <div class="form">
      <jordanForm :formConfig="formConfig" class="searchList"></jordanForm>
      <div class="fromLoading" v-show="isShowFromLoading">
        <Spin></Spin>
      </div>
    </div>
    <div class="tableContent">
      <!-- <jordanTable
        :jordanTableConfig="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @table-delete-detail="tableDeleteDetail"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      ></jordanTable> -->
      <div class="agLoading" v-show="agTableConfig.agLoading">
          <Spin fix>
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      <aTable
        ref="agGridChild"
        :agTableConfig="agTableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-row-dblclick="onRowDblclick"
      ></aTable>
    </div>
    <!-- 修改from表单 -->
    <jordanModal
      :title="setFromInput.confirmTitle"
      :titleAlign="setFromInput.titleAlign"
      :width="setFromInput.width"
      :scrollable="setFromInput.scrollable"
      :closable="setFromInput.closable"
      :draggable="setFromInput.draggable"
      :mask="setFromInput.mask"
      :mask-closable="setFromInput.maskClosable"
      :transfer="setFromInput.transfer"
      :name="setFromInput.name"
      :url="setFromInput.url"
      :keepAlive="setFromInput.keepAlive"
      :excludeString="setFromInput.excludeString"
      :componentData="setFromInput.componentData"
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
    <Modal v-model="warningModal" title="警告" width="420" @on-ok="warningOk" :mask="true">
      <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p>
    </Modal>
  </div>
</template>
<script>
import jordanButton from "professionalComponents/jordanButton";
import jordanForm from "professionalComponents/jordanForm";
import jordanTable from "professionalComponents/jordanActionTable";
import JDialog from "professionalComponents/JDialog";
import strUtil from "@/assets/js/__utils__/util";
import DateUtil from "@/assets/js/__utils__/date";
// import publicMethods from "@/assets/js/public/publicMethods";
import jordanModal from "professionalComponents/JDialog";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
import { isFavoriteMixin } from "@/assets/js/mixins/isFavorite";
let getCurrentTime = (() => {
  let t = new Date();
  return t.Format("yyyy-MM-dd 23:59:59");
})();
let addSevenDay = (() => {
  let d = new Date();
  let t = d.addDays(d, -7);
  return t.Format("yyyy-MM-dd 00:00:00");
})();

import axios from "axios";
import util from "@/assets/js/__utils__/util";
import aTable from 'professionalComponents/agGridTable.vue';
export default {
  components: {
    jordanButton,
    jordanForm,
    jordanTable,
    JDialog,
    jordanModal,
    aTable
  },
  mixins: [buttonPermissionsMixin, isFavoriteMixin],
  props: {},
  watch: {
    selection: {
      handler(list, oldlist) {
        this.btnConfig.buttons[2].disabled = !(
          this.selection && this.selection.length <= 1
        );
      }
    }
  },
  data() {
    return {
      isFavorite: false,
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
        url: "importTable",
        keepAlive: true,
        excludeString: "importTable", //将name传进去，确认不缓存
        componentData: {}
      },
      setFromInput: {
        refFuns: "confirmFun",
        confirmTitle: "排序表单",
        titleAlign: "center", //设置标题是否居中 center left
        width: "300",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "setFromInput", //组件名称
        url: "returngood/setFromInput",
        keepAlive: true,
        excludeString: "setFromInput", //将name传进去，确认不缓存
        componentData: {}
      },
      btnConfig: {
        typeAll: "error",
        buttons: [
          {
            text: "查找",
            btnclick: () => {
              this.requestBefore();
            }
          },
          {
            text: "新增",
            btnclick: () => {
              this.$store.commit("global/tabOpen", {
                customizedModuleId: "NEW", //id
                type: "C", //类型action
                customizedModuleName: "returnTreasuryAdd", //文件名
                label: "退货入库新增", //tab中文名
                query: Object.assign({
                  id: -1, //id
                  tabTitle: "退货入库新增" //tab中文名
                }) //带的参数
              });
            }
          },
          {
            text: "手工匹配",
            disabled: false,
            btnclick: () => {
              let self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              let ids = this.selection.map(item => {
                return item.ID;
              });
              if (ids.length === 0)
                return this.$Message.error("请选择一条明细手工匹配");
              if (ids.length > 1)
                return this.$Message.error("只能选择一条明细手工匹配");
              if (this.selection[0].IS_OFF_MATCH == 1)
                return this.$Message.error("此退货入库单已经关闭匹配，不允许选择");
              let id = ids[0];
              //需要验证是否能够进入手工匹配界面
              axios({
                url: "/api/cs/oc/oms/v1/manualMatchingCheck",
                method: "post",
                data: { id: id }
              }).then(res => {
                if (res.data.code === 0) {
                  self.$store.commit("customize/TabHref", {
                    id: id, //id
                    type: "action", //类型action
                    name: "manualMatching", //文件名
                    label: "退货入库-手工匹配", //tab中文名
                    query: Object.assign({
                      id: id, //id
                      tabTitle: "退货入库-手工匹配", //tab中文名
                      source: 2,
                      form: "list"
                    }) //带的参数
                  });
                } else {
                  let mes = res.data.message || "状态不匹配不能进入手动匹配";
                  self.$Message.error(mes);
                }
              });
            }
          },
          {
            text: "错发强制匹配",
            disabled: false,
            btnclick: () => {
              let self = this;
              self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              let ids = this.selection.map(item => {
                return item.ID;
              });
              if (ids.length === 0)
                return this.$Message.error("请选择一条明细错发强制匹配");
              if (ids.length > 1)
                return this.$Message.error("只能选择一条明细错发强制匹配");
              if (this.selection[0].IS_OFF_MATCH == 1)
                return this.$Message.error("此退货入库单已经关闭匹配，不允许选择");
              let id = ids[0];
              //需要验证是否能够进入错发强制匹配界面
              axios({
                url: "/api/cs/oc/oms/v1/manualMatchingCheck",
                method: "post",
                data: { id: id }
              }).then(res => {
                if (res.data.code === 0) {
                  self.$store.commit("customize/TabHref", {
                    id: id, //id
                    type: "action", //类型action
                    name: "manualMatching", //文件名
                    label: "退货入库-错发强制匹配", //tab中文名
                    query: Object.assign({
                      id: id, //id
                      tabTitle: "退货入库-错发强制匹配", //tab中文名
                      source: 3,
                      form: "list"
                    }) //带的参数
                  });
                } else {
                  let mes = res.data.message || "状态不匹配不能进入错发强制匹配";
                  self.$Message.error(mes);
                }
              });
            }
          },
          { // =======================================================暂时影藏
            text: "作废",
            isShow: false,
            btnclick: () => {
              this.selection = this.$refs.agGridChild.AGTABLE.getSelect();
              let ids = this.selection.map(item => {
                return item.ID;
              });
              if (ids.length === 0)
                return this.$Message.error(
                  "未选择退货入库单,请选择一条数据后再操作！"
                );
              axios({
                url: "/api/cs/oc/oms/v1/returnCancel",
                method: "post",
                data: { ids: ids }
              }).then(res => {
                if (res.data.code === 0) {
                  let mes = res.data.message || "作废操作成功";
                  this.$Message.success(mes);
                } else {
                  let mes = res.data.message || "作废操作失败";
                  this.$Message.error(mes);
                }
              });
            }
          },
          {
            type: "", //按钮类型
            text: "导入", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = { tableName: 'OC_B_REFUND_IN' }
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
              self.setFromInput.componentData = {
                typeName: 'OC_B_REFUND_IN',
              };
              setTimeout(() => {
                self.$children
                  .find(item => item.name === "setFromInput")
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
      formConfig: {
        flodClick: "a",
        formData: [],
        formValue: {},
        flodClick: () => {}
      },
      // tableConfig: {
      //   parentClass: "parentClass",
      //   isShowSelection: true,
      //   indexColumn: true,
      //   renderArr: [
      //     {
      //       key: "ID",
      //       render: (h, params) => {
      //         return h(
      //           "a",
      //           {
      //             style: {
      //               "text-decoration": "underline"
      //             }
      //           },
      //           params.row.ID
      //         );
      //       }
      //     },
      //     {
      //       key: "ORIG_ORDER_NO",
      //       render: (h, params) => {
      //         return h(
      //           "div",
      //           {
      //             on: {
      //               click: () => {
      //                 if (
      //                   !params.row.ORIG_ORDER_NO ||
      //                   params.row.ORIG_ORDER_NO === ""
      //                 )
      //                   return;
      //                 this.$store.commit("TabOpen", {
      //                   id: params.row.ORIG_ORDER_NO, //单据id
      //                   type: "action", //类型action
      //                   name: "orderManageDetail", //文件名
      //                   label: "零售发货单详情", //tab中文名
      //                   query: Object.assign({
      //                     id: params.row.ORIG_ORDER_NO, //单据id
      //                     tabTitle: "零售发货单详情" //tab中文名
      //                   }) //带的参数
      //                 });
      //               }
      //             }
      //           },
      //           params.row.ORIG_ORDER_NO
      //             ? [
      //               h(
      //                 "i",
      //                 {
      //                   class: "iconfont  iconliebiaowaijianguanlian",
      //                   style: {
      //                     color: "#0f8EE9"
      //                   }
      //                 }
      //                 //'&#xe625;'
      //               ),
      //               " " + params.row.ORIG_ORDER_NO
      //             ]
      //             : ""
      //         );
      //       }
      //     },
      //     {
      //       key: "ALL_SKU",
      //       render: (h, params) => {
      //         let num = 0;
      //         for (let i = 2; i < params.row.itemList.length; i++) {
      //           num += params.row.itemList[i].QTY;
      //         }
      //         if (
      //           params.row.itemList &&
      //           params.row.itemList.length !== 0
      //         ) {
      //           return h(
      //             "div",
      //             {
      //               style: {
      //                 display: "flex",
      //                 // "justify-content": "space-between"
      //               }
      //             },
      //             params.row.itemList.map((item, index) => {
      //               // debugger
      //               if (index < 2) {
      //                 return h(
      //                   "div",
      //                   {
      //                     style: {
      //                       padding: "4px 6px",
      //                       border: "1px solid #d3d3d3",
      //                       position: "relative",
      //                       marginRight: "10px"
      //                     }
      //                   },
      //                   [
      //                     h("span", {}, `${item.PS_C_PRO_ECODE},${item.PS_C_CLR_ENAME},${item.PS_C_SIZE_ENAME}`),
      //                     h(
      //                       "div",
      //                       {
      //                         style: {
      //                           "min-width": "16px",
      //                           height: "16px",
      //                           "line-height": "14px",
      //                           border: "1px solid #DCDEE2",
      //                           borderRadius: "9px",
      //                           backgroundColor: "#84C9E2",
      //                           "font-size": "6px",
      //                           position: "absolute",
      //                           top: "-1px",
      //                           right: "-8px",
      //                           zIndex: "1",
      //                           color: "white",
      //                           "text-align": 'center'
      //                         }
      //                       },
      //                       item.QTY
      //                     ),
      //                   ]
      //                 )
      //               } else if (index === 2) {
      //                 return h(
      //                   "div",
      //                   {
      //                     style: {
      //                       padding: "4px 6px",
      //                       border: "1px solid #d3d3d3",
      //                       position: "relative",
      //                       marginRight: "10px"
      //                     }
      //                   },
      //                   [
      //                     h("span", {}, '更多'),
      //                     h(
      //                       "div",
      //                       {
      //                         style: {
      //                           "min-width": "16px",
      //                           height: "16px",
      //                           "line-height": "14px",
      //                           border: "1px solid #DCDEE2",
      //                           borderRadius: "9px",
      //                           backgroundColor: "#84C9E2",
      //                           "font-size": "6px",
      //                           position: "absolute",
      //                           top: "-1px",
      //                           right: "-8px",
      //                           zIndex: "1",
      //                           color: "white",
      //                           "text-align": 'center'
      //                         }
      //                       },
      //                       num
      //                     ),
      //                   ]
      //                 )
      //               }
      //             })
      //           )
      //         }
      //       }
      //     }
      //   ],
      //   loading: false,
      //   pageShow: true, //控制分页是否显示
      //   btnsShow: true, //控制操作按钮是否显示
      //   searchInputShow: false, // 控制搜索框是否显示
      //   width: "", // 表格宽度
      //   height: "", // 表格高度
      //   border: true, //是否显示纵向边框
      //   current: 1, //当前页数
      //   total: 0, //设置总条数
      //   pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
      //   pageSize: 50 // 每页条数
      // },
      agTableConfig:{
        agLoading:false,
        columnDefs: [],
        rowData: [],
        renderArr:{},
        tableHeight:'600px',
        pagenation:{
          //设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [50, 200, 500, 2000]
        }
      },
      selection: [],
      searchObj: {},
      warningModal: false,
      isShowFromLoading: false,
      isExport: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions("btnConfig", "returnStoreageList");
    });
    this.getHeaderList();
  },
  activated() {
    this.agTableConfig.pagenation.current = 1;
  },
  methods: {
    // 获取高级查询&表头
    getHeaderList() {
      const _this = this;
      _this.isShowFromLoading = true;
      const params = { "table": "OC_B_REFUND_IN", "column_include_uicontroller": true, "fixedcolumns": {}, "multiple": [], "startindex": 0 }
      axios({
        url: "/api/cs/oc/oms/v1/DynamicList",
        method: "post",
        data: params
      }).then((res) => {
        // 高级查询
        let formData = [];
        res.data.data.search.date.map((item, index) => {
          switch (item.type) {
            case "date":
              formData[index] = {
              style: item.tabth.isfilter ? "date" : "", //输入框类型
              type: "datetimerange", //文本框类型的input
              label: item.tabth.name, //输入框前文字
              value: item.tabth.colname, //输入框的值
              format: "yyyy-MM-dd HH:mm:ss",
              width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: "md-alarm", //输入框后带的图标,暂只有输入框支持
              placeholder: "", //占位文本，默认为请输入
              transfer: true,
              ghost: false, //是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.request();
              }, //表单回车事件
              iconclick: () => { }, //点击icon图标事件
              clearable: true
            };
            item.tabth.name === '创建时间' ? _this.formConfig.formValue[item.tabth.colname] = [addSevenDay, getCurrentTime] : _this.formConfig.formValue[item.tabth.colname] = [];
            break;
            case "propInput" :
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
                inputname: item.tabth.inputname, //这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, //是否有fk键
                isnotnull: false, //是否必填
                isuppercase: false, //是否转大写
                length: 65535, //最大长度是多少
                name: item.tabth.name, //input前面显示的lable值
                readonly: false, //是否可编辑，对应input   readonly属性
                reftable: item.tabth.reftable,
                reftableid: item.tabth.reftableid,
                row: 1,
                scale: 0,
                statsize: -1,
                type: item.tabth.type, //这个是后台用的
                pid: "",
                valuedata: "" //这个是选择的值
              },
              oneObj: (e) => {
                _this.oneObjs(e);
              }
            };
            if (item.tabth.precolnameslist) formData[index].itemdata.precolnameslist = item.tabth.precolnameslist ? item.tabth.precolnameslist : [];
            break;
            case "text":
              formData[index] = {
              style: item.tabth.isfilter ? "input" : "", //输入框类型
              // type: "", //文本框类型的input
              label: item.tabth.name, //输入框前文字
              value: item.tabth.colname, //输入框的值
              width: item.tabth.name == '备注' ? "12" : "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: "", //输入框后带的图标,暂只有输入框支持
              clearable: true,
              placeholder: "", //占位文本，默认为请输入
              ghost: false, //是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.request();
              }, //表单回车事件
              iconclick: () => { } //点击icon图标事件
            };
            _this.formConfig.formValue[item.tabth.colname] = "";
            break;
            case "number":
              formData[index] = {
              style: item.tabth.isfilter ? "input" : "", //输入框类型
              // type: "", //文本框类型的input
              label: item.tabth.name, //输入框前文字
              value: item.tabth.colname, //输入框的值
              clearable: true,
              width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              icon: "", //输入框后带的图标,暂只有输入框支持
              placeholder: "", //占位文本，默认为请输入
              ghost: false, //是否关闭幽灵按钮，默认开启
              inputenter: () => {
                _this.request();
              }, //表单回车事件
              iconclick: () => { } //点击icon图标事件
            };
            _this.formConfig.formValue[item.tabth.colname] = "";
            break;
            case "select":
              formData[index] = {
              style: item.tabth.isfilter ? "select" : "", //下拉框类型
              label: item.tabth.name, //下拉框前的值
              width: "6", //所占宽度宽度
              clearable: true, // 是否显示下来清空按钮
              value: item.tabth.colname, //输入框的值
              multiple: true, //布尔值,下拉框是否开启多选,默认为不开启
              selectChange: () => { }, //选中事件，默认返回选中的值
              clearSelect: (e) => {
                if (e == 'RETURN_STATUS') {
                  _this.formConfig.formValue.RETURN_STATUS = '';
                } else if (e == 'IS_ADD') {
                  _this.formConfig.formValue.IS_ADD = '';
                } else if (e == 'IS_TOAG') {
                  _this.formConfig.formValue.IS_TOAG = '';
                } else if (e == 'IS_TOWMS') {
                  _this.formConfig.formValue.IS_TOWMS = '';
                } else if (e == 'BILL_TYPE') {
                  _this.formConfig.formValue.BILL_TYPE = '';
                } else if (e == 'IS_EXAMINE') {
                  _this.formConfig.formValue.IS_EXAMINE = '';
                } else if (e == 'IS_TODRP') {
                  _this.formConfig.formValue.IS_TODRP = '';
                } else if (e == 'IS_TRANSFER') {
                  _this.formConfig.formValue.IS_TRANSFER = '';
                }
              }, //点击清空按钮回调
              options: _this.converSelect(item.tabth.combobox)
            };
            _this.formConfig.formValue[item.tabth.colname] = [];
            break;
          };
        });
        _this.formConfig.formData = formData;
        // 表头赋值
        res.data.data.columns.forEach(item=>{
          item['field'] = item.key;
          item['headerName'] = item.title;
          delete item.key;
          delete item.title;
        })
        _this.agTableConfig.columnDefs = res.data.data.columns;
        _this.isShowFromLoading = false;
        setTimeout(() => {
          _this.request();
        }, 100)
      })

    },
    oneObjs(e) {
      const _this = this;
      _this.formConfig.formData.forEach(item => {
        if (item.itemdata && item.itemdata.name == e.name) {
          switch (item.itemdata.name) {
            case '物流公司':
              _this.formConfig.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
              break;
            case '入库仓库':
              _this.formConfig.formValue.IN_STORE_ID = item.itemdata.pid;
              break;
            case '批货编号':
              _this.formConfig.formValue.OC_B_REFUND_BATCH_ID = item.itemdata.pid;
              break;
          };
        }
      })
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
    parentClass() {
      return "";
    },
    requestBefore() {
      this.agTableConfig.pagenation.current = 1;
      this.request();
    },
    requestParams() {
      let params = {
        currentPage: this.agTableConfig.pagenation.current || 1, //当前页
        pageSize: this.agTableConfig.pagenation.pageSize //页大小
      };
      this.formConfig.formData.forEach(item => {
        if (item.value === "CREATETIME") return; //特殊处理
        if (item.value === "MATCH_STATUS" || item.value === 'IS_OFF_MATCH' || item.value === 'PRODUCT_MARK' || item.value === 'IN_STATUS') {
          let arr = this.formConfig.formValue[item.value];
          if (Object.prototype.toString.call(arr) === "[object Array]" && arr[0] === "bSelect-all") return
        }
        if (
          !strUtil.isObjectEmpty(item.itemdata) &&
          item.itemdata.colname !== "" &&
          item.itemdata.valuedata &&
          item.itemdata.valuedata !== ""
        ) {
          let colname = item.itemdata.colname;
          this.formConfig.formValue[colname] = item.itemdata.pid || "";
          params[colname] = this.formConfig.formValue[colname];
        } else if (item.value && this.formConfig.formValue[item.value] !== "") {
          //正常
          params[item.value] = this.formConfig.formValue[item.value];
        }
      });
      var CREATETIME = this.formConfig.formValue["CREATETIME"];
      if (CREATETIME && CREATETIME !== []) {
        if (CREATETIME[0] !== "")
          params.beginDate = CREATETIME[0] ? CREATETIME[0].Format("yyyy-MM-dd hh:mm:ss") : "";
        if (CREATETIME[1] !== "")
          params.endDate = CREATETIME[1] ? CREATETIME[1].Format("yyyy-MM-dd hh:mm:ss") : "";
      }

      return params;
    },
    request() {
      let self = this;
      self.selection = [];
      self.agTableConfig.agLoading = true;
      let params = this.requestParams();
      axios({
        url: "/api/cs/oc/oms/v1/ReturnStorageList",
        method: "post",
        data: params
      }).then(res => {
        //if (res.data.code === 1) {
        self.agTableConfig.agLoading = false;
        let data = res.data.data || {};
        self.agTableConfig.rowData = data.queryResult || [];
        self.agTableConfig.pagenation.total = data.totalSize;
        self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
        //}
      });
    },
    // 单击某二行时触发
    onRowDblclick(row, index) {
      this.$store.commit("global/tabOpen", {
        customizedModuleId: row.ID,
        type: "C",
        customizedModuleName: "returnTreasuryAdd",
        label: "退货入库详情",
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.request();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.request();
    },
    exportClick() {
      let self = this;
      self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
      if (self.selection.length) {
        if (this.isExport) return this.$Message.error('有一项导出正在进行中')
        this.isExport = true;
        let ids = [];
        for (let i = 0; i < self.selection.length; i++) {
          ids.push(self.selection[i].ID);
        }
        let fromdata = new FormData();
        let idList = { idList: ids };
        fromdata.append("param", JSON.stringify(idList));
        axios({
          url: "/api/cs/oc/oms/v1/exportOcBRefundIn",
          method: "post",
          // cancelToken: true,
          data: idList
        }).then(res => {
          self.isExport = false;
          if (res.data.code == 0 && res.data.data !== null) {
            let mes = res.data.message || "导出成功！";
            self.$Message.success(mes);
            self.downloadUrlFile(res.data.data);
            // return (window.location = res.data.data);
          } else {
            let err = res.data.message || "失败！";
            self.$Message.error(err);
          }
        });
      } else {
        if (self.tableConfig.data.length === 0)
          return self.$Message.error("列表没有数据,无法导出!");
        else self.warningModal = true;
      }
    },
    // 导出
    downloadUrlFile(src) {
      var download_file = {};
      if (typeof (download_file.iframe) == "undefined") {
        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = "none";
    },
    // 警告框确认
    warningOk() {
      let self = this;
      if (this.isExport) return this.$Message.error('有一项导出正在进行中')
      this.isExport = true;
      let arr = this.requestParams();
      arr.pageSize = 999999;
      let params = JSON.parse(JSON.stringify(arr));
      axios({
        url: "/api/cs/oc/oms/v1/exportOcBRefundIn",
        method: "post",
        data: params
      }).then(res => {
        self.isExport = false;
        if (res.data.code == 0 && res.data.data !== null) {
          let mes = res.data.message || "导出成功！";
          self.$Message.success(mes);
          // return (window.location = res.data.data);
          self.downloadUrlFile(res.data.data);
        } else {
          let err = res.data.message || "失败！";
          self.$Message.error(err);
        }
      });
    }
  }
};
</script>
<style lang='less' >
.returnstoreage {
  box-sizing: border-box;
  padding: 10px 0;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 12px !important;
  .form {
    display: flex;
    position: relative;
    .folding {
      top: 0px;
      right: 0px;
      position: absolute;
      padding: 2px 8px;
      color: white;
      //width: 30px;
      background: #fd6442;
    }
    .fromLoading {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 1000 !important;
    }
  }
  .tableContent {
    // position: relative;
    // display: flex;
    // flex: 1;
    // .jordan-table-box {
    //   display: flex;
    //   flex-direction: column;
    //   width: 100%;
    //   height: calc(100% - 20px) !important;
    // }
    width: 100%;
    height: 100%;
  }

  .searchList {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    border: 1px solid #d8d8d8;
    -webkit-transition: height 0.5s;
    transition: height 0.5s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 0 !important;
    overflow: hidden;
    // .item-input input {
    //   width: calc(100% - 10px) !important;
    // }

    .burgeon-select-selection-head {
      line-height: 26px;
    }
  }

  .burgeon-btn > .burgeon-icon {
    line-height: 1;
    margin-right: -3px;
    vertical-align: middle;
  }
}
</style>

