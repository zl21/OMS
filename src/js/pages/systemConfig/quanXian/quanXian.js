import quanXianTable from '@/views/pages/systemConfig/quanXian/quanXianTable.vue';
import copyModal from '@/views/pages/systemConfig/quanXian/copyModal.vue';
import form from '@/assets/js/__utils__/form';
import qxBtnData from './qxBtnData';
import R3 from '@syman/burgeon-r3';

console.log('R3::', R3);
const { FilterTree, SelectTree, SearchForm } = R3.components;
const { network, urlSearchParams } = R3;
export default {
  components: {
    quanXianTable,
    FilterTree,
    SelectTree,
    SearchForm,
    copyModal
  },
  mixins: [qxBtnData],
  data() {
    return {
      // info: {
      //   isAll: false,
      //   column: ''
      // },
      vmI18n: window.vmI18n,
      spinShow: false,
      saveModal: false,

      permissionType: '', // 权限类型
      permissionTable: '',
      permissionKeyColumn: '',

      groupId: '', // 菜单id
      newGroupId: '', // 切换菜单时，当前切换的id

      isChange: false,

      searchFormConfig: {
        setHeight: 34,
        rowAll: 3,
        searchFoldnum: 3,
        defaultColumn: 3,
        defaultconfig: []
      },
      searchCondition: {}, // 筛选条件
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
      sensitiveColumns: [],
  
      newrows: [], // 存储所有全量数据
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
        isParentWriteValue: false,
        theadChange: undefined // theadChange 记录是否点击表头的checkbox
      }, // 当前懒加载数据
      oldTableArr: {}, // 备份数据
      saveTableArr: [], // 增量更新的数据
      dataindex: 1, // 当前加载页数
    };
  },
  computed: {
    /**
     * 当前是否全量（勾选、取消勾选）
     * @param {Object} IS_WRITE 制单 IS_READ 查看
     * @param {String} value Y: 勾选 N: 取消勾选 （默认是空字符串''）
     * @param {Boolean} flag 是否全量
     * @returns {"IS_WRITE":{"value":"N","flag":true},"IS_READ":{"value":"Y","flag":true}}
     */
    fullFlag() {
      const { isReadValue, isReadValueTotal, isWriteValue, isWriteValueTotal } = this.tableArr;
      let all = {
        checkedRead: isReadValue,
        unCheckedRead: !isReadValue && isReadValueTotal == 0,
        checkedWrite: isWriteValue,
        unCheckedWrite: !isWriteValue && isWriteValueTotal == 0
      };
      let fullFlag = {};
      fullFlag.IS_WRITE = {
        value: all.checkedWrite ? 'Y' : all.unCheckedWrite ? 'N' : '',
        flag: all.checkedWrite || all.unCheckedWrite
      };
      fullFlag.IS_READ = {
        value: all.checkedRead ? 'Y' : all.unCheckedRead ? 'N' : '',
        flag: all.checkedRead || all.unCheckedRead
      };
      return fullFlag;
    },
    /**
     * 是否需要全量更新
     * @returns 
     */
     isFullUpdate() {
      let fullUpdate = JSON.parse(JSON.stringify(this.fullFlag));
  
      if (!this.tableArr.theadChange) { // 未触发表头勾选
        fullUpdate.IS_READ.flag = false;
        fullUpdate.IS_WRITE.flag = false;
      } else {
        const { IS_READ, IS_WRITE } = this.tableArr.theadChange;
        const { 
          isReadValue,
          isWriteValue,
          isReadValueTotal,
          isWriteValueTotal
        } = this.oldTableArr
        let checkedAllWrite = IS_WRITE != undefined;
        let checkedAllRead = IS_READ != undefined;
        
        /**
         * 更改表头勾选分别有以下三种情况：
         * 1.仅更改【制单】
         * 2.仅更改【查看】
         * 3.都更改【制单】【查看】
         */
        if (checkedAllWrite && !checkedAllRead) { // 仅更改【制单】
          if (IS_WRITE) { // 【制单】全量勾 + 原数据的【查看】是全量勾选
            /**
             * 【制单】全量勾
             * 原数据的【查看】是全量勾
             * 原数据的【制单】是全量勾
             */
            isReadValue && (fullUpdate.IS_READ.flag = false);
            isWriteValue && (fullUpdate.IS_WRITE.flag = false);
          } else { 
            /**
             * 【制单】全量取消 
             * 原数据的【查看】是全量勾
             * 原数据的【制单】是全量取消
             */
            isReadValue && (fullUpdate.IS_READ.flag = false);
            !isWriteValue && isWriteValueTotal == 0 && (fullUpdate.IS_WRITE.flag = false);
          }
        }
        if (checkedAllRead && !checkedAllWrite) { // 仅更改【查看】
          if (IS_READ) {
            /**
             * 【查看】全量勾
             * 原数据的【查看】是全量勾
             * 原数据的【制单】是全量取消
             */
            isReadValue && (fullUpdate.IS_READ.flag = false);
            !isWriteValue && isWriteValueTotal == 0 && (fullUpdate.IS_WRITE.flag = false);
          } else {
            /**
             * 【查看】全量取消 
             * 原数据的【查看】是全量取消
             * 原数据的【制单】是全量取消
             */
            !isReadValue && isReadValueTotal == 0 && (fullUpdate.IS_READ.flag = false);
            !isWriteValue && isWriteValueTotal == 0 && (fullUpdate.IS_WRITE.flag = false);
          }
        }
        if (checkedAllRead && checkedAllWrite) { // 都更改【制单】【查看】
          /**
           * 新旧数据都是全量取消/全量勾/仅查看
           */
          if (
            (!isWriteValue && isWriteValueTotal == 0 
            && !isReadValue && isReadValueTotal == 0
            && !this.tableArr.isWriteValue && this.tableArr.isWriteValueTotal == 0
            && !this.tableArr.isReadValue && this.tableArr.isReadValueTotal == 0)
            || (isWriteValue 
              && isReadValue 
              && this.tableArr.isWriteValue 
              && this.tableArr.isReadValue)
            || (!isWriteValue
              && isReadValue
              && !this.tableArr.isWriteValue && this.tableArr.isWriteValueTotal == 0
              && this.tableArr.isReadValue)
            || (!isWriteValue && isWriteValueTotal == 0 
              && !isReadValue && isReadValueTotal == 0
              && !this.tableArr.isWriteValue
              && !this.tableArr.isReadValue)
          ) {
            fullUpdate.IS_READ.flag = false;
            fullUpdate.IS_WRITE.flag = false
          }
        }
      }
      return fullUpdate;
    }
  },
  created() {
    // const { customizedModuleName, customizedModuleId } = this.$route.params;
    this.permissionType = this.$route.query.type;

    // 获取角色
    this.getRoleData();
    this.getSearchForm();
    this.buttonConfig.buttons = this.permissionType === 'brand' || this.permissionType === 'sensitivecol'
    ? this.normal.buttons.filter(item => item.text != $it('btn.copyPermissions'))
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
        title: $it('tL.sensitiveColumn'),
        // title: "敏感列",
        key: 'CP_C_COLUMN_ENAME'
      },
      {
        title: $it('tL.view'),
        // title: "查看",
        key: 'IS_READ'
      },
      {
        title: $it('tL.edit'),
        // title: "编辑",
        key: 'IS_WRITE'
      }
    ];
    const btnSearchObj = {
      text: $it('btn.search'),
      icon: '',
      btnclick: () => {
        const self = this;
        const obj = {};
        self.searchFormConfig.defaultconfig.forEach(item => {
          if (item.item.props.value && item.item.props.value.length) {
            if (item.item.type == 'arkMopMultiSelect') {
              if (typeof item.item.props.value[0].ID == 'string') {
                obj[item.item.field] = [item.item.props.value[0].ID];
              } else {
                obj[item.item.field] = item.item.props.value[0].ID.map(i => String(i));
              }
            } else {
              obj[item.item.field] = item.item.props.value;
            }
          } else if (item.item.value) {
            obj[item.item.field] = item.item.value;
          }
        });
        this.searchCondition = obj;
        self.dataindex = 1;
        this.$refs.quanXianTable.refreshTable();
        self.getTableData();
      }
    };
    this.searchBtnConfig.buttons.push(btnSearchObj);
    this.filterTreeConfig.placeholder = $it('pH.enter');
  },
  methods: {
    handScroll() {
      this.dataindex += 1;
      let olsiex = (this.dataindex - 1) * 50;
      let siex = this.dataindex * 50;
      let fushu = this.datalength - siex;
      let addRows = [];

      if (fushu) {
        addRows = this.newrows.slice(olsiex, siex);
      } else {
        let num = siex + fushu;
        addRows = this.newrows.slice(olsiex, num);
      }
      console.log(this.fullFlag);
      const { IS_WRITE, IS_READ } = this.fullFlag;
      /**
       * 制单（IS_WRITE）- 滚动加载的数据
       *
       * 判断当前是否全量（curIsWriteFlag）：
       * 情况一：是
       *   加载数据（查看）置为当前全量的值 -> curIsWriteValue == 'Y'
       * 情况二：否
       *   1. 原始数据是全量勾选（可以理解为：全量 -> 增量）
       *     1). 勾选了表头的查看
       *        加载数据（查看）置为表头勾选值 -> tableArr.theadChange.IS_READ
       *     2). 没有勾选表头的查看
       *        加载数据（查看）置为其自身原始值 -> i.IS_READ
       *   2. 原始数据不是全量勾选（可以理解为修改前后都不是全量操作：增量 -> 增量）
       */
      let curIsWriteFlag = IS_WRITE.flag;
      let curIsWriteValue = IS_WRITE.value;
      if (curIsWriteFlag) {
        let isChecked = curIsWriteValue == 'Y';
        addRows.forEach(item => {
          if (!item.hasOwnProperty('PARENT_GROUPS_ID') 
            || (item.hasOwnProperty('PARENT_GROUPS_ID') 
            && !this.$refs.quanXianTable.subRoleDisable(item, 'IS_WRITE'))
          ) {
            item.IS_WRITE = isChecked;
          }
        });
      } else if (this.oldTableArr.isReadValue && !curIsWriteFlag) {
        addRows.forEach(item => {
          if (!item.hasOwnProperty('PARENT_GROUPS_ID') 
            || (item.hasOwnProperty('PARENT_GROUPS_ID') 
            && !this.$refs.quanXianTable.subRoleDisable(item, 'IS_WRITE'))
          ) {
            let writeValue = !this.tableArr.theadChange ? item.IS_WRITE : this.tableArr.theadChange.IS_WRITE;
            let isWrite = curIsWriteValue == '' ? writeValue : curIsWriteValue == 'Y';
            !isWrite && this.tableArr.isWriteValueTotal --;
            item.IS_WRITE = isWrite
          }
        });
      }
      /**
       * 查看（IS_READ）- 滚动加载的数据
       * 
       * 判断当前是否全量（curIsReadFlag）：
       * 情况一：是
       *   加载数据（查看）置为当前全量的值 -> curIsReadValue == 'Y'
       * 情况二：否
       *   1. 原始数据是全量勾选（可以理解为：全量 -> 增量）
       *     1). 勾选了表头的查看
       *        加载数据（查看）置为表头勾选值 -> tableArr.theadChange.IS_READ
       *     2). 没有勾选表头的查看
       *        加载数据（查看）置为其自身原始值 -> i.IS_READ
       *   2. 原始数据不是全量勾选（可以理解为修改前后都不是全量操作：增量 -> 增量）
       */
      let curIsReadFlag = IS_READ.flag;
      let curIsReadValue = IS_READ.value;
      if (curIsReadFlag) { // 情况一
        addRows = addRows.map(i => ({ ...i, IS_READ: curIsReadValue == 'Y' }));
      } else if (!curIsReadFlag) { // 情况二
        if (this.oldTableArr.isReadValue) { // 1. 全量->增量
          addRows = addRows.map(i => {
            let readValue;
            if (this.tableArr.theadChange) {
              if (this.tableArr.theadChange.hasOwnProperty('IS_READ')) {
                readValue = this.tableArr.theadChange.IS_READ;
              } else {
                readValue = i.IS_READ;
              }
            } else {
              readValue = i.IS_READ;
            }
            let isRead = curIsReadValue == '' ? readValue : curIsReadValue == 'Y';
            !isRead && this.tableArr.isReadValueTotal --;
            return { ...i, IS_READ: isRead }
          });
        } else { // 2. 增量->增量
          addRows = addRows.map(i => {
            let readValue = !this.tableArr.theadChange ? i.IS_READ : this.tableArr.theadChange.IS_READ;
            return { ...i, IS_READ: readValue }
          });
        }
        
      }
      addRows = JSON.parse(JSON.stringify(addRows));
      this.tableArr.rows = this.tableArr.rows.concat(addRows);
      this.tableArr.isLoad = true;
    },
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
    async getRoleData() {
      const res = await this.service.common.groupTreeload({});
      if (res.data.code === 0) {
        this.groupId = res.data.data[0].ID;
        this.newGroupId = res.data.data[0].ID;
        this.filterTreeConfig.treeAttribute.data = this.restructureMenuTreeData(res.data.data, true);

        this.getTableData();
      }
    },
    // 获取搜索框
    async getSearchForm() {
      network
        .post(
          '/p/cs/permission/v1/selectPermissionColumn',
          urlSearchParams({ permissionType: this.permissionType })
        )
        .then(res => {
          if (res.data.code === 0) {
            const dataArray = form.refactoringData(res.data.datas.dataarry);
            dataArray.forEach(item => {
              if (item.item.value) {
                item.item.props.value = item.item.value;
              }
            });
            this.searchFormConfig.defaultconfig = dataArray;
          }
        });
      //
      /* const { data: { code, datas } } = await this.service.systemConfig.selectPermissionColumn();
      if (code === 0) {
        const dataArray = form.refactoringData(datas.dataarry);
        dataArray.forEach(item => {
          if (item.item.value) {
            item.item.props.value = item.item.value;
          }
        });
        this.searchFormConfig.defaultconfig = dataArray;
      } */
    },

    // 获取表格
    async getTableData(refresh = false) {
      this.groupId = this.newGroupId;
      let url;
      let params;
      if (this.permissionType === 'sensitive') {
        url = '/p/cs/cgroupcolumnquery';
        params = {
          GROUPS_ID: this.groupId,
          QUERY: ''
        };
      } else {
        url = '/p/cs/permission/v1/selectDataPermission';
        params = {
          permissionType: this.permissionType,
          groupId: this.groupId,
          searchCondition: this.searchCondition
        };
      }
      this.spinShow = true;
      const res = await this.service.systemConfig.selectDataPermission(url, urlSearchParams(params));
      let data = res.data.data;
      if (res.data.code === 0) {
        if (url == '/p/cs/permission/v1/selectDataPermission') {
          data = JSON.parse(BC.Utils.unzip(data));
          console.log('解压数据：', data);
          console.log('总计：', data.rowSize);
        }
        this.tableArr.total = data.rowSize;
        this.tableArr.isReadValueTotal = 0;
        this.tableArr.isWriteValueTotal = 0;
        this.tableArr.isReadValue = data.selectedStatus ? data.selectedStatus.IS_READ.flag : false;
        this.tableArr.isWriteValue = data.selectedStatus ? data.selectedStatus.IS_WRITE.flag : false;
        this.tableArr.isChild = false;
        this.tableArr.parentIsRead = 0;
        this.tableArr.parentIsWrite = 0;
        this.tableArr.isParentReadValue = false;
        this.tableArr.isParentWriteValue = false;
        this.tableArr.theadChange = undefined;

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
          // this.tableArr.rows = dt.rows;
          this.newrows = dt.rows;
          this.tableArr.isChild = dt.isChild;
        }
        // this.tableArr.rows.
        this.newrows.forEach(item => {
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

        this.datalength = this.newrows.length;


        this.tableArr.rows = this.newrows.slice(0, 50);

        if (this.tableArr.parentIsRead === this.newrows.length) {
          this.tableArr.isParentReadValue = true;
        }
        if (this.tableArr.parentIsWrite === this.newrows.length) {
          this.tableArr.isParentWriteValue = true;
        }
        // if (this.tableArr.isReadValueTotal === this.tableArr.rows.length) {
        //   this.tableArr.isReadValue = true;
        // }
        // if (this.tableArr.isWriteValueTotal === this.tableArr.rows.length) {
        //   this.tableArr.isWriteValue = true;
        // }

        this.permissionTable = data.permissionTable;
        this.permissionKeyColumn = data.permissionKeyColumn;

        const {
          isReadValueTotal, isWriteValueTotal, isReadValue, isWriteValue 
        } = this.tableArr;
        this.oldTableArr = {
          rows: JSON.parse(JSON.stringify(this.newrows)),
          isReadValue,
          isWriteValue,
          isReadValueTotal,
          isWriteValueTotal
        };

        if (refresh) {
          this.$Message.success($it('common.refresh_succee')); // 刷新成功
        }
      }
      this.spinShow = false;
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
          title: $it('mT.tips'),
          content: message,
          cancelType: true,
          titleAlign: 'left',
          mask: true,
          draggable: true,
          keyDown: event => {
            if (event.keyCode == 27 || event.keyCode == 13) {
              self.$Modal.remove();
            }
          }
        });
      } else {
        /* this.$Modal.error({
          title: $it('mT.tips'),
          content: self.message,
          cancelType: true,
          titleAlign: 'left',
          mask: true,
          draggable: true,
          keyDown: event => {
            if (event.keyCode == 27 || event.keyCode == 13) {
              self.$Modal.remove();
            }
          }
        }); */
      }
    },
    cancelBtn() {
      this.copyModal = false;
    }
  }
};
