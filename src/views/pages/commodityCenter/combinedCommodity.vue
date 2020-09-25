<!--组合商品编码新增和编辑页面-->
<template>
  <div class="jq-combined-commodity">
    <div class="jq-combined-commodity-new" v-if="objid==='-1'">
      <div class="btn-operate">
        <jordanButton :btnConfig="btnConfig"></jordanButton>
      </div>
      <jordan-status-flag :statusName="statusName"></jordan-status-flag>
      <div class="item-collapse">
        <Collapse v-model="value1">
          <Panel name="1">
            基本信息
            <jordan-form slot="content" :formConfig="formConfig1"></jordan-form>
          </Panel>
          <Panel name="2">
            日志
            <jordanForm slot="content" :formConfig="formConfig2"></jordanForm>
          </Panel>
        </Collapse>
      </div>
      <div class="commodity-detail-box">
        <div class="bar-code-detail">
          <jordanLabel
            :labelDefaultValue="tabconfig1.labelDefaultValue"
            :labelList="tabconfig1.labelList"
          ></jordanLabel>
          <div class="tab-content">
            <jordanActionTable
              ref="codeTable"
              :jordanTableConfig="jordanTableConfig1"
              @on-select="onSelect"
              @on-row-click="onRowClick"
              @table-delete-detail="tableDeleteDetail"
              @on-page-change="pageChange"
              @on-page-size-change="pageSizeChange"
              @on-select-cancel="onSelectCancel"
              @on-select-all="onSelectAll"
              @on-select-all-cancel="onSelectAllCancel"
            ></jordanActionTable>
          </div>
        </div>
        <div class="combined-commodity-detail">
          <jordanLabel
            :labelDefaultValue="tabconfig2.labelDefaultValue"
            :labelList="tabconfig2.labelList"
          ></jordanLabel>
          <div class="tab-content">
            <div class="wrap">
              <jordanActionTable
                :jordanTableConfig="jordanTableConfig2"
                @table-delete-detail="commodityDeleteDetail"
                @on-select="RightonSelect"
                @on-page-change="commodityPageChange"
                @on-page-size-change="commodityPageSizeChange"
                @on-select-cancel="onSelectCancelCommodity"
                @on-select-all="onSelectAllCommodity"
                @on-select-all-cancel="onSelectAllCancelCommodity"
                @table-import="commodityDetailImport"
                @table-export="commodityDetailExport"
              ></jordanActionTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jq-combined-commodity-edit" v-else>
      <Tabs :value="tab.activeName" on-click="changeTab">
        <TabPane label="基本信息" :name="'基本信息'">
          <div class="btn-operate">
            <jordanButton :btnConfig="btnConfig"></jordanButton>
          </div>
          <jordan-status-flag :statusName="statusName"></jordan-status-flag>
          <div class="item-collapse">
            <Collapse v-model="value1">
              <Panel name="1">
                基本信息
                <jordan-form slot="content" :formConfig="formConfig1"></jordan-form>
              </Panel>
              <Panel name="2">
                日志
                <jordanForm slot="content" :formConfig="formConfig2"></jordanForm>
              </Panel>
            </Collapse>
          </div>
          <div class="commodity-detail-box">
            <div class="bar-code-detail">
              <jordanLabel
                :labelDefaultValue="tabconfig1.labelDefaultValue"
                :labelList="tabconfig1.labelList"
              ></jordanLabel>
              <div class="tab-content">
                <jordanActionTable
                  ref="codeTable"
                  :jordanTableConfig="jordanTableConfig1"
                  @on-select="onSelect"
                  @on-row-click="onRowClick"
                  @table-delete-detail="tableDeleteDetail"
                  @on-page-change="pageChange"
                  @on-page-size-change="pageSizeChange"
                  @on-select-cancel="onSelectCancel"
                  @on-select-all="onSelectAll"
                  @on-select-all-cancel="onSelectAllCancel"
                ></jordanActionTable>
              </div>
            </div>
            <div class="combined-commodity-detail">
              <jordanLabel
                :labelDefaultValue="tabconfig2.labelDefaultValue"
                :labelList="tabconfig2.labelList"
              ></jordanLabel>
              <div class="tab-content">
                <div class="wrap">
                  <jordanActionTable
                    :jordanTableConfig="jordanTableConfig2"
                    @table-delete-detail="commodityDeleteDetail"
                    @on-select="RightonSelect"
                    @on-page-change="commodityPageChange"
                    @on-page-size-change="commodityPageSizeChange"
                    @on-select-cancel="onSelectCancelCommodity"
                    @on-select-all="onSelectAllCommodity"
                    @on-select-all-cancel="onSelectAllCancelCommodity"
                    @table-import="commodityDetailImport"
                    @table-export="commodityDetailExport"
                  ></jordanActionTable>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <!--<TabPane label="修改日志" :name="'日志'">-->
        <!--<jordanActionTable-->
        <!--ref="oprateLog"-->
        <!--:jordanTableConfig="oprateLogTableConfig"-->
        <!--@on-page-change="operateLogPageChange"-->
        <!--@on-page-size-change="operateLogPageSizeChange"-->
        <!--&gt;</jordanActionTable>-->
        <!--</TabPane>-->
      </Tabs>
    </div>
    <Modal width="360" v-model="modal1" title="警告" @on-ok="ok" @on-cancel="cancel">
      <p>{{tipMessage}}</p>
    </Modal>
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
  </div>
</template>
<script>
import jordanButton from "professionalComponents/jordanButton";
import jordanForm from "professionalComponents/jordanForm";
import jordanLabel from "professionalComponents/jordanLabel";
import jordanActionTable from "professionalComponents/jordanActionTable";
import jordanStatusFlag from "professionalComponents/jordanStatusFlag";
import jordanModal from "professionalComponents/JDialog";
import axios from "axios";
export default {
  components: {
    jordanButton,
    jordanForm,
    jordanLabel,
    jordanActionTable,
    jordanStatusFlag,
    jordanModal
  },
  data() {
    return {
      objid: "",
      value1: "1", //折叠框绑定的数据
      statusName: "", //水印标识  单据状态
      importType: "",
      // isReadOnly: false, //判断是否可以编辑
      //按钮配置
      btnConfig: {
        typeAll: "error",
        buttons: []
      },
      //基本信息表单配置
      formConfig1: {
        formValue: {
          //存储表单得所有值
          ECODE: "", //商品编码
          ENAME: "", //商品名称
          PS_C_BRAND_ID: "", //品牌id
          GROUP_TYPE: 2, //组合商品类型 默认为普通组合
          PRICELIST: "", //价格
          CP_C_STORE_IDS: "", //逻辑仓库
          REMARK: "" //备注
        },
        formData: [
          {
            style: "input", //输入框类型
            label: "商品编码", //输入框前文字
            value: "ECODE", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: false,
            inputChange: () => {
              this.inputCapital(1);
            }
          },
          {
            style: "input", //输入框类型
            label: "商品名称", //输入框前文字
            value: "ENAME", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            disabled: false,
            inputChange: () => {
              this.inputCapital(2);
            }
          },
          {
            style: "popInput", //输入框类型
            width: "6",
            // rules: true, //必选标识,值不为required时无标识
            itemdata: {
              col: 2,
              colid: 166758, //字段id
              colname: "PS_C_BRAND", //当前字段的名称 用来显示的
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "drp", //外键关联类型
              fkdesc: "品牌",
              inputname: "PS_C_BRAND:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "品牌", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "PS_C_BRAND", //对应的表
              reftableid: 23051, //对应的表ID
              pid: "",
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "" //这个是选择的值
            },
            oneObj() {
              //this.mutipleSelect(val);
            }
          },
          {
            style: "select", //下拉框类型
            label: "组合商品类型", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "GROUP_TYPE", //输入框的值
            multiple: false, //布尔值,下拉框是否开启多选,默认为不开启
            disabled: false,
            selectChange: value => {
              // this.selecttype(value);
              this.modal1 = true;
            }, //选中事件，默认返回选中的值,默认返回当前值value
            options: [
              //下拉框选项值
              {
                value: 1,
                label: "福袋"
              },
              {
                value: 2,
                label: "普通"
              }
            ]
          },

          {
            style: "input", //输入框类型
            label: "价格", //输入框前文字
            value: "PRICELIST", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            disabled: false
          },
          {
            style: "popInput", //输入框类型
            width: "6",
            // rules: true, //必选标识,值不为required时无标识
            itemdata: {
              col: 2,
              colid: 168724, //字段id
              colname: "CP_C_STORE_IDS", //当前字段的名称 用来显示的
              datelimit: "all",
              display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: "mrp", //外键关联类型
              fkdesc: "逻辑仓库",
              inputname: "CP_C_STORE_IDS:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, //是否有fk键
              isnotnull: true, //是否必填
              isuppercase: false, //是否转大写
              length: 65535, //最大长度是多少
              name: "逻辑仓库", //input前面显示的lable值
              readonly: false, //是否可编辑，对应input   readonly属性
              reftable: "SG_B_STORAGE", //对应的表
              reftableid: 24610, //对应的表ID
              pid: "",
              row: 1,
              statsize: -1,
              type: "STRING", //这个是后台用的
              valuedata: "" //这个是选择的值
            },
            oneObj() {
              //this.mutipleSelect(val);
            }
          },
          {
            style: "input", //输入框类型
            label: "备注", //输入框前文字
            value: "REMARK", //输入框的值
            width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            placeholder: "", //占位文本，默认为请输入
            ghost: false, //是否关闭幽灵按钮，默认开启
            disabled: false
          }
        ],
        //表单非空提示
        ruleValidate: {
          ECODE: [{ required: true, message: " ", trigger: "blur" }],
          ENAME: [{ required: true, message: " ", trigger: "blur" }],
          PRICELIST: [{ required: true, message: " ", trigger: "blur" }]
        }
      },
      //日志表单配置信息
      formConfig2: {
        formValue: {
          //存储表单得所有值
          OWNERNAME: "", //创建人
          CREATIONDATE: "", //创建时间
          MODIFIERNAME: "", //修改人姓名
          MODIFIEDDATE: "" //修改时间
        },
        formData: [
          {
            style: "input", //输入框类型
            label: "创建人", //输入框前文字
            value: "OWNERNAME", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: true
          },
          {
            style: "date", //输入框类型
            label: "创建时间", //输入框前文字
            value: "CREATIONDATE", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: "yyyy-MM-dd HH:mm:ss", //时间格式
            disabled: true
          },
          {
            style: "input", //输入框类型
            label: "修改人", //输入框前文字
            value: "MODIFIERNAME", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: true
          },
          {
            style: "date", //输入框类型
            label: "修改时间", //输入框前文字
            value: "MODIFIEDDATE", //输入框的值
            width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: "yyyy-MM-dd HH:mm:ss",
            disabled: true
          }
        ]
      },
      //tab切换配置数据
      tabconfig1: {
        labelDefaultValue: "1", //设置tabs默认值
        labelList: [
          {
            label: "条码明细",
            value: "1",
            isShow: true
          }
        ]
      },
      tabconfig2: {
        labelDefaultValue: "1", //设置默认选中的
        labelList: [
          {
            label: "组合商品明细",
            value: "1",
            isShow: true
          }
        ]
      },

      //条码明细表格配置数据
      jordanTableConfig1: {
        jordanFormConfig: {
          formValue: {
            ECODE: "", //虚拟条码
            PS_C_PRO_ENAME: "" //商品名称
          },
          formData: [
            {
              style: "input", //输入框类型
              label: "虚拟条码", //输入框前文字
              value: "ECODE", //输入框的值
              width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              disabled: false,
              inputChange: () => {
                this.inputCapital(3);
              }
            },
            {
              style: "input", //输入框类型
              label: "商品名称", //输入框前文字
              value: "PS_C_PRO_ENAME", //输入框的值
              width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              disabled: false,
              inputenter: val => {
                //回车事件
                this.codedetailEvent();
              },
              inputChange: () => {
                this.inputCapital(4);
              }
            }
          ]
        }, //表单配置
        // 表格搜索框
        // 是否修改搜索框为select
        isSearchText: false,
        pageShow: true, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        isShowDeleteDetailBtn: true, //控制是否显示删除明细
        isShowImportBtn: false, //控制是否显示导入
        isShowExportBtn: false, //控制是否显示导出
        highlightRow: true, //判断是否高亮
        indexColumn: true,
        loading: false, //加载
        // 是否存在多选框
        isShowSelection: false,
        width: "", // 表格宽度
        height: "200", // 表格高度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        current: 1,
        pageSizeOpts: [30, 40, 50], // 每页条数切换的配置
        pageSize: 30, // 每页条数
        columns: [
          {
            title: "虚拟条码",
            key: "ECODE",
            render: (h, params) => {
              if (params.row.ID) {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      textAlign: "left"
                    }
                  },
                  params.row.ECODE
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h(
                      "Input",
                      {
                        class: "isNone",
                        style: {
                          width: "100%",
                          height: "100%"
                        },
                        props: {
                          value: params.row.ECODE,
                          autosize: true,
                          regx: /^[0-9a-zA-Z]+$/
                        },
                        on: {
                          "on-blur": e => {
                            let self = this;
                            self.jordanTableConfig1.data[
                              `${params.index}`
                            ].ECODE = e.target.value;
                            let reg = /^[0-9a-zA-Z]+$/;
                            if (!reg.test(e.target.value)) {
                              self.$Message.warning(
                                "虚拟条码有英文字母和数字组成，请合理输入"
                              );
                              return;
                            }
                          }
                        }
                      },
                      params.row.ECODE
                    )
                  ]
                );
              }
            }
          },
          {
            title: "商品名称",
            key: "PS_C_PRO_ENAME",
            render: (h, params) => {
              if (params.row.ID && this.statusName === "启用") {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      textAlign: "left"
                    }
                  },
                  params.row.PS_C_PRO_ENAME
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h(
                      "Input",
                      {
                        class: "isNone",
                        style: {
                          width: "100%",
                          height: "100%"
                        },
                        props: {
                          value: params.row.PS_C_PRO_ENAME,
                          autosize: true
                          // regx:/^[0-9]*$/
                        },
                        on: {
                          "on-blur": e => {
                            let self = this;
                            self.jordanTableConfig1.data[
                              `${params.index}`
                            ].PS_C_PRO_ENAME = e.target.value;
                            // let reg = /^[0-9]*$/;
                            if (e.target.value === "") {
                              self.$Message.warning("商品名称不能为空");
                              return;
                            }
                          }
                        }
                      },
                      params.row.PS_C_PRO_ENAME
                    )
                  ]
                );
              }
            }
          }
        ],
        //表格的数据
        data: []
      },
      //组合商品明细表格配置数据
      jordanTableConfig2: {
        jordanFormConfig: {
          formValue: {
            dimdata: "", //商品编码
            NUM: "" //商品数量
          },
          formData: [
            {
              label: "商品条码",
              style: "dimSearch", //模糊搜索组件类型  具体数据详情见burgeonUI
              width: "12",
              value: "dimdata",
              columns: ["PS_C_SKU_ECODE"],
              AuotData: [], //模糊显示的数据], //匹配的选项
              disabled: false,
              // datalist:[],//下拉框的内容
              dimChange: val => {
                this.jordanTableConfig2.jordanFormConfig.formValue.dimdata = val.toUpperCase();
                //模糊查询的方法
                if (val) this.findCommodityData(val);
              }, //change事件
              dimSelect: val => {
                //选中事件
                let self = this;
                let code = val.tem.PS_C_SKU_ECODE;
                axios({
                  url: "/p/cs/skuQuery",
                  method: "post",
                  data: {
                    isBlur: "N", //N为精确匹配
                    psCSku: {
                      ECODE: code
                    }
                  }
                }).then(res => {
                  if (res.status === 200) {
                    let data = res.data.data.data;
                    let arr = []; //展示的数据
                    data.map(item => {
                      //获取想要展示的
                      arr.push({
                        PS_C_SKU_ECODE: item.ECODE, //条码
                        PS_C_PRO_ECODE: item.PS_C_PRO_ECODE, //商品编码
                        PS_C_PRO_ENAME: item.PS_C_PRO_ENAME, //商品名称
                        PS_C_CLR_ID: item.colorId, //颜色id
                        PS_C_CLR_ENAME: item.colorName, //颜色
                        PS_C_SIZE_ID: item.sizeId, //尺寸id
                        PS_C_SIZE_ENAME: item.sizeName //尺寸
                      });
                    });
                    self.jordanTableConfig2SelectStatus = true
                    this.selectData = Object.assign({}, arr[0]);
                  }
                });
                document.getElementById("Num").focus();
              },
              dimEnter: () => {
                let _this = this
                let code = this.jordanTableConfig2.jordanFormConfig.formValue.dimdata;
                axios({
                  url: "/p/cs/skuQuery",
                  method: "post",
                  data: {
                    isBlur: "N", //N为精确匹配
                    psCSku: {
                      ECODE: code
                    }
                  }
                }).then(res => {
                  if (res.status === 200) {
                    let data = res.data.data.data;
                    let arr = []; //展示的数据
                    data.map(item => {
                      //获取想要展示的
                      arr.push({
                        PS_C_SKU_ECODE: item.ECODE, //条码
                        PS_C_PRO_ECODE: item.PS_C_PRO_ECODE, //商品编码
                        PS_C_PRO_ENAME: item.PS_C_PRO_ENAME, //商品名称
                        PS_C_CLR_ID: item.colorId, //颜色id
                        PS_C_CLR_ENAME: item.colorName, //颜色
                        PS_C_SIZE_ID: item.sizeId, //尺寸id
                        PS_C_SIZE_ENAME: item.sizeName //尺寸
                      });
                    });
                    _this.jordanTableConfig2SelectStatus = true
                    this.selectData = Object.assign({}, arr[0]);
                    this.comodityDetailEvent();
                  }
                });
              }, //回车事件
              dimblur: () => {
                let _this = this
                let code = this.jordanTableConfig2.jordanFormConfig.formValue.dimdata;
                axios({
                  url: "/p/cs/skuQuery",
                  method: "post",
                  data: {
                    isBlur: "N", //N为精确匹配
                    psCSku: {
                      ECODE: code
                    }
                  }
                }).then(res => {
                  if (res.status === 200) {
                    let data = res.data.data.data;
                    let arr = []; //展示的数据
                    data.map(item => {
                      //获取想要展示的
                      arr.push({
                        PS_C_SKU_ECODE: item.ECODE, //条码
                        PS_C_PRO_ECODE: item.PS_C_PRO_ECODE, //商品编码
                        PS_C_PRO_ENAME: item.PS_C_PRO_ENAME, //商品名称
                        PS_C_CLR_ID: item.colorId, //颜色id
                        PS_C_CLR_ENAME: item.colorName, //颜色
                        PS_C_SIZE_ID: item.sizeId, //尺寸id
                        PS_C_SIZE_ENAME: item.sizeName //尺寸
                      });
                    });
                    _this.jordanTableConfig2SelectStatus = true
                    this.selectData = Object.assign({}, arr[0]);
                  }
                });
              } //失去焦点事件
            },
            {
              style: "input", //输入框类型
              label: "赠送数量", //输入框前文字
              value: "NUM", //输入框的值
              width: "12", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              id: "Num",
              disabled: false,
              inputenter: () => {
                this.comodityDetailEvent();
              } //表单回车事件
            }
          ]
        }, //表单配置
        // 表格搜索框
        // 是否修改搜索框为select
        isSearchText: false,
        pageShow: true, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        isShowDeleteDetailBtn: true, //控制是否显示删除明细
        isShowImportBtn: true, //控制是否显示导入
        isShowExportBtn: false, //控制是否显示导出
        highlightRow: true, //判断是否高亮
        indexColumn: true,
        // 是否存在多选框
        isShowSelection: true,
        loading: false, //加载
        width: "", // 表格宽度
        height: "200", // 表格高度
        border: true, //是否显示纵向边框
        current: 1, //当前页
        total: 0, //设置总条数
        pageSizeOpts: [100, 150, 200], // 每页条数切换的配置
        pageSize: 100, // 每页条数
        columns: [
          //表头
          {
            title: "条码",
            key: "PS_C_SKU_ECODE"
          },
          {
            title: "商品编码",
            key: "PS_C_PRO_ECODE"
          },
          {
            title: "商品名称",
            key: "PS_C_PRO_ENAME"
          },
          {
            title: "颜色",
            key: "PS_C_CLR_ENAME"
          },
          {
            title: "尺寸",
            key: "PS_C_SIZE_ENAME"
          },
          {
            title: "赠送数量",
            key: "NUM",
            render: (h, params) => {
              if (params.row.ID && this.statusName === "启用") {
                return h(
                  "div",
                  {
                    style: {
                      width: "50px",
                      textAlign: "left"
                    }
                  },
                  params.row.NUM
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h(
                      "Input",
                      {
                        class: "isNone",
                        style: {
                          width: "50px",
                          height: "100%"
                        },
                        props: {
                          value: params.row.NUM,
                          autosize: true,
                          regx: /^[0-9]*$/
                        },
                        on: {
                          "on-blur": e => {
                            let self = this;
                            self.jordanTableConfig2.data[
                              `${params.index}`
                            ].NUM = e.target.value;
                            let reg = /^[0-9]*$/;
                            if (!reg.test(e.target.value)) {
                              self.$Message.warning("商品数量只能录入正整数");
                              return;
                            }
                          }
                        }
                      },
                      params.row.NUM
                    )
                  ]
                );
              }
            }
          }
        ],
        //表格的数据
        data: [
          //表体数据
        ]
      },
      SkuGroupRequestList: [], //存放明细数据
      selectData: {}, //模糊查找选中的数据
      objList: {}, //修改页面所有的数据
      selectId: "", //点击的条码明细对应的id
      clickIndex: 0, //新增单击的行的索引
      tipMessage: "", //提示框提示内容
      modal1: false, //提示框是否显示
      isOk: false, //是否点击确认
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
        componentData: {
          returnData: data => {
            if (data) {
              let returnData = JSON.parse(data);
              let self = this;
              //按钮导入
              if (this.importType === "baseInfo") {
                // let importData = returnData.skuGroupRequestList;
                //1.处理返回数据组成两个table集合
                let table1Arr = [];
                let table2Arr = [];
                returnData.map((item, index) => {
                  let skuGroupImportRequestsData = item.skuGroupImportRequests;
                  let skuImportRequest = item.skuImportRequest;
                  skuImportRequest.isActive = false;
                  skuGroupImportRequestsData.map((groupItem, index) => {
                    groupItem.isChecked = false;
                    // groupItem._index = index;
                  });
                  skuImportRequest.psCSkugroupList = skuGroupImportRequestsData;
                  table1Arr.push(skuImportRequest);
                  table2Arr = table2Arr.concat(skuGroupImportRequestsData);
                });
                //2.根据表格中是否有初始值进行处理
                if (self.jordanTableConfig1.data.length > 0) {
                  let preTable1Data = self.jordanTableConfig1.data;
                  for (let i = 0; i < preTable1Data.length; i++) {
                    let item = preTable1Data[i];
                    // let repeatFlag = false;
                    // let repeatObj = {};
                    for (let j = table1Arr.length - 1; j >= 0; j--) {
                      let xnItem = table1Arr[j];
                      if (xnItem.ECODE === item.ECODE) {
                        // repeatFlag = true;
                        // repeatObj = xnItem;
                        item.GROUP_EXTRACT_NUM = xnItem.GROUP_EXTRACT_NUM;
                        item.PS_C_PRO_ENAME = xnItem.PS_C_PRO_ENAME;
                        item.psCSkugroupList = xnItem.psCSkugroupList;
                        table1Arr.splice(j, 1);
                        break;
                      }
                    }
                    // if(repeatFlag){
                    //   item.psCSkugroupList = item.psCSkugroupList.concat(repeatObj.psCSkugroupList);
                    // }
                  }
                  self.jordanTableConfig1.data = self.jordanTableConfig1.data.concat(table1Arr);
                } else {
                  self.jordanTableConfig1.data = table1Arr;
                }
                if (self.jordanTableConfig1.data.length > 0) {
                  let table1FirstRow = self.jordanTableConfig1.data[0];
                  self.jordanTableConfig2.data = table1FirstRow.psCSkugroupList;
                }
                //条数赋值
                self.jordanTableConfig1.total = self.jordanTableConfig1.data.length;
                self.jordanTableConfig2.total = self.jordanTableConfig2.data.length;
              } else {
                //实际条码导入
                if (this.jordanTableConfig1.data.length > 0 && this.jordanTableConfig1.data[this.clickIndex].isActive) {
                  if (returnData.length > 0) {
                    returnData.map((item, index) => {
                      item.isChecked = false;
                      item._index = index;
                    });
                    this.jordanTableConfig1.data[
                      this.clickIndex
                    ].psCSkugroupList = this.jordanTableConfig1.data[
                      this.clickIndex
                    ].psCSkugroupList.concat(returnData);
                    this.jordanTableConfig2.data = this.jordanTableConfig2.data.concat(
                      returnData
                    );
                    this.jordanTableConfig2.total = this.jordanTableConfig2.data.length;
                  }
                }
              }
            }
          }
        }
      },
      tab: {
        activeName: "基本信息"
      },
      oprateLogTableConfig: {
        //操作日志表格配置数据
        indexColumn: true,
        highlightRow: true, //判断单选的情况是否高亮  默认true
        pageShow: true, //控制分页是否显示
        isShowDeleteDetailBtn: false, //控制是否显示删除明细
        isShowImportBtn: false, //控制是否显示导入
        isShowExportBtn: false, //控制是否显示导出
        searchInputShow: false, // 控制搜索框是否显示
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [10, 15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        columns: [
          {
            title: "修改内容",
            key: ""
          },
          {
            title: "修改前",
            key: ""
          },
          {
            title: "修改后",
            key: ""
          },
          {
            title: "修改人",
            key: ""
          },
          {
            title: "修改时间",
            key: ""
          }
        ],
        data: []
      }
    };
  },
  methods: {
    // 转大写
    inputCapital(type) {
      const _this = this;
      if (type === 1)
        _this.formConfig1.formValue.ECODE = _this.formConfig1.formValue.ECODE.toUpperCase();
      else if (type === 2)
        _this.formConfig1.formValue.ENAME = _this.formConfig1.formValue.ENAME.toUpperCase();
      else if (type === 3)
        _this.jordanTableConfig1.jordanFormConfig.formValue.ECODE = _this.jordanTableConfig1.jordanFormConfig.formValue.ECODE.toUpperCase();
      else if (type === 4)
        _this.jordanTableConfig1.jordanFormConfig.formValue.PS_C_PRO_ENAME = _this.jordanTableConfig1.jordanFormConfig.formValue.PS_C_PRO_ENAME.toUpperCase();
    },
    //查找商品编码的
    findCommodityData(val) {
      let self = this;
      let str = val.trim();
      axios({
        url: "/p/cs/skuQuery",
        method: "post",
        data: {
          isBlur: "Y", //N为精确匹配
          psCSku: {
            ECODE: str
          }
        }
      }).then(res => {
        if (res.status === 200) {
          let data = res.data.data.data;
          let dimList = self.jordanTableConfig2.jordanFormConfig.formData;
          let arr = []; //展示的数据
          data.map(item => {
            //获取想要展示的
            arr.push({
              PS_C_SKU_ECODE: item.ECODE //条码
            });
          });
          dimList.map(item => {
            if (item.label === "商品条码") {
              item.AuotData = arr;
            }
          });
        }
      });
    },
    //组合商品类型改变的操作
    selecttype(type) {
      if (type === 2) {
        //普通类型
        this.jordanTableConfig1.jordanFormConfig.formData.map((item, index) => {
          if (item["label"] === "每组抽取行数") {
            this.$set(item, "style", "");
            this.$delete(item, "inputenter");
          }
          if (item["label"] === "商品名称") {
            if (!item.inputenter) {
              this.$set(item, "inputenter", () => {
                this.codedetailEvent();
              });
            }
          }
          this.$set(item, "width", "12");
        });
        if (
          this.jordanTableConfig1.jordanFormConfig.formValue.hasOwnProperty(
            "GROUP_EXTRACT_NUM"
          )
        ) {
          //删除每组抽取行数
          this.$delete(
            this.jordanTableConfig1.jordanFormConfig.formValue,
            "GROUP_EXTRACT_NUM"
          );
          let table1Index = this.jordanTableConfig1.columns.length - 1;
          this.$delete(this.jordanTableConfig1.columns, table1Index);
        }
        this.jordanTableConfig2.jordanFormConfig.formData.map(item => {
          if (item["label"] === "分组") {
            this.$set(item, "style", "");
            this.$delete(item, "inputenter");
          }
          if (item["label"] === "商品数量") {
            if (!item.inputenter) {
              this.$set(item, "inputenter", () => {
                this.comodityDetailEvent();
              });
            }
          }
          this.$set(item, "width", "12");
        });
        if (
          this.jordanTableConfig2.jordanFormConfig.formValue.hasOwnProperty(
            "GROUPNUM"
          )
        ) {
          this.$delete(
            this.jordanTableConfig2.jordanFormConfig.formValue,
            "GROUPNUM"
          );
          let table2Index = this.jordanTableConfig2.columns.length - 1;
          this.$delete(this.jordanTableConfig2.columns, table2Index);
        }
      } else {
        //福袋类型
        if (this.jordanTableConfig1.jordanFormConfig.formData.length < 3) {
          let tab1index = this.jordanTableConfig1.jordanFormConfig.formData
            .length;
          this.$set(
            this.jordanTableConfig1.jordanFormConfig.formData,
            tab1index,
            {
              style: "input", //输入框类型
              label: "每组抽取行数", //输入框前文字
              value: "GROUP_EXTRACT_NUM", //输入框的值
              id: "extract",
              width: "8", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)})
              inputenter: () => {
                this.codedetailEvent();
              } //表单回车事件});
            }
          );
          this.jordanTableConfig1.jordanFormConfig.formData.map(item => {
            this.$set(item, "width", "8");
            if (item["label"] === "商品名称") {
              this.$delete(item, "inputenter");
            }
          });
        } else {
          this.jordanTableConfig1.jordanFormConfig.formData.map(item => {
            this.$set(item, "width", "8");
            if (item["label"] === "每组抽取行数") {
              this.$set(item, "style", "input");
              if (!item.inputenter) {
                this.$set(item, "inputenter", () => {
                  this.codedetailEvent();
                });
              }
            }
          });
        }
        this.$set(
          this.jordanTableConfig1.jordanFormConfig.formValue,
          "GROUP_EXTRACT_NUM",
          ""
        );
        //表头也要加入该字段
        let isGROUP_EXTRACT_NUM = this.jordanTableConfig1.columns.every(ele => {
          return ele.key !== "GROUP_EXTRACT_NUM";
        });
        if (isGROUP_EXTRACT_NUM) {
          //该数组中不存在是就添加
          let ciluIndex = this.jordanTableConfig1.columns.length;
          this.$set(this.jordanTableConfig1.columns, ciluIndex, {
            title: "每组抽取行数",
            key: "GROUP_EXTRACT_NUM",
            render: (h, params) => {
              if (params.row.ID && this.statusName === "启用") {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      textAlign: "left"
                    }
                  },
                  params.row.GROUP_EXTRACT_NUM
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h(
                      "Input",
                      {
                        class: "isNone",
                        style: {
                          width: "100%",
                          height: "100%"
                        },
                        props: {
                          value: params.row.GROUP_EXTRACT_NUM,
                          autosize: true,
                          regx: /^[0-9]*$/
                        },
                        on: {
                          "on-blur": e => {
                            let self = this;
                            self.jordanTableConfig1.data[
                              `${params.index}`
                            ].GROUP_EXTRACT_NUM = e.target.value;
                            let reg = /^[0-9]*$/;
                            if (!reg.test(e.target.value)) {
                              self.$Message.warning(
                                "每组抽取行数只能录入正整数"
                              );
                              return;
                            }
                          }
                        }
                      },
                      params.row.GROUP_EXTRACT_NUM
                    )
                  ]
                );
              }
            }
          });
        }
        if (this.jordanTableConfig2.jordanFormConfig.formData.length < 3) {
          let table2col = this.jordanTableConfig2.jordanFormConfig.formData
            .length;
          this.$set(
            this.jordanTableConfig2.jordanFormConfig.formData,
            table2col,
            {
              style: "input", //输入框类型
              label: "分组", //输入框前文字
              value: "GROUPNUM", //输入框的值
              id: "groupnum",
              width: "8", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)})
              inputenter: () => {
                this.comodityDetailEvent();
              } //表单回车事件
            }
          );
          this.jordanTableConfig2.jordanFormConfig.formData.map(item => {
            if (item["label"] === "商品条码") {
              this.$set(item, "width", "9");
            }
            if (item["label"] === "商品数量") {
              this.$set(item, "width", "7");
              this.$delete(item, "inputenter");
            } else {
              this.$set(item, "width", "8");
            }
          });
        } else {
          this.jordanTableConfig2.jordanFormConfig.formData.map(item => {
            if (item["label"] === "商品条码") {
              this.$set(item, "width", "9");
            }
            if (item["label"] === "商品数量") {
              this.$set(item, "width", "7");
            }
            if (item["label"] === "分组" && item["style"] === "") {
              this.$set(item, "width", "8");
              this.$set(item, "style", "input");
              if (!item.inputenter) {
                this.$set(item, "inputenter", () => {
                  this.comodityDetailEvent();
                });
              }
            }
          });
        }
        this.$set(
          this.jordanTableConfig2.jordanFormConfig.formValue,
          "GROUPNUM",
          ""
        );
        //表格表头显示也要处理一下
        let ishas = this.jordanTableConfig2.columns.every(item => {
          return item.key !== "GROUPNUM";
        });
        if (ishas) {
          //不存在分组 就添加一个
          let currentIndex = this.jordanTableConfig2.columns.length;
          this.$set(this.jordanTableConfig2.columns, currentIndex, {
            title: "分组",
            key: "GROUPNUM",
            render: (h, params) => {
              if (params.row.ID && this.statusName === "启用") {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      textAlign: "left"
                    }
                  },
                  params.row.GROUPNUM
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      width: "100%",
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "space-between"
                    }
                  },
                  [
                    h(
                      "Input",
                      {
                        class: "isNone",
                        style: {
                          width: "100%",
                          height: "100%"
                        },
                        props: {
                          value: params.row.GROUPNUM,
                          autosize: true,
                          regx: /^[0-9]*$/
                        },
                        on: {
                          "on-blur": e => {
                            let self = this;
                            self.jordanTableConfig2.data[
                              `${params.index}`
                            ].GROUPNUM = e.target.value;
                            let reg = /^[0-9]*$/;
                            if (!reg.test(e.target.value)) {
                              self.$Message.warning("分组只能录入正整数");
                              return;
                            }
                          }
                        }
                      },
                      params.row.GROUPNUM
                    )
                  ]
                );
              }
            }
          });
        }
      }
    },
    //模态框确认事件
    ok() {
      this.isOk = true;
      if (this.isOk) {
        if (this.objid === "-1") {
          //新增页面
          this.selecttype(this.formConfig1.formValue.GROUP_TYPE); //点击确认执行
          if (this.jordanTableConfig1.data.length > 0) {
            this.$set(this.jordanTableConfig1, "data", []); //清空表格数据
          }
          if (this.jordanTableConfig2.data.length > 0) {
            this.$set(this.jordanTableConfig2, "data", []); //清空表格数据
          }
        } else {
          //编辑页面
          this.formConfig1.formValue.GROUP_TYPE = this.objList.psCPro.GROUP_TYPE; //编辑页面不允许修改
        }
      }
    },
    //模态框取消事件
    cancel() {
      this.isOk = false;
    },
    //按钮配置数据操作
    pageconfigData(objid) {
      if (objid === "-1") {
        //新增页面
        this.btnConfig.buttons = [];
        let buttonconfig = [
          {
            // type: '',  //按钮类型
            text: "保存", //按钮文本
            btnclick: () => {
              this.saveAll(objid);
            }
          },
          {
            text: "导入", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.importskuGroup("baseInfo");
            }
          },
          {
            text: "返回",
            btnclick: () => {
              this.$store.commit("TabHref", {
                id: 24525,
                type: "table",
                name: "PS_C_PRO_GROUP",
                label: "组合商品档案",
                query: Object.assign({
                  id: 24525,
                  tabTitle: "组合商品档案"
                })
              });
            }
          }
        ];
        this.btnConfig.buttons.push(...buttonconfig);
        this.tipMessage = "切换组合商品类型会清空数据，确认切换组合商品类型？";
      } else {
        //编辑页面
        this.btnConfig.buttons = [];
        let buttonsdata = [
          {
            // type: '',  //按钮类型
            text: "新增", //按钮文本
            size: "", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$store.commit("TabHref", {
                id: -1,
                type: "action",
                name: "combinedCommodity",
                label: "组合商品档案编辑",
                query: Object.assign({
                  id: -1,
                  tabTitle: "组合商品档案编辑"
                })
              });
            }
          },
          {
            text: "保存", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.saveAll(objid);
            }
          },
          // {
          //   text: "提交",
          //   btnclick: () => {
          //     this.submitData();
          //   }
          // },
          // {
          //   text: "作废",
          //   btnclick: () => {
          //     this.toVoid();
          //   }
          // },
          // {
          //   text: "复制",
          //   btnclick: () => {}
          // },
          // {
          //   text: "复制单据",
          //   btnclick: () => {}
          // },
          {
            text: "导入", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.importskuGroup("baseInfo");
            }
          },
          {
            text: "刷新",
            btnclick: () => {
              this.IniData();
            }
          },
          {
            text: "返回",
            btnclick: () => {
              this.$store.commit("TabHref", {
                back: true,
                id: 24525,
                type: "table",
                name: "PS_C_PRO_GROUP",
                label: "组合商品档案",
                query: Object.assign({
                  id: 24525,
                  tabTitle: "组合商品档案"
                })
              });
            }
          }
        ];
        this.btnConfig.buttons.push(...buttonsdata);
        // this.jordanTableConfig2.columns.push({title:'是否缺货',key:'IS_LACK'});//添加是否缺货的字段
        this.tipMessage = "无法修改！";
        this.formConfig1.formData[0].disabled = true;
      }
    },
    //条码明细回车事件
    codedetailEvent() {
      let inputData = Object.assign(
        {},
        this.jordanTableConfig1.jordanFormConfig.formValue
      );
      inputData.isChecked = false; //选中
      inputData.isActive = false; //控制是否可以进行商品明细录入
      inputData.psCSkugroupList = []; //
      if (inputData.ECODE === "") {
        this.$Message.warning("虚拟条码为必填项，不能为空！");
        return false;
      } else {
        let inputreg = /^[0-9a-zA-Z]+$/;
        if (!inputreg.test(inputData.ECODE)) {
          this.$Message.warning("虚拟条码有英文字母和数字组成，请合理输入");
          return false;
        }
      }
      if (inputData.GROUP_EXTRACT_NUM && inputData.GROUP_EXTRACT_NUM !== "") {
        let numReg = /^[0-9]+$/;
        let numRe = new RegExp(numReg);
        if (!numRe.test(inputData.GROUP_EXTRACT_NUM)) {
          this.$Message.warning("每组抽取行数是一个数字，请合理输入");
          return false;
        }
      }
      //回车表格录入数据
      if (this.jordanTableConfig1.data.length > 0) {
        //已经有数据
        //要验证 条码必须是唯一的
        for (let item of this.jordanTableConfig1.data) {
          if (item.ECODE === inputData.ECODE) {
            let info = "当前" + inputData.ECODE + "已存在,不允许保存！";
            this.$Message.warning(info);
            return false;
          }
        }
        this.jordanTableConfig1.data.push(inputData); //在表格中显示数据
        this.jordanTableConfig2.data = []; //清空右边明细的数据
      } else {
        //新增
        this.jordanTableConfig1.data.push(inputData); //在表格中显示数据
        this.jordanTableConfig2.data = []; //清空右边明细的数据
      }
      this.jordanTableConfig1.total++
      Object.keys(this.jordanTableConfig1.jordanFormConfig.formValue).map(
        item => {
          //回车完后清空输入框
          this.$set(
            this.jordanTableConfig1.jordanFormConfig.formValue,
            item,
            ""
          );
        }
      );
    },
    //组合商品明细回车事件
    comodityDetailEvent() {
      let t_data = {};
      let strkey = "";
      if (this.jordanTableConfig2.jordanFormConfig.formValue.dimdata === "") {
        this.$Message.warning("商品条码不能为空！");
        return false;
      } else {
        if (Object.keys(this.selectData).length > 0) {
          //判断是否有选中
          t_data = this.selectData; //这个是模糊查找的商品数据
          strkey = t_data.PS_C_SKU_ECODE;
        } else {
          this.$Message.warning("请选择一个正确的商品条码");
          return false;
        }
      }
      if (this.jordanTableConfig2.jordanFormConfig.formValue.NUM === "") {
        this.$message.warning("商品数量不能为空！");
        return false;
      } else {
        //验证是否为数字
        let numReg = /^[0-9]+$/;
        let numRe = new RegExp(numReg);
        if (
          !numRe.test(this.jordanTableConfig2.jordanFormConfig.formValue.NUM)
        ) {
          this.$Message.warning("商品数量是一个数字，请合理输入");
          return false;
        }
        t_data.NUM = this.jordanTableConfig2.jordanFormConfig.formValue.NUM;
      }
      if (
        this.jordanTableConfig2.jordanFormConfig.formValue.hasOwnProperty(
          //判断是否是福袋类型
          "GROUPNUM"
        )
      ) {
        if (
          this.jordanTableConfig2.jordanFormConfig.formValue["GROUPNUM"] === ""
        ) {
          this.$Message.warning("分组不能为空！");
          return false;
        } else {
          //验证是否为数字
          let numReg = /^[0-9]+$/;
          let numRe = new RegExp(numReg);
          if (
            !numRe.test(
              this.jordanTableConfig2.jordanFormConfig.formValue.GROUPNUM
            )
          ) {
            this.$Message.warning("分组是一个数字，请合理输入");
            return false;
          }
          t_data.GROUPNUM = this.jordanTableConfig2.jordanFormConfig.formValue[
            "GROUPNUM"
          ];
          strkey += t_data.GROUPNUM;
        }
      }
      t_data.isChecked = false; //这个用来设置没有选中
      let _index = this.jordanTableConfig2.data.length;
      t_data._index = _index;
      if (this.jordanTableConfig1.data[this.clickIndex].isActive) {
        if (
          this.jordanTableConfig1.data[this.clickIndex].psCSkugroupList.length >
          0
        ) {
          let flag = this.jordanTableConfig1.data[
            this.clickIndex
          ].psCSkugroupList.findIndex(innerIntem => {
            let tem = innerIntem.PS_C_SKU_ECODE;
            if (innerIntem.GROUPNUM) {
              tem += innerIntem.GROUPNUM;
            }
            return strkey === tem;
          });
          if (flag !== -1) {
            //如果没有找到相同条码的 flag是找到的数组索引 这里是找到了
            let itemI = this.jordanTableConfig1.data[this.clickIndex]
              .psCSkugroupList[flag];
            let targetnum = this.jordanTableConfig1.data[this.clickIndex]
              .psCSkugroupList[flag].NUM;
            let num = (parseInt(targetnum) + parseInt(t_data.NUM)).toString(); //相同条码的数量进行合并
            this.$set(itemI, "NUM", num); //更新条码数量
          } else {
            this.jordanTableConfig1.data[this.clickIndex].psCSkugroupList.push(
              t_data
            );
          }
        } else {
          this.jordanTableConfig1.data[this.clickIndex].psCSkugroupList.push(
            t_data
          );
        }
      }
      if (
        this.jordanTableConfig1.data[this.clickIndex].psCSkugroupList.length < 1
      ) {
        this.$Message.warning("请选择点击要录入商品明细的条码信息");
        return false;
      }
      this.jordanTableConfig2.data = this.jordanTableConfig1.data[
        this.clickIndex
      ].psCSkugroupList;
      this.selectData = {}; //回车之后将数据清掉
      //回车完后清空输入框
      Object.keys(this.jordanTableConfig2.jordanFormConfig.formValue).map(
        item => {
          this.$set(
            this.jordanTableConfig2.jordanFormConfig.formValue,
            item,
            ""
          );
        }
      );
    },
    //验证必填项不能为空
    IsCheck(type) {
      switch (type) {
        case "ECODE":
          return "商品编码";
          break;
        case "ENAME":
          return "商品名称";
          break;
        case "PS_C_BRAND_ID":
          return "品牌";
          break;
        case "PRICELIST":
          return "价格";
          break;
        case "dimData":
          return "商品相关信息";
          break;
        case "NUM":
          return "商品数量";
          break;
        case "GROUPNUM":
          return "分组";
          break;
      }
    },
    //数组对象的深拷贝
    deepCopy(obj) {
      // 只拷贝对象
      if (typeof obj !== "object") return;
      // 根据obj的类型判断是新建一个数组还是一个对象
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
          // 判断属性值的类型，如果是对象递归调用深拷贝
          newObj[key] =
            typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    //保存功能
    saveAll(type) {
      let data = {};
      let baseData = Object.assign({}, this.formConfig1.formValue);
      if (baseData["ECODE"] === "") {
        this.$Message.warning("商品编码不能为空");
        return false;
      } else {
        let reg = /^[0-9a-zA-Z]+$/;
        if (!reg.test(baseData["ECODE"])) {
          this.$Message.warning("商品编码由英文字母和数字组成，请合理输入");
          return false;
        }
      }
      if (baseData["ENAME"] === "") {
        this.$Message.warning("商品名称不能为空");
        return false;
      }
      let flag1 = this.formConfig1.formData.filter(ele => {
        if (ele.itemdata && ele.itemdata.fkdisplay === "drp") {
          return ele.itemdata.pid === "";
        }
      });
      if (flag1.length > 0) {
        this.$Message.warning("请选择品牌");
        return false;
      } else {
        this.formConfig1.formData.map(ele => {
          if (ele.itemdata && ele.itemdata.fkdisplay === "drp") {
            baseData.PS_C_BRAND_ID = ele.itemdata.pid;
          }
        });
      }
      if (baseData["PRICELIST"] === "") {
        this.$Message.warning("价格不能为空");
        return false;
      } else {
        let numReg = /^\d+$|^\d*\.\d+$/g;
        let numRe = new RegExp(numReg);
        if (!numRe.test(baseData.PRICELIST)) {
          this.$Message.warning("价格是一个数字，请合理输入");
          return false;
        }
      }

      let flag2 = this.formConfig1.formData.filter(ele => {
        if (ele.itemdata && ele.itemdata.fkdisplay === "mrp") {
          return ele.itemdata.pid === "";
        }
      });
      if (flag2.length > 0) {
        this.$Message.warning("请选择虚拟仓库");
        return false;
      } else {
        this.formConfig1.formData.map(ele => {
          if (ele.itemdata && ele.itemdata.fkdisplay === "mrp") {
            baseData.CP_C_STORE_IDS = ele.itemdata.pid;
          }
        });
      }
      if (this.jordanTableConfig1.data.length < 1) {
        this.$Message.warning("请录入条码明细后再保存");
        return false;
      }
      let groupType = this.formConfig1.formValue.GROUP_TYPE;
      if (groupType === 1) {
        for (let item of this.jordanTableConfig1.data) {
          if (item.psCSkugroupList && item.psCSkugroupList.length < 1) {
            this.$Message.warning(
              item.ECODE + "虚拟条码没有设置商品，请先设置再保存。"
            );
            return false;
          }
          //验证福袋类型分组数量的
          if (item.GROUP_EXTRACT_NUM) {
            let groupDATA = {};
            if (item.psCSkugroupList) {
              item.psCSkugroupList.map(inner => {
                if (!groupDATA.hasOwnProperty(inner.GROUPNUM)) {
                  groupDATA[inner.GROUPNUM] = [];
                  groupDATA[inner.GROUPNUM].push(inner);
                } else {
                  groupDATA[inner.GROUPNUM].push(inner);
                }
              });
            }
            if (Object.keys(groupDATA).length > 10) {
              this.$Message.warning(
                "福袋类型组合商品一个虚拟条码不允许存在超过十个分组"
              );
              return false;
            }
            for (let inner1 in groupDATA) {
              if (item.GROUP_EXTRACT_NUM > groupDATA[inner1].length) {
                this.$Message.warning("存在每组抽取行数大于每组福袋商品总行数");
                return false;
              }
              if (groupDATA[inner1].length > 200) {
                this.$Message.warning(
                  "福袋类型组合商品不允许存在一个分组超过200行的SKU"
                );
                return false;
              }
            }
          }
        }
      } else {
        for (let item of this.jordanTableConfig1.data) {
          if (item.psCSkugroupList) {
            if (item.psCSkugroupList.length < 1) {
              this.$Message.warning(
                item.ECODE + "虚拟条码没有设置商品，请先设置再保存。"
              );
              return false;
            }
            //普通类型
            if (item.psCSkugroupList.length > 30) {
              this.$Message.warning(
                "普通类型组合商品，一个虚拟条码下不允许超过30条SKU"
              );
              return false;
            }
          }
        }
      }
      this.SkuGroupRequestList = []; //先清空 避免影响后面的
      this.SkuGroupRequestList = Array.from(
        this.deepCopy(this.jordanTableConfig1.data)
      );
      let t_SkuGroupRequestList = [];
      if (type === "-1") {
        //新增页面保存
        this.SkuGroupRequestList.map(item => {
          delete item.isActive;
          delete item.isChecked;
          delete item.BK;
          let t_PsCSkugroupList = item.psCSkugroupList;
          t_PsCSkugroupList.map(sub => {
            delete sub.isChecked;
            delete sub._index;
            delete sub.BK;
          });
          delete item.psCSkugroupList;
          t_SkuGroupRequestList.push({
            psCSku: item,
            psCSkugroupList: t_PsCSkugroupList
          });
        });
      } else {
        if (this.statusName === "已提交") {
          this.$Message.warning("已提交的组合商品不能修改！");
          return false;
        } else {
          //编辑页面保存
          let psCSkukeys = []; //左边表格列名
          let PsCSkugroupListkeys = []; //右边表格列名
          this.jordanTableConfig1.columns.map(item => {
            psCSkukeys.push(item.key);
          });
          psCSkukeys.push("ID");
          this.jordanTableConfig2.columns.map(item => {
            PsCSkugroupListkeys.push(item.key);
          });
          PsCSkugroupListkeys.push("ID");
          this.SkuGroupRequestList.map(item => {
            let obj = {};
            obj.psCSku = {};
            obj.psCSkugroupList = [];
            let t_PsCSkugroupList = [];
            if (item.psCSkugroupList) {
              t_PsCSkugroupList = item.psCSkugroupList;
            }
            let procitem = Object.assign({}, item);
            if (procitem.hasOwnProperty("ID")) {
              //
              for (let inner of psCSkukeys) {
                if (inner in procitem) {
                  //存在该键值
                  if (item[inner] === null || typeof item[inner] === "object") {
                    obj.psCSku[inner] = "";
                  } else {
                    obj.psCSku[inner] = procitem[inner];
                  }
                }
              }
            } else {
              //新增的
              delete item.isActive;
              delete item.isChecked;
              delete item.psCSkugroupList;
              item.ID = -1;
              obj.psCSku = item;
            }
            t_PsCSkugroupList.map(sub => {
              let Len = obj.psCSkugroupList.length;
              if (sub.hasOwnProperty("ID")) {
                let itemobj = {};
                for (let innerM of PsCSkugroupListkeys) {
                  if (innerM in sub) {
                    //判断键值是否存在
                    if (
                      sub[innerM] === null ||
                      typeof sub[innerM] === "object"
                    ) {
                      itemobj[innerM] = "";
                    } else {
                      itemobj[innerM] = sub[innerM];
                    }
                  }
                }
                obj.psCSkugroupList[Len] = Object.assign({}, itemobj);
              } else {
                //编辑页面新增的
                delete sub.isChecked;
                delete sub._index;
                sub.ID = -1;
                obj.psCSkugroupList.push(sub);
              }
            });
            t_SkuGroupRequestList.push(obj);
          });
        }
      }
      data = {
        objid: type,
        CP_C_STORE_IDS: baseData.CP_C_STORE_IDS,
        psCPro: baseData,
        SkuGroupRequestList: t_SkuGroupRequestList
      };
      axios({
        url: "/p/cs/product/skuGroupSave",
        method: "post",
        data: data
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.$Message.success(data.message);
          if (type === "-1") {
            this.$store.commit("TabHref", {
              //返回列表页面
              id: 24525,
              type: "table",
              name: "PS_C_PRO_GROUP",
              label: "组合商品档案",
              query: Object.assign({
                id: 24525,
                tabTitle: "组合商品档案"
              })
            });
          } else {
            this.IniData();
          }
        } else {
          this.$Message.warning(data.message);
        }
      });
    },
    //表格选中某一行执行的操作
    onSelect(selection, row) {
      this.jordanTableConfig1.data.map(item => {
        if (row.ECODE === item.ECODE) {
          item.isChecked = true;
        }
      });
    },
    //取消选择的事件
    onSelectCancel(selection, row) {
      let self = this;
      self.jordanTableConfig1.data.map(item => {
        if (item.ECODE === row.ECODE) {
          item.isChecked = false;
        }
      });
    },
    onSelectAllCancel() {
      let self = this;
      self.jordanTableConfig1.data.map(item => {
        item.isChecked = false;
      });
    }, //全选勾选事件
    onSelectAll() {
      let self = this;
      self.jordanTableConfig1.data.map(item => {
        item.isChecked = true;
      });
    }, //全选选中事件
    //左边表格单击某一行
    onRowClick(row, index) {
      this.clickIndex = index;
      let t_len = this.jordanTableConfig1.data.length;
      if (t_len > 0) {
        this.jordanTableConfig1.data.forEach(element => {
          if (element.isActive) {
            element.isActive = false;
          }
        });
      }
      row.isActive = true;
      row.psCSkugroupList = this.jordanTableConfig1.data[index].psCSkugroupList;
      this.jordanTableConfig1.data[index] = Object.assign({}, row);
      if (this.jordanTableConfig1.data[index].isActive) {
        if (row.hasOwnProperty("ID")) {//编辑
          //这个是编辑页面显示数据
          //调用右边分页的事件 进行分页
          this.selectId = row.ID;
          if (
            this.jordanTableConfig1.data[index].psCSkugroupList &&
            this.jordanTableConfig1.data[index].psCSkugroupList.length > 0
          ) {
            this.jordanTableConfig2.data = this.jordanTableConfig1.data[
              index
            ].psCSkugroupList;
          } else {
            this.commodityPageChange();
          }
          // }
        } else {
          //新增的
          this.jordanTableConfig2.data = this.jordanTableConfig1.data[
            index
          ].psCSkugroupList;
          if (this.jordanTableConfig1.data[index].psCSkugroupList) {
            this.jordanTableConfig2.total = this.jordanTableConfig1.data[
              index
            ].psCSkugroupList.length;
          }
        }
      }
    },

    //右边表格选中某一行执行的操作
    RightonSelect(selection, row) {
      this.jordanTableConfig2.data.map(item => {
        if (row._index === item._index) {
          item.isChecked = true;
        }
      });
    },
    //取消选择的事件
    onSelectCancelCommodity(selection, row) {
      let self = this;
      self.jordanTableConfig2.data.map(item => {
        if (item._index === row._index) {
          item.isChecked = false;
        }
      });
    },
    //全部取消
    onSelectAllCancelCommodity() {
      let self = this;
      self.jordanTableConfig2.data.map(item => {
        item.isChecked = false;
      });
    }, //全选勾选事件
    onSelectAllCommodity() {
      let self = this;
      self.jordanTableConfig2.data.map(item => {
        item.isChecked = true;
      });
    }, //全选选中事件
    //条码明细删除
    tableDeleteDetail() {
      let selectcuu = []; //存放选中的
      let selectTableRow = []; //
      if (this.objid !== "-1") {
        if (this.statusName === "已提交") {
          this.$Message.warning("已提交的组合商品不能执行删除！");
          return false;
        } else {
          //编辑页面的删除明细
          let Noselectdata = []; //存放没有选中的
          this.jordanTableConfig1.data.map(item => {
            if (item.isActive) {
              selectcuu.push(item);
              if (item.ID) {
                selectTableRow.push(item.ID);
              }
            } else {
              Noselectdata.push(item);
            }
          });
          let cuLen =
            parseInt(Noselectdata.length) + parseInt(selectTableRow.length);
          if (this.jordanTableConfig1.data.length > cuLen) {
            //存在选中新增的
            this.jordanTableConfig1.data = [];
            this.jordanTableConfig1.data = Noselectdata; //去掉选中新增的
          }
          if (selectcuu.length > 0) {
            if (selectTableRow.length > 0) {
              let param = {
                delID: 1,
                objid: selectTableRow,
                mainId: this.objList.psCPro.ID
              };
              axios({
                url: "/p/cs/product/skuGroupDelDetail",
                method: "post",
                data: param
              }).then(res => {
                if (res.data.code === 0) {
                  this.IniData();
                } else {
                  this.$Message.warning(res.data.message);
                }
              });
            }
          } else {
            this.$Message.warning("请选择要删除的条码！");
          }
        }
      } else {
        //新增页面的删除明细
        let arrNo = [];
        for (let item of this.jordanTableConfig1.data) {
          if (item.isActive) {
            if (item.psCSkugroupList) {
              //保存失败的时候可能不存在这个属性
              if (item.psCSkugroupList.length > 0) {
                this.$Message.warning("SKU存在明细 无法删除！");
                return false;
              }
            }
          } else {
            arrNo.push(item);
          }
        }
        // this.jordanTableConfig1.data = [];
        this.jordanTableConfig1.data = arrNo;
        this.jordanTableConfig1.total--
      }
    },
    //组合商品明细 删除明细功能
    commodityDeleteDetail() {
      let selectTableRow = []; //存放选中的
      let selectdedidata = []; //修改页面之前保存的数据
      if (this.objid !== "-1") {
        if (this.statusName === "已提交") {
          this.$Message.warning("已提交的组合商品不能执行删除！");
          return false;
        } else {
          //编辑页面删除明细走接口
          let Noselectdata = []; //存放没有选中的
          this.jordanTableConfig2.data.map(item => {
            if (item.isChecked) {
              selectTableRow.push(item);
              if (item.ID) {
                //新增的id不存在
                selectdedidata.push(item.ID);
              }
            } else {
              Noselectdata.push(item);
            }
          });
          let cuLen =
            parseInt(Noselectdata.length) + parseInt(selectdedidata.length);
          if (this.jordanTableConfig2.data.length > cuLen) {
            //存在选中新增的
            this.jordanTableConfig1.data.map(item => {
              if (item.isActive) {
                item.psCSkugroupList = Noselectdata;
              }
            });
            this.jordanTableConfig2.data = [];
            this.jordanTableConfig2.data = Noselectdata; //去掉选中新增的
          }
          if (selectTableRow.length > 0) {
            if (selectdedidata.length > 0) {
              let param = {
                delID: 2,
                objid: selectdedidata,
                mainId: this.objList.psCPro.ID
              };
              axios({
                url: "/p/cs/product/skuGroupDelDetail",
                method: "post",
                data: param
              }).then(res => {
                if (res.data.code === 0) {
                  this.IniData();
                } else {
                  this.$Message.warning(res.data.message);
                }
              });
            }
          } else {
            this.$Message.warning("请选择要删除的组合商品！");
          }
        }
      } else {
        let arrNo = [];
        this.jordanTableConfig2.data.map((item, index) => {
          if (!item.isChecked) {
            //没选中
            arrNo.push(item);
          }
        });
        this.jordanTableConfig1.data.map(item => {
          if (item.isActive) {
            item.psCSkugroupList = arrNo;
          }
        });
        this.jordanTableConfig2.data = [];
        this.jordanTableConfig2.data = arrNo;
      }
    },
    //提交
    submitData() {
      axios({
        url: "/p/cs/product/skuGroupSubmit",
        method: "post",
        data: {
          objid: this.objid
        }
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.$Message.success(data.message);
        } else {
          this.$Message.warning(data.message);
        }
      });
    },
    //作废
    toVoid() {
      axios({
        url: "/p/cs/product/skuGroupVoid",
        method: "post",
        data: {
          objid: this.objid
        }
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.$Message.success(data.message);
        } else {
          this.$Message.warning(data.message);
        }
      });
    },
    //分页触发的函数
    pageSizeGetData() {
      this.jordanTableConfig1.loading = true;
      let param = {
        objid: this.objid,
        start:
          this.jordanTableConfig1.current === undefined
            ? 1
            : this.jordanTableConfig1.current,
        count:
          this.jordanTableConfig1.pageSize === undefined
            ? 1
            : this.jordanTableConfig1.pageSize
      };
      axios({
        url: "/p/cs/product/skuPage",
        method: "post",
        data: param
      }).then(res => {
        this.jordanTableConfig1.loading = false;
        let data = res.data;
        if (data.code == 0) {
          this.jordanTableConfig1.total = data.data.totalCount;
          this.jordanTableConfig1.data = [];
          data.data.data.map((item, index) => {
            item.isChecked = false;
            item._index = index;
            item.psCSkugroupList = [];
            this.jordanTableConfig1.data.push(item);
          });
        }
      });
    },

    // 条码明细分页change 事件 页码改变的回调
    pageChange(val) {
      this.jordanTableConfig1.current = val;
      this.pageSizeGetData();
    },
    // 条码明细切换分页条数
    pageSizeChange(val) {
      this.jordanTableConfig1.pageSize = val;
      this.pageSizeGetData();
    },
    //组合商品分页请求数据
    commodityPageSizeGet() {
      this.jordanTableConfig2.loading = true;
      if (this.selectId === "") {
        this.$Message.warning("请先选择一条条码明细");
        return;
      }
      let param = {
        objid: this.selectId,
        start:
          this.jordanTableConfig2.current === undefined
            ? 1
            : this.jordanTableConfig2.current,
        count:
          this.jordanTableConfig2.pageSize === undefined
            ? 1
            : this.jordanTableConfig2.pageSize
      };
      axios({
        url: "/p/cs/product/skuGroupDetailSearch",
        method: "post",
        data: param
      }).then(res => {
        this.jordanTableConfig2.loading = false;
        let data = res.data;
        if (data.code === 0) {
          this.jordanTableConfig2.total = data.data.totalCount;
          this.jordanTableConfig2.data = [];
          data.data.data.map((item, index) => {
            item.isChecked = false;
            item._index = index;
            this.jordanTableConfig2.data.push(item);
          });
          this.jordanTableConfig1.data.map(sub => {
            if (sub.ID && sub.ID === this.selectId) {
              sub.psCSkugroupList = this.jordanTableConfig2.data;
            }
          });
        } else {
          this.$Message.warning(data.message);
        }
      });
    },
    //组合商品明细分页
    commodityPageChange(val) {
      this.jordanTableConfig2.current = val;
      this.commodityPageSizeGet();
    },
    //组合商品明细切换分页条数事件
    commodityPageSizeChange(val) {
      this.jordanTableConfig2.pageSize = val;
      this.commodityPageSizeGet();
    },
    //初始化数据
    IniData() {
      axios({
        url: "/p/cs/product/skuGroupEditorSearch",
        method: "post",
        data: {
          objid: this.objid,
          pageNum: this.jordanTableConfig1.current,
          pageSize: this.jordanTableConfig1.pageSize
        }
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.objList = data.data.data;
          this.jordanTableConfig1.total = data.data.skuTotal; //条码数据总条数
          this.jordanTableConfig2.total = data.data.skuGroupTotal; //组合商品数据总条数
          this.DataCombine();
          this.formConfig1.formData.map(item => {
            if (
              item.style === "popInput" &&
              item.itemdata.fkdisplay === "drp"
            ) {
              item.itemdata.valuedata = data.data.BRANDENAME; //品牌名称
              item.itemdata.pid = this.formConfig1.formValue.PS_C_BRAND_ID; //品牌id
            }
            if (
              item.style === "popInput" &&
              item.itemdata.fkdisplay === "mrp"
            ) {
              item.itemdata.valuedata = data.data.STORENAMES; //虚拟仓库名称
              item.itemdata.pid = data.data.CP_C_STORE_IDS; //虚拟仓的id
            }
          });
          if (this.objList.psCPro.ISACTIVE === "N") {
            this.selecttype(this.formConfig1.formValue.GROUP_TYPE); //调用组合类型改变函数 保证界面一致
          } else {
            this.selecttype(this.formConfig1.formValue.GROUP_TYPE); //调用组合类型改变函数 保证界面一致
            this.jordanTableConfig1.jordanFormConfig.formData = [];
            this.jordanTableConfig2.jordanFormConfig.formData = [];
          }
        }
      });
    },
    //时间转换函数
    formatDateTime(timeStamp) {
      let date = new Date();
      date.setTime(timeStamp);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      // second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    //改变页面的可读写状态
    changeReadStatus() {
      // if (status === "已作废") {
      //已作废
      this.formConfig1.formData.map(item => {
        if ("disabled" in item) {
          item.disabled = true;
        }
        if (item.itemdata) {
          if ("readonly" in item.itemdata) {
            item.itemdata.readonly = true;
          }
        }
      });
      this.jordanTableConfig1.jordanFormConfig.formData.map(item => {
        if ("disabled" in item) {
          item.disabled = true;
        }
      });
      this.jordanTableConfig2.jordanFormConfig.formData.map(item => {
        if ("disabled" in item) {
          item.disabled = true;
        }
      });
      this.jordanTableConfig1.isShowDeleteDetailBtn = false;
      this.jordanTableConfig2.isShowDeleteDetailBtn = false;
      this.jordanTableConfig2.isShowImportBtn = false;
      this.jordanTableConfig1.jordanFormConfig.formData = [];
      this.jordanTableConfig2.jordanFormConfig.formData = [];
      this.btnConfig.buttons.map(item => {
        if (item.text !== "返回") {
          this.$set(item, "disabled", true);
        }
      });
      // }
    },
    //数据渲染在页面上
    DataCombine() {
      this.jordanTableConfig1.data = []; //先清空数据
      this.jordanTableConfig2.data = [];
      let CurrentData = Object.assign({}, this.objList);
      if (CurrentData) {
        if (CurrentData.psCPro) {
          if (CurrentData.psCPro["ISACTIVE"] === "Y") {
            this.statusName = "启用"; //提交状态
            this.changeReadStatus();
          }
          if (CurrentData.psCPro["ISACTIVE"] === "N") {
            this.statusName = "停用"; //作废状态
            this.formConfig1.formData.map(item => {
              if (item.label === "商品编码") {
                item.disabled = true;
              }
            });
            this.jordanTableConfig1.isShowDeleteDetailBtn = true;
            this.jordanTableConfig2.isShowDeleteDetailBtn = true;
            this.jordanTableConfig2.isShowImportBtn = true;
          }
          //判断主表信息是都存在
          for (let key in CurrentData.psCPro) {
            for (let mainkey in this.formConfig1.formValue) {
              //基本信息
              if (key === mainkey) {
                this.formConfig1.formValue[mainkey] = CurrentData.psCPro[key];
              }
            }
            for (let logKey in this.formConfig2.formValue) {
              //日志信息
              if (key === logKey) {
                if (key === "MODIFIEDDATE" || key === "CREATIONDATE") {
                  //时间进行转换
                  this.formConfig2.formValue[logKey] = this.formatDateTime(
                    CurrentData.psCPro[key]
                  );
                } else {
                  this.formConfig2.formValue[logKey] = CurrentData.psCPro[key];
                }
              }
            }
          }
        }

        if (CurrentData.skuGroupRequestList.length > 0) {
          //判断 明细表数据
          for (let i = 0; i < CurrentData.skuGroupRequestList.length; i++) {
            //条码明细和组合商品明细数据
            let item = CurrentData.skuGroupRequestList[i];
            item.psCSku.isChecked = false;
            item.psCSku.isActive = false;
            if (
              i === 0 &&
              CurrentData.skuGroupRequestList[i].psCSkugroupList instanceof
              Array &&
              CurrentData.skuGroupRequestList[i].psCSkugroupList.length > 0
            ) {
              for (
                let j = 0;
                j < CurrentData.skuGroupRequestList[i].psCSkugroupList.length;
                j++
              ) {
                CurrentData.skuGroupRequestList[i].psCSkugroupList[
                  j
                ].isChecked = false;
                CurrentData.skuGroupRequestList[i].psCSkugroupList[
                  j
                ]._index = j;
                this.jordanTableConfig2.data.push(
                  CurrentData.skuGroupRequestList[i].psCSkugroupList[j]
                );
                item.isActive = false;
                item.psCSku.psCSkugroupList =
                  CurrentData.skuGroupRequestList[i].psCSkugroupList;
              }
            }
            this.jordanTableConfig1.data.push(item.psCSku);
          }
        }
      }
    },
    //导入虚拟条码与实际条码
    importskuGroup(operationType) {
      const _this = this;
      _this.importType = operationType;
      _this.importTable.componentData = Object.assign(
        _this.importTable.componentData,
        {
          tableName: "PS_C_SKUGROUP",
          type: _this.formConfig1.formValue.GROUP_TYPE,
          operationType: operationType
        }
      );
      _this.$children.find(item => item.name === "importTable").openConfirm();
    },
    commodityDetailImport() {
      //组合商品明细导入
      if (
        this.jordanTableConfig1.data.length > 0 &&
        this.jordanTableConfig1.data[this.clickIndex].isActive
      ) {
        this.importskuGroup("groupDetail");
      } else {
        this.$Message.warning("请选择点击要录入商品明细的条码信息");
      }
    },
    commodityDetailExport() {
      //组合商品明细导出
    },
    changeTab(name) {
      //tab被点击时触发
      console.log(name, "改变");
    },
    operateLogPageChange(val) {
      //页码改变
    },
    operateLogPageSizeChange(val) {
      //每页显示数据条数改变
    },
    setTableHeight() {
      let tableHeight = document.getElementById('content').clientHeight;
      this.jordanTableConfig1.height = tableHeight - 350;
      this.jordanTableConfig2.height = tableHeight - 350;
    }
  },
  created() {
    this.objid = this.$route.query.id; //根据objid判断页面是新增页面还是编辑页面
    this.pageconfigData(this.objid);
    this.IniData(); //初始化数据
  },
  mounted() {
    this.setTableHeight();
  }
};
</script>
<style lang="less">
@import "~@/assets/css/css_1_3/theme.less";
.jq-combined-commodity {
  .btn-operate {
    padding: 8px 0 0 0;
  }
  .submit-img {
    //no-active
    position: absolute;
    top: 0;
    right: 60px;
    width: 104px;
    z-index: 1000;
    img {
      width: 100%;
    }
  }
  .orderManageEdit .popInput .item-input .input-wrap .input-inner input {
    font-size: 12px;
  }
  .commodity-detail-box {
    width: 100%;
    .bar-code-detail {
      width: 49.5%;
      border: none;
      float: left;
      .burgeon-form-item {
        margin-bottom: 0px;
      }
    }
    .combined-commodity-detail {
      width: 49.5%;
      border: none;
      float: right;
      .burgeon-form-item {
        margin-bottom: 0px;
      }
    }
    .tab-content {
      // width: 100%;
      padding: 8px 12px;
      overflow-x: auto;
      margin-top: 0px;
      border: none;
      border-left: 1px solid #d3d3d3;
      border-right: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;

      tr.clickstyle td {
        background-color: #381fa8 !important;
        color: #fff;
      }

      .orderManageEdit .jordanForm_a .burgeon-col-span-5,
      .orderManageEdit .jordanForm_a .burgeon-col-span-6,
      .orderManageEdit .jordanForm_a .burgeon-col-span-7,
      .orderManageEdit .jordanForm_a .burgeon-col-span-8,
      .orderManageEdit .jordanForm_a .burgeon-col-span-9,
      .orderManageEdit .jordanForm_a .burgeon-col-span-12,
      .orderManageEdit .jordanForm_a .burgeon-col-span-24 {
        height: 24px;
        margin-top: 8px;
      }
    }
  }
}
</style>

