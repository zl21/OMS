import businessButton from 'professionalComponents/businessButton';
import quanXianTable from 'allpages/systemConfig/quanXian/quanXianTable.vue';
import copyModal from 'allpages/systemConfig/quanXian/copyModal.vue';
import R3 from '@syman/burgeon-r3';
import form from '@/assets/js/__utils__/form';
import qxBtnData from './qxBtnData';
import loading from 'professionalComponents/loading';

const { FilterTree, SelectTree, SearchForm } = R3.components;
const { network, urlSearchParams } = R3;
export default {
  components: {
    businessButton,
    quanXianTable,
    FilterTree,
    SelectTree,
    SearchForm,
    copyModal,
    loading
  },
  mixins: [qxBtnData],
  data() {
    return {
      spinShow: false,
      vmI18n: $i18n,
      loading: false,
      saveModal: false,

      permissionType: '', // 权限类型
      permissionTable: '',
      permissionKeyColumn: '',

      groupId: '', // 菜单id
      newGroupId: '', // 切换菜单时，当前切换的id

      isChange: false,

      searchFormConfig: {
        setHeight: 34,
        rowAll: 2,
        searchFoldnum: 2,
        defaultColumn: 2,
        defaultconfig: []
      },

      copyModal: false, // 弹框
      buttonConfig: {
        buttons: []
      },

      searchBtnConfig: {
        flex: 'right',
        buttons: []
      },

      filterTreeConfig: {
        treeAttribute: {
          data: []
        },
        treeEvent: {
          'on-select-change': this.filterTreeChange
        },
        clearable: true,
        placeholder: ''
      },

      treeData: [
        {
          "description": "全部",
          "id": -1,
          "name": "全部",
          "nodeType": "ROOT",
          "expand": true,
          "selected": true,
          "title": "数据权限项",
          children: [
            {
              "description": "品牌权限",
              "id": 186,
              "mask": "10000000",
              "name": "品牌权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "brand",
              "title": "品牌权限"
            },
            {
              "description": "实体仓权限",
              "id": 186,
              "mask": "10000000",
              "name": "实体仓权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "warehouse",
              "title": "实体仓权限"
            },
            {
              "description": "平台店铺权限 ",
              "id": 186,
              "mask": "10000000",
              "name": "平台店铺权限 ",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "saleschannel",
              "title": "平台店铺权限 "
            }

          ]
        }
      ],

      oldTableArr: [],
      saveTableArr: [],

      tableArr: {
        searchValue: '', // 检索的输入框
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
        isParentWriteValue: false
      },
      sensitiveColumns: []
    };
  },

  created() {
    // const { customizedModuleName, customizedModuleId } = this.$route.params;
    this.permissionType = "brand"


    // 获取角色
    this.getRoleData();
    this.getSearchForm();
    this.getTableData();//获取表格

    this.buttonConfig.buttons = this.permissionType === 'brand' || this.permissionType === 'sensitivecol'
      ? this.normal.buttons.filter(item => item.text != $i18n.t('btn.copyPermissions'))
      : this.normal.buttons;
    // businessButton组件中定义的点击事件是'btnclick'
    this.buttonConfig.buttons.forEach(item => {
      item.btnclick = item.btnClick;
    });
  },
  mounted() {
    // const { customizedModuleName } = this.$route.params;
    this.sensitiveColumns = [
      {
        title: $i18n.t('table_label.sensitiveColumn'),
        // title: "敏感列",
        key: 'CP_C_COLUMN_ENAME'
      },
      {
        title: $i18n.t('table_label.view'),
        // title: "查看",
        key: 'IS_READ'
      },
      {
        title: $i18n.t('table_label.edit'),
        // title: "编辑",
        key: 'IS_WRITE'
      }
    ];

    const btnSearchObj = {
      text: $i18n.t('btn.search'),
      icon: '',
      btnclick: () => {
        const self = this;
        const obj = {};
        console.log(self.searchFormConfig.defaultconfig);
        self.searchFormConfig.defaultconfig.forEach(item => {
          if (item.item.value) {
            obj[item.item.field] = item.item.value;
          }
        });
        self.getTableData(obj);
      }
    };
    this.searchBtnConfig.buttons.push(btnSearchObj);
    this.filterTreeConfig.placeholder = $i18n.t('pHolder.enter');
  },
  methods: {
    treeChange(val, obj) {

      if (obj.id == "-1") {
        obj.expand = !obj.expand
        return
      } else {
        this.spinShow = true
        if (this.isChange) {
          this.saveModal = true;
          this.newpermissionType = obj.type
        } else {
          this.permissionType = obj.type
          this.getSearchForm();
          this.getTableData();//获取表格
        }
      }


    }, // 树选中改变触发
    saveOk() {
      this.saveQuanXian();
      if (this.newpermissionType) {
        setTimeout(()=>{
          this.permissionType = this.newpermissionType
          this.getSearchForm();
          this.getTableData();//获取表格
          this.newpermissionType = ""
        },500)
      }
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


    async getRoleData() {
      const res = await this.service.common.groupTreeload({});
      this.spinShow = false
      if (res.data.code === 0) {
        this.groupId = res.data.data[0].ID;
        this.newGroupId = res.data.data[0].ID;
        this.filterTreeConfig.treeAttribute.data = this.restructureMenuTreeData(res.data.data, true);
      }
    },
    // 获取搜索框
    async getSearchForm() {
      $network
        .post(
          '/p/cs/permission/v1/selectPermissionSearchColumns',
          urlSearchParams({ permissionType: this.permissionType })
        )
        .then(res => {
          this.spinShow = false
          if (res.data.code === 0) {
            res.data.data.map(item => {
              item.coldesc = item.colname
              item.colname = item.key
              item.inputname = `${item.key}:${item.fk_dk_show_filed}`
              return item
            })

            const dataArray = form.refactoringData(res.data.data);
            dataArray.forEach(item => {
              if (item.item.value) {
                item.item.props.value = item.item.value;
              }
            });

            this.searchFormConfig.defaultconfig = dataArray;
          }
        });
    },

    // 获取表格
    async getTableData(searchCondition = {}, refresh = false) {
      const { customizedModuleName } = this.$router.currentRoute.params;
      this.groupId = this.newGroupId;
      let url;
      let params;
      url = '/p/cs/permission/v1/selectDataPermission';
      params = {
        permissionType: this.permissionType || 'brand',
        groupId: this.groupId || 46,
        searchCondition
      };
      this.loading = true;
      // this.$R3loading.show(customizedModuleName);
      const { data: { data, code } } = await this.service.systemConfig.selectDataPermission(url, urlSearchParams(params));
      if (code === 0) {
        this.tableArr.isReadValueTotal = 0;
        this.tableArr.isWriteValueTotal = 0;
        this.tableArr.isReadValue = false;
        this.tableArr.isWriteValue = false;
        this.tableArr.isChild = false;
        this.tableArr.parentIsRead = 0;
        this.tableArr.parentIsWrite = 0;
        this.tableArr.isParentReadValue = false;
        this.tableArr.isParentWriteValue = false;

        if (this.permissionType === 'sensitive') {
          const dt = data;
          dt.forEach(item => {
            dt.isChild = !!item.PARENT_GROUPS_ID;
            if (item.PARENT_GROUPS_ID) {
              if (item.PARENT_ISREAD == 'Y') {
                this.tableArr.parentIsRead++;
              }
              if (item.PARENT_ISMODIFY == 'Y') {
                this.tableArr.parentIsWrite++;
              }
            }
            item.IS_WRITE = item.ISMODIFY == 'Y';
            item.IS_READ = item.ISREAD == 'Y';
          });
          this.tableArr.columns = this.sensitiveColumns;
          this.tableArr.rows = data;
          this.tableArr.isChild = dt.isChild;
        } else {
          const dt = data;
          dt.rows.forEach(item => {
            dt.isChild = !!item.PARENT_GROUPS_ID;
            if (item.PARENT_GROUPS_ID) {
              if (item.PARENT_IS_READ == 'Y') {
                this.tableArr.parentIsRead++;
              }
              if (item.PARENT_IS_WRITE == 'Y') {
                this.tableArr.parentIsWrite++;
              }
            }
          });

          this.tableArr.columns = dt.columns;
          this.tableArr.rows = dt.rows;
          this.tableArr.isChild = dt.isChild;
        }

        this.tableArr.rows.forEach(item => {
          if (item.IS_READ === 'Y' || item.ISREAD === 'Y') {
            item.IS_READ = true;
            this.tableArr.isReadValueTotal++;
          } else {
            item.IS_READ = false;
          }
          if (item.IS_WRITE === 'Y' || item.ISMODIFY === 'Y') {
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

        this.permissionTable = data.permissionTable;
        this.permissionKeyColumn = data.permissionKeyColumn;

        this.oldTableArr = JSON.parse(JSON.stringify(this.tableArr.rows));
        if (refresh) {
          this.$Message.success($i18n.t('common.refresh_succee')); // 刷新成功
        }
      }
      this.loading = false;
      // this.$R3loading.hide(customizedModuleName);
    },

    async sureBtn(params) {
      this.copyModal = false;
      const param = new URLSearchParams();
      console.log(params);
      param.append('param', JSON.stringify(params));
      const self = this;
      const {
        data: { message, code }
      } = await this.service.systemConfig.copyShopPermission(param);
      if (code === 0) {
        this.$Modal.success({
          title: $i18n.t('modalTitle.tips'),
          content: message,
          cancelType: true,
          titleAlign: 'left',
          className: 'ark-dialog',
          mask: true,
          draggable: true,
          keyDown: event => {
            if (event.keyCode == 27 || event.keyCode == 13) {
              self.$Modal.remove();
            }
          }
        });
      }
    },
    cancelBtn() {
      this.copyModal = false;
    }
  }
};
