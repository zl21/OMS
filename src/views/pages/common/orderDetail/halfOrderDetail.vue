<template>
  <div class="ff-order-detail" v-loading="fileImport">
    <div class="ff-order-detail-search-box">
      <matrix-input
        @refreshGetData="refreshData"
        @changeSave="changeSave"
        @newLySave="newLySave"
        @noContent="noContent"
        @errorHasContent="errorHasContent"
        @changeEditSave="changeEditSave"
        @objectEdit="objectEdit"
        @changeStopSave="changeStopSave"
        :stopsave="stopsave"
        :isCustom="isCustom"
        :selectItem="selectItem"
        :objid="objid"
        :objList="objList"
        :activeObj="activeObj"
        :tablename="tablename"
        :inputList="inputList"
        :isdisabled="isdisabled"
        :isActive="isActive"
        :save="save"
        :editsave="editsave"
        ref="inputMatrix"
      ></matrix-input>
    </div>

    <!--条码录入框-->
    <page-nation
      :currentPag="currentPage"
      :pageSize="pageSize"
      :total="total"
      :searchNation="searchNation"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @detail-delete="detailDelete"
      @detail-updateDiscount="updateDiscount"
      :isDeleteBtn="isDeleteBtn && isActive && !isdisabled"
      :isUpdateDiscountBtn="isUpdateDiscountBtn && isActive && !isdisabled"
      :hasImport="tablename === 'DL_B_TRAN_OUT' ? true : false"
      @detailImport="detailImport"
    ></page-nation>
    <!-- 分页 -->
    <div class="ff-order-detail-content">
      <div
        class="ff-order-detail--box"
        v-loading="tableLoading"
        :class="{ 'ff-order-detail--box-full': !matrixShow }"
        v-show="listShow"
      >
        <custom-table
          ref="custom"
          :tHead="tHead"
          :tBody="tBody"
          :subtotalRow="subtotalRow"
          :objList="objList"
          :activeSub="activeSub"
          :isdisabled="isdisabled"
          :isActive="isActive"
          @popShow="popShow"
          @loadChange="loadChange"
          @change="checkChange"
          @amendChange="amendChange"
          @asc="asc"
          @des="des"
        ></custom-table>
        <!-- 表格 -->
      </div>
      <div
        class="ff-popper-class-triangle"
        :style="{ transform: `translate3d(-4px,${translate}px,0)` }"
        v-if="matrixShow"
      ></div>
      <div
        class="ff-o-popper-class-box"
        :style="{ overflow: loading ? 'hidden' : 'auto' }"
        v-show="matrixShow"
        :class="{ 'ff-popper-class-box-full': !listShow }"
      >
        <div
          class="ff-list-hidden-show"
          @click="
            listShow = !listShow;
            matrixShow = true;
          "
          :title="listShow ? '收起列表' : '显示列表'"
        >
          <i class="iconfont" v-show="!listShow">&#xe610;</i>
          <i class="iconfont" v-show="listShow">&#xe611;</i>
        </div>
        <div
          class="ff-o-popper-class"
          v-loading="hasMatch ? loading || revealLoading : loading"
          ref="detail"
        >
          <matrix
            v-if="visible"
            :edit="true"
            :objid="objid"
            :selectItem="selectItem"
            :objList="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :priceList="activeObj.PRICE_LIST"
            :tablename="tablename"
            :loading="loading"
            :matchTableData="matchTableData"
            :isdisabled="isdisabled"
            :isActive="isActive"
            :general="general"
            :btnFlag="btnFlag"
            :isStockBtn="isStockBtn"
            :isStockNoEnoughBtn="isStockNoEnoughBtn"
            :isDetailMatrix="isDetailMatrix"
            @enterSave="enterSave"
            @matrixSave="matrixSave"
            @loadChange="loadChange"
            @amendData="amendData"
            @inputFocus="inputFocus"
            ref="matrixOne"
          ></matrix>
          <matrix
            ref="matrixTwo"
            v-if="visible && hasMatch"
            :reveal="true"
            :objid="objid"
            :isdisabled="isdisabled"
            :isActive="isActive"
            :selectItem="selectItem"
            :objList="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :tablename="tablename"
            :loading="revealLoading"
            @match="match"
            @loadChange="revealLoadChange"
          ></matrix>
          <div v-if="tBody.length === 0" class="ff-matrix--nodata">暂无数据</div>
        </div>
      </div>
      <div
        class="ff-matrix-hidden-show"
        @click="
          matrixShow = !matrixShow;
          listShow = true;
        "
        :title="matrixShow ? '收起矩阵' : '显示矩阵'"
      >
        <i class="iconfont" v-show="!matrixShow">&#xe610;</i>
        <i class="iconfont" v-show="matrixShow">&#xe611;</i>
      </div>
    </div>
    <!--右侧悬浮框-->
    <!-- 提示框 -->
    <drag-dialog
      v-if="tipsDialog.show"
      :title="tipsDialog.title"
      :visible.sync="tipsDialog.show"
      :close-on-click-modal="false"
      :showClose="true"
      size="mini"
      class="tipsDialog"
      :class="tipsDialog.type"
    >
      <error-tips
        :errorMessage="tipsDialog.errorList"
        :DialogBack="tipsDialog.backBtn"
        :DialogClass="tipsDialog.type"
        v-on:refreshbizlines="errorDialogClose"
      ></error-tips>
    </drag-dialog>
    <Modal
      class="orderDetailModal"
      :mask="true"
      v-model="updateSalePriceFlag"
      :loading="discountLoading"
      :title="'批量修改折扣'"
      @on-ok="updateDiscountCorfirm"
      @on-cancel="updateDiscountCancel"
    >
      <div class="orderContent">
        <Form
          :model="updateSalePriceModal"
          :rules="ruleValidate"
          label-position="right"
          :label-width="70"
          inline
        >
          <FormItem label="修改类型" prop="UPDATE_TYPE">
            <Select
              style="width: 160px"
              :transfer="true"
              v-model="updateSalePriceModal.UPDATE_TYPE"
              @on-change="updateTypeChange"
            >
              <Option
                v-for="item in updateTypeArr"
                :key="item.key"
                :value="item.key"
              >{{ item.showName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="折扣" prop="SALE_DISCOUNT">
            <Input
              v-model="updateSalePriceModal.SALE_DISCOUNT"
              placeholder="请输入折扣"
              @on-change="saleDiscountChange"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
            />
          </FormItem>
          <FormItem label="价格" prop="SALE_PRICE">
            <Input
              v-model="updateSalePriceModal.SALE_PRICE"
              placeholder="请输入价格"
              @on-change="salePriceChange"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import CustomTable from "framework/components/table/customTable.vue";
import matrix from "./matrix.vue";
import DragDialog from "framework/components/dialog/dragDialog.vue";
import ErrorTips from "framework/components/tablelist/error.vue";
import matrixInput from "./matrixInput2.vue";
import port from "./connector.js";
import pageNation from "framework/components/page/pagenation.vue";
import axios from "framework/__utils__/request.js";
// import store from "@/store";
import R3 from '@syman/burgeon-r3'
export default {
  props: {
    inputList: {
      type: Array,
      default: () => [
        {
          name: "数量",
          colname: "QTY",
          defnum: 1
        }
      ]
    }, //配的数量字段名集合
    isdisabled: {
      type: Boolean
    }, //用于判断状态是否变更
    editsave: Boolean, //判断编辑的时候主表是否保存完毕
    stopsave: Boolean //停止矩阵保存
  },
  data() {
    return {
      refresh: Boolean, //刷新
      save: Boolean, //保存
      singleData: '',
      listShow: true, //控制列表显示隐藏
      matrixShow: true, //控制矩陣box显示隐藏的
      fileImport: false, //导出功能的loading
      queryListPort: false, //防止请求两次
      isCustom: true, //表示是否是定制的input矩阵
      search: "", //搜索
      /*dataPopShow: false,//右边矩阵显示*/
      currentPage: 1, //当前页
      pageSize: 100, //每页条数变化
      searchNation: {
        searchInputShow: false,
        isSearchText: false,
        pageSearchSelectList: []
      },
      total: 0, //总数
      tHead: [], //头部内容
      tBody: [], //body内容
      visible: false, //显示弹框
      updateSalePriceFlag: false, //显示弹框
      discountLoading: true,
      updateSalePriceModal: {
        UPDATE_TYPE: 0,
        SALE_DISCOUNT: "",
        SALE_PRICE: ""
      },
      ruleValidate: {
        UPDATE_TYPE: [{ required: true, message: " ", trigger: "change" }],
        SALE_DISCOUNT: [{ required: true, message: " ", trigger: "change" }],
        SALE_PRICE: [{ required: false, message: " ", trigger: "change" }]
      },
      updateTypeArr: [
        {
          key: 0,
          showName: "折扣"
        },
        {
          key: 1,
          showName: "价格"
        }
      ],
      loading: false, //加载动态
      revealLoading: false, //纯展示loading
      translate: 34, //三角形位置
      Dialog: false, //对话框
      generalLoading: false, //对话框数据加载loading
      general: true,
      btnFlag: false,
      isStockBtn: false,
      isStockNoEnoughBtn: true,
      isDetailMatrix: true,
      tipsDialog: {
        show: false, //控制警告弹框显示
        title: "警告", //弹框标题
        type: "warning", //类型警告
        backBtn: true, //是否显示返回按钮
        errorList: [
          {
            message: "是否保存已经修改的数据?"
          }
        ] //提示内容
      }, //警告弹出框信息
      objSave: {}, //保存行切换时的子组件传上来的数据
      amend: {}, //矩阵的修改了的数据
      judge: "", //判断是刷新数据还是行变化
      activeObj: {}, //高亮行的信息
      subtotalRow: [], //总计一栏
      orderby: [], //排序数据
      tableLoading: false, //表内容加载loading
      isDeleteBtn: false, //默认没有删除明细按钮
      isUpdateDiscountBtn: false, //默认没有修改折扣按钮
      matchTableData: {}, //用于匹配的表格数据
      hasMatch: false, //是否有匹配矩阵
      focusInput: false, //input聚焦
      activeSub: false, //用来判断数据变更后是否还显示当前高亮行的(true为当前高亮的行不变)
      isDialogMatrixSave: false, //判断是否是弹出框矩阵保存
      bodyChangeData: {}, //左边数据列表修改
      changeFields: [] //可以填写的字段
    };
  },
  computed: {
    tablename: function () {
      return this.$route.params.tableName;
    },
    isActive: function () {
      return true
    }, //true显示 false表示禁用

    selectItem: function () {
      let str = this.$route.path.split('/');
      return R3.store.state[`${str[3]}.${str[4]}.${str[5]}.${str[6]}`]
    }, //表信息
    objid: function () {
      return this.$route.params.itemId == "New" ? -1 : this.$route.params.itemId
    }, //表ID
    objList: function () {
      let str = this.$route.path.split('/');
      return this.$store.state[`${str[3]}.${str[4]}.${str[5]}.${str[6]}`].mainFormInfo.formData.data.addcolums;
    }
  },
  watch: {
    refresh(val) {
      if (val) {
        this.activeSub = false; //改变高亮行
        this.$emit("changeRefresh", false);
        if (this.currentPage === 1) {
          this.getData();
        } else {
          this.currentPage = 1; //更新数据
          this.getData();
        }
      }
    }, //刷新数据
    save(val) {
      if (val) {
        this.activeSub = false; //改变高亮行
        this.saveAmendData()
          .then(res => {
            if (res === 1) return; //空保存
            let resData = res.data;
            if (resData.code === 0) {
              this.getData();
              this.save = false
            } else {
              this.getData();
              this.save = false
              let errorData;
              if (resData.data) {
                errorData = resData.data;
                errorData.unshift({
                  message: resData.message
                });
                store.commit("errorDialog", {
                  //其它报错
                  message: {
                    data: errorData
                  }
                });
              } else {
                store.commit("errorDialog", {
                  //其它报错
                  message: resData.message
                });
              }
            }
          })
          .catch(() => {
            this.getData().then(() => {
              this.translate = 34; //初始化
              if (this.tBody.length === 0) return (this.activeObj = {});
              this.activeObj = this.tBody[0];
            }); //获取列表数据
            this.save = false
          });
      }
    }, //保存数据
    editsave(val) {
      if (val && !this.isDialogMatrixSave) {
        this.saveAmendData().then(res => {
          //保存数据
          let resData = res.data;
          if (resData.code === 0) {
            if (this.judge === "row") {
              //行改变
              this.activeObj = this.tBody[this.objSave.sub]; //保存点击行的信息
              this.activeSub = true; //不改变高亮行
              this.getData().then(() => {
                this.changeMatrix(this.objSave);
              });
            } else {
              //数据刷新
              this.activeSub = false; //改变高亮行
              this.getData();
            }
          } else {
            let errorData;
            if (resData.data) {
              errorData = resData.data;
              errorData.unshift({
                message: resData.message
              });
              store.commit("errorDialog", {
                //其它报错
                message: {
                  data: errorData
                }
              });
            } else {
              store.commit("errorDialog", {
                //其它报错
                message: resData.message
              });
            }
          }
          this.$emit("changeEditSave");
        });
        this.tipsDialog.show = false; //关闭警告框
      }
    } //明细切换时矩阵保存
  },
  methods: {
    changeStopSave() {
      this.$emit("changeStopSave");
    }, //初始化主表保存有错变量
    objectEdit(e) {
      this.isDialogMatrixSave = true;
      // this.$emit("objectEdit");
      this.singleData = e;
      $('#actionMODIFY')[0].click();
    }, //告诉父组件先保存主表
    changeEditSave() {
      this.isDialogMatrixSave = false;
      this.$emit("changeEditSave");
    }, //初始化主表保存完毕的变量
    errorHasContent() {
      this.$emit("changeHasContent", true);
    }, //报错的告诉父组件我的数据没有清空还可以继续保存
    detailImport() {
      this.fileImport = true;
      let arr = [];
      this.tBody.map(obj => {
        if (obj.checked) arr.push(obj.ID);
      });
      let searchdata = {
        table: this.selectItem.tablename,
        objectIds: this.selectItem.refcolid + "=" + this.objid,
        column_include_uicontroller: true,
        fixedcolumns: {
          ID: arr.length === 0 ? null : arr
        }
      };
      axios({
        url: "/p/outpro/export",
        method: "post",
        data: {
          searchdata: JSON.stringify(searchdata),
          filename: this.selectItem.tabledesc,
          filetype: ".xlsx",
          showColumnName: true
        }
      })
        .then(res => {
          this.fileImport = false;
          let data = res.data;
          if (data.code === 0) {
            let url = "/p/outpro/download?filename=" + data.data;
            location.href = url;
          } else {
            store.commit("errorDialog", {
              //其它报错
              message: data.message
            });
          }
        })
        .catch(res => {
          store.commit("errorDialog", {
            //其它报错
            message: res.data.message
          });
        });
    }, //导出功能
    noContent() {
      this.$emit("changeHasContent", false);
    }, //定制页面没有明细
    newLySave(e) {
      // this.$emit("changeHasContent", true);
      // this.$emit("objectSave");
      // this.isNewCustom = true;
      this.singleData = e;
      $('#actionMODIFY')[0].click();
    }, //新增tab明细保存
    changeSave(val) {
      this.$emit("changeSave", val);
    }, //修改保存
    enterSave() {
      this.activeSub = false; //改变高亮行
      this.$emit("changeSave", true);
    }, //子组件矩阵entry最后一个保存
    matrixSave() {
      this.$emit("objectSave", true);
    }, //子组件矩阵entry最后一个保存
    asc(index) {
      this.activeSub = false; //改变高亮行
      this.orderby = [
        {
          column: `${
            this.tablename === "DL_B_PAND" ||
              this.tablename === "DL_B_INV_ADJ" ||
              this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
              this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS"
              ? port[this.tablename].virtualName
              : port[this.tablename].tableName
            }.${this.tHead[index].name}`,
          asc: true
        }
      ];
      this.getData();
    }, //升序
    des(index) {
      this.activeSub = false; //改变高亮行
      this.orderby = [
        {
          column: `${
            this.tablename === "DL_B_PAND" ||
              this.tablename === "DL_B_INV_ADJ" ||
              this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
              this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS"
              ? port[this.tablename].virtualName
              : port[this.tablename].tableName
            }.${this.tHead[index].name}`,
          asc: false
        }
      ];
      this.getData();
    }, //降序
    checkChange() {
      let arr = [];
      this.tBody.map(obj => {
        if (obj.checked) arr.push(obj);
      });
      this.$emit("checkData", arr); //向上传递选中的数据
    }, //列表多选事件
    amendData(val) {
      this.amend = val;
      this.$emit("amendData", val); //触发保存方法并传递改变的值
    }, //保存矩阵修改了的数据
    amendChange(data) {
      this.bodyChangeData = Object.assign({}, data);
      this.$emit("amendData", data);
    }, //左边列表数据修改
    /*amendDialogData (val) {
      this.amend = val;
    },//保存弹框*/
    bigSave(e) {
      if (e.detail.type !== 'save') return;
      this.save = true;
    },
    saveAmendData() {
      let data = {};
      data[
        `${
        this.tablename === "DL_B_TRAN_OUT" ||
          this.tablename === "DL_B_TRAN_OUT_POS"
          ? port[this.tablename].special
          : port[this.tablename].tableName
        }`
      ] = [];
      /*右边矩阵保存参数*/
      if (Object.keys(this.amend).length !== 0) {
        Object.keys(this.amend).map(keys => {
          let obj = this.amend[keys];
          let tableObj = {
            ID: obj.ID === undefined ? -1 : obj.ID, //子表ID
            PS_C_PRO_ECODE: this.activeObj.PS_C_PRO_ECODE, //商品编码
            PS_C_SKU_ECODE: obj.PS_C_SKU_ECODE, //SKU编码
            PS_C_SKU_ID: obj.PS_C_SKU_ID //SKUID
          };
          if (this.tablename === "DL_B_TRAN_PLAN") {
            tableObj["QTY_EXEC_PLAN"] = obj.count === "" ? 0 : obj.count; //数量
          } else {
            tableObj["QTY"] = obj.count === "" ? 0 : obj.count; //数量
          }
          if (obj.MATRIX_DATA) {
            if (obj.MATRIX_DATA.OLD_QTY_BILL !== undefined) {
              tableObj["OLD_QTY_BILL"] = obj.MATRIX_DATA.OLD_QTY_BILL;
            }
          }
          data[
            `${
            this.tablename === "DL_B_TRAN_OUT" ||
              this.tablename === "DL_B_TRAN_OUT_POS"
              ? port[this.tablename].special
              : port[this.tablename].tableName
            }`
          ].push(tableObj);
        });
      }
      /*左边列表保存参数*/
      if (Object.keys(this.bodyChangeData).length !== 0) {
        Object.keys(this.bodyChangeData).map(keys => {
          let obj = {
            PS_C_PRO_ECODE: this.bodyChangeData[keys].PS_C_PRO_ECODE
          };
          this.changeFields.map(list => {
            obj[list] = this.bodyChangeData[keys][list];
          });
          data[
            `${
            this.tablename === "DL_B_TRAN_OUT" ||
              this.tablename === "DL_B_TRAN_OUT_POS"
              ? port[this.tablename].special
              : port[this.tablename].tableName
            }`
          ].push(obj);
        });
      }
      if (Object.keys(this.singleData).length !== 0) {
        let obj = {};
        obj["ID"] = -1;
        obj["PS_C_SKU_ECODE"] = this.singleData[port[this.tablename].queryObjSave].PS_C_SKU_ECODE;
        obj["PS_C_SKU_ID"] = this.singleData[port[this.tablename].queryObjSave].PS_C_SKU_ID;
        obj["QTY"] = 1;
        data[
          `${
          this.tablename === "DL_B_TRAN_OUT" ||
            this.tablename === "DL_B_TRAN_OUT_POS"
            ? port[this.tablename].special
            : port[this.tablename].tableName
          }`
        ].push(obj);
      }
      return axios({
        url: port[this.tablename].amendBody,
        method: "post",
        data: {
          table:
            this.tablename === "DL_B_TRAN_OUT_POS"
              ? this.tablename.replace("_POS", "")
              : this.tablename, //表
          objid: this.objid, //主表ID
          data: JSON.stringify(data)
        }
      });
    }, //切换和改变页码和页显示数时保存数据
    errorDialogClose(val, option) {
      if (option) {
        //确认
        this.$emit("objectEdit");
      } else {
        //取消
        this.amend = {}; //清空修改了的数据
        this.$emit("amendData", {}); //触发保存方法并传递改变的值
        if (this.judge === "row") {
          //行改变
          this.activeSub = true; //不改变高亮行
          this.changeMatrix(this.objSave);
        } else {
          //数据刷新
          this.activeSub = false; //改变高亮行
          this.getData();
        }
      }
      this.tipsDialog.show = false; //关闭警告框
    }, //警告弹框关闭时(参数true为确认，false为返回)
    changeMatrix(obj) {
      let m = String(obj.scrollTop / 24).split(".")[1]; //计算出滚动的距离是否是24的倍数
      let num = Number.parseFloat(m === undefined ? 0 : ("0." + m) * 24); //不是就算出(多余24的倍数)多少距离
      this.translate =
        Number.parseInt(obj.y / 24 + 1) * 24 + 10 + (num === 0 ? 0 : 24 - num);
      //鼠标距离到最外面包裹table的滚动box的距离/24取整，在加上tr高度的一般，在加上(没滚动完的tr底部border距离最外面那个box的距离)
      this.$nextTick(() => {
        //在显示弹框用于请求
        this.loading = true;
        this.revealLoading = true;
      });
    }, //弹出新的矩阵框
    detailDelete() {
      let arr = [];
      this.tBody.map(obj => {
        if (obj.checked) arr.push(obj.PS_C_PRO_ECODE);
      });
      if (arr.length === 0)
        return this.$message({
          message: "请选择要删除的明细",
          type: "warning"
        });
      axios({
        url: "/p/cs/prodel",
        method: "post",
        data: {
          param: JSON.stringify({
            objid: this.objid,
            maintable: this.tablename,
            tablename: port[this.tablename].tableName,
            fixcolumn: {
              PRO_ECODES: arr
            }
          })
        }
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.activeSub = false; //改变高亮行
          this.$message({
            message: "删除明细成功",
            type: "success"
          });
          this.getData();
        }
      });
    }, //删除明细
    updateDiscount() {
      let arr = [];
      this.tBody.map(obj => {
        if (obj.checked) arr.push(obj.PS_C_PRO_ECODE);
      });
      this.updateSalePriceModal = {
        UPDATE_TYPE: 0,
        SALE_DISCOUNT: "",
        SALE_PRICE: ""
      };
      this.updateSalePriceFlag = true;
    }, //修改折扣
    updateTypeChange() {
      this.loadingClose();
      if (this.updateSalePriceModal.UPDATE_TYPE === 0) {
        this.updateSalePriceModal.SALE_PRICE = "";
        this.ruleValidate = {
          UPDATE_TYPE: [{ required: true, message: " ", trigger: "change" }],
          SALE_DISCOUNT: [{ required: true, message: " ", trigger: "change" }],
          SALE_PRICE: [{ required: false, message: " ", trigger: "change" }]
        };
      } else {
        this.updateSalePriceModal.SALE_DISCOUNT = "";
        this.ruleValidate = {
          UPDATE_TYPE: [{ required: true, message: " ", trigger: "change" }],
          SALE_DISCOUNT: [{ required: false, message: " ", trigger: "change" }],
          SALE_PRICE: [{ required: true, message: " ", trigger: "change" }]
        };
      }
    },
    saleDiscountChange() {
      this.loadingClose();
    },
    salePriceChange() {
      this.loadingClose();
    },
    loadingClose() { },
    updateDiscountCorfirm() {
      let arr = [];
      this.discountLoading = true;
      let warnMsg = this.checkDiscountData();
      if (warnMsg) {
        this.discountLoading = false;
        setTimeout(() => {
          this.discountLoading = true;
        });
        return this.$message({
          message: warnMsg,
          type: "warning"
        });
      }
      this.tBody.map(obj => {
        if (obj.checked) arr.push(obj.PS_C_PRO_ECODE);
      });
      let proEcodeStr = arr.join(",");
      axios({
        url: "/p/cs/oc/v1/sale/updateDicunot",
        method: "post",
        data: {
          param: JSON.stringify({
            objid: this.objid,
            maintable: this.tablename,
            tablename: port[this.tablename].tableName,
            fixcolumn: {
              PRO_ECODES: proEcodeStr,
              UPDATE_TYPE: this.updateSalePriceModal.UPDATE_TYPE,
              SALE_DISCOUNT: this.updateSalePriceModal.SALE_DISCOUNT,
              SALE_PRICE: this.updateSalePriceModal.SALE_PRICE
            }
          })
        }
      }).then(res => {
        let data = res.data;
        if (data.code === 0) {
          this.activeSub = false; //改变高亮行
          this.discountLoading = false;
          this.updateSalePriceFlag = false;
          this.$message({
            message: "修改折扣成功",
            type: "success"
          });
          this.discountLoading = false;
          this.resetDiscountModal();
          this.getData();
        } else {
          this.discountLoading = false;
          setTimeout(() => {
            this.discountLoading = true;
          });
        }
      });
    },
    checkDiscountData() {
      let warnMsg = "";
      if (this.updateSalePriceModal.UPDATE_TYPE === 0) {
        if (!this.updateSalePriceModal.SALE_DISCOUNT) {
          warnMsg = "请维护折扣！";
        }
      } else {
        if (!this.updateSalePriceModal.SALE_PRICE) {
          warnMsg = "请维护价格！";
        }
      }
      return warnMsg;
    },
    updateDiscountCancel() {
      this.resetDiscountModal();
    },
    resetDiscountModal() {
      this.ruleValidate = {
        UPDATE_TYPE: [{ required: true, message: " ", trigger: "change" }],
        SALE_DISCOUNT: [{ required: true, message: " ", trigger: "change" }],
        SALE_PRICE: [{ required: false, message: " ", trigger: "change" }]
      };
    },
    handleSizeChange(val) {
      this.activeSub = false; //改变高亮行
      this.pageSize = val;
      if (this.currentPage === 1) {
        if (Object.keys(this.amend).length === 0) {
          //数据没有修改
          this.getData();
        } else {
          this.judge = "";
          this.$emit("objectEdit");
          // this.tipsDialog.show = true; //弹出警告对话框
        }
      } else {
        this.currentPage = 1; //页码变化，执行页码变化的方法
        this.getData();
      }
    }, //每页条数变化
    handleCurrentChange(val) {
      this.activeSub = false; //改变高亮行
      this.currentPage = val;
      if (Object.keys(this.amend).length === 0) {
        //矩阵数据没有修改
        this.getData();
      } else {
        this.judge = "";
        this.$emit("objectEdit");
        // this.tipsDialog.show = true; //弹出警告对话框
      }
    }, //当前页变化
    popShow(obj) {
      this.activeSub = true; //不改变高亮行
      this.objSave = obj; //存储点击行的信息
      //修改了matrix数据切换时弹出警告框，没有就直接切换
      if (Object.keys(this.amend).length === 0) {
        this.activeObj = this.tBody[obj.sub]; //保存点击行的信息
        this.changeMatrix(this.objSave);
      } else {
        this.judge = "row";
        this.$emit("objectEdit");
        // this.tipsDialog.show = true; //切换时弹出警告框
      }
    }, //显示右边的弹框
    loadChange() {
      this.matchTableData = {}; //初始化
      this.loading = false;
    }, //关闭loading
    revealLoadChange() {
      this.matchTableData = {}; //初始化
      this.revealLoading = false;
    }, //关闭纯展示loading
    inputFocus() {
      if (this.focusInput) {
        setTimeout(() => {
          this.$refs["inputMatrix"].$refs["searchInput"].focus();
        });
        this.focusInput = false;
      }
    }, //等矩阵数据刷新完后input聚焦
    getData() {
      this.tableLoading = true; //表格loading
      this.revealLoading = false; //通用矩阵loading
      this.loading = false; //整个定制界面loading
      this.amend = {};
      this.bodyChangeData = {}; //初始化列表修改了的数据
      let fixedcolumns = {};
      fixedcolumns[
        `${
        this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
          this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS"
          ? "DL_B_INV_ADJ"
          : this.tablename === "DL_B_TRAN_OUT" ||
            this.tablename === "DL_B_TRAN_OUT_POS" ||
            this.tablename === "SG_B_PHY_IN_NOTICES_POS"
            ? this.tablename.replace(/(_OUT)|(_POS)/g, "")
            : this.tablename === "POS_SC_B_TRANSFER"
              ? this.tablename.replace(/POS_/g, "")
              : this.tablename
        }_ID`
      ] = this.objid; //主表ID
      const query = {
        searchdata: JSON.stringify({
          table: port[this.tablename].virtualName, //虚表表名
          column_include_uicontroller: true,
          startindex: (this.currentPage - 1) * this.pageSize, //起始下标
          range: this.pageSize, //每页个数
          fixedcolumns: fixedcolumns,
          multiple: [],
          orderby: this.orderby //按什么排序
        })
      };
      return this.service.common.QueryList(query).then(res => {
        let data = res.data;
        if (data.code === 0) {
          let arrTh = []; //表头
          let subtotalRow = data.datas.subtotalRow
            ? Object.keys(data.datas.subtotalRow)
            : []; //总计那行
          this.total = data.datas.totalRowCount; //总数
          /*this.subtotalRow = data.datas.subtotalRow;//总计那行*/
          data.datas.tabth.map(obj => {
            if (obj.name === "ID") return;
            if (obj.ismodify) this.changeFields.push(obj.colname);
            arrTh.push(
              Object.assign(
                {},
                obj,
                {
                  label:
                    (this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
                      this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS") &&
                      obj.colname === "QTY_BILL"
                      ? "数量"
                      : obj.name, //名字
                  name: obj.colname, //字段
                  order: obj["isorder"] //是否有排序
                },
                obj.ismodify
                  ? {
                    type: "input",
                    genre: obj.type,
                    fixed: obj.scale //保留几位小数
                  }
                  : {}
              )
            );
          });
          if (
            subtotalRow.length !== 0 &&
            data.datas.isFullRangeSubTotalEnabled
          ) {
            this.subtotalRow = arrTh.map(obj => {
              let row = subtotalRow.find(x => x == obj.name);
              if (!row) return "";
              return data.datas.subtotalRow[
                row
              ] /*obj.type === 'NUMBER'? data.datas.subtotalRow[row].toFixed(obj.scale) : data.datas.subtotalRow[row]*/;
            });
          }
          this.tHead = arrTh;
          this.tBody = data.datas.row.map((obj, index) => {
            let row = {
              start: (this.currentPage - 1) * this.pageSize + index + 1,
              checked: false
            };
            Object.keys(obj).map(key => {
              if (
                (this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
                  this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS") &&
                (key === "AMT_LIST" || key === "QTY_BILL")
              ) {
                row[key] = obj[key].val.includes("-")
                  ? obj[key].val.replace("-", "")
                  : obj[key].val;
              } else {
                row[key] = obj[key].val;
              }
            });
            return row;
          });
          this.tableLoading = false;
          if (this.tBody.length == 0) {
            this.visible = false;
            this.activeObj = {};
            return;
          }
          if (!this.activeSub) {
            this.translate = 34; //初始化
            this.activeObj = this.tBody[0];
          }
          if (!this.visible) {
            this.visible = true;
          }
          this.loading = true; //用于控制右边matrix的数据刷新
          this.revealLoading = true; //用于控制右边纯展示matrix的数据刷新
        }
      });
    }, //获取列表数据
    refreshData(val) {
      /*this.$emit('objectSave');*/
      this.activeSub = false; //改变高亮行
      this.focusInput = true;
      this.getData().then(() => {
        if (this.tBody.length == 0) return;
        this.visible = true;
      }); //获取数据
    }, //确定刷新数据
    match(val) {
      this.matchTableData = val;
    }, //匹配
  },
  components: {
    CustomTable,
    matrix,
    DragDialog,
    ErrorTips,
    matrixInput,
    pageNation
  },
  created() {
    window.addEventListener('customizeClick', this.bigSave);
  },
  mounted() {
    this.$emit("changeRefresh", false);
    this.queryListPort = true;
    this.isDeleteBtn = port[this.tablename].isDeleteBtn; //是否有删除明细按钮
    this.isUpdateDiscountBtn = port[this.tablename].isUpdateDiscountBtn; //是否有修改折扣按钮
    this.hasMatch = port[this.tablename].hasMatch;
    this.orderby.push({
      column: `${
        this.tablename === "DL_B_PAND" ||
          this.tablename === "DL_B_INV_ADJ" ||
          this.tablename === "DL_B_INV_ADJ_WORK_PICK" ||
          this.tablename === "DL_B_INV_ADJ_WORK_PICK_POS"
          ? port[this.tablename].virtualName
          : port[this.tablename].tableName
        }.ID`,
      asc: true
    });
    this.getData()
      .then(() => {
        this.queryListPort = false;
        if (this.tBody.length == 0) return;
        this.visible = true; //显示弹框
      })
      .catch(() => {
        this.queryListPort = false;
      });
  },
  activated() {
    if (this.queryListPort) return;
    this.activeSub = false;
    this.visible = false;
    this.getData().then(() => {
      if (this.tBody.length == 0) return;
      this.visible = true; //显示弹框
    });
  },
  destroyed() {
    window.removeEventListener('customizeClick', this.bigSave);
  }
};
</script>
<style lang="less" scoped type="text/less">
.ff-order-detail {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: #575757;
  margin-bottom: 15px;
  font-size: 12px;
  .ff-order-detail-search-box {
    width: 100%;
    background-color: #f8f8f8;
  }
  .ff-popper-class-triangle {
    position: absolute;
    z-index: 1;
    right: 806px;
    width: 0px;
    height: 0px;
    /*border-left: 10px solid transparent;*/
    border-right: 5px solid rgba(0, 0, 0, 0.12);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      left: 1px;
      top: -5px;
      border-right: 5px solid white;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
  .ff-order-detail-paging {
    padding-left: 10px;
    margin: 10px 0 4px;
    .ff-order-detail-delete {
      color: #0f8ee9;
      display: inline-block;
      margin-left: 13px;
      letter-spacing: 2px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .ff-order-detail-content {
    position: relative;
    overflow: hidden;
    display: flex;
    flex: 1;
    /*max-height: 600px;*/
    padding-left: 5px;
    .ff-order-detail--box {
      flex: 1;
      min-width: 200px;
      border: 1px solid #dcdbdb;
      /*min-height: 300px;*/
    }
    .ff-order-detail--box-full {
      border-right: 1px solid #dcdbdb;
      margin-right: 10px;
    }
    .ff-o-popper-class-box {
      .ff-list-hidden-show {
        position: absolute;
        background-image: url("/static/img/2.png");
        background-repeat: no-repeat;
        background-position: center;
        z-index: 1000;
        user-select: none;
        left: -23px;
        width: 20px;
        height: 100px;
        line-height: 100px;
        cursor: pointer;
        top: 50%;
        text-align: center;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        /*border: 1px solid #ccc;*/
        transform-origin: right;
        transform: translateY(-50px) perspective(50px) rotateY(-150deg);
        &:hover {
          background-image: url("/static/img/1.png");
        }
        .iconfont {
          font-size: 12px;
        }
      }
    }
    .ff-matrix-hidden-show {
      position: absolute;
      background-image: url("/static/img/2.png");
      background-repeat: no-repeat;
      background-position: center;
      /*background-size: 100%;*/
      z-index: 1000;
      user-select: none;
      right: 7px;
      width: 20px;
      height: 100px;
      line-height: 100px;
      cursor: pointer;
      top: 50%;
      text-align: center;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      /*border: 1px solid #ccc;*/
      transform-origin: right;
      transform: translateY(-50px) perspective(50px) rotateY(-30deg);
      &:hover {
        background-image: url("/static/img/1.png");
      }
      .iconfont {
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="less" type="text/less">
.orderDetailModal .burgeon-modal {
  width: 800px !important;
}
.orderDetailModal .burgeon-modal-body {
  overflow: hidden;
}
.orderDetailModal
  .burgeon-modal-content
  .burgeon-modal-body
  .burgeon-form-item-content {
  margin-right: 0 !important;
}
.orderDetailModal .burgeon-modal-body .orderContent {
  display: flex;
  justify-content: space-between;
}
.ff-o-popper-class-box {
  position: relative;
  display: flex;
  border: 1px solid #dcdbdb;
  float: right;
  width: 800px;
  border-radius: 2px;
  margin: 0 10px 0 10px;
  .ff-o-popper-class {
    flex: 1;

    .ff-matrix--nodata {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
.ff-popper-class-box-full {
  width: 100%;
}
.ff-order-detail
  .ff-order-detail-content
  .ff-order-detail--box
  .ff-custom--table {
  min-height: inherit;
}
</style>
