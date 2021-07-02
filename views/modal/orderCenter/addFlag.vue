<!--
 * @Author: your name
 * @Date: 2021-06-08 14:29:58
 * @LastEditTime: 2021-06-22 14:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/addFlag.vue
-->
<template>
  <div class="OC_ORDER_ADD_LABEL customized-modal">
    <div class="tbody">
      <CheckboxGroup v-model="social">
        <Checkbox
          style="margin: 8px"
          v-for="(item, index) in flagList"
          :key="index"
          :label="item.ID.val"
        >
          <span>{{ item.DESCRIPTION.val }}</span>
        </Checkbox>
      </CheckboxGroup>
      <Icon
        type="ios-settings"
        v-if="componentData.title == '添加标记'"
        @click="setting"
        style="fontsize: 20px"
      />
    </div>
    <div class="footer">
      <businessButton
        :btn-config="btnConfig"
        class="modalBth modal-footer"
      ></businessButton>
    </div>
    <Modal
      v-model="modal"
      title="标记管理"
      footer-hide
      :mask="true"
      @on-ok="asyncOK"
      class-name="ark-dialog secModal"
    >
      <div>
        <businessButton :btn-config="modalBtnConfigAdd"></businessButton>
        <!-- <Table
          :columns="table.columns"
          :data="table.data"
          style="max-height: 300px; overflow: scroll"
        ></Table> -->
        <businessActionTable
          :jordan-table-config="table"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
        <businessButton
          :btn-config="modalBtnConfig"
          class="modal-footer"
        ></businessButton>
      </div>
    </Modal>
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from "professionalComponents/businessActionTable";
// var _ = require('lodash');
import { ceil } from 'lodash'

export default {
  components: {
    businessActionTable,
    businessButton
  },
  props: {
    componentData: {
      type: Object
    }
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.getList();
    console.log(this.$parent);
  },
  computed: {
    totalNum() {
      return this.table.total || 0;
    }
  },
  data() {
    return {
      modal: false,
      /* table: {
        businessFormConfig: {}, // 表单配置
        columns: addDetailModalTableColumns, // 表头
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, */
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 返回
            btnclick: () => {
              this.$destroy(false);
              this.$parent.$parent.closeConfirm();
            }
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.determine()
            }
          },
        ]
      },
      modalBtnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.modal = false;
            }
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.asyncOK()
            }
          },
        ]
      },
      modalBtnConfigAdd: {
        typeAll: 'default',
        btnsite: 'left',
        buttons: [
          {
            type: 'primary',
            text: '新增', // 添加
            btnclick: () => {
              this.addList();
            }
          },
        ]
      },
      social: [],
      flagList: [],
      table: {
        pageShow: true, // 控制分页是否显示
        loading: false,
        height: 365, // 表格高度
        border: true, // 是否显示纵向边框
        total: this.totalNum, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100],
        pageSize: 10, // 每页条数
        current: 1,
        columns: [
          {
            title: '序号',
            key: 'index',
            render: (h, params) => {
              return h('span', {}, (this.table.current - 1) * this.table.pageSize + params.index + 1)
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('a', {
                  on: {
                    click: () => {
                      let del = this.totalData.splice(params.index, 1);
                      if (del[0].ID > 0) {
                        del[0].isDelete = 1;
                        this.delData.push(del[0]);
                      }
                      this.pageChange(this.table.current);
                    }
                  }
                }, '删除')
              } else {
                return '';
              }
            }
          },
          {
            key: 'DESCRIPTION',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('Input', {
                  props: {
                    value: params.row.DESCRIPTION,
                    maxlength: 6
                  },
                  on: {
                    'on-change': (val) => {
                      // 标记说明 不能重复
                      // let value = val.target.value;
                    },
                    'on-blur': val => {
                      let value = val.target._value;
                      value = value.replace(/^\s+|\s+$/g, "");
                      const tabDa = JSON.parse(JSON.stringify(this.table.data));
                      const keyList = $omsUtils.sonList(tabDa, 'DESCRIPTION');
                      if (value && keyList.includes(value) && params.row.ID == '-1') {
                        this.$Message.warning(`标记说明【${value}】已存在，请重新输入！`);
                        params.row.DESCRIPTION = '';
                        ++params.row._rowKey;
                        return
                      } else {
                        params.row.DESCRIPTION = val.target.value;
                      }
                      ++params.row._rowKey;
                      this.table.data[params.index] = params.row;
                      // this.jordanTableConfig.data[params.index] = params.row;
                    },
                  }
                })
              } else {
                return h('span', {}, params.row.DESCRIPTION);
              }
            },
            renderHeader: (h, params) => {
              return h('div', [
                h('span', {}, '标记说明'),
                [h('Poptip', {
                  props: {
                    trigger: 'hover',
                    content: '不可超过6个汉字',
                    transfer: true
                  },
                  style: {
                    width: '30px',
                    height: '15px'
                  }
                }, [h('Icon', {
                  props: {
                    type: 'ios-information-circle'
                  },
                  style: {
                    'margin-left': '10px'
                  }
                }, '')])],
              ])
            }
          },
          {
            title: '备注',
            key: 'REMARK',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('Input', {
                  props: {
                    value: params.row.REMARK
                  },
                  on: {
                    'on-change': (val) => {
                      console.log(val);
                      params.row.REMARK = val.target.value;
                      this.table.data[params.index] = params.row;
                    }
                  }
                })
              } else {
                return h('span', {}, params.row.REMARK);
              }
            }
          }
        ],
        data: []
      },
      totalData: [],
      oldTableData: [],
      delData: [],   //记录删除的数据
    }
  },
  methods: {
    pageChange(e) {
      this.table.current = e;
      // eg:第二页，展示第11-20条
      const startIndex = this.table.pageSize * (e - 1) + 1; // 11
      const endIndex = e * this.table.pageSize; // 20
      this.table.total = this.totalData.length;
      this.table.data = this.totalData.slice(startIndex - 1, endIndex);
    },
    pageSizeChange(e) {
      this.table.pageSize = e;
    },
    determine() {
      const self = this;
      if (!self.social.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', self.componentData.title == '添加标记' ? '请选择需要添加的标记!' : '请选择需要取消的标记', 0);
        return;
      }
      let obj = {
        orderIds: self.componentData.ids,
        ids: self.social
      }
      self.service.orderCenter[self.componentData.title == '添加标记' ? 'addOrderLable' : 'cancelOrderLable'](obj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          self.$parent.$parent.$parent.query();
          this.$parent.$parent.closeConfirm();
        } else {
          res.data.data.errors.forEach((element, index) => {
            element.index = index + 1;
          });
          this.$Modal.confirm({
            title: res.data.message,
            width: 500,
            mask: true,
            className: 'ark-dialog',
            render: (h) => {
              if (res.data.data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: '序号',
                        key: 'index'
                      },
                      {
                        title: '单据编号',
                        key: 'billNo'
                      },
                      {
                        title: $i18n.t('modalTitle.a6'), // '提示信息',
                        key: 'message',
                      },
                    ],
                    data: res.data.data.errors,
                  },
                })
              }
              return false
            },
          })
          self.$parent.$parent.$parent.query();
        }
      })
    },
    asyncOK() {
      const self = this;
      let modifyData = self.diffArr();
      modifyData = modifyData.concat(self.delData);
      for (const iterator of modifyData) {
        if (!iterator.DESCRIPTION) {
          self.$OMS2.omsUtils.msgTips(self, 'warning', '标记说明不能为空!', 0);
          return;
        }
      }
      self.service.orderCenter.saveLable(modifyData).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          this.modal = false;
          self.getList()
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
          this.modal = false;
          self.getList()
        }
      })
    },
    addList() {
      this.totalData.push({
        ID: '-1',
        DESCRIPTION: '',
        REMARK: '',
        IS_SYSTEM: 0,
      })
      // 最后一页 = length / pageSize
      const endIndex = ceil(this.totalData.length / this.table.pageSize);
      this.pageChange(endIndex);
    },
    getList() {
      const self = this;
      let obj = { "table": "OC_B_LABEL", "startindex": 0, "range": 10, "fixedcolumns": { "ISACTIVE": ["Y"] }, "column_include_uicontroller": true, "isolr": false };
      if (self.componentData.title == '取消标记') {
        obj.fixedcolumns.IS_SYSTEM = 0;
      }
      let formdata = new FormData();
      formdata.append('searchdata', JSON.stringify(obj));
      self.service.orderCenter.queryFlagList(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.flagList = res.data.data.row;
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'warning', res.data.message, 0);
        }
      })
    },
    setting() {
      const self = this;
      self.modal = true;
      let obj = { "table": "OC_B_LABEL", "startindex": 0, "range": 1000, "fixedcolumns": { "ISACTIVE": ["Y"] }, "column_include_uicontroller": true, "isolr": false };
      let formdata = new FormData();
      formdata.append('searchdata', JSON.stringify(obj));
      self.service.orderCenter.queryFlagList(formdata).then(res => {
        if (res.data.code == 0) {
          const { totalRowCount, row } = res.data.data
          let arr = row.map(item => {
            return {
              REMARK: item.REMARK.val,
              DESCRIPTION: item.DESCRIPTION.val,
              IS_SYSTEM: item.IS_SYSTEM.val,
              ID: item.ID.val
            };
          });
          this.oldTableData = JSON.stringify(arr);
          // self.table.data = arr.concat(arr);
          // self.table.total = totalRowCount * 2;
          this.totalData = arr;
          this.pageChange(1);
        } else {
          // self.$OMS2.omsUtils.msgTips(self, 'warning', res.data.message, 0);
        }
      })
    },
    diffArr() {
      const self = this;
      const oldTableData = JSON.parse(self.oldTableData);
      const newTableData = self.table.data;
      let arr = [];
      for (const newData of newTableData) {

        if (!(oldTableData.some(item => {
          return item.ID == newData.ID && item.DESCRIPTION == newData.DESCRIPTION && item.REMARK == newData.REMARK;
        }))) {
          arr.push(newData);
        }

      };
      return arr;
    }
  }
}
</script>

<style scoped lang="less">
.OC_ORDER_ADD_LABEL {
  .tbody {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
  .modalModule {
    .customBtn {
      font-size: 12px;
      height: 32px;
      line-height: 30px;
      padding: 0 12px;
      border-radius: 5px;
      color: #292f43;
      border-color: #dbdde8;
      background-color: #fff;
    }
  }
}
</style>
<style lang='less'>
.secModal {
  .jordan-table-box .ark-table-border td,
  .jordan-table-box .ark-table-border th {
    height: 32px;
    line-height: 32px;
  }
}
</style>