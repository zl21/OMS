<template>
  <div class="logisticsArea">
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
      class="salesTable"
    >
      <!-- tab切换 -->
      <businessLabel
        :label-default-value="labelDefaultValue"
        :label-list="labelList"
        class="jordanLabel"
      />
      <!-- tree -->
      <div class="tableBox">
        <div class="tableLeft">
          <div class="retrieveBox">
            <span class="retrieveTitle">检索</span>
            <Input
              v-model="name"
              :expand="false"
              class="retrieve"
              @on-enter="enter(name)"
            />
            <Icon
              slot="suffix"
              type="ios-search"
              @click="enter(name)"
            />
            </Input>
          </div>
          <div class="treeBox">
            <Tree
              id="tree"
              :data="treeData1"
              :disabled="true"
              :query="query"
              show-checkbox
              @on-select-change="selectChange"
            />
          </div>
        </div>
        <div class="tableRight">
          <div class="setTree">
            <div class="retrieveBox">
              <span class="retrieveTitle">检索</span>
              <Input
                v-model="name2"
                :expand="false"
                class="retrieve"
                @on-enter="enter2(name2)"
              />
              <Icon
                slot="suffix"
                type="ios-search"
                @click="enter2(name2)"
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
            <div class="treeBox2">
              <Tree
                id="tree2"
                :data="treeData2"
                :query="query2"
                show-checkbox
                @on-select-change="selectChange"
                @on-toggle-expand="toggleExpand"
              />
            </div>
          </div>
          <div class="synchronous">
            <Button
              size="small"
              @click="synchronous"
            >
              >>
            </Button>
          </div>

          <div class="actionPermissionsTable">
            <div class="scrollThead">
              <table>
                <thead>
                  <tr>
                    <th
                      class="paddingleft18"
                      style="width:18%;"
                    >
                      省
                    </th>
                    <th style="width:18%;">
                      市
                    </th>
                    <th style="width:18%;">
                      区
                    </th>
                    <th style="width:19%;">
                      排除区域
                    </th>
                    <th style="width:19%;">
                      <input
                        v-model="isDelivery"
                        type="checkbox"
                        @change="handleAllChange(isDelivery)"
                      >是否送达
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="scrollTable">
              <table>
                <tbody>
                  <tr
                    v-for="(item, index) in dataArr"
                    :key="index"
                  >
                    <td
                      class="paddingleft18"
                      style="width:18%;"
                    >
                      {{ item.CP_C_REGION_PROVINCE_ENAME }}
                    </td>
                    <td style="width:18%;">
                      {{ item.CP_C_REGION_CITY_ENAME }}
                    </td>
                    <td style="width:18%;">
                      {{ item.CP_C_REGION_AREA_ENAME }}
                    </td>
                    <td style="width:19%;">
                      <input
                        v-model="item.EXCLUSION_AREA"
                        class="borderInput"
                        type="text"
                      >
                    </td>
                    <td style="width:19%;">
                      <input
                        v-model="item.IS_ARRIVE"
                        type="checkbox"
                        @change="isDeliveryChange()"
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
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
      :closable="importTable.closable"
      :component-data="importTable.componentData"
      :draggable="importTable.draggable"
      :exclude-string="importTable.excludeString"
      :keep-alive="importTable.keepAlive"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :name="importTable.name"
      :scrollable="importTable.scrollable"
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :transfer="importTable.transfer"
      :url="importTable.url"
      :width="importTable.width"
    />
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :mask="true"
      title="提示"
      width="420"
      @on-ok="warningOk"
    >
      <p>是否确认导出？</p>
    </Modal>
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
  import businessButton from 'professionalComponents/businessButton';
  import businessForm from 'professionalComponents/businessForm';
  import businessLabel from 'professionalComponents/businessLabel';
  import businessStatusFlag from 'professionalComponents/businessStatusFlag';
  import businessModal from 'professionalComponents/businessDialog';

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
        isSaveLoading: false,
        tableLoading: false,
        // 弹框配置 导入
        importTable: {
          refFuns: 'confirmFun',
          confirmTitle: '导入',
          titleAlign: 'center', // 设置标题是否居中 center left
          width: '652',
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
                  name: 'logisticsArea', // 文件名
                  label: '物流区域设置', // tab中文名
                  query: Object.assign({
                    id: -1, // 单据id
                    tabTitle: '物流区域设置', // tab中文名
                  }) // 带的参数
                });
              }
            },
            {
              text: '保存',
              disabled: false,
              btnclick: () => {
                const _this = this;
                _this.save();
              }
            },
            {
              text: '作废',
              disabled: false,
              btnclick: () => {
                const _this = this;
                _this.invalid();
              }
            },
            {
              text: '导入',
              disabled: false,
              btnclick: () => {
                const _this = this;
                _this.importTable.componentData = { tableName: 'ST_C_EXPRESS_AREA', objid: _this.$route.query.id };
                console.log(_this.$children);
                _this.$children
                  .find(item => item.name === 'importTable')
                  .openConfirm();
              }
            },
            {
              text: '导出',
              disabled: false,
              btnclick: () => {
                const _this = this;
                _this.warningModal = true;
              }
            },
            {
              text: '刷新',
              btnclick: () => {
                const _this = this;
                _this.getTree();
              }
            },
            {
              text: '返回',
              btnclick: () => {
                R3.store.commit('global/tabOpen', {
                  type: 'S',
                  tableId: 24639,
                  tableName: 'ST_C_EXPRESS_AREA',
                  label: '物流区域设置',
                  back: true,
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
                colid: 169323,
                colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '物流公司',
                inputname: 'CP_C_LOGISTICS_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '物流公司', // input前面显示的lable值
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_LOGISTICS', // 对应的表
                reftableid: 24411, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '' // 这个是选择的值
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
        treeData1: [],
        treeData2: [],
        dataArr: [],
        isDelivery: false,
        openDefault: '1',
        query: '',
        query2: '',
        name: '',
        name2: '',
        single: false,
        tableSize: 0,
        statusName: ''
      };
    },
    mounted() {
      if (this.$route.query.id !== '-1') {
        this.information.formData[0].itemdata.readonly = true;
        this.setTableHeight();
        this.getTree();
      }
    },
    methods: {
      // 保存
      save() {
        const _this = this;
        if (_this.information.formData[0].itemdata.pid === undefined || !_this.information.formData[0].itemdata.pid) return _this.$Message('物流公司必填');
        if (_this.tableSize > 1000) return _this.$Message.error('数量过大，请使用导入功能设置是否到达');
        _this.dataArr.forEach((item) => {
          if (item.IS_ARRIVE) {
            item.IS_ARRIVE = 'Y';
          } else {
            item.IS_ARRIVE = 'N';
          }
        });
        _this.isSaveLoading = true;
        _this.name2 = '';
        _this.query2 = '';
        const fromdata = new FormData();
        const param = {
          fixcolumn: {
            ST_C_EXPRESS_AREA: {
              CP_C_LOGISTICS_ID: _this.information.formData[0].itemdata.pid,
              REMARK: _this.information.formValue.REMARK
            },
            ST_C_EXPRESS_AREA_ITEM: _this.dataArr
          },
          objid: this.$route.query.id
        };
        fromdata.append('param', JSON.stringify(param));
        _this.$network.post('/p/cs/expressAreaSaveCmd', fromdata)
          .then((res) => {
            _this.isSaveLoading = false;
            _this.dataArr = [];
            if (res.data.data.code === 0) {
              _this.$Message.success('保存成功');
              _this.getTree('', res.data.data.data.objid);
              this.$store.commit('customize/TabHref', {
                id: res.data.data.data.objid, // 单据id
                type: 'action', // 类型action
                name: 'logisticsArea', // 文件名
                label: '物流区域设置', // tab中文名
                query: Object.assign({
                  id: res.data.data.data.objid, // 单据id
                  tabTitle: '物流区域设置', // tab中文名
                }) // 带的参数
              });
            } else {
              const err = res.data.data.message || '保存失败';
              _this.$Message.error(err);
            }
          });
      },
      // 作废
      invalid() {
        const _this = this;
        _this.isSaveLoading = true;
        const fromdata = new FormData();
        const param = { objid: this.$route.query.id };
        fromdata.append('param', JSON.stringify(param));
        _this.$network.post('/p/cs/expressAreaVoidCmd', fromdata)
          .then((res) => {
            _this.isSaveLoading = false;
            if (res.data.code === 0) {
              const ess = res.data.data.message || '作废成功';
              _this.getTree();
              _this.$Message.success(ess);
            } else {
              const err = res.data.data.message || '作废失败';
              _this.$Message.success(err);
            }
          });
      },
      // 获取树
      getTree(save, objid) {
        const _this = this;
        _this.isSaveLoading = true;
        _this.$network.post('/p/cs/getExpressAreaTree', { objid: objid || this.$route.query.id })
          .then((res) => {
            _this.isSaveLoading = false;
            if (res.data.code === 0) {
              const treeList = JSON.parse(JSON.stringify(res.data.data.expressAreaTree));
              _this.treeData1 = res.data.data.expressAreaTree;
              _this.treeData2 = treeList;
              _this.information.formData[0].itemdata.pid = res.data.data.expressArea.CP_C_LOGISTICS_ID;
              _this.information.formData[0].itemdata.valuedata = res.data.data.expressArea.CP_C_LOGISTICS_ENAME;
              _this.information.formValue.REMARK = res.data.data.expressArea.REMARK;
              this.treeData1.forEach((item) => {
                item.disableCheckbox = true;
                item.children.forEach((list) => {
                  list.disableCheckbox = true;
                  list.children.forEach((data) => {
                    data.disableCheckbox = true;
                  });
                });
              });
              if (res.data.data.expressArea.ISACTIVE === 'N') {
                _this.statusName = '已作废';
                _this.btnConfig.buttons.forEach((item) => {
                  if (['保存', '作废', '导入', '导出', '刷新'].includes(item.text)) {
                    item.disabled = true;
                  }
                });
              }
              if (save === 'import') {
                _this.synchronous();
              }
            }
          });
      },
      // 全选树
      checkAll(e) {
        if (e) {
          this.treeData2.forEach((item) => {
            // item.checked = true;
            item.children.forEach((list) => {
              list.checked = true;
              list.children.forEach((data) => {
                data.checked = true;
              });
            });
          });
        } else {
          this.treeData2.forEach((item) => {
            item.checked = false;
            item.children.forEach((list) => {
              list.checked = false;
              list.children.forEach((data) => {
                data.checked = false;
              });
            });
          });
        }
      },
      // 省市区搜索
      enter(e) {
        this.treeData1.forEach((item) => {
          item.expand = false;
          item.children.forEach((list) => {
            list.expand = false;
            list.children.forEach((data) => {
              data.expand = false;
            });
          });
        });
        this.query = e;
        this.treeData1.forEach((item) => {
          item.children.forEach((list) => {
            if (list.title.indexOf(`${e}`) != -1) {
              item.expand = true;
            }
            list.children.forEach((data) => {
              if (data.title.indexOf(`${e}`) != -1) {
                item.expand = true;
                list.expand = true;
              }
            });
          });
        });
        // this.data1 = this.data1;
      },
      enter2(e) {
        const _this = this;
        _this.listArr = [];
        _this.tableLoading = true;
        const param = { objid: _this.$route.query.id, treeLikeKey: e };
        _this.$network.post('/p/cs/getExpressAreaItemLikeTable', param)
          .then((res) => {
            _this.tableLoading = false;
            if (res.data.code === 0) {
              _this.cityThead = true;
              _this.dataArr = res.data.data.ST_C_EXPRESS_AREA_ITEM_RESULT !== undefined ? res.data.data.ST_C_EXPRESS_AREA_ITEM_RESULT : [];
              _this.treeData2 = res.data.data.REGION_TREE_RESULT;
              _this.dataArr.forEach((item) => {
                if (item.IS_ARRIVE === 'Y') item.IS_ARRIVE = true;
                else if (item.IS_ARRIVE === 'N') item.IS_ARRIVE = false;
              });
              _this.query2 = e;
              _this.treeData2.forEach((item) => {
                if (item.children.length) {
                  item.children.forEach((list) => {
                    if (list.title.indexOf(`${e}`) != -1) {
                      item.expand = true;
                    }
                    list.children.forEach((data) => {
                      if (data.title.indexOf(`${e}`) != -1) {
                        item.expand = true;
                        list.expand = true;
                      }
                    });
                  });
                }
              });
            } else {
              _this.$Message.error(res.data.data.message || '失败');
            }
          });
      },
      // 同步table数据
      synchronous() {
        const _this = this;
        _this.tableLoading = true;
        _this.dataArr = [];
        const treeList = [];
        this.treeData2.forEach((item) => {
          if (!item.children.length && item.checked) {
            treeList.push({
              id: item.id,
              regiontype: item.regiontype
            });
          }
          item.children.forEach((list) => {
            if (!list.children.length && list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
            list.children.forEach((data) => {
              if (data.checked) {
                treeList.push({
                  id: data.id,
                  regiontype: data.regiontype
                });
              }
            });
          });
        });
        _this.$network.post('/p/cs/getExpressAreaItemTable', { objid: this.$route.query.id, treeNode: treeList })
          .then((res) => {
            _this.tableLoading = false;
            _this.isDelivery = false;
            if (res.data.code === 0 && res.data.data !== null) {
              if (res.data.data.ST_C_EXPRESS_AREA_ITEM_RESULT.length) _this.dataArr = res.data.data.ST_C_EXPRESS_AREA_ITEM_RESULT;
              _this.tableSize = res.data.data.TABLE_SIZE;
              _this.dataArr.forEach((item) => {
                if (item.IS_ARRIVE === 'Y') item.IS_ARRIVE = true;
                else if (item.IS_ARRIVE === 'N') item.IS_ARRIVE = false;
              });
            } else {
              _this.tableSize = 0;
            }
          });
      },
      selectChange(e) {
        console.log(e);
      },
      toggleExpand(e) {
        console.log(e);
        console.log(this.data1);
      },
      // 全选是否到达
      handleAllChange(e) {
        if (e) {
          this.dataArr.forEach(item => item.IS_ARRIVE = true);
        } else {
          this.dataArr.forEach(item => item.IS_ARRIVE = false);
        }
      },
      // 是否到达
      isDeliveryChange() {
        if (this.dataArr.every(i => i.IS_ARRIVE === true)) this.isDelivery = true;
        else if (this.dataArr.every(i => i.IS_ARRIVE === false)) this.isDelivery = false;
      },
      // 导出
      warningOk() {
        const _this = this;
        _this.warningModal = false;
        const treeList = [];
        this.treeData2.forEach((item) => {
          item.children.forEach((list) => {
            list.children.forEach((data) => {
              if (data.checked) {
                treeList.push({
                  id: data.id,
                  regiontype: data.regiontype
                });
              }
            });
          });
        });
        const param = {
          objid: _this.$route.query.id,
          treeNode: treeList
        };
        _this.$network.post('/p/cs/exportExpressAreaItem', param)
          .then((res) => {
            if (res.data.code === 0) {
              const ess = res.data.data.message || '导出成功';
              _this.$Message.success(ess);
              _this.downloadUrlFile(res.data.data);
            } else {
              const err = res.data.data.message || '导出失败';
              _this.$Message.success(err);
              _this.downloadUrlFile(res.data.data);
            }
          });
      },
      // 导出
      downloadUrlFile(src) {
        const download_file = {};
        if (typeof (download_file.iframe) === 'undefined') {
          const iframe = document.createElement('iframe');
          download_file.iframe = iframe;
          document.body.appendChild(download_file.iframe);
        }
        download_file.iframe.src = src;
        download_file.iframe.style.display = 'none';
      },
      oneObjs(e) {
      },
      // 设置表格高度
      setTableHeight() {
        const contentHeight = document.getElementById('content').clientHeight;
        let logisticsAreaHeight = 25;
        logisticsAreaHeight += document.getElementsByClassName('tableTop')[0].clientHeight;
        const tableHeight = contentHeight - logisticsAreaHeight;
        const Theight = document.getElementsByClassName('tableBox')[0];
        Theight.style = `height: ${tableHeight - 100}px;`;
      }
    }
  };
</script>


<style lang="less">
  @import "~professionalComponents/common/css/theme.less";

  .logisticsArea {
    position: relative;
    padding-top: 8px;

    .jordanLabel {
      padding-bottom: 10px;
    }

    .tableBox {
      display: flex;
      height: 100%;

      .tableLeft {
        width: 20%;
        margin-right: 15px;
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
            height: 26px;
            line-height: 26px;
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

      .tableRight {
        position: relative;
        width: 79%;
        display: flex;
        border: 1px solid #d3d3d3;

        .setTree {
          width: 22%;
          height: 100%;
          border-right: 1px solid #d3d3d3;
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
              height: 26px;
              line-height: 26px;
              font-size: 14px;
            }

            .retrieve {
              width: 60%;
              display: inline-block;
            }
          }

          .treeBox2 {
            height: 90%;
            padding: 0 10px;
            overflow: scroll;

            #tree2 {
              .iconbj_on:before {
                content: "\ea03";
              }
            }
          }
        }

        .synchronous {
          width: 40px;
          height: 100%;
          position: relative;
          border-right: 1px solid #d3d3d3;

          Button {
            border-color: #ec6e4e;
            color: #ec6e4e;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -12px 0 0 -17px;

            span {
              vertical-align: top !important;
            }
          }
        }

        .actionPermissionsTable {
          width: 75%;
          overflow-y: auto;

          .scrollTable {
            overflow: auto;

            .borderInput {
              border: 1px solid #d3d3d3;
            }
          }

          table {
            color: #575757;
            text-align: left;
            width: 100%;
            text-indent: 5px;
            table-layout: fixed;

            thead {
              tr {
                th {
                  text-align: left;
                  background-color: #eeeff0;
                  height: 26px;
                  line-height: 26px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            tbody {
              tr {
                border-bottom: 1px solid #d8d8d8;
                height: 23px;
                line-height: 23px;

                td {
                  height: 23px;
                  line-height: 23px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            .textEllipsis {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .paddingleft18 {
              padding-left: 18px;
            }

            .paddingleft10 {
              padding-left: 10px;
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

    .retrieve {
      height: 26px;

      .burgeon-input {
        padding: 0 0 0 5px !important;
        height: 24px !important;
      }
    }
  }
</style>
