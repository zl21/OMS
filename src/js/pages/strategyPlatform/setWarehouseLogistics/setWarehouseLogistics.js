import axios from "axios";
import businessButton from "professionalComponents/businessButton.vue";
import businessForm from "professionalComponents/businessForm.vue";
import businessLabel from "professionalComponents/businessLabel.vue";
import businessModal from "professionalComponents/businessDialog.vue";
import publicMethodsUtil from "@/assets/js/public/publicMethods.js";
import businessStatusFlag from "professionalComponents/businessStatusFlag.vue";
import { setTimeout } from "timers";

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessModal,
    businessStatusFlag,
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      warningModal: false,
      saveModal: false,
      saveModalText: "", // 保存空物流提示
      isSaveLoading: false,
      tableLoading: false,
      cityThead: true,
      // 弹框配置 导入
      importTable: {
        refFuns: "confirmFun",
        // confirmTitle: "导入",
        confirmTitle: vmI18n.t("modalTitle.import"),
        titleAlign: "center", // 设置标题是否居中 center left
        width: "600",
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: "importTable", // 组件名称
        url: "publicDialog/importTable",
        keepAlive: true,
        excludeString: "importTable", // 将name传进去，确认不缓存
        componentData: {},
      },
      // 修改物流
      modifyLogistics: {
        refFuns: "confirmFun",
        // confirmTitle: "请选择物流公司",
        confirmTitle: vmI18n.t("modalTitle.select_logisticsCompany"),
        titleAlign: "center", // 设置标题是否居中 center left
        width: "760",
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: "modifyLogistics", // 组件名称
        url: "strategyPlatform/setWarehouseLogistics/modifyLogistics",
        keepAlive: true,
        excludeString: "modifyLogistics", // 将name传进去，确认不缓存
        componentData: {},
      },
      btnConfig: {
        typeAll: "error",
        buttons: [
          {
            // text: "新增",
            text: vmI18n.t("btn.add"), //按钮文本
            btnclick: () => {
              const _this = this;
              _this.$store.commit("customize/TabHref", {
                id: -1, // 单据id
                type: "action", // 类型action
                name: "setWarehouseLogistics", // 文件名
                // label: "仓库物流优先级设置", // tab中文名
                label: vmI18n.t("panel_label.setWarehouseLogistics"),
                query: Object.assign({
                  id: -1, // 单据id
                  // tabTitle: "仓库物流优先级设置", // tab中文名
                  tabTitle: vmI18n.t("panel_label.setWarehouseLogistics"),
                }), // 带的参数
              });
            },
          },
          {
            // text: "保存",
            text: vmI18n.t("btn.save"), //按钮文本
            btnclick: () => {
              const _this = this;
              if (this.$route.query.id > 0) {
                if (_this.listArr.length == 0) {
                  // _this.$Message.warning("请选择物流区域!");
                  _this.$Message.warning(vmI18n.t("modalTips.y7"));
                  return;
                }
                if (_this.theadArr.length == 0) {
                  // _this.$Message.warning("请选择区域物流!");
                  _this.$Message.warning(vmI18n.t("modalTips.y7"));
                  return;
                }
                if (_this.listArr.length > 0) {
                  const num = _this.theadArr.length;
                  let text = "";
                  _this.listArr.forEach((item) => {
                    let flag = true;
                    item.LOGISTICS_RANK.forEach((i) => {
                      if (i.rank != "") {
                        flag = false;
                      }
                    });
                    if (flag) {
                      text += `${
                        item.CP_C_REGION_CITY_ENAME ||
                        item.CP_C_REGION_PROVINCE_ENAME
                      },`;
                    }
                  });
                  if (text) {
                    // _this.saveModalText = `${text}的物流优先级为空,保存会导致该数据删除,是否确认保存?`;
                    _this.saveModalText = `${text}${vmI18n.t("modalTips.y8")}`;
                    _this.saveModal = true;
                  } else {
                    _this.save();
                  }
                }
              } else {
                _this.save();
              }
            },
          },
          {
            // text: "作废",
            text: vmI18n.t("btn.void"), //按钮文本
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.invalid();
            },
          },
          {
            // text: "导入",
            text: vmI18n.t("btn.import"), //按钮文本
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: "ST_C_WAREHOUSE_LOGISTICS",
                objid: _this.$route.query.id,
              };
              _this.$children
                .find((item) => item.name === "importTable")
                .openConfirm();
            },
          },
          {
            // text: "导出",
            text: vmI18n.t("btn.export"), //按钮文本
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.warningOk();
            },
          },
          {
            // text: "修改物流",
            text: vmI18n.t("btn.modify_logistics"), //按钮文本
            disabled: true,
            btnclick: () => {
              this.modifyLogistics.componentData = { id: this.$route.query.id };
              this.$children
                .find((item) => item.name === "modifyLogistics")
                .openConfirm();
            },
          },
          {
            // text: "刷新",
            text: vmI18n.t("btn.refresh"), //按钮文本
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.refresh();
            },
          },
          {
            // text: "返回",
            text: vmI18n.t("btn.back"), //按钮文本
            btnclick: () => {
              const _this = this;
              _this.$store.commit("customize/TabHref", {
                id: 1111113,
                type: "table",
                name: "ST_C_WAREHOUSE_LOGISTICS",
                // label: "仓库物流优先级方案",warehouse_logistics_priority_scheme
                label: vmI18n.t(
                  "panel_label.warehouse_logistics_priority_scheme"
                ),
                back: true,
              });
            },
          },
        ],
      },
      information: {
        formValue: {
          REMARK: "",
          CP_C_LOGISTICS_ENAME: "",
        },
        formData: [
          {
            style: "popInput",
            width: "6",
            itemdata: {
              col: 1,
              colid: 168444,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              datelimit: "all",
              display: "text",
              fkdesc: "实体仓档案",
              fkdisplay: "drp",
              inputname: "CP_C_PHY_WAREHOUSE_ID:ENAME",
              isfk: true,
              isnotnull: true,
              isuppercase: false,
              length: 20,
              // name: "仓库",
              name: vmI18n.t("form_label.warehouse"),
              readonly: false,
              refobjid: "14",
              reftable: "CP_C_PHY_WAREHOUSE",
              reftableid: 24486,
              row: 1,
              statsize: -1,
              type: "STRING",
              valuedata: "",
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: "input",
            // label: "备注",
            label: vmI18n.t("table_label.remarks"),
            value: "REMARK",
            width: "6",
          },
        ],
        ruleValidate: {
          BUYER_NICK: [{ required: true, message: " ", trigger: "blur" }],
        },
      },
      labelList: [
        {
          // label: "区域明细",
          label: vmI18n.t("form_label.region_details"),
          value: "1",
          isShow: true,
        },
      ],
      labelDefaultValue: "1",
      openDefault: "1",
      name: "",
      query: "",
      treeData: [],
      theadArr: [],
      listArr: [],
      single: false,
      statusName: "",
    };
  },
  mounted() {
    if (this.$route.query.id !== "-1") {
      this.information.formData[0].itemdata.readonly = true;
      this.setTableHeight();
      this.refresh();
      this.btnConfig.buttons.forEach((item) => {
        // "修改物流" || "作废" || "导入" || "刷新"
        if (
          item.text ===
          (vmI18n.t("btn.modify_logistics") ||
            vmI18n.t("btn.void") ||
            vmI18n.t("btn.import") ||
            vmI18n.t("btn.refresh"))
        )
          item.disabled = false;
      });
    }
  },
   methods: {
    // 保存
    async save() {
      const _this = this;
      // if (!_this.information.formData[0].itemdata.pid)
      //   return _this.$Message.error("仓库必填");
      _this.isSaveLoading = true;
      _this.name = "";
      _this.query = "";
      const fromData = new FormData();
      const cloneListArr = JSON.parse(JSON.stringify(_this.listArr));

      if (cloneListArr.length) {
        cloneListArr.forEach((item) => {
          item.LOGISTICS_RANK.forEach((data) => {
            item[data.rankField] = data.rank;
          });
          item.LOGISTICS_RANK = [];
        });
      }
      const param = {
        fixcolumn: {
          ST_C_WAREHOUSE_LOGISTICS: {
            CP_C_PHY_WAREHOUSE_ID: _this.information.formData[0].itemdata.pid,
            REMARK: _this.information.formValue.REMARK,
          },
          ST_C_WAREHOUSE_LOGISTICS_ITEM: [],
          ST_C_WAREHOUSE_LOGISTICS_RANK_RESULT: cloneListArr,
        },
        objid: this.$route.query.id,
      };
      fromData.append("param", JSON.stringify(param));
      // 保存
      const {data:{data:{code,data}}} = await this.service.strategyPlatform.saveWarehouseLogistics(fromData)
      _this.isSaveLoading = false;
      if (code === 0) {
        _this.$Message.success(vmI18n.t("modalTips.z9"));//保存成功
        if (this.$route.query.id !== "-1") {
          this.refresh();
        } else {
          this.$store.commit("customize/TabHref", {
            id: data.objid, // 单据id
            type: "action", // 类型action
            name: "setWarehouseLogistics", // 文件名
            label: vmI18n.t("panel_label.setWarehouseLogistics"),//仓库物流优先级设置
            query: Object.assign({
              id: data.objid, // 单据id
              tabTitle: vmI18n.t("panel_label.setWarehouseLogistics"),//仓库物流优先级设置
            }), // 带的参数
          });
        }
      } else {
        const err = message || vmI18n.t("modalTips.y0");//保存失败
        _this.$Message.error(err);
        _this.refresh();
      }
      // axios({
      //   url: "/p/cs/saveWarehouseLogistics",
      //   method: "post",
      //   data: fromData,
      // }).then((res) => {
      //   _this.isSaveLoading = false;
      //   if (res.data.data.code === 0) {
      //     // _this.$Message.success("保存成功");
      //     _this.$Message.success(vmI18n.t("modalTips.z9"));
      //     if (this.$route.query.id !== "-1") {
      //       this.refresh();
      //     } else {
      //       this.$store.commit("customize/TabHref", {
      //         id: res.data.data.data.objid, // 单据id
      //         type: "action", // 类型action
      //         name: "setWarehouseLogistics", // 文件名
      //         // label: "仓库物流优先级设置", // tab中文名
      //         label: vmI18n.t("panel_label.setWarehouseLogistics"),
      //         query: Object.assign({
      //           id: res.data.data.data.objid, // 单据id
      //           // tabTitle: "仓库物流优先级设置", // tab中文名
      //           tabTitle: vmI18n.t("panel_label.setWarehouseLogistics"),
      //         }), // 带的参数
      //       });
      //     }
      //   } else {
      //     // const err = res.data.data.message || "保存失败";
      //     const err = res.data.data.message || vmI18n.t("modalTips.y0");
      //     _this.$Message.error(err);
      //     _this.refresh();
      //   }
      // });
    },
    async getTreeData() {
      const _this = this;
      _this.isSaveLoading = true;
      const fromData = new FormData();
      const param = { objid: this.$route.query.id };
      fromData.append("param", JSON.stringify(param));

      // 保存
      const {data:{oK,data}} = await this.service.strategyPlatform.saveWarehouseLogistics(fromData)
      _this.isSaveLoading = false;
      if (oK) {
        _this.treeData = data.warehouseLogisticsTree;
        if (data.warehouseLogistics) {
          _this.information.formData[0].itemdata.pid =
            data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ID;
          _this.information.formData[0].itemdata.valuedata =
            data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ENAME;
          _this.information.formValue.REMARK =
            data.warehouseLogistics.REMARK;
          if (data.warehouseLogistics.ISACTIVE === "N") {
            // _this.statusName = "已作废";
            _this.statusName = vmI18n.t("common.voided");
            _this.btnConfig.buttons.forEach((item) => {
              // if (item.text === ("修改物流" || "作废" || "导入" || "导出" || "保存"))
              if (
                item.text ===
                (vmI18n.t("btn.modify_logistics") ||
                  vmI18n.t("btn.void") ||
                  vmI18n.t("btn.import") ||
                  vmI18n.t("btn.export") ||
                  vmI18n.t("btn.save"))
              )
                item.disabled = true;
            });
          }
        }
        if (data.warehouseLogisticsItems && data.warehouseLogisticsItems.length) {
          this.theadArr = [];
          data.warehouseLogisticsItems.forEach((item) => {
            this.theadArr.push({
              name: item.CP_C_LOGISTICS_ENAME,
            });
          });
        } else {
          this.theadArr = [];
        }
        _this.provinceSynchronous();
      }
      // axios({
      //   url: "/p/cs/getWarehouseLogisticsTree",
      //   method: "post",
      //   data: params,
      // }).then((res) => {
      //   _this.isSaveLoading = false;
      //   if (res.data.code === 0) {
      //     _this.treeData = res.data.data.warehouseLogisticsTree;
      //     if (res.data.data.warehouseLogistics) {
      //       _this.information.formData[0].itemdata.pid =
      //         res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ID;
      //       _this.information.formData[0].itemdata.valuedata =
      //         res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ENAME;
      //       _this.information.formValue.REMARK =
      //         res.data.data.warehouseLogistics.REMARK;
      //       if (res.data.data.warehouseLogistics.ISACTIVE === "N") {
      //         // _this.statusName = "已作废";
      //         _this.statusName = vmI18n.t("common.voided");
      //         _this.btnConfig.buttons.forEach((item) => {
      //           // if (item.text === ("修改物流" || "作废" || "导入" || "导出" || "保存"))
      //           if (
      //             item.text ===
      //             (vmI18n.t("btn.modify_logistics") ||
      //               vmI18n.t("btn.void") ||
      //               vmI18n.t("btn.import") ||
      //               vmI18n.t("btn.export") ||
      //               vmI18n.t("btn.save"))
      //           )
      //             item.disabled = true;
      //         });
      //       }
      //     }
      //     if (res.data.data.warehouseLogisticsItems.length) {
      //       this.theadArr = [];
      //       res.data.data.warehouseLogisticsItems.forEach((item) => {
      //         this.theadArr.push({
      //           name: item.CP_C_LOGISTICS_ENAME,
      //         });
      //       });
      //     } else {
      //       this.theadArr = [];
      //     }
      //     _this.provinceSynchronous();
      //   }
      // });
    },
    // 同步查询
    async synchronous() {
      const _this = this;
      _this.tableLoading = true;
      _this.listArr = [];
      const treeList = [];
      if (this.treeData) {
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype,
              });
            }
          });
        });
      }
      // 接口
      _this.tableLoading = false;
      const fromData = new FormData();
      const params  = {objid: this.$route.query.id, treeNode: treeList }
      fromData.append('param',JSON.stringify(params))
      // 接口
      const {data:{oK,data}} = await this.service.strategyPlatform.saveWarehouseLogistics(fromData)
      if (oK) {
        _this.cityThead = true;
        _this.listArr = data !== undefined ? data : [];
        _this.listArr.forEach(
          (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
        );
      }
      // axios({
      //   url: "/p/cs/getLogisticsRankResultTable",
      //   method: "post",
      //   data: { objid: this.$route.query.id, treeNode: treeList },
      // }).then((res) => {
      //   _this.tableLoading = false;
      //   if (res.data.code === 0) {
      //     _this.cityThead = true;
      //     _this.listArr = res.data.data !== undefined ? res.data.data : [];
      //     _this.listArr.forEach(
      //       (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
      //     );
      //   }
      // });
    },
    // 省同步查询
    async provinceSynchronous() {
      const _this = this;
      _this.tableLoading = true;
      _this.listArr = [];
      const treeList = [];
      if (this.treeData) {
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype,
              });
            }
          });
        });
      }
      const fromData = new FormData();
      const params  = {objid: this.$route.query.id, treeNode: treeList }
      fromData.append('param',JSON.stringify(params))
      // 接口
      const {data:{oK,data}} = await this.service.strategyPlatform.saveWarehouseLogistics(fromData)
      console.log(oK,data);
      if (oK) {
        _this.cityThead = false;
        _this.listArr = data !== undefined ? data : [];
        _this.listArr.forEach(
          (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
        );
      }
      // axios({
      //   url: "/p/cs/getLogisticsRankResultTable",
      //   method: "post",
      //   data: {
      //     objid: this.$route.query.id,
      //     cityleave: "PROV",
      //     treeNode: treeList,
      //   },
      // }).then((res) => {
      //   _this.tableLoading = false;
      //   if (res.data.code === 0) {
      //     _this.cityThead = false;
      //     _this.listArr = res.data.data !== undefined ? res.data.data : [];
      //     _this.listArr.forEach(
      //       (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
      //     );
      //   }
      // });
    },
    // 全选树
    checkAll(e) {
      if (e) {
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            list.checked = true;
          });
        });
      } else {
        this.treeData.forEach((item) => {
          item.checked = false;
          item.children.forEach((list) => {
            list.checked = false;
          });
        });
      }
    },
    inputBlur(item, rank, index) {
      for (let i = 0; i < item.length; i++) {
        if (!rank.rank) return;
        if (
          item[i].logisticsEcode !== rank.logisticsEcode &&
          item[i].rank === rank.rank
        ) {
          setTimeout(() => {
            item[index].rank = "";
            // this.$Message.info("优先级设置重复");
            this.$Message.info(vmI18n.t("modalTips.y9"));
          }, 200);
          return;
        }
      }
    },
    // 检索
   async enter(e) {
      const _this = this;
      _this.listArr = [];
      _this.tableLoading = true;
      const fromData = new FormData();
      const params = { objid: _this.$route.query.id, treeLikeKey: e };
      fromData.append('param',JSON.stringify(params))
      // 接口
      const {data:{oK,data}} = await this.service.strategyPlatform.saveWarehouseLogistics(fromData)
      console.log(oK,data);
      _this.tableLoading = false;
        if (oK) {
          _this.cityThead = true;
          _this.listArr =
            data.warehouseLogisticsRanks !== undefined
              ? data.warehouseLogisticsRanks
              : [];
          _this.listArr.forEach(
            (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
          );
          _this.treeData = data.warehouseLogisticsTree;
          _this.query = e;
          _this.treeData.forEach((item) => {
            item.children.forEach((list) => {
              if (list.title.indexOf(`${e}`) != -1) {
                item.expand = true;
              }
            });
          });
        } else {
          _this.$Message.error(
            data.message || vmI18n.t("modalTips.z3")//失败
          );
        }
      // axios({
      //   url: "/p/cs/getLogisticsLikeRankResultTable",
      //   method: "post",
      //   data: param,
      // }).then((res) => {
      //   _this.tableLoading = false;
      //   if (res.data.code === 0) {
      //     _this.cityThead = true;
      //     _this.listArr =
      //       res.data.data.warehouseLogisticsRanks !== undefined
      //         ? res.data.data.warehouseLogisticsRanks
      //         : [];
      //     _this.listArr.forEach(
      //       (item) => (item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK))
      //     );
      //     _this.treeData = res.data.data.warehouseLogisticsTree;
      //     _this.query = e;
      //     _this.treeData.forEach((item) => {
      //       item.children.forEach((list) => {
      //         if (list.title.indexOf(`${e}`) != -1) {
      //           item.expand = true;
      //         }
      //       });
      //     });
      //   } else {
      //     // _this.$Message.error(res.data.data.message || "失败");
      //     _this.$Message.error(
      //       res.data.data.message || vmI18n.t("modalTips.z3")
      //     );
      //   }
      // });
    },
    // 刷新
    refresh() {
      this.getTreeData();
    },
    // 作废
    async invalid() {
      const _this = this;
      _this.isSaveLoading = true;
      const fromData = new FormData();
      const param = { objid: this.$route.query.id };
      fromData.append("param", JSON.stringify(param));
      const {data:{code,data,message}} = await this.service.strategyPlatform.voidWarehouseLogistics(fromData)
      _this.isSaveLoading = false;
      if (code === 0) {
        const ess = data.message || vmI18n.t("modalTips.y4");//作废成功
        _this.getTreeData();
        _this.$Message.success(ess);
      } else {
        const err = data.message || vmI18n.t("modalTips.y4");//作废失败
        _this.$Message.success(err);
      }
      // axios({
      //   url: "/p/cs/voidWarehouseLogistics",
      //   method: "post",
      //   data: fromdata,
      // }).then((res) => {
      //   _this.isSaveLoading = false;
      //   if (res.data.code === 0) {
      //     const ess = res.data.data.message || vmI18n.t("modalTips.y4");//作废成功
      //     _this.getTreeData();
      //     _this.$Message.success(ess);
      //   } else {
      //     const err = res.data.data.message || vmI18n.t("modalTips.y4");//作废失败
      //     _this.$Message.success(err);
      //   }
      // });
    },
    // 导出
    async warningOk() {
      const _this = this;
      _this.warningModal = false;
      const treeList = [];
      this.treeData.forEach((item) => {
        item.children.forEach((list) => {
          if (list.checked) {
            treeList.push({
              id: list.id,
              regiontype: list.regiontype,
            });
          }
        });
      });
      
      const fromData = new FormData();
      const param = {
        objid: _this.$route.query.id,
        treeNode: treeList,
      };
      fromData.append("param", JSON.stringify(param));
      const {data:{code,data}} = await this.service.strategyPlatform.exportWarehouseLogisticsRank(fromData)
      if (code === 0) {
        const ess = data.message || vmI18n.t("modalTips.z2");//导出成功
        _this.$Message.success(ess);
        publicMethodsUtil.downloadUrlFile(data);
      } else {
        const err = data.message || vmI18n.t("modalTips.y6");//导出失败
        _this.$Message.success(err);
        publicMethodsUtil.downloadUrlFile(data);
      }
      
      // axios({
      //   url: "/p/cs/exportWarehouseLogisticsRank",
      //   method: "post",
      //   data: param,
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     // const ess = res.data.message || "导出成功";
      //     const ess = res.data.data.message || vmI18n.t("modalTips.z2");
      //     _this.$Message.success(ess);
      //     publicMethodsUtil.downloadUrlFile(res.data.data);
      //   } else {
      //     // const err = res.data.message || "导出失败";
      //     const err = res.data.data.message || vmI18n.t("modalTips.y6");
      //     _this.$Message.success(err);
      //     publicMethodsUtil.downloadUrlFile(res.data.data);
      //   }
      // });
    },
    saveOk() {
      this.save();
    },
    oneObjs(e) {},
    // 设置表格高度
    setTableHeight() {
      const _this = this;
      const contentHeight = document.getElementById("content").clientHeight;
      let logisticsAreaHeight = 25;
      logisticsAreaHeight += document.getElementsByClassName("tableTop")[0]
        .clientHeight;
      const tableHeight = contentHeight - logisticsAreaHeight;
      const Theight = document.getElementsByClassName("tableBox")[0];
      document.getElementsByClassName("list-table")[0].style = `height: ${
        tableHeight - 140
      }px;`;
      Theight.style = `height: ${tableHeight - 110}px;`;
    },
    paperScroll(e) {
      const sLefts = document.getElementById("fixedDiv");
      sLefts.setAttribute("style", `margin-left: ${-e.target.scrollLeft}px`);
    },
  },
};
