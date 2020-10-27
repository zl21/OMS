import qxBtnData from "./qxBtnData";
import customButton from "@/views/pages/SystemConfig/quanXian/customButton";
import quanXianTable from "@/views/pages/SystemConfig/quanXian/quanXianTable";
import copyModal from "@/views/pages/SystemConfig/quanXian/copyModal";
import R3 from "@syman/burgeon-r3";
console.log(4, R3);
const { FilterTree, SelectTree, SearchForm } = R3.components;
const { network, urlSearchParams } = R3;
import axios from "axios";
import form from "@/assets/js/__utils__/form";
export default {
  components: {
    customButton,
    quanXianTable,
    FilterTree,
    SelectTree,
    SearchForm,
    copyModal,
  },
  mixins: [qxBtnData],
  data() {
    return {
      vmI18n: window.vmI18n,
      spinShow: false,
      saveModal: false,

      permissionType: "", //权限类型
      permissionTable: "",
      permissionKeyColumn: "",

      groupId: "", // 菜单id
      newGroupId: "", // 切换菜单时，当前切换的id

      isChange: false,

      searchFormConfig: {
        setHeight: 34,
        rowAll: 3,
        searchFoldnum: 2,
        defaultColumn: 3,
        defaultconfig: [],
      },

      copyModal: false, // 弹框
      buttonConfig: {
        buttons: [],
      },

      searchBtnConfig: {
        flex: "right",
        buttons: [
          {
            text: vmI18n.t("btn.search"),
            icon: "",
            btnClick: () => {
              let self = this;
              let obj = {};
              console.log(self.searchFormConfig.defaultconfig);
              self.searchFormConfig.defaultconfig.map((item) => {
                if (item.item.value) {
                  obj[item.item.field] = item.item.value;
                }
              });
              self.getTableData(obj);
            },
          },
        ],
      },

      filterTreeConfig: {
        treeAttribute: {
          data: [],
        },
        treeEvent: {
          "on-select-change": this.filterTreeChange,
        },
        clearable: true,
        placeholder: vmI18n.t("pHolder.enter"),
      },

      oldTableArr: [],
      saveTableArr: [],

      tableArr: {
        searchValue: "", //检索的输入框
        columns: [],
        rows: [],
        isReadValueTotal: 0,
        isWriteValueTotal: 0,
        isReadValue: false,
        isWriteValue: false,
        isChild: false,
        parentIsRead: 0,
        parentIsWrite: 0,
        isParentReadValue: false,
        isParentWriteValue: false,
      },
      sensitiveColumns: [
        {
          title: vmI18n.t("table_label.sensitiveColumn"),
          // title: "敏感列",
          key: "CP_C_COLUMN_ENAME",
        },
        {
          title: vmI18n.t("table_label.view"),
          // title: "查看",
          key: "IS_READ",
        },
        {
          title: vmI18n.t("table_label.edit"),
          // title: "编辑",
          key: "IS_WRITE",
        },
      ],
    };
  },

  created() {
    const { customizedModuleName, customizedModuleId } = this.$route.params;
    this.permissionType = this.$route.query.type;

    // 获取角色
    this.getRoleData();
    if (this.permissionType !== "sensitive") {
      this.getSearchForm();
    }
    this.buttonConfig.buttons = this.normal.buttons;
  },
  mounted() {
    const { customizedModuleName } = this.$route.params;
  },
  methods: {
    saveOk() {
      this.saveQuanXian();
    },
    saveCancel() {
      if (this.newGroupId !== this.groupId) {
        this.isChange = false;
        this.getTableData();
      }
    },
    isChangeFun(val) {
      this.isChange = val;
    },
    filterTreeChange(val, item) {
      this.newGroupId = item.ID;
      if (this.isChange) {
        this.saveModal = true;
      } else {
        this.saveCancel();
      }
    },
    restructureMenuTreeData(data, first) {
      return data.map((item, idx) => {
        item.title = item.NAME;
        if (first && idx === 0) {
          item.selected = true;
        }
        if (item.children && item.children.length > 0) {
          this.restructureMenuTreeData(item.children);
        }
        return item;
      });
    }, // 重构树数据

    // 获取角色id
    getRoleData() {
      network.post("/p/cs/groupTreeload", {}).then((res) => {
        if (res.data.code === 0) {
          this.groupId = res.data.data[0].ID;
          this.newGroupId = res.data.data[0].ID;
          this.filterTreeConfig.treeAttribute.data = this.restructureMenuTreeData(
            res.data.data,
            true
          );

          this.getTableData();
        }
      });
    },
    // 获取搜索框
    getSearchForm() {
      // network.post('/p/cs/permission/v1/selectPermissionColumn', urlSearchParams({ permissionType: this.permissionType }))
      //   .then((res) => {
      //     if (res.data.code === 0) {
      //       let dataArray = form.refactoringData(res.data.datas.dataarry);
      //       dataArray.map(item => {
      //         if (item.item.value) {
      //           item.item.props.value = item.item.value;
      //         }
      //       })
      //       this.searchFormConfig.defaultconfig = dataArray;
      //     }
      //   });
      network
        .post(
          "http://yapi.dev.syman.cn/mock/624/p/cs/permission/v1/selectPermissionColumn",
          urlSearchParams({ permissionType: 1 })
        )
        .then((res) => {
          if (res.data.code === 0) {
            let dataArray = form.refactoringData(res.data.datas.dataarry);
            dataArray.map((item) => {
              if (item.item.value) {
                item.item.props.value = item.item.value;
              }
            });
            this.searchFormConfig.defaultconfig = dataArray;
          }
        });
    },

    // 获取表格
    getTableData(searchCondition = {}, refresh = false) {
      this.groupId = this.newGroupId;
      let url, params;
      if (this.permissionType === "sensitive") {
        url = "/p/cs/cgroupcolumnquery";
        params = {
          GROUPS_ID: this.groupId,
          QUERY: "",
        };
      } else {
        // url = "/p/cs/permission/v1/selectDataPermission";
        url =
          "http://yapi.dev.syman.cn/mock/624/p/cs/permission/v1/selectDataPermission";
        params = {
          permissionType: this.permissionType,
          groupId: this.groupId,
          searchCondition: searchCondition,
        };
      }
      network.post(url, urlSearchParams(params)).then((res) => {
        if (res.data.code === 0) {
          this.tableArr.isReadValueTotal = 0;
          this.tableArr.isWriteValueTotal = 0;
          this.tableArr.isReadValue = false;
          this.tableArr.isWriteValue = false;
          this.tableArr.isChild = false;
          this.tableArr.parentIsRead = 0;
          this.tableArr.parentIsWrite = 0;
          this.tableArr.isParentReadValue = false;
          this.tableArr.isParentWriteValue = false;

          if (this.permissionType === "sensitive") {
            let dt = res.data.data;
            dt.map((item) => {
              dt.isChild = !!item.PARENT_GROUPS_ID;
              if (item.PARENT_GROUPS_ID) {
                if (item.PARENT_ISREAD == "Y") {
                  this.tableArr.parentIsRead++;
                }
                if (item.PARENT_ISMODIFY == "Y") {
                  this.tableArr.parentIsWrite++;
                }
              }
              item.IS_WRITE = item.ISMODIFY == "Y";
              item.IS_READ = item.ISREAD == "Y";
            });
            this.tableArr.columns = this.sensitiveColumns;
            this.tableArr.rows = res.data.data;
            this.tableArr.isChild = dt.isChild;
          } else {
            let dt = res.data.data;
            dt.rows.map((item) => {
              dt.isChild = !!item.PARENT_GROUPS_ID;
              if (item.PARENT_GROUPS_ID) {
                if (item.PARENT_IS_READ == "Y") {
                  this.tableArr.parentIsRead++;
                }
                if (item.PARENT_IS_WRITE == "Y") {
                  this.tableArr.parentIsWrite++;
                }
              }
            });
            this.tableArr.columns = dt.columns;
            this.tableArr.rows = dt.rows;
            this.tableArr.isChild = dt.isChild;
          }

          this.tableArr.rows.forEach((item) => {
            if (item.IS_READ === "Y" || item.ISREAD === "Y") {
              item.IS_READ = true;
              this.tableArr.isReadValueTotal++;
            } else {
              item.IS_READ = false;
            }
            if (item.IS_WRITE === "Y" || item.ISMODIFY === "Y") {
              item.IS_WRITE = true;
              this.tableArr.isWriteValueTotal++;
            } else {
              item.IS_WRITE = false;
            }
          });

          if (this.tableArr.parentIsRead === this.tableArr.rows.length) {
            this.tableArr.isParentReadValue = true;
          }
          if (this.tableArr.parentIsWrite === this.tableArr.rows.length) {
            this.tableArr.isParentWriteValue = true;
          }
          if (this.tableArr.isReadValueTotal === this.tableArr.rows.length) {
            this.tableArr.isReadValue = true;
          }
          if (this.tableArr.isWriteValueTotal === this.tableArr.rows.length) {
            this.tableArr.isWriteValue = true;
          }

          this.permissionTable = res.data.data.permissionTable;
          this.permissionKeyColumn = res.data.data.permissionKeyColumn;

          this.oldTableArr = JSON.parse(JSON.stringify(this.tableArr.rows));
          if (refresh) {
            // this.$Message.success("刷新成功");
            this.$Message.success(vmI18n.t("common.refresh_succee"));
          }
        }
      });
    },

    sureBtn(params) {
      this.copyModal = false;
      let param = new URLSearchParams();
      console.log(params);
      param.append("param", JSON.stringify(params));
      network
        .axios({
          url: "/p/cs/copyShopPermission",
          method: "post",
          data: param,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$Modal.success({
              // title: "提示",
              title: vmI18n.t("modalTitle.tips"),
              content: res.data.message,
              cancelType: true,
              titleAlign: "left",
              mask: true,
              draggable: true,
              keyDown: (event) => {
                if (event.keyCode == 27 || event.keyCode == 13) {
                  self.$Modal.remove();
                }
              },
            });
          } else {
            this.$Modal.error({
              // title: "提示",
              title: vmI18n.t("modalTitle.tips"),
              content: res.data.message,
              cancelType: true,
              titleAlign: "left",
              mask: true,
              draggable: true,
              keyDown: (event) => {
                if (event.keyCode == 27 || event.keyCode == 13) {
                  self.$Modal.remove();
                }
              },
            });
          }
        });
    },
    cancelBtn() {
      this.copyModal = false;
    },
  },
};
