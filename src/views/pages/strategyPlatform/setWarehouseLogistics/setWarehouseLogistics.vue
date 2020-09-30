<template>
  <div class="setWarehouseLogistics">
    <div class="tableTop">
      <businessButton :btn-config="btnConfig" />
      <Collapse v-model="openDefault">
        <Panel name="1">
          基本信息
          <p slot="content">
            <businessForm :form-config="information" />
          </p>
        </Panel>
      </Collapse>
    </div>
    <div
      v-if="this.$route.query.id !== '-1'"
      class="tableContent"
    >
      <!-- tab切换 -->
      <businessLabel
        class="jordanLabel"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
      />
      <div class="tableBox">
        <div class="tableLeft">
          <div class="retrieveBox">
            <span class="retrieveTitle">检索</span>
            <Input
              v-model="name"
              class="retrieve"
              :expand="false"
              @on-enter="enter(name)"
            />
            <Icon
              slot="suffix"
              type="ios-search"
              @click="enter(name)"
            />
            </Input>
          </div>
          <Checkbox
            v-model="single"
            style="margin: 0 0 7px 32px;"
            @on-change="checkAll(single)"
          >
            全选
          </Checkbox>
          <div class="treeBox">
            <Tree
              id="tree"
              :data="treeData"
              :disabled="true"
              :query="query"
              show-checkbox
            />
          </div>
        </div>
        <div class="tableSynchronous">
          <Button
            class="btn1"
            size="small"
            @click="synchronous"
          >
            市->
          </Button>
          <Button
            class="btn2"
            size="small"
            @click="provinceSynchronous"
          >
            省->
          </Button>
        </div>
        <!-- table -->
        <div class="tableRight">
          <div class="all-table">
            <div
              id="conTop"
              class="conTop"
            >
              <div id="contenter">
                <table id="fixedDiv">
                  <thead>
                    <tr>
                      <th style="min-width: 50px !important;">
                        序号
                      </th>
                      <th>省</th>
                      <th v-if="cityThead">
                        市
                      </th>
                      <th
                        v-for="(item, index) in theadArr"
                        :key="index"
                      >
                        {{ item.name }}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div
                id="mainDiv"
                class="list-table"
                @scroll="paperScroll($event)"
              >
                <table>
                  <thead style="display:none;">
                    <tr>
                      <th style="min-width: 50px !important;">
                        序号
                      </th>
                      <th>省</th>
                      <th v-if="cityThead">
                        市
                      </th>
                      <th
                        v-for="(item, index) in theadArr"
                        :key="index"
                      >
                        {{ item.name }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-content">
                    <tr
                      v-for="(data, index) of listArr"
                      :key="index"
                    >
                      <td style="min-width: 50px !important;">
                        {{ index+1 }}
                      </td>
                      <td>{{ data.CP_C_REGION_PROVINCE_ENAME }}</td>
                      <td v-if="cityThead">
                        {{ data.CP_C_REGION_CITY_ENAME }}
                      </td>
                      <td
                        v-for="(item, j) of data.LOGISTICS_RANK"
                        :key="j"
                        class="tdColor"
                      >
                        <Input
                          v-model="item.rank"
                          :placeholder="item.provDiffRank ? item.provDiffRank : ''"
                          :regx="/^[1-9]\d*$/"
                          @on-blur="inputBlur(data.LOGISTICS_RANK, item, j)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            v-show="tableLoading"
            class="fromLoading"
          >
            <Spin />
          </div>
        </div>
      </div>
    </div>
    <!-- 导入 -->
    <businessModal
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keep-alive="importTable.keepAlive"
      :exclude-string="importTable.excludeString"
      :component-data="importTable.componentData"
    />
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      title="提示"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <p>是否确认导出？</p>
    </Modal>
    <Modal
      v-model="saveModal"
      title="提示"
      width="420"
      :mask="true"
      @on-ok="saveOk"
    >
      <p>{{ saveModalText }}</p>
    </Modal>
    <!-- 修改物流公司-->
    <businessModal
      :title="modifyLogistics.confirmTitle"
      :title-align="modifyLogistics.titleAlign"
      :width="modifyLogistics.width"
      :scrollable="modifyLogistics.scrollable"
      :closable="modifyLogistics.closable"
      :draggable="modifyLogistics.draggable"
      :mask="modifyLogistics.mask"
      :mask-closable="modifyLogistics.maskClosable"
      :transfer="modifyLogistics.transfer"
      :name="modifyLogistics.name"
      :url="modifyLogistics.url"
      :keep-alive="modifyLogistics.keepAlive"
      :exclude-string="modifyLogistics.excludeString"
      :component-data="modifyLogistics.componentData"
    />
    <!--单据状态图片展示 -->
    <businessStatusFlag :status-name="statusName" />
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import businessButton from 'professionalComponents/businessButton.vue';
  import businessForm from 'professionalComponents/businessForm.vue';
  import businessLabel from 'professionalComponents/businessLabel.vue';
  import businessModal from 'professionalComponents/businessDialog.vue';
  import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
  import businessStatusFlag from 'professionalComponents/businessStatusFlag.vue';
  import { setTimeout } from 'timers';

  export default {
    components: {
      businessButton,
      businessForm,
      businessLabel,
      businessModal,
      businessStatusFlag
    },
    data() {
      return {
        warningModal: false,
        saveModal: false,
        saveModalText: '', // 保存空物流提示
        isSaveLoading: false,
        tableLoading: false,
        cityThead: true,
        // 弹框配置 导入
        importTable: {
          refFuns: 'confirmFun',
          confirmTitle: '导入',
          titleAlign: 'center', // 设置标题是否居中 center left
          width: '600',
          scrollable: false, // 是否可以滚动
          closable: true, // 是否可以按esc关闭
          draggable: true, // 是否可以拖动
          mask: true, // 是否显示遮罩层
          maskClosable: true, // 是否可以点击叉号关闭
          transfer: true, // 是否将弹层放在body内
          name: 'importTable', // 组件名称
          url: 'publicDialog/importTable',
          keepAlive: true,
          excludeString: 'importTable', // 将name传进去，确认不缓存
          componentData: {}
        },
        // 修改物流
        modifyLogistics: {
          refFuns: 'confirmFun',
          confirmTitle: '请选择物流公司',
          titleAlign: 'center', // 设置标题是否居中 center left
          width: '760',
          scrollable: false, // 是否可以滚动
          closable: true, // 是否可以按esc关闭
          draggable: true, // 是否可以拖动
          mask: true, // 是否显示遮罩层
          maskClosable: true, // 是否可以点击叉号关闭
          transfer: true, // 是否将弹层放在body内
          name: 'modifyLogistics', // 组件名称
          url: 'strategyPlatform/setWarehouseLogistics/modifyLogistics',
          keepAlive: true,
          excludeString: 'modifyLogistics', // 将name传进去，确认不缓存
          componentData: {}
        },
        btnConfig: {
          typeAll: 'error',
          buttons: [
            {
              text: '新增',
              btnclick: () => {
                const _this = this;
                _this.$store.commit('customize/TabHref', {
                  id: -1, // 单据id
                  type: 'action', // 类型action
                  name: 'setWarehouseLogistics', // 文件名
                  label: '仓库物流优先级设置', // tab中文名
                  query: Object.assign({
                    id: -1, // 单据id
                    tabTitle: '仓库物流优先级设置' // tab中文名
                  }) // 带的参数
                });
              }
            },
            {
              text: '保存',
              btnclick: () => {
                const _this = this;
                if (this.$route.query.id > 0) {
                  if (_this.listArr.length == 0) {
                    _this.$Message.warning('请选择物流区域!');
                    return;
                  }
                  if (_this.theadArr.length == 0) {
                    _this.$Message.warning('请选择区域物流!');
                    return;
                  }
                  if (_this.listArr.length > 0) {
                    const num = _this.theadArr.length;
                    let text = '';
                    _this.listArr.forEach((item) => {
                      let flag = true;
                      // for (let i = 1; i < num; i++) {
                      //   if (item['RANK' + i] != '') {
                      //     flag = false;
                      //   };
                      // }
                      item.LOGISTICS_RANK.forEach((i) => {
                        if (i.rank != '') {
                          flag = false;
                        }
                      });
                      if (flag) {
                        text += `${item.CP_C_REGION_CITY_ENAME || item.CP_C_REGION_PROVINCE_ENAME},`;
                      }
                    });
                    if (text) {
                      _this.saveModalText = `${text}的物流优先级为空,保存会导致该数据删除,是否确认保存?`;
                      _this.saveModal = true;
                    } else {
                      _this.save();
                    }
                  }
                } else {
                  _this.save();
                }
              }
            },
            {
              text: '作废',
              disabled: true,
              btnclick: () => {
                const _this = this;
                _this.invalid();
              }
            },
            {
              text: '导入',
              disabled: true,
              btnclick: () => {
                const _this = this;
                _this.importTable.componentData = { tableName: 'ST_C_WAREHOUSE_LOGISTICS', objid: _this.$route.query.id };
                _this.$children
                  .find(item => item.name === 'importTable')
                  .openConfirm();
              }
            },
            {
              text: '导出',
              disabled: true,
              btnclick: () => {
                const _this = this;
                _this.warningOk();
              }
            },
            {
              text: '修改物流',
              disabled: true,
              btnclick: () => {
                this.modifyLogistics.componentData = { id: this.$route.query.id };
                this.$children
                  .find(item => item.name === 'modifyLogistics')
                  .openConfirm();
              }
            },
            {
              text: '刷新',
              disabled: true,
              btnclick: () => {
                const _this = this;
                _this.refresh();
              }
            },
            {
              text: '返回',
              btnclick: () => {
                const _this = this;
                _this.$store.commit('customize/TabHref', {
                  id: 1111113,
                  type: 'table',
                  name: 'ST_C_WAREHOUSE_LOGISTICS',
                  label: '仓库物流优先级方案',
                  back: true
                });
              }
            }
          ]
        },
        information: {
          formValue: {
            REMARK: '',
            CP_C_LOGISTICS_ENAME: ''
          },
          formData: [
            {
              style: 'popInput',
              width: '6',
              itemdata: {
                col: 1,
                colid: 168444,
                colname: 'CP_C_PHY_WAREHOUSE_ID',
                datelimit: 'all',
                display: 'text',
                fkdesc: '实体仓档案',
                fkdisplay: 'drp',
                inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME',
                isfk: true,
                isnotnull: true,
                isuppercase: false,
                length: 20,
                name: '仓库',
                readonly: false,
                refobjid: '14',
                reftable: 'CP_C_PHY_WAREHOUSE',
                reftableid: 24486,
                row: 1,
                statsize: -1,
                type: 'STRING',
                valuedata: ''
              },
              oneObj: (e) => {
                this.oneObjs(e);
              }
            },
            {
              style: 'input',
              label: '备注',
              value: 'REMARK',
              width: '6'
            }
          ],
          ruleValidate: {
            BUYER_NICK: [{ required: true, message: ' ', trigger: 'blur' }]
          }
        },
        labelList: [
          {
            label: '区域明细',
            value: '1',
            isShow: true
          }
        ],
        labelDefaultValue: '1',
        openDefault: '1',
        name: '',
        query: '',
        treeData: [],
        theadArr: [],
        listArr: [],
        single: false,
        statusName: ''
      };
    },
    mounted() {
      if (this.$route.query.id !== '-1') {
        this.information.formData[0].itemdata.readonly = true;
        this.setTableHeight();
        this.refresh();
        this.btnConfig.buttons.forEach((item) => {
          if (item.text === '修改物流') item.disabled = false;
          else if (item.text === '作废') item.disabled = false;
          else if (item.text === '导入') item.disabled = false;
          else if (item.text === '导出') item.disabled = false;
          else if (item.text === '刷新') item.disabled = false;
        });
      }
    },
    methods: {
      // 保存
      save() {
        const _this = this;
        if (!_this.information.formData[0].itemdata.pid) return _this.$Message.error('仓库必填');
        _this.isSaveLoading = true;
        _this.name = '';
        _this.query = '';
        const fromdata = new FormData();
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
              REMARK: _this.information.formValue.REMARK
            },
            ST_C_WAREHOUSE_LOGISTICS_ITEM: [],
            ST_C_WAREHOUSE_LOGISTICS_RANK_RESULT: cloneListArr
          },
          objid: this.$route.query.id
        };
        fromdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/saveWarehouseLogistics',
          method: 'post',
          data: fromdata
        }).then((res) => {
          _this.isSaveLoading = false;
          if (res.data.data.code === 0) {
            // let ess = res.data.data.message || '保存成功';
            _this.$Message.success('保存成功');
            if (this.$route.query.id !== '-1') {
              this.refresh();
            } else {
              this.$store.commit('customize/TabHref', {
                id: res.data.data.data.objid, // 单据id
                type: 'action', // 类型action
                name: 'setWarehouseLogistics', // 文件名
                label: '仓库物流优先级设置', // tab中文名
                query: Object.assign({
                  id: res.data.data.data.objid, // 单据id
                  tabTitle: '仓库物流优先级设置', // tab中文名
                }) // 带的参数
              });
            }
          } else {
            const err = res.data.data.message || '保存失败';
            _this.$Message.error(err);
            _this.refresh();
          }
        });
      },
      // 获取树
      getTreeData() {
        const _this = this;
        _this.isSaveLoading = true;
        const param = { objid: this.$route.query.id };
        axios({
          url: '/p/cs/getWarehouseLogisticsTree',
          method: 'post',
          data: param
        }).then((res) => {
          _this.isSaveLoading = false;
          if (res.data.code === 0) {
            _this.treeData = res.data.data.warehouseLogisticsTree;
            if (res.data.data.warehouseLogistics !== null) {
              _this.information.formData[0].itemdata.pid = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ID;
              _this.information.formData[0].itemdata.valuedata = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ENAME;
              _this.information.formValue.REMARK = res.data.data.warehouseLogistics.REMARK;
              if (res.data.data.warehouseLogistics.ISACTIVE === 'N') {
                _this.statusName = '已作废';
                _this.btnConfig.buttons.forEach((item) => {
                  if (item.text === '修改物流') item.disabled = true;
                  else if (item.text === '作废') item.disabled = true;
                  else if (item.text === '导入') item.disabled = true;
                  else if (item.text === '导出') item.disabled = true;
                });
              }
            }
            if (res.data.data.warehouseLogisticsItems.length) {
              this.theadArr = [];
              res.data.data.warehouseLogisticsItems.forEach((item) => {
                this.theadArr.push({
                  name: item.CP_C_LOGISTICS_ENAME
                });
              });
            } else {
              this.theadArr = [];
            }
          }
        });
      },
      getTreeData1() {
        const _this = this;
        _this.isSaveLoading = true;
        const param = { objid: this.$route.query.id };
        axios({
          url: '/p/cs/getWarehouseLogisticsTree',
          method: 'post',
          data: param
        }).then((res) => {
          _this.isSaveLoading = false;
          if (res.data.code === 0) {
            _this.treeData = res.data.data.warehouseLogisticsTree;
            if (res.data.data.warehouseLogistics !== null) {
              _this.information.formData[0].itemdata.pid = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ID;
              _this.information.formData[0].itemdata.valuedata = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ENAME;
              _this.information.formValue.REMARK = res.data.data.warehouseLogistics.REMARK;
              if (res.data.data.warehouseLogistics.ISACTIVE === 'N') {
                _this.statusName = '已作废';
                _this.btnConfig.buttons.forEach((item) => {
                  if (item.text === '修改物流') item.disabled = true;
                  else if (item.text === '作废') item.disabled = true;
                  else if (item.text === '导入') item.disabled = true;
                  else if (item.text === '导出') item.disabled = true;
                  else if (item.text === '保存') item.disabled = true;
                });
              }
            }
            if (res.data.data.warehouseLogisticsItems.length) {
              this.theadArr = [];
              res.data.data.warehouseLogisticsItems.forEach((item) => {
                this.theadArr.push({
                  name: item.CP_C_LOGISTICS_ENAME
                });
              });
            } else {
              this.theadArr = [];
            }
            _this.provinceSynchronous();
          }
        });
      },
      // 同步查询
      synchronous() {
        const _this = this;
        _this.tableLoading = true;
        _this.listArr = [];
        const treeList = [];
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
          });
        });
        axios({
          url: '/p/cs/getLogisticsRankResultTable',
          method: 'post',
          data: { objid: this.$route.query.id, treeNode: treeList }
        }).then((res) => {
          _this.tableLoading = false;
          if (res.data.code === 0) {
            _this.cityThead = true;
            _this.listArr = res.data.data !== undefined ? res.data.data : [];
            _this.listArr.forEach(item => item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK));
          }
        });
      },
      // 省同步查询
      provinceSynchronous() {
        const _this = this;
        _this.tableLoading = true;
        _this.listArr = [];
        const treeList = [];
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
          });
        });
        axios({
          url: '/p/cs/getLogisticsRankResultTable',
          method: 'post',
          data: { objid: this.$route.query.id, cityleave: 'PROV', treeNode: treeList }
        }).then((res) => {
          _this.tableLoading = false;
          if (res.data.code === 0) {
            _this.cityThead = false;
            _this.listArr = res.data.data !== undefined ? res.data.data : [];
            _this.listArr.forEach(item => item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK));
          }
        });
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
          if (item[i].logisticsEcode !== rank.logisticsEcode && item[i].rank === rank.rank) {
            setTimeout(() => {
              item[index].rank = '';
              this.$Message.info('优先级设置重复');
            }, 200);
            return;
          }
        }
      },
      // 检索
      enter(e) {
        const _this = this;
        _this.listArr = [];
        _this.tableLoading = true;
        const param = { objid: _this.$route.query.id, treeLikeKey: e };
        axios({
          url: '/p/cs/getLogisticsLikeRankResultTable',
          method: 'post',
          data: param
        }).then((res) => {
          _this.tableLoading = false;
          if (res.data.code === 0) {
            _this.cityThead = true;
            _this.listArr = res.data.data.warehouseLogisticsRanks !== undefined ? res.data.data.warehouseLogisticsRanks : [];
            _this.listArr.forEach(item => item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK));
            _this.treeData = res.data.data.warehouseLogisticsTree;
            _this.query = e;
            _this.treeData.forEach((item) => {
              item.children.forEach((list) => {
                if (list.title.indexOf(`${e}`) != -1) {
                  item.expand = true;
                }
              });
            });
          } else {
            _this.$Message.error(res.data.data.message || '失败');
          }
        });
      },
      // 刷新
      refresh() {
        this.getTreeData1();
      },
      // 作废
      invalid() {
        const _this = this;
        _this.isSaveLoading = true;
        const fromdata = new FormData();
        const param = { objid: this.$route.query.id };
        fromdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/voidWarehouseLogistics',
          method: 'post',
          data: fromdata
        }).then((res) => {
          _this.isSaveLoading = false;
          if (res.data.code === 0) {
            const ess = res.data.data.message || '作废成功';
            _this.getTreeData1();
            _this.$Message.success(ess);
          } else {
            const err = res.data.data.message || '作废失败';
            _this.$Message.success(err);
          }
        });
      },
      // 导出
      warningOk() {
        const _this = this;
        _this.warningModal = false;
        const treeList = [];
        this.treeData.forEach((item) => {
          item.children.forEach((list) => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
          });
        });
        const param = {
          objid: _this.$route.query.id,
          treeNode: treeList
        };
        axios({
          url: '/p/cs/exportWarehouseLogisticsRank',
          method: 'post',
          data: param
        }).then((res) => {
          if (res.data.code === 0) {
            const ess = res.data.message || '导出成功';
            _this.$Message.success(ess);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || '导出失败';
            _this.$Message.success(err);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          }
        });
      },
      saveOk() {
        this.save();
      },
      oneObjs(e) { },
      // 设置表格高度
      setTableHeight() {
        const _this = this;
        const contentHeight = document.getElementById('content').clientHeight;
        let logisticsAreaHeight = 25;
        logisticsAreaHeight += document.getElementsByClassName('tableTop')[0]
          .clientHeight;
        const tableHeight = contentHeight - logisticsAreaHeight;
        const Theight = document.getElementsByClassName('tableBox')[0];
        document.getElementsByClassName('list-table')[0].style = `height: ${tableHeight - 140}px;`;
        // document.getElementById('conTop').style = `height: ${tableHeight - 170}px;`;
        Theight.style = `height: ${tableHeight - 110}px;`;
      },
      paperScroll(e) {
        const sLefts = document.getElementById('fixedDiv');
        sLefts.setAttribute('style', `margin-left: ${-e.target.scrollLeft}px`);
      }
    }
  };
</script>


<style lang="less">
  @import "~professionalComponents/common/css/theme.less";
.setWarehouseLogistics {
  position: relative;
  padding-top: 8px;
  .tableContent {
    .tableBox {
      display: flex;
      .tableLeft {
        width: 20%;
        height: 100%;
        min-height: 400px;
        margin: 20px 20px 10px;
        border: 1px solid #d3d3d3;
        overflow: hidden;
        .retrieveBox {
          text-align: center;
          margin: 20px 0;
          font-size: 0;
          width: 100%;
          .retrieveTitle {
            display: inline-block;
            vertical-align: middle;
            background: #ddd;
            width: 36px;
            height: 23px;
            line-height: 23px;
            font-size: 14px;
          }
          .retrieve {
            width: 60%;
            display: inline-block;
          }
        }
        .treeBox {
          height: 90%;
          padding: 0 10px;
          overflow: scroll;
          #tree {
            .iconbj_on:before {
              content: "\ea03";
            }
          }
        }
      }
      .tableSynchronous {
        width: 24px;
        height: 100%;
        min-height: 500px;
        margin-right: 15px;
        position: relative;
        .btn1 {
          border-color: #ec6e4e;
          color: #ec6e4e;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -12px 0 0 -20px;
          span {
            vertical-align: top !important;
          }
        }
        .btn2 {
          border-color: #ec6e4e;
          color: #ec6e4e;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: 25px 0 0 -20px;
          span {
            vertical-align: top !important;
          }
        }
      }
      .tableRight {
        position: relative;
        width: 75%;
        height: 100%;
        overflow: hidden;
        margin-top: 20px;
        border: 1px solid #d3d3d3;
        .all-table {
          width: 100%;
        }
        .conTop {
          overflow: hidden;
        }
        .list-table {
          // width: 100%;
          height: 500px;
          overflow: hidden;
          overflow: auto;
          input {
            height: 23px !important;
            padding: 0 10px;
            border: none;
          }
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          text-align: left;
          background-color: #eeeff0 !important;
          font-weight: normal;
          span {
            font-size: 14px;
          }
        }
        th,
        td {
          min-width: 150px;
          height: 23px;
          line-height: 23px;
          white-space: nowrap;
          box-sizing: content-box;
          background-color: #fff;
          border: 1px solid #eeeff0;
          padding: 0 10px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
        #contenter {
          z-index: 1000;
          position: relative;
          margin: auto;
          background-color: white;
        }
        #fixedDiv {
          position: absolute;
          left: 0;
          overflow: hidden;
        }
        #mainDiv {
          margin-top: 24px;
          overflow: auto;
          // overflow-x: hidden;
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
