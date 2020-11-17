<template>
  <div class="strategyModifyLogistics">
    <div class="modifyBox">
      <div class="modifyLeft">
        <div class="retrieveBox">
          <span class="retrieveTitle">检索</span>
          <Input
            v-model="name"
            class="retrieve"
            :expand="false"
            @on-enter="getLogistics(name, 1)"
          />
          <Icon
            slot="suffix"
            type="ios-search"
            @click="getLogistics(name, 1)"
          />
          </Input>
        </div>
        <jordan-action-table
          :jordan-table-config="jordanTableConfig"
          @on-row-dblclick="onRowDblclick"
          @on-select="OnSelect"
          @on-select-cancel="Cancel"
          @on-select-all="SelectAll"
          @on-select-all-cancel="SelectAllCancel"
        />
      </div>
      <div class="modifyMiddle">
        <Button
          size="small"
          @click="synchronous"
        >
          >>
        </Button>
      </div>
      <div class="modifyRight">
        <div class="selectedModify">
          <div class="selectedTop">
            <p>
              已选中（
              <span>{{ total }}条</span>）
            </p>
            <Icon
              type="ios-trash-outline"
              size="20"
              @click="DeleteAll"
            />
          </div>
          <div class="selectedList">
            <ul>
              <li
                v-for="(item, index) in selectData"
                :key="index"
              >
                <p>{{ item.CP_C_PHY_WAREHOUSE_ENAME }}</p>
                <span @click="DeleteSelect(item.CP_C_PHY_WAREHOUSE_ECODE, item.ID)">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <jordanButton :btn-config="btnConfig" />
    <Modal
      v-model="cancelModel"
      title="提示"
      width="400"
      :mask-closable="false"
      :mask="true"
      @on-ok="okClick"
      @on-cancel="cancalModal"
    >
      <p>请确认是否需要删除仓库</p>
    </Modal>
    <div
      v-show="removeLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import jordanButton from 'professionalComponents/businessButton';
  import jordanActionTable from 'professionalComponents/businessActionTable.vue';

  export default {
    components: {
      jordanButton,
      jordanActionTable
    },
    props: {
      componentData: {}
    },
    data() {
      return {
        jordanTableConfig: {
          columns: [
            {
              key: 'ENAME',
              title: '仓库名称'
            },
            {
              key: 'ECODE',
              title: '仓库编号'
            }
          ],
          data: [], // 数据配置
          pageShow: false, // 控制分页是否显示
          loading: false,
          height: 358, // 表格高度
          indexColumn: true, // 是否显示序号
          isShowSelection: true, // 是否显示checkedbox
          border: true // 是否显示纵向边框
        },
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: '确定', // 按钮文本
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                const _this = this;
                _this.determine();
              } // 按钮点击事件
            },
            {
              text: '取消', // 按钮文本
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$parent.$parent.closeConfirm();
              } // 按钮点击事件
            }
          ]
        }, // 确定取消按钮
        selectData: [],
        selectAllList: [],
        total: 0,
        cancelModel: false,
        name: '',
        delId: '',
        removeLoading: false
      };
    },
    mounted() {
      this.getLogistics();
    },
    methods: {
      // 确定
      determine() {
        const _this = this;
        const fromdata = new FormData();
        const param = {
          fixcolumn: {
            ST_C_SEND_RULE: {},
            ST_C_SEND_RULE_ADDRESS_RENT: _this.selectData,
            ST_C_SEND_RULE_WAREHOUSE_RATE: [],
            ST_C_SEND_RULE_ADDRESS_RANK_RESULT: []
          },
          objid: _this.$route.params.customizedModuleId === 'New' ? -1 : _this.$route.params.customizedModuleId
        };
        fromdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/saveSendRule',
          method: 'post',
          data: fromdata
        }).then(res => {
          if (res.data.data.code === 0) {
            _this.$parent.$parent.$parent.refresh();
            _this.$parent.$parent.closeConfirm();
          } else {
            const err = res.data.data.message || '设置失败';
            _this.$Message.error(err);
          }
        });
      },
      // 获取仓库数据
      getLogistics(name, index = '') {
        const _this = this;
        _this.removeLoading = true;
        const param = {
          objid: _this.componentData.id,
          warehouseInfo: name === undefined ? '' : name
        };
        axios({
          url: '/p/cs/getSendRuleWarehouseInfo',
          method: 'post',
          data: param
        }).then(res => {
          _this.removeLoading = false;
          if (res.data.code === 0) {
            _this.jordanTableConfig.data = res.data.data.cpCPhyWarehouseList;
            if (!index) {
              _this.selectData = res.data.data.sendRuleAddressRents || [];
              _this.total = _this.selectData.length;
            }
          }
        });
      },
      // 同步查询
      synchronous() {
        const arr = [];
        if (this.selectAllList.length) {
          this.selectAllList.forEach(item => {
            arr.push({
              CP_C_PHY_WAREHOUSE_ID: item.ID,
              CP_C_PHY_WAREHOUSE_ECODE: item.ECODE,
              CP_C_PHY_WAREHOUSE_ENAME: item.ENAME,
              ID: -1
            });
          });
        }
        if (!this.selectData.length) this.selectData = arr;
        else if (arr.length) {
          arr.forEach(item => {
            if (
              !this.selectData.some(
                e => e.CP_C_PHY_WAREHOUSE_ECODE === item.CP_C_PHY_WAREHOUSE_ECODE
              )
            ) { this.selectData.push(item); }
          });
        }
        this.total = this.selectData.length;
      },
      // 删除
      DeleteSelect(ecode, id) {
        if (id !== -1) {
          this.cancelModel = true;
          this.delId = id;
        } else {
          for (let i = 0, list = this.selectData.length; i < list; i++) {
            if (this.selectData[i].CP_C_PHY_WAREHOUSE_ECODE === ecode) {
              this.selectData.splice(i, 1);
              this.total = this.selectData.length;
              this.$Message.success('删除成功');
              return;
            }
          }
        }
      },
      DeleteAll() {
        if (!this.selectData.length) return;
        this.delId = '';
        this.cancelModel = true;
      },
      // 删除确认
      okClick() {
        this.removeLoading = true;
        const ids = [];
        if (this.delId) {
          ids[0] = this.delId;
        } else {
          this.selectData.forEach(item => ids.push(item.ID));
        }
        const fromdata = new FormData();
        const param = {
          objid: this.componentData.id,
          tabitem: {
            ST_C_SEND_RULE_ADDRESS_RENT: ids
          }
        };
        fromdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/delSendRule',
          method: 'post',
          data: fromdata
        }).then(res => {
          this.removeLoading = false;
          if (res.data.data.code === 0) {
            const ess = res.data.data.message || '删除成功';
            this.getLogistics();
            this.$parent.$parent.$parent.refresh();
            this.$Message.success(ess);
          } else {
            const err = res.data.data.message || '删除失败';
            this.$Message.error(err);
          }
        });
        this.total = this.selectData.length;
      },
      cancalModal() {
        this.cancelModel = false;
      },
      // 双击
      onRowDblclick(row) {
        const arr = {
          CP_C_PHY_WAREHOUSE_ID: row.ID,
          CP_C_PHY_WAREHOUSE_ECODE: row.ECODE,
          CP_C_PHY_WAREHOUSE_ENAME: row.ENAME,
          ID: -1
        };
        if (
          !this.selectData.some(
            e => e.CP_C_PHY_WAREHOUSE_ECODE === row.ECODE
          )
        ) { this.selectData.push(arr); }
        this.total = this.selectData.length;
      },
      OnSelect(e) {
        this.selectAllList = e;
      },
      Cancel(e) {
        this.selectAllList = e;
      },
      SelectAll(e) {
        this.selectAllList = e;
      },
      SelectAllCancel(e) {
        this.selectAllList = e;
      }
    }
  };
</script>

<style lang="less">
.strategyModifyLogistics {
  .modifyBox {
    margin-bottom: 8px;
    display: flex;
    .modifyLeft {
      width: 65%;
      height: 400px;
      overflow: auto;
      border: 1px solid #d3d3d3;
      .retrieveBox {
        margin: 8px 0 0 8px;
        font-size: 0;
        .retrieveTitle {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          background: #ddd;
          width: 36px;
          height: 26px;
          line-height: 26px;
          font-size: 14px;
        }
        .retrieve {
          width: 60%;
          display: inline-block;
        }
      }
      .jordan-table-box {
        height: 90%;
      }
      .jordan-table-box .burgeon-table-wrapper {
        margin: 0 !important;
      }
    }
    .modifyMiddle {
      height: 400px;
      padding: 0 5px;
      button {
        border-color: #ec6e4e;
        color: #ec6e4e;
        margin-top: 180px;
        span {
          vertical-align: top !important;
        }
      }
    }
    .modifyRight {
      width: 32%;
      height: 400px;
      overflow: auto;
      border: 1px solid #d3d3d3;
      .selectedModify {
        .selectedTop {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #999;
          padding: 0 3px 3px 5px;
          margin: 8px 16px;
          p {
            margin-top: 3px;
            color: #999;
            font-size: 14px;
            line-height: 14px;
            span {
              color: red;
            }
          }
          i {
            color: red;
          }
        }
        .selectedList {
          padding: 0 16px 16px;
          overflow: auto;
          ul {
            li {
              position: relative;
              text-align: center;
              height: 26px;
              line-height: 26px;
              background: #f5f6fa;
              color: blue;
              margin-bottom: 8px;
              p {
                width: 170px;
                padding-left: 7px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              span {
                color: #333;
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 7px;
              }
            }
          }
        }
      }
    }
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
</style>
