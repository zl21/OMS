<template>
  <div class="functionPower" v-loading="spinShow">
    <div class="buttonGroup">
      <Button
        v-for="(item, index) in buttonsData"
        :key="index"
        type="fcdefault"
        class="Button"
        @click="btnClick(item)"
      >
        {{ item.webdesc }}
      </Button>
    </div>
    <div class="content">
      <div class="contentLeft">
        <Input
          placeholder="请输入角色"
          clearable
          icon="ios-search"
          @on-change="searchInputChange"
        >
          <span slot="prepend">检索</span>
        </Input>
        <div class="menuContainer">
          <Tree
            ref="menuTree"
            :data="menuTreeData"
            :query="menuTreeQuery"
            @on-select-change="menuTreeChange"
          />
        </div>
     
      </div>
      <div class="contentRight">
        <div class="left-tree">
          <Tree ref="tree" :data="treeData" @on-select-change="treeChange" />
        </div>


        <div class="right-list">
         <div class="SearchForm_Table">
          <div >
            <SearchForm
              class="SearchForm"
              :set-height="searchFormConfig.setHeight"
              :row-all="searchFormConfig.rowAll"
              :search-foldnum="searchFormConfig.searchFoldnum"
              :default-column="searchFormConfig.defaultColumn"
              :defaultconfig="searchFormConfig.defaultconfig"
            />
            <businessButton :btn-config="searchBtnConfig" />
          </div>
          <div class="table_content">
            <quanXianTable
              ref="quanXianTable"
              :search-value="tableArr.searchValue"
              :rows="tableArr.rows"
              :columns="tableArr.columns"
              :table-arr="tableArr"
              @isChangeFun="isChangeFun"
            />
          </div>
        </div>
        
        
        </div>
      </div>
    </div>
    <Modal
      v-model="copyPermission"
      closable
      :width="420"
      mask
      footer-hide
      title="复制权限"
    >
      <div class="modalContent">
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <div>原角色:</div>
          </div>
          <DropDownSelectFilter
            class="itemCom"
            :total-row-count="totalRowCount"
            :page-size="dropPageSize"
            :auto-data="singleAutoData"
            :columns-key="['NAME']"
            :hidecolumns="['ID']"
            :default-selected="singleDefaultSelected"
            :data="singleDropDownSelectFilterData"
            @on-fkrp-selected="singleDropSelected"
            @on-page-change="singleDropPageChange"
            @on-popper-hide="singlePopperHide"
            @on-clear="singleDropClear"
            @on-input-value-change="singleInputChange"
          />
        </div>
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <div>目的角色:</div>
          </div>
          <DropDownSelectFilter
            :single="false"
            class="itemCom"
            :total-row-count="totalRowCount"
            :page-size="dropPageSize"
            :columns-key="['NAME']"
            :hidecolumns="['ID']"
            :default-selected="multipleDefaultSelected"
            :auto-data="multipleAutoData"
            :data="multipleDropDownSelectFilterData"
            @on-fkrp-selected="multipleDropSelected"
            @on-page-change="multipleDropPageChange"
            @on-popper-hide="multiplePopperHide"
            @on-clear="multipleDropClear"
            @on-input-value-change="multipleInputChange"
          />
        </div>
        <div class="itemContent">
          <div class="labelContent">
            <div class="labelTip">*</div>
            <div>复制方式:</div>
          </div>
          <Select
            v-model="copyType"
            class="itemCom"
            placeholder="请选择复制方式"
          >
            <Option value="cover"> 覆盖原有权限 </Option>
            <Option value="copy"> 保留原有权限 </Option>
          </Select>
        </div>
        <div class="modalButton">
          <Button type="fcdefault" class="Button" @click="modalConfirm">
            确定
          </Button>
          <Button type="fcdefault" class="Button" @click="modalCancel">
            取消
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>


const functionPowerActions = () => require(`burgeonConfig/config/functionPower.actions.js`);
const store = vm.$store
import R3 from '@syman/burgeon-r3';
const { SearchForm } = R3.components;
import businessButton from 'professionalComponents/businessButton';
import quanXianTable from 'allpages/systemConfig/quanXian/quanXianTable';
const { network, urlSearchParams } = R3;
import form from '@/assets/js/__utils__/form';


export default {
  components:{
    businessButton,
    SearchForm,
    quanXianTable
  },
  data() {
    return {
       searchBtnConfig: {
        flex: 'right',
        buttons: []
      },
      isSaveError: false, // 是否保存失败
      spinShow: false, // loading是否显示
      isChange: false,
      copyPermission: false, // 复制权限弹框
      copyType: '', // 复制权限弹框  复制方式
      singlePermissionId: null, // 复制权限外键单选id
      multiplePermissionId: null, // 复制权限外键多选id
      backupsDropData: [], // 备份复制权限外键数据
      singleDropDownSelectFilterData: {}, // 复制权限外键单选数据
      singleAutoData: [], // 复制权限外键单选模糊搜索数据
      singleDefaultSelected: [], // 复制权限单选默认数据
      multipleDefaultSelected: [], // 复制权限多选默认数据
      multipleDropDownSelectFilterData: {}, // 复制权限外键多选数据
      multipleAutoData: [], // 复制权限外键多选模糊搜索数据
      totalRowCount: 0, // 复制权限外键数据的totalRowCount
      dropPageSize: 10, // 复制权限外键数据的pageSize

      buttonsData: [], // 按钮数据
      menuHighlightIndex: 0, // 菜单高亮的index
      menuList: [], // 菜单数据
      groupId: '', // 菜单id
      newGroupId: '', // 切换菜单时，当前切换的id

      menuTreeData: [], // 菜单树数据
      menuTreeQuery: '', // 菜单树检索的值
      oldMenuTreeObj: null, // 上一次选中的菜单节点的数据
      newMenuTreeObj: null, // 当前选中的菜单节点的数据

      treeData: [], // 树数据
      adSubsystemId: '', // 树节点ID
      adTableCateId: null, // 树子节点ID
      newAdSubsystemId: '', // 树节点ID
      newAdTableCateId: null, // 树子节点ID
      oldTreeObj: null, // 上一次选中的树节点的数据
      newTreeObj: null, // 当前选中的树节点的数据

      tableDefaultSelectedRowIndex: 0, // 表格默认选中的行的index
      tableData: [], // 表格数据
      backupsTableData: [], // 备份表格数据
      tableSaveData: [], // 表格修改后要保存的数据
      extendTableData: [], // 扩展功能表格数据
      columnsBottom: [
        {
          title: '扩展功能',
          key: 'extendFunction',
          width: 200,
          render: (h, params) => h('div', [
            h('Checkbox', {
              style: {},
              props: {
                value: params.row.permission === 128
              },
              on: {
                'on-change': (val) => this.extendFunctionCheckboxChange(val, params)
              }
            }, params.row.description)
          ]),
        },
        {
          title: '功能',
          key: 'function',
          render: (h, params) => h('div', [
            h(params.row.children.length > 0 ? 'Checkbox' : '', {
              style: {},
              props: {
                value: params.row.children && params.row.children.length > 0 ? params.row.children[0].permission === 128 : false
              },
              on: {
                'on-change': (val) => this.functionCheckboxChange(val, params)
              }
            }, params.row.children.length > 0 ? params.row.children[0].description : '')
          ]),
        }
      ], // 扩展功能表格头部

      columns: [
        {
          title: '查看',
          key: 'see',
          seeValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '编辑',
          key: 'edit',
          editValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '删除',
          key: 'delete',
          deleteValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '作废',
          key: 'toVoid',
          toVoidValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '提交',
          key: 'commit',
          commitValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '反提交',
          key: 'unCommit',
          unCommitValue: false,
          tbodyWidth: '74px'
        },
        {
          title: '导出',
          key: 'export',
          exportValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '打印',
          key: 'print',
          printValue: false,
          tbodyWidth: '62px'
        },
        {
          title: '扩展',
          key: 'extend',
          extendValue: false,
          tbodyWidth: '62px'
        },
      ], // 表格表头
      upperTableTabthLeft: '0px',
      functionColumnWidth: 100, // 功能列的表头
      functionColumnTdWidth: '100px', // 功能列的表体的宽度
      theadThMinWidth: '62px', // 表头th的最小宽度，单位px
      unCommitThMinWidth: '74px', // 反提交的宽度
      upperTableTbodyHighlightIndex: 0, // 上边表格高亮的下标
      bottomTableTbodyHighlightIndex: null, // 下边表格高亮的下标
      quanXianType: this.$route.query.type,//判断权限类型
      treeDataCenter: [
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
              "type": "UNKNOWN",
              "title": "品牌权限"
            },
            {
              "description": "品牌权限",
              "id": 186,
              "mask": "10000000",
              "name": "品牌权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "UNKNOWN",
              "title": "店铺权限"
            },
            {
              "description": "品牌权限",
              "id": 186,
              "mask": "10000000",
              "name": "品牌权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "UNKNOWN",
              "title": "实体仓权限"
            },
            {
              "description": "品牌权限",
              "id": 186,
              "mask": "10000000",
              "name": "品牌权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "UNKNOWN",
              "title": "实体仓权限"
            },
            {
              "description": "品牌权限",
              "id": 186,
              "mask": "10000000",
              "name": "品牌权限",
              "nodeType": "TABLE_CATEGORY",
              "orderno": -1,
              "type": "UNKNOWN",
              "title": "渠道仓权限"
            }

          ]
        }
      ],
       searchFormConfig: {
        setHeight: 34,
        rowAll: 3,
        searchFoldnum: 3,
        defaultColumn: 3,
        defaultconfig: []
      },
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
    };
  },
  watch: {
    copyPermission(val) {
      if (val) {
        this.getCopyPermissionData();
      } else {
        this.singleDefaultSelected = [];
        this.multipleDefaultSelected = [];
        this.singleAutoData = [];
        this.multipleAutoData = [];
        this.copyType = '';
      }
    }
  },
  computed: {
  },
  created() {

    this.refresh();
    this.getButtonData();


  },
  mounted() {
    if (!this._inactive) {
      window.addEventListener('resize',
        this.fixTableColumnWidth());
      window.addEventListener('doCollapseHistoryAndFavorite',
        this.fixTableColumnWidth());
    }
     this.getSearchForm()
     this.getTableData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.fixTableColumnWidth);
    window.removeEventListener('doCollapseHistoryAndFavorite', this.fixTableColumnWidth);
  },
  activated() {
    this.fixTableColumnWidth();
  },
  methods: {
     // 获取搜索框
    async getSearchForm() {
      $network
        .post(
          '/p/cs/permission/v1/selectPermissionColumn',
          urlSearchParams({ permissionType: this.permissionType||"brand" })
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
    },
     // 获取表格
    async getTableData(searchCondition = {}, refresh = false) {
      const {customizedModuleName}=this.$router.currentRoute.params;
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
          permissionType: this.permissionType || 'brand',
          groupId: this.groupId || 46,
          searchCondition
        };
      }
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
     isChangeFun(val) {
      this.isChange = val;
    },
    bottomTableTbodyClick(index) {
      this.bottomTableTbodyHighlightIndex = index;
    }, // 下边表格行单击
    upperTableTbodyClick(row, index) {
      this.bottomTableTbodyHighlightIndex = null;
      this.upperTableTbodyHighlightIndex = index;
      this.tableRowClick(row, index);
    }, // 上边表格表体点击
    upperTableTbodyScroll(e) {
      this.upperTableTabthLeft = `${-e.target.scrollLeft}px`;
    }, // 上边表格表体滚动
    fixTableColumnWidth() {
      if (this.tableData.length > 0) {
        this.$nextTick(() => {
          const { upperTable, functionColumnTd, functionColumnTh } = this.$refs;
          if (functionColumnTd) {
            this.functionColumnWidth = functionColumnTd[0].offsetWidth;
          }
          const upperTableWidth = upperTable.offsetWidth;
          const theadThWidth = (upperTableWidth - this.functionColumnWidth) / 9;
          if (theadThWidth > 62) {
            this.theadThMinWidth = `${(theadThWidth / upperTableWidth) * 100}%`;
          } else {
            this.theadThMinWidth = '62px';
          }
          this.$nextTick(() => {
            this.functionColumnTdWidth = `${functionColumnTh.offsetWidth}px`;
            this.columns.map((item, index) => {
              const tableTabth = `tableTabth${index}`;
              item.tbodyWidth = `${this.$refs[tableTabth][0].offsetWidth}px`;
              return item;
            });
          });
        });
      }
    }, // 计算表格的列宽
    refresh() {
      this.spinShow = true;
      const menuPromise = new Promise((resolve, reject) => { this.getMenuData(resolve, reject); });
      const treePromise = new Promise((resolve, reject) => { this.getTreeData(resolve, reject); });
      Promise.all([menuPromise, treePromise]).then(() => {
        this.getTableData();
      });
    }, // 刷新数据
    refreshButtonClick() {
      if (this.checkNoSaveData('refresh')) {
      } else {
        this.refresh();
      }
    }, // 刷新按钮
    checkNoSaveData(type) {
      this.getSaveData();
      if (this.tableSaveData.length > 0) {
        this.$Modal.fcWarning({
          title: '提示',
          mask: true,
          showCancel: true,
          content: '是否保存修改的数据！',
          onOk: () => {
            this.savePermission(type);
          },
          onCancel: () => {
            if (type === 'refresh') {
              this.refresh();
            } else {
              this.groupId = this.newGroupId;
              this.adSubsystemId = this.newAdSubsystemId;
              this.adTableCateId = this.newAdTableCateId;
              this.getTableData();
            }
          }
        });
        return true;
      }
      return false;
    }, // 校验是否有未保存的数据
    getButtonData() {
      const params = { AD_ACTION_NAME: 'DATAJURISDICTION' };
      functionPowerActions().fetchActionsInCustomizePage({
        params,
        success: (res) => {
          if (res.data.code === 0) {
            const buttonsData = res.data.data;

            // buttonsData.push({
            //   webdesc: '刷新'
            // });

            const saveObj = buttonsData.find(item => item.webdesc === '保存');
            const copyObj = buttonsData.find(item => item.webdesc === '复制权限');
            const refreshObj = buttonsData.find(item => item.webdesc === '刷新');
            if (saveObj) {
              this.buttonsData.push(saveObj);
            }
            if (copyObj) {
              this.buttonsData.push(copyObj);
            }
            if (refreshObj) {
              this.buttonsData.push(refreshObj);
            }
          }
        }
      });
      // network.post('/p/cs/fetchActionsInCustomizePage', { AD_ACTION_NAME: 'functionPermission' })
      //   .then((res) => {
      //     if (res.data.code === 0) {
      //       this.buttonsData = res.data.data;
      //       this.buttonsData.push({
      //         webdesc: '刷新'
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
    }, // 获取按钮数据
    menuClick(index, item) {
      this.menuHighlightIndex = index;
      this.groupId = item.ID;
      const treePromise = new Promise((resolve, reject) => {
        this.getTreeData(resolve, reject);
      });
      treePromise.then(() => {
        this.getTableData();
      });
    }, // 点击左侧的菜单
    searchInputChange(e) {
      this.menuTreeQuery = e.target.value;
    }, // 检索输入框值改变
    menuTreeChange(val, item) {
     
      this.oldMenuTreeObj = JSON.parse(JSON.stringify(this.newMenuTreeObj));
      this.newMenuTreeObj = JSON.parse(JSON.stringify(item));
      if (val.length === 0) {
        this.$refs.menuTree.handleSelect(item.nodeKey);
      }
      this.newGroupId = item.ID;
      if (!this.isSaveError) {
        if (this.checkNoSaveData('menuTree')) {
        } else {
          this.spinShow = true;
          this.groupId = item.ID;
          const treePromise = new Promise((resolve, reject) => {
            this.getTreeData(resolve, reject);
          });
          treePromise.then(() => {
            this.getTableData();
          });
        }
      }
    }, // 左侧树点击
    getTreeData(resolve, reject) {
      functionPowerActions().getMenuTree({
        success: (res) => {
          if (res.data.code === 0) {
            resolve();
            const resData = res.data.data;
            this.restructureTreeDada(resData);
            if (this.quanXianType == 'function') {
              this.treeData = [...resData];
            } else if (this.quanXianType == 'data') {
              this.treeData = this.treeDataCenter
            }



          } else {
            reject();
          }
        }
      });

    }, // 获取树数据
    restructureTreeDada(data) {
      data.map((item) => {
        if (item.nodeType === 'ROOT') {
          item.expand = true;
          item.selected = true;
          this.oldTreeObj = item;
          this.newTreeObj = item;
          this.adSubsystemId = item.ad_subsystem_id;
          this.newAdSubsystemId = item.ad_subsystem_id;
          this.adTableCateId = item.ad_tablecategory_id;
        }
        item.title = item.description;
        if (item.children && item.children.length > 0 && item.children.find(cur => cur.children.length > 0)) {
          this.restructureTreeDada(item.children);
        } else {
          delete item.children;
        }
        return item;
      });
    }, //  整合树数据
    getMenuData(resolve, reject) {
      functionPowerActions().groupTreeload({
        success: (res) => {

          if (res.data.code === 0) {
            resolve();
            this.groupId = res.data.data[0].ID;
            this.newGroupId = res.data.data[0].ID;
            this.oldMenuTreeObj = JSON.parse(JSON.stringify(res.data.data[0]));
            this.newMenuTreeObj = JSON.parse(JSON.stringify(res.data.data[0]));
            this.menuTreeData = this.restructureMenuTreeData(res.data.data, true);
          } else {
            reject();
          }
        }
      });

      

    }, // 获取菜单数据
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
    getTableData() {
      this.tableSaveData = []; // 清空保存的数据
      let obj = {};
      if (this.adSubsystemId) {
        obj = {
          AD_SUBSYSTEM_ID: this.adSubsystemId,
          AD_TABLECATE_ID: this.adTableCateId,
          GROUP_ID: this.groupId
        };
        if (this.newTreeObj.dataSource) {
          obj.DATA_SOURCE = this.newTreeObj.dataSource;
        }
      } else {
        obj = {
          GROUP_ID: this.groupId
        };
      }
      this.spinShow = true;
      functionPowerActions().queryMenuPermission({
        params: obj,
        success: (res) => {
          this.spinShow = false;
          this.bottomTableTbodyHighlightIndex = null;
          this.upperTableTbodyHighlightIndex = 0;
          if (this.$refs.upperTableTabtd) {
            this.$refs.upperTableTabtd.scrollTo(0, 0);
          }
          if (res.data.code === 0) {
            if (res.data.data) {
              const resData = res.data.data;
              this.tableData = resData.reduce((acc, cur) => {
                const disabledArr = cur.mask.split('');
                const valueArr = this.toBin(cur.permission).split('');
                // 查看
                cur.seeDisabled = disabledArr[0] === '0';
                cur.seeValue = valueArr[0] === '1';

                // 编辑
                cur.editDisabled = disabledArr[1] === '0';
                cur.editValue = valueArr[1] === '1';

                // 删除
                cur.deleteDisabled = disabledArr[2] === '0';
                cur.deleteValue = valueArr[2] === '1';

                // 作废
                cur.toVoidDisabled = disabledArr[3] === '0';
                cur.toVoidValue = valueArr[3] === '1';

                // 提交
                cur.commitDisabled = disabledArr[4] === '0';
                cur.commitValue = valueArr[4] === '1';

                // 反提交
                cur.unCommitDisabled = disabledArr[5] === '0';
                cur.unCommitValue = valueArr[5] === '1';

                // 导出
                cur.exportDisabled = disabledArr[6] === '0';
                cur.exportValue = valueArr[6] === '1';

                // 打印
                cur.printDisabled = disabledArr[7] === '0';
                cur.printValue = valueArr[7] === '1';

                // 扩展
                cur.extendDisabled = cur.actionList.length === 0;
                cur.extendValue = cur.actionList.length > 0 ? this.getExtendValue(cur.actionList) : false;

                acc.push(cur);
                return acc;
              }, []);
              this.getExtendTableData(this.tableData[0], 0);
              this.backupsTableData = JSON.parse(JSON.stringify(this.tableData));
              this.tableDefaultSelectedRowIndex = 0;

              this.allTabthSelected();
              // setTimeout(() => {
              //   this.fixTableColumnWidth();
              // }, 1000);
              this.$nextTick(() => {
                this.fixTableColumnWidth();
              });
            } else {
              this.$Modal.fcWarning({
                title: '提示',
                mask: true,
                content: res.data.message,
              });
            }
          }
        }
      });
      // network.post('/p/cs/queryMenuPermission', obj)
      //   .then((res) => {
      //     this.spinShow = false;
      //     if (res.data.code === 0) {
      //       if (res.data.data) {
      //         const resData = res.data.data;
      //         this.tableData = resData.reduce((acc, cur) => {
      //           const disabledArr = cur.mask.split('');
      //           const valueArr = this.toBin(cur.permission).split('');
      //           // 查看
      //           cur.seeDisabled = disabledArr[0] === '0';
      //           cur.seeValue = valueArr[0] === '1';
      //
      //           // 编辑
      //           cur.editDisabled = disabledArr[1] === '0';
      //           cur.editValue = valueArr[1] === '1';
      //
      //           // 删除
      //           cur.deleteDisabled = disabledArr[2] === '0';
      //           cur.deleteValue = valueArr[2] === '1';
      //
      //           // 作废
      //           cur.toVoidDisabled = disabledArr[3] === '0';
      //           cur.toVoidValue = valueArr[3] === '1';
      //
      //           // 提交
      //           cur.commitDisabled = disabledArr[4] === '0';
      //           cur.commitValue = valueArr[4] === '1';
      //
      //           // 反提交
      //           cur.unCommitDisabled = disabledArr[5] === '0';
      //           cur.unCommitValue = valueArr[5] === '1';
      //
      //           // 导出
      //           cur.exportDisabled = disabledArr[6] === '0';
      //           cur.exportValue = valueArr[6] === '1';
      //
      //           // 打印
      //           cur.printDisabled = disabledArr[7] === '0';
      //           cur.printValue = valueArr[7] === '1';
      //
      //           // 扩展
      //           cur.extendDisabled = cur.actionList.length === 0;
      //           cur.extendValue = cur.actionList.length > 0 ? this.getExtendValue(cur.actionList) : false;
      //
      //           acc.push(cur);
      //           return acc;
      //         }, []);
      //         this.getExtendTableData(this.tableData[0], 0);
      //         this.backupsTableData = JSON.parse(JSON.stringify(this.tableData));
      //         this.tableDefaultSelectedRowIndex = 0;
      //
      //         this.allTabthSelected();
      //       } else {
      //         this.$Modal.fcWarning({
      //           title: '提示',
      //           mask: true,
      //           content: res.data.message,
      //         });
      //       }
      //     }
      //   })
      //   .catch((err) => {
      //     this.spinShow = false;
      //     throw err;
      //   });
    }, 
    // 获取表格数据
    getExtendValue(data) {
      const arr = data.reduce((acc, cur) => {
        if (cur.permission === 0) {
          acc.push(cur.permission);
        }
        if (cur.children.length > 0 && cur.children[0].permission === 0) {
          acc.push(cur.children[0].permission);
        }
        return acc;
      }, []);
      if (arr.length > 0) {
        return false;
      }
      return true;
    }, // 获取表格里的扩展是否选中
    treeChange(val, obj) {
   
      if (obj.id == "-1") {
        obj.expand = !obj.expand
        return
      }

      this.oldTreeObj = this.newTreeObj;
      this.newTreeObj = obj;
      if (val.length === 0) {
        this.$refs.tree.handleSelect(obj.nodeKey);
      }
      this.newAdSubsystemId = obj.ad_subsystem_id;
      this.newAdTableCateId = obj.ad_tablecategory_id;
      if (!this.isSaveError) {
        if (this.checkNoSaveData('tree')) {
        } else {
          this.spinShow = true;
          this.adSubsystemId = obj.ad_subsystem_id;
          this.adTableCateId = obj.ad_tablecategory_id;
          this.getTableData();
        }
      }
    }, // 树选中改变触发
    btnClick(item) {
      if (item.webdesc === '刷新') {
        this.refreshButtonClick();
      } else if (item.webdesc === '复制权限') {
        this.copyPerm();
      } else if (item.webdesc === '保存') {
        this.savePermission();
      }
    }, // 点击按钮触发
    customize() {
      const { fullPath } = this.$route;
      const {
        keepAliveModuleName,
        tableName,
      } = this.$store.state.global.activeTab;
      this.$store.commit('global/tabCloseAppoint', {
        tableName,
        routeFullPath: fullPath,
        keepAliveModuleName,
        // stopRouterPush: true,
      });
      // 跳转
      this.$store.commit('global/tabOpen', {
        // type: 'S',
        // tableName:'T_V_OMSONLINEORDER',
        // tableId:'10883',
        url: '/SYSTEM/TABLE/VV_SHANGPIN/24548',
        back: true
      });


      // const { fullPath } = this.$route;// 获取当前路由fullPath
      // const { keepAliveModuleName, tableName } = this.$store.state.global.activeTab;// 获取当前缓存模块名称，自定义标识
      // const params = {
      //   routeFullPath: fullPath, // 当前路由fullPath
      //   keepAliveModuleName, // 当前模块名称
      //   tableName, // 当前自定义表标识
      //   event: () => {
      //     // alert(177);
      //   }
      // };
      // store.commit('global/tabCloseAppoint', params);

      // // return;
      // const param = {
      //   url: '/CUSTOMIZED/FUNCTIONPERMISSION/2096',
      //   type: 'C',
      //   label: '基础档案',
      // };
      // store.commit('global/tabOpen', param);
      // const param = {
      //   url: 'CUSTOMIZED/PERMISSIONS/2997?type=sensitive&name=2',
      //   isMenu: true,
      //   id: 111
      // };
      // store.commit('global/directionalRouter', param);
    },
    customize1() {
      const param = {
        url: '/CUSTOMIZED/FUNCTIONPERMISSION/2099',
        type: 'C',
        label: '基础档案',
        dynamicRoutingForCustomizePage: true
      };
      store.commit('global/tabOpen', param);
    },
    copyPerm() {
      this.copyPermission = true;
    }, // 复制权限
    tableRowClick(row, index) {
      this.tableDefaultSelectedRowIndex = index;
      this.getExtendTableData(this.tableData[index], index);
    }, // 表格单击某一行
    getExtendTableData(row, index) {
      if (row && row.actionList && row.actionList.length > 0) {
        this.extendTableData = row.actionList.reduce((acc, cur) => {
          cur.extendIndex = index;
          acc.push(cur);
          return acc;
        }, []);
      } else {
        this.extendTableData = [];
      }
    }, // 获取扩展功能表格的数据，也就是下边表格的数据
    toBin(intNum) {
      let answer = '';
      if (/\d+/.test(intNum)) {
        while (intNum !== 0) {
          answer = Math.abs(intNum % 2) + answer;
          intNum = parseInt(intNum / 2);
        }
        if (answer.length === 0) {
          answer = '0';
        }
        if (answer.length < 8) {
          return (Array(8).join('0') + answer).slice(-8);
        }
        return answer;
      }
      return '0';
    }, // 十进制转二进制
    modalCancel() {
      this.copyPermission = false;
    }, // 复制权限弹框取消按钮
    modalConfirm() {
      if (this.singlePermissionId === null) {
        this.$Message.warning({
          content: '请选择原角色！'
        });
        return;
      }
      if (this.multiplePermissionId === null) {
        this.$Message.warning({
          content: '请选择目的角色！'
        });
        return;
      }
      if (this.multiplePermissionId.indexOf(this.singlePermissionId.toString()) !== -1) {
        this.$Message.warning({
          content: '目的角色不能包含原角色，请重新选择！'
        });
        return;
      }
      if (this.copyType === '') {
        this.$Message.warning({
          content: '请选择复制方式！'
        });
        return;
      }
      this.copyPermission = false;
      const obj = {
        sourceid: this.singlePermissionId,
        targetids: this.multiplePermissionId,
        type: this.copyType
      };
      this.spinShow = true;
      functionPowerActions().copyPermission({
        params: obj,
        success: (res) => {
          this.spinShow = false;
          if (res.data.code === 0) {
            this.singlePermissionId = null;
            this.multiplePermissionId = null;
            this.copyType = '';
            this.getTableData();
            this.$Message.success({
              content: res.data.message
            });
          }
        }
      });
      // network.post('/p/cs/copyPermission', obj)
      //   .then((res) => {
      //     if (res.data.code === 0) {
      //       this.singlePermissionId = null;
      //       this.multiplePermissionId = null;
      //       this.copyType = '';
      //       this.getTableData();
      //       this.$Message.success({
      //         content: res.data.message
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
    }, // 复制权限弹框确定按钮
    rowCheckboxChange(currentValue, params) {
      if (params.column.key === 'extend') {
        this.extendRowCheckboxChange(currentValue, params);
      } else {
        // 选中该行数据
        params.row[`${params.column.key}Value`] = currentValue;
        this.tableData[params.index] = params.row;

        // 修改要保存的数据
        // this.editSaveData(currentValue, params);

        // 判断该列是否全选
        this.tabthCheckboxSelected(params.column, params.column.key);


        if (params.column.key === 'see') {
          // 如果该列是查看列，当取消选中的时候将该行都取消选中
          if (!currentValue) {
            this.cancelRowSelected(params);
          }
        } else {
          // 如果该列不是查看列，并且查看列的没有选中，将查看列选中
          this.selectedSeeColumn(params, currentValue);
        }
      }
    }, // 表格单元格的checkbox改变时触发
    cancelRowSelected(params) {
      // 取消上边表格整行的选中状态
      this.columns.reduce((acc, cur, idx) => {
        if (idx > 0) {
          acc.push(cur.key);
        }
        return acc;
      }, [])
        .forEach((item) => {
          params.row[`${item}Value`] = false;
        });
      // 表头取消选中
      this.columns.forEach((item) => {
        this.tabthCheckboxSelected(item, item.key);
      });
      // 如果该行有扩展功能的表格的数据，取消下边表格的选中状态
      if (params.row.actionList && params.row.actionList.length > 0) {
        params.row.actionList.map((item) => {
          item.permission = 0;
          if (item.children && item.children.length > 0) {
            item.children.map((tem) => {
              tem.permission = 0;
              return tem;
            });
          }
          return item;
        });
        this.cancelExtendTableAllSelected();
      }
      // const findIndex = this.tableData.findIndex(item => item.ad_table_id === params.row.ad_table_id);
      this.tableData[params.index] = params.row;
    }, // 取消整行的选中
    selectedSeeColumn(params, currentValue) {
      if (currentValue) {
        this.tableData[params.index].seeValue = currentValue;
      }
      this.tabthCheckboxSelected(this.columns[0], 'see');
    }, // 选中查看列
    editSaveData(currentValue, params) {
      if (currentValue === this.backupsTableData[params.index][`${params.column.key}Value`]) {
        const findIndex = this.tableSaveData.findIndex(item => item.AD_MENU_ID === params.row.ad_menu_id);
        if (findIndex !== -1) {
          this.tableSaveData.splice(findIndex, 1);
        }
      } else {
        this.tableSaveData.push({
          AD_MENU_ID: params.row.ad_menu_id,
          DATA_SOURCE: params.row.data_source,
          ID: params.row.id,
          PERMISSION: this.getSavePermission(params.index)
        });
      }
    }, // 修改上边表格的保存数据
    getExtendTableSaveData(currentValue, row) {
      const tableObj = this.backupsTableData.find(item => item.ad_table_id === row.ad_table_id);
      if (tableObj.actionList && tableObj.actionList.length > 0) {
        const val = tableObj.actionList.find(item => item.ad_action_id === row.ad_action_id).permission === 128;
        if (currentValue === val) {
          const findIndex = this.tableSaveData.findIndex(item => item.AD_ACTION_ID === row.ad_action_id);
          if (findIndex !== -1) {
            this.tableSaveData.splice(findIndex, 1);
          }
        } else {
          this.tableSaveData.push({
            AD_ACTION_ID: row.ad_action_id,
            ID: row.id,
            PERMISSION: currentValue === true ? 1 : 0
          });
        }
      }
    }, // 获取下边表格的保存数据
    editTableExtendData(permission, row) {
      // const tableIndex = this.tableData.findIndex(item => item.ad_table_id === row.ad_table_id);
      // const tableObj = this.tableData.find(item => item.ad_table_id === row.ad_table_id);
      const tableObj = this.tableData[row.extendIndex];
      if (tableObj.actionList && tableObj.actionList.length > 0) {
        const actionListIndex = tableObj.actionList.findIndex(item => item.ad_action_id === row.ad_action_id);
        tableObj.actionList[actionListIndex].permission = permission;
        this.tableData[row.extendIndex] = tableObj;
      }
    }, // 下边表格扩展功能数据修改
    editTableDataForFunction(permission, row) {
      // const tableIndex = this.tableData.findIndex(item => item.ad_table_id === row.ad_table_id);
      // const tableObj = this.tableData.find(item => item.ad_table_id === row.ad_table_id);
      const tableObj = this.tableData[row.extendIndex];
      if (tableObj.actionList && tableObj.actionList.length > 0) {
        const actionListIndex = tableObj.actionList.findIndex(item => item.ad_action_id === row.ad_action_id);
        tableObj.actionList[actionListIndex].children[0].permission = permission;
        this.tableData[row.extendIndex] = tableObj;
      }
    }, // 下边表格功能数据修改
    getSavePermission(index) {
      const arr = this.columns.reduce((acc, cur, idx) => {
        if (idx !== 8) {
          if (this.tableData[index][`${cur.key}Value`]) {
            acc.push('1');
          } else {
            acc.push('0');
          }
        }
        return acc;
      }, []);
      return arr.join('');
    }, // 获取保存数据的权限的二进制数据
    allTabthSelected() {
      if (this.tableData.length > 0) {
        this.columns.forEach((item) => {
          this.tabthCheckboxSelected(item, item.key);
          // if (item.key !== 'see') {  // 注释掉的这个代码是默认的查看列没有选中
          //   this.tabthCheckboxSelected(item, item.key);
          // }
        });
      } else {
        this.columns.map((item) => {
          item[`${item.key}Value`] = false;
          return item;
        });
      }
    }, // 判断所有表头是不是应该选中
    tabthCheckboxSelected(column, columnKey) {
      if (this.tableData.length > 0) {
        const disabledArr = [];
        const arr = this.tableData.reduce((acc, cur, idx) => {
          if (cur[`${columnKey}Disabled`]) {
            disabledArr.push(idx);
          }
          if (cur[`${columnKey}Disabled`] === false && cur[`${columnKey}Value`] === false) {
            acc.push(idx);
          }
          return acc;
        }, []);
        if (arr.length === 0) {
          if (disabledArr.length === this.tableData.length) {
            column[`${columnKey}Value`] = false;
          } else {
            const findIndex = this.columns.findIndex(item => item.key === columnKey);
            if (!column[`${columnKey}Value`]) {
              column[`${columnKey}Value`] = true;
              this.columns[findIndex] = column;
              // this.columns[findIndex][`${columnKey}Value`] = true;
            }
          }
        } else {
          const findIndex = this.columns.findIndex(item => item.key === columnKey);
          if (column[`${columnKey}Value`]) {
            column[`${columnKey}Value`] = false;
            this.columns[findIndex] = column;
            // this.columns[findIndex][`${columnKey}Value`] = false;
          }
        }
        this.columns = this.columns.concat([]);
      }
    }, // 判断是否将表头选中
    tabthCheckboxChange(currentValue, params) {
      // 如果点击的不是查看列，并且是选中状态的时候，将查看列选中
      if (params.column.key !== 'see') {
        if (currentValue) {
          this.columns[0].seeValue = true;
          this.tableData.map((item) => {
            if (!item.seeDisabled) {
              item.seeValue = true;
            }
            return item;
          });
        }
        const findColumnIndex = this.columns.findIndex((item) => item.key === params.column.key);
        this.columns[findColumnIndex][`${params.column.key}Value`] = currentValue;
      }
      // 点击查看列的表头，并且是取消选中的状态
      if (params.column.key === 'see' && currentValue === false) {
        this.columns[0].seeValue = false;
        this.columns = [].concat(this.columns);
        this.cancelAllSelected();
      }

      // 点击查看列的表头，并且是选中的状态
      if (params.column.key === 'see' && currentValue === true) {
        this.columns[0].seeValue = true;
      }

      // 选中表头以及表体里的数据
      params.column[`${params.column.key}Value`] = currentValue;
      this.tableData.map((item) => {
        if (!item[`${params.column.key}Disabled`]) {
          item[`${params.column.key}Value`] = currentValue;
        }
        return item;
      });

      // 选中扩展的表头
      if (params.column.key === 'extend') {
        this.selectedExtendTabth(currentValue);
      }
    }, // 表格表头的checkbox改变时触发
    cancelAllSelected() {
      this.columns.reduce((acc, cur, idx) => {
        if (idx > 0) {
          acc.push(cur.key);
        }
        return acc;
      }, [])
        .forEach((key) => {
          // const columns = this.columns.map((item) => {
          //   if (item[`${key}Value`]) {
          //     item[`${key}Value`] = false;
          //   }
          //   return item;
          // });
          // this.columns = columns.concat([]).concat([]);
          this.tableData.map((item) => {
            item[`${key}Value`] = false;
            if (item.actionList && item.actionList.length > 0) {
              item.actionList.map((tem) => {
                tem.permission = 0;
                if (tem.children && tem.children.length > 0) {
                  tem.children.map((cur) => {
                    cur.permission = 0;
                    return cur;
                  });
                }
                return tem;
              });
            }
            return item;
          });
        });
      this.allTabthSelected();
      // 下边表格取消选中
      this.cancelExtendTableAllSelected();
    }, // 取消所有选中
    cancelExtendTableAllSelected() {
      this.extendTableData.map((item) => {
        item.permission = 0;
        if (item.children && item.children.length > 0) {
          item.children.forEach((tem) => {
            tem.permission = 0;
            return tem;
          });
        }
        return item;
      });
    }, // 取消下边表格所有选中状态
    selectedExtendTabth(currentValue) {
      this.editExtendTableData(currentValue);
      this.tableData.map((cur) => {
        if (cur.actionList && cur.actionList.length > 0) {
          cur.actionList.map((item) => {
            if (currentValue) {
              item.permission = 128;
            } else {
              item.permission = 0;
            }
            if (item.children && item.children.length > 0) {
              item.children.map((tem) => {
                if (currentValue) {
                  tem.permission = 128;
                } else {
                  tem.permission = 0;
                }
                return tem;
              });
            }
            return item;
          });
        }
        return cur;
      });
    }, // 选中扩展列表头
    extendRowCheckboxChange(currentValue, params) {
      if (params) {
        params.row[`${params.column.key}Value`] = currentValue;
        if (params.row.actionList && params.row.actionList.length > 0) {
          params.row.actionList.map((item) => {
            if (currentValue) {
              item.permission = 128;
            } else {
              item.permission = 0;
            }
            if (item.children && item.children.length > 0) {
              item.children.map((tem) => {
                if (currentValue) {
                  tem.permission = 128;
                } else {
                  tem.permission = 0;
                }
                return tem;
              });
            }
            return item;
          });
        }
        this.tableData[params.index] = params.row;
        // 判断该列是否全部选中
        this.tabthCheckboxSelected(params.column, 'extend');
      }

      // 判断下边表格选中还是不选中
      this.editExtendTableData(currentValue);

      // 将查看列选中
      this.selectedSeeColumn(params, currentValue);
    }, // 扩展一列的checkbox点击的时候触发
    editExtendTableData(currentValue) {
      if (this.extendTableData.length > 0) {
        this.extendTableData.map((item) => {
          if (currentValue) {
            item.permission = 128;
          } else {
            item.permission = 0;
          }
          if (item.children && item.children.length > 0) {
            item.children.map((tep) => {
              if (currentValue) {
                tep.permission = 128;
              } else {
                tep.permission = 0;
              }
              return tep;
            });
          }
          return item;
        });
      }
    }, // 根据传入的值判断下边的表格是否全部选中或者不选中
    extendFunctionCheckboxChange(val, params) {
      // 判断是否选中
      if (val) {
        params.row.permission = 128;
        this.editTableExtendData(128, params.row);
      } else {
        params.row.permission = 0;
        this.editTableExtendData(0, params.row);
      }
      this.extendTableData[params.index] = params.row;

      // 判断下边表格中是否全部选中，如果有没有选中的就存到数组里
      const arr = this.extendTableData.reduce((acc, cur) => {
        if (cur.permission === 0) {
          acc.push(cur.permission);
        }
        if (cur.children && cur.children.length > 0) {
          cur.children.forEach((item) => {
            if (item.permission === 0) {
              acc.push(item.permission);
            }
          });
        }
        return acc;
      }, []);
      // 如果下边表格里全部选中，将上边表格对应的扩展选中，如果没有全部选中就取消选中
      // const findIndex = this.tableData.findIndex(item => item.ad_table_id === params.row.ad_table_id);
      const findIndex = params.row.extendIndex;
      if (arr.length > 0) {
        if (findIndex > -1) {
          this.tableData[findIndex].extendValue = false;
          this.selectedSeeColumn({ index: findIndex }, false);
        }
      } else {
        if (findIndex > -1) {
          this.tableData[findIndex].extendValue = true;
          this.selectedSeeColumn({ index: findIndex }, true);
        }
      }

      // 判断扩展该列是否全选
      this.tabthCheckboxSelected(this.columns[8], 'extend');

      // 调保存修改数据的方法
      // this.getExtendTableSaveData(val, params.row);
    }, // 下边表格扩展功能的checkbox改变时触发
    functionCheckboxChange(val, params) {
      // 判断是否选中
      if (val) {
        params.row.children[0].permission = 128;
        this.editTableDataForFunction(128, params.row);
      } else {
        params.row.children[0].permission = 0;
        this.editTableDataForFunction(0, params.row);
      }
      this.extendTableData[params.index] = params.row;

      // 判断下边表格中是否全部选中，如果有没有选中的就存到数组里
      const arr = this.extendTableData.reduce((acc, cur) => {
        if (cur.permission === 0) {
          acc.push(cur.permission);
        }
        if (cur.children && cur.children.length > 0) {
          cur.children.forEach((item) => {
            if (item.permission === 0) {
              acc.push(item.permission);
            }
          });
        }
        return acc;
      }, []);
      // 如果下边表格里全部选中，将上边表格对应的扩展选中，如果没有全部选中就取消选中
      // const findIndex = this.tableData.findIndex(item => item.ad_table_id === params.row.ad_table_id);
      const findIndex = params.row.extendIndex;
      if (arr.length > 0) {
        if (findIndex > -1) {
          this.tableData[findIndex].extendValue = false;
          this.selectedSeeColumn(findIndex, false);
        }
      } else {
        if (findIndex > -1) {
          this.tableData[findIndex].extendValue = true;
          this.selectedSeeColumn(findIndex, true);
        }
      }

      // 判断扩展该列是否全选
      this.tabthCheckboxSelected(this.columns[8], 'extend');
    }, // 下边表格功能列checkbox改变时触发
    savePermission(type) {
      this.getSaveData();
        
      if (this.tableSaveData.length === 0) {
        this.$Message.info({
          content: '没有更改'
        });
      } else {
        this.spinShow = true;
        const obj = {
          GROUPID: this.groupId,
          CP_C_GROUPPERM: this.tableSaveData
        };
        functionPowerActions().savePermission({
          params: obj,
          success: (res) => {
            console.log(res);
            this.spinShow = false;
            if (res.data.code === 0) {
              this.isSaveError = false;
              if (type === 'refresh') {
                this.refresh();
              } else {
                this.groupId = this.newGroupId;
                this.adSubsystemId = this.newAdSubsystemId;
                this.adTableCateId = this.newAdTableCateId;
                this.getTableData();
              }
              this.$Message.success({
                content: res.data.message
              });
            } else {
              this.isSaveError = true;
              if (type === 'menuTree') {
                this.$refs.menuTree.handleSelect(this.oldMenuTreeObj.nodeKey);
              }
              if (type === 'tree') {
                this.$refs.tree.handleSelect(this.oldTreeObj.nodeKey);
              }
              setTimeout(() => {
                this.isSaveError = false;
              }, 0);
            }
          }
        });
        // network.post('/p/cs/savePermission', obj)
        //   .then((res) => {
        //     if (res.data.code === 0) {
        //       if (type === 'refresh') {
        //         this.refresh();
        //       } else {
        //         this.groupId = this.newGroupId;
        //         this.adSubsystemId = this.newAdSubsystemId;
        //         this.adTableCateId = this.newAdTableCateId;
        //         this.getTableData();
        //       }
        //       this.$Message.success({
        //         content: res.data.message
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     throw err;
        //   });
      }
    }, // 保存数据
    getSaveData() {

      this.tableSaveData = this.tableData.reduce((acc, cur, idx) => {
        if (cur.ad_menu_id === this.backupsTableData[idx].ad_menu_id && this.getSavePermission(idx) !== this.toBin(this.backupsTableData[idx].permission)) {
          acc.push({
            AD_MENU_ID: cur.ad_menu_id,
            DATA_SOURCE: cur.data_source,
            ID: cur.id,
            PERMISSION: this.getSavePermission(idx)
          });
        }
        if (cur.actionList && cur.actionList.length > 0) {
          cur.actionList.forEach((item, index) => {
            if (item.permission !== this.backupsTableData[idx].actionList[index].permission) {
              acc.push({
                AD_ACTION_ID: item.ad_action_id,
                ID: item.id,
                PERMISSION: item.permission === 128 ? 1 : 0
              });
            }
            if (item.children && item.children.length > 0) {
              item.children.forEach((tem, temIndex) => {
                if (tem.permission !== this.backupsTableData[idx].actionList[index].children[temIndex].permission) {
                  acc.push({
                    AD_ACTION_ID: tem.ad_action_id,
                    ID: tem.id,
                    PERMISSION: tem.permission === 128 ? 1 : 0
                  });
                }
              });
            }
          });
        }
        return acc;
      }, []);
    }, // 获得保存的数据
    getCopyPermissionData() {
      functionPowerActions().cgroupsquery({
        params: { NAME: '' },
        success: (res) => {
          if (res.data.code === 0) {
            this.backupsDropData = res.data.data;
            this.totalRowCount = res.data.data.length;
            this.getSingleDropSelectData(1, res.data.data);
            this.getMultipleDropSelectData(1, res.data.data);
          }
        }
      });
      // network.post('/p/cs/cgroupsquery', { NAME: '' })
      //   .then((res) => {
      //     if (res.data.code === 0) {
      //       this.backupsDropData = res.data.data;
      //       this.totalRowCount = res.data.data.length;
      //       this.getSingleDropSelectData(1, res.data.data);
      //       this.getMultipleDropSelectData(1, res.data.data);
      //     }
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
    }, // 获取复制权限外键的数据
    getSingleDropSelectData(pageValue, data) {
      const start = (pageValue - 1) * this.dropPageSize;
      const tabth = [
        {
          colname: 'ID',
          name: 'ID',
          isak: false
        },
        {
          colname: 'NAME',
          name: '角色',
          isak: true
        }
      ];
      const row = data.slice(start, start + this.dropPageSize)
        .reduce((acc, cur) => {
          const obj = {
            ID: {
              val: cur.ID,
            },
            NAME: {
              val: cur.NAME
            }
          };
          acc.push(obj);
          return acc;
        }, []);
      this.singleDropDownSelectFilterData = {
        start,
        tabth,
        row
      };
    }, // 整合复制权限外键单选数据
    getMultipleDropSelectData(pageValue, data) {
      const start = (pageValue - 1) * this.dropPageSize;
      const tabth = [
        {
          colname: 'ID',
          name: 'ID',
          isak: false
        },
        {
          colname: 'NAME',
          name: '角色',
          isak: true
        }
      ];
      const row = data.slice(start, start + this.dropPageSize)
        .reduce((acc, cur) => {
          const obj = {
            ID: {
              val: cur.ID,
            },
            NAME: {
              val: cur.NAME
            }
          };
          acc.push(obj);
          return acc;
        }, []);
      this.multipleDropDownSelectFilterData = {
        start,
        tabth,
        row
      };
    }, // 整合复制权限外键多选数据
    singleDropSelected(val) {
      this.singlePermissionId = val[0].ID;
    }, // 外键单选，选中触发
    singleDropPageChange(val) {
      this.getSingleDropSelectData(val, this.backupsDropData);
    }, // 外键单选分页改变触发
    singlePopperHide() {
      this.getSingleDropSelectData(1, this.backupsDropData);
    }, // 外键单选popper隐藏时触发
    singleDropClear() {
      this.singlePermissionId = null;
    }, // 单选清空时触发
    singleInputChange(val) {
      if (val) {
        this.singleAutoData = this.backupsDropData.reduce((acc, cur) => {
          if (cur.NAME && cur.NAME.indexOf(val) !== -1) {
            acc.push({ ID: cur.ID, NAME: cur.NAME });
          }
          return acc;
        }, []);
      } else {
        this.singleAutoData = [];
      }
    }, // 外键单选输入框值改变时触发
    multipleDropSelected(val) {
      this.multiplePermissionId = val.reduce((acc, cur) => {
        acc.push(cur.ID);
        return acc;
      }, []).join(',');
    }, // 外键多选，选中触发
    multipleDropPageChange(val) {
      this.getMultipleDropSelectData(val, this.backupsDropData);
    }, // 外键多选分页改变触发
    multiplePopperHide() {
      this.getMultipleDropSelectData(1, this.backupsDropData);
    }, // 外键多选popper隐藏时触发
    multipleDropClear() {
      this.multiplePermissionId = null;
    }, // 多选清空时触发
    multipleInputChange(val) {
      if (val) {
        this.multipleAutoData = this.backupsDropData.reduce((acc, cur) => {
          if (cur.NAME && cur.NAME.indexOf(val) !== -1) {
            acc.push({ ID: cur.ID, NAME: cur.NAME });
          }
          return acc;
        }, []);
      } else {
        this.multipleAutoData = [];
      }
    }, // 复制权限外键多选输入时触发
  }
};
</script>

<style lang="less" >
.ark-spin-fix {
  z-index: 999;
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.functionPower {
  position: relative;
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .left-tree-head {
    font-size: 20px;
    text-align: center;
    margin-bottom: 25px;
  }
  .left-tree-li {
    font-size: 14px;
    text-align: center;
    border: 1px solid #000;
    height: 25px;
    line-height: 25px;
    margin-bottom: -1px;
  }
  .buttonGroup {
    display: flex;

    .Button {
      min-width: 0;
      padding: 0 8px;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      box-sizing: border-box;
      margin-right: 10px;
      height: 32px !important;
      line-height: 30px !important;
      border-radius: 5px !important;
      span {
        vertical-align: initial;
      }
    }
  }
  .content {
    flex: 1;
    margin-top: 10px;
    display: flex;
    overflow-y: hidden;
    .contentLeft {
      width: 240px;
      height: 100%;
      padding: 10px;
      border: solid 1px #d8d8d8;
      border-radius: 6px;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      .menuContainer {
        flex: 1;
        margin-top: 10px;
        overflow-y: auto;

        .ark-tree-title {
          width: 100%;
          font-size: 12px;
          line-height: 26px;
        }
        .ark-tree-title-selected,
        .ark-tree-title-selected:hover {
          background-color: rgb(196, 226, 255);
        }

        .menuList {
          cursor: pointer;
          font-size: 12px;
          line-height: 26px;
        }
        .menuHighlight {
          background-color: rgb(196, 226, 255);
        }
      }
    }
    .contentRight {
      height: 100%;
      flex: 1;
      border: solid 1px #d8d8d8;
      border-radius: 6px;
      display: flex;
      width: 100%;
      .left-tree {
        width: 200px;
        padding: 10px;
        border-right: solid 1px #d8d8d8;
        overflow: auto;
        .ark-tree-title-selected,
        .ark-tree-title-selected:hover {
          background-color: rgb(196, 226, 255);
        }
      }
      .right-list {
        flex: 1;
        height: 100%;
        width: 10px;
        .ark-checkbox-inner {
          transition: 0s !important;
        }
        .upper-part {
          height: 60%;
          padding: 10px;
          border-bottom: solid 1px #d8d8d8;
          /*overflow-x: auto;*/
          /*overflow-y: hidden;*/
          .upper-table {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
            .upper-table-tabth {
              position: relative;
              table {
                border-collapse: collapse;
                border-spacing: 0px;
                border: 0;
                box-sizing: border-box;
                background-color: #f5f6fa;
              }
              table th {
                box-sizing: border-box;
                padding: 3px 8px;
                font-weight: 400 !important;
                white-space: nowrap;
                text-align: left;
                min-width: 62px;
                border-bottom: 1px solid #e8eaec;
              }
              .functionColumnClass {
                text-align: left;
              }
            }
            .upper-table-tabtd-empty {
              height: calc(100% - 22px) !important;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #575757;
              font-size: 12px;
            }
            .upper-table-tabtd {
              overflow: auto;
              height: calc(100% - 22px) !important;
              .upper-table-tabtd-highlight {
                background-color: rgb(196, 226, 255);
              }
              table {
                border-spacing: 0px;
              }
              table td {
                padding: 4px 8px 4px 8px;
                font-weight: 400 !important;
                white-space: nowrap;
                text-align: left;
                border-bottom: 1px solid #e8eaec;
                min-width: 62px;
              }
              table tr:hover {
                background-color: #ecf0f1;
              }
            }
          }
        }
        .bottom-part {
          height: 40%;
          padding: 10px;
          .bottom-table {
            height: 100%;
            width: 100%;
            .bottom-table-tabth {
              width: 100%;
              position: relative;
              background-color: #f5f6fa;
              border-bottom: 1px solid #e8eaec;
              table {
                border-collapse: collapse;
                border-spacing: 0px;
                border: 0;
                box-sizing: border-box;
              }
              table th {
                box-sizing: border-box;
                padding: 5px 8px;
                font-weight: 400 !important;
                white-space: nowrap;
                text-align: left;
                min-width: 200px;
              }
            }
            .bottom-table-tbody {
              overflow: auto;
              height: calc(100% - 22px) !important;
              .bottom-table-tbody-highlight {
                background-color: rgb(196, 226, 255);
              }
              table {
                width: 100%;
                border-spacing: 0px;
              }
              table td {
                padding: 4px 8px 4px 8px;
                font-weight: 400 !important;
                white-space: nowrap;
                text-align: left;
                border-bottom: 1px solid #e8eaec;
                min-width: 200px;
              }
              table tr:hover {
                background-color: #ecf0f1;
              }
              table tr {
                width: 100%;
              }
              table tr:last-child {
                width: calc(100% - 200px);
              }
            }
            .bottom-table-tbody-empty {
              height: calc(100% - 22px) !important;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #575757;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.modalContent {
  .itemContent {
    display: flex;
    margin-bottom: 10px;
    overflow: hidden;
    .labelContent {
      margin-right: 4px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .labelTip {
        font-size: 16px;
        height: 10px;
        color: red;
        margin-right: 4px;
      }
    }
    .itemCom {
      width: 220px;
    }
  }
  .modalButton {
    width: 324px;
    display: flex;
    justify-content: flex-end;
    .Button {
      margin-left: 10px;
      min-width: 0;
      padding: 0 8px;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      box-sizing: border-box;
      height: 22px;
      span {
        vertical-align: initial;
      }
    }
  }
}
</style>
