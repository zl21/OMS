<!--
 * @Author: your name
 * @Date: 2021-05-22 13:30:26
 * @LastEditTime: 2021-08-02 16:06:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /云雀/src/views/pages/orderCenter/matching.vue
-->
<template>
  <div class="matchingDetails">
    <businessButton :btn-config="btnConfig" />
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @table-delete-detail="tableDeleteDetail"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <Modal
      v-model="modal6"
      :title="tuiDanChaXun"
      :mask="true"
      :footer-hide="true"
      :width="width"
    >
      <addGiftItem :componentData="componentData" />
    </Modal>
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import addGiftItem from './addGiftItem';
import service from '@/service/index';

export default {
  components: {
    businessButton,
    addGiftItem,
    businessActionTable,
  },
  data() {
    return {
      tuiDanChaXun: $i18n.t('panel_label.a3'),
      modal6: false,
      loading: true,
      width: '1000',
      type: '',
      tebdata: [], //明细表选中的数据
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.manual_matching'),
            isShow: false,
            webname: 'OC_B_REFUND_IN_manual',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.width = 800;
              service.orderCenter
                .checkRefundInStatus(`id=${this.$route.params.itemId}`)
                .then((res) => {
                  if (res.data.code == 0) {
                    this.switchAlert(1);
                  } else {
                    this.$Message.warning(res.data.message);
                  }
                });
            },
          },
          {
            text: $i18n.t('btn.forceMatching'), //'强制匹配',
            isShow: false,
            webname: 'OC_B_REFUND_IN_force',
            btnclick: () => {
              this.width = 800;

              service.orderCenter
                .checkRefundInStatus(`id=${this.$route.params.itemId}`)
                .then((res) => {
                  if (res.data.code == 0) {
                    this.switchAlert(2);
                  } else {
                    this.$Message.warning(res.data.message);
                  }
                });
            },
          },
          {
            text: $i18n.t('btn.searchReturnOrder'), //'查询退单',
            isShow: false,
            webname: 'chaXunTuiDan',
            btnclick: () => {
              this.switchAlert(vm.$route.query.type);
            },
          },
          {
            text: $i18n.t('btn.clearReturnOrder'), //'清除退单',
            webname: 'OC_B_REFUND_IN_eliminate',
            isShow: false,
            btnclick: () => {
              this.emptyTabledata();
            },
          },
        ],
      },
      tableConfig: {
        indexColumn: true,
        isShowSelection: true,
        highlightRow: false,
        columns: [],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      closeTable: {
        columns: [],
        data: [],
      },
      componentData: {},
    };
  },
  mounted() {
    window.addEventListener('customizeClick', this.Save);
    this.init();
    this.getBtns();
  },
  methods: {
    Save(data) {
      if (data.detail.type == 'save') {
        let person = this.tableConfig.data.filter((em) => em._checked == true);

        if (person.length == 0) {
          this.$Message.warning($i18n.t('modalTips.jt'));
          //"未做任何修改！")
          return;
        }
        let REFUND_IN_ITEM_LIST = [];
        person.forEach((em) => {
          if (em._checked) {
            let obj = {
              OC_B_RETURN_ORDER_ID: em.OC_B_RETURN_ORDER_BILL_NO_ID,
              REFUND_IN_ITEM_ID: em.ID,
              PS_C_SKU_ECODE_ACTUAL: em.PS_C_SKU_ECODE_ACTUAL,
              OC_B_RETURN_ORDER_BILL_NO: em.OC_B_RETURN_ORDER_BILL_NO,
              PS_C_SKU_ECODE: em.PS_C_SKU_ECODE,
              OC_B_RETURN_ORDER_ITEM_ID: em.OC_B_RETURN_ORDER_ITEM_ID,
            };
            REFUND_IN_ITEM_LIST.push(obj);
          }
        });

        let data = {
          MATCH_TYPE: this.type == 1 ? 0 : 1, //匹配类型     -- 0手工  1强制
          REFUND_IN_ID: this.$route.params.itemId, //退货入库单id
          REFUND_IN_ITEM_LIST, //明细
        };
        service.orderCenter.saveMatch(data).then((res) => {
          if (res.data.code == 0) {
            this.$Message.success(res.data.message);
            this.init();
            //刷新主表
            const ActionMODIFY = document.getElementById('refresh');
            ActionMODIFY.click();
          } else {
            if (res.data.data.length == 0) {
              this.$Modal.confirm({
                title: res.data.message,
                width: 500,
                mask: true,
                className: 'ark-dialog',
                render: (h) => {
                  return h('Table', {
                    props: {
                      columns: [
                        {
                          title: $i18n.t('modalTips.jn'), //"失败明细", // '提示信息',
                          key: 'key',
                        },
                        {
                          title: $i18n.t('modalTips.jv'), //'失败信息！', // '错误信息',
                          key: 'message',
                        },
                      ],
                      data: res.data.data,
                    },
                  });
                },
              });
            } else {
              this.$Message.error(res.data.message);
            }
          }
        });
      }
    },
    getBtns() {
      $OMS2.omsUtils
        .getPermissions(
          this,
          '',
          { table: 'OC_B_REFUND_IN', type: 'OBJ', serviceId: 'r3-oc-oms' },
          true
        )
        .then((res) => {
          const { ACTIONS, SUB_ACTIONS } = res;
          if (!vm.$route.query.type) {
            this.btnConfig.buttons.forEach((x) => {
              SUB_ACTIONS.some((y) => y.webname == x.webname) &&
                (x.isShow = true);
            });
          } else if (vm.$route.query.type == 1) {
            this.btnConfig.buttons.filter(
              (item) => item.webname == 'OC_B_REFUND_IN_eliminate'
            )[0].isShow = true;
            if (SUB_ACTIONS.some((y) => y.webname == 'OC_B_REFUND_IN_manual')) {
              this.querbtn(
                this.btnConfig.buttons,
                'chaXunTuiDan'
              ).isShow = true;
            }
          } else if (vm.$route.query.type == 2) {
            this.btnConfig.buttons.filter(
              (item) => item.webname == 'OC_B_REFUND_IN_eliminate'
            )[0].isShow = true;
            if (SUB_ACTIONS.some((y) => y.webname == 'OC_B_REFUND_IN_force')) {
              this.querbtn(
                this.btnConfig.buttons,
                'chaXunTuiDan'
              ).isShow = true;
            }
          }
        });
    },
    emptyTabledata() {
      //清楚退单逻辑
      if (this.tebdata.length == 0) {
        this.$Message.warning($i18n.t('modalTips.gr'));
        return;
      }

      let errArr = [];
      for (const v of this.tebdata) {
        if (v.OC_B_RETURN_ORDER_BILL_NO && v.IS_MATCH == '是') {
          errArr.push({
            id: v.ID,
            index: v.index,
            message: $i18n.t('modalTips.gs'), //"已匹配退货单号，不允许清除！"
          });
          continue;
        } else if (v.OC_B_RETURN_ORDER_BILL_NO == '' && v.IS_MATCH == '否') {
          this.$Message.warning($i18n.t('modalTips.kp'));
        } else {
          this.tableConfig.data.forEach((item) => {
            if (item.ID == v.ID) {
              item.OC_B_RETURN_ORDER_BILL_NO = '';
              item.PS_C_SKU_ECODE_ACTUAL = this.closeTable.data.filter(
                (y) => y.ID == v.ID
              )[0].PS_C_SKU_ECODE_ACTUAL;
              item._checked = false;
            }
          });
        }
      }

      if (errArr.length > 0) {
        //执行错误提示
        this.fnerrtab(errArr, 2);
      }
    },
    closetab(status) {
      //清空所有选中的目标
      this.$children[1].$refs.selections.selectAll(status);
      this.tebdata = [];
    },
    switchAlert(type) {
      for (const v of this.tebdata) {
        //校验是否有退货单号
        if (v.OC_B_RETURN_ORDER_BILL_NO && !v._checked) {
          this.closetab(false);
          this.$Message.warning($i18n.t('modalTips.gt'));
          //'存在明细已经匹配退货单，请重新进行选择！');
          return;
        }
      }
      //存在已匹配的明细，请重新选择！
      if (this.tebdata.length == 0) {
        this.$Message.warning($i18n.t('modalTips.gr'));
        //'请选中一条数据！');
        return;
      }
      this.componentData.type = type;
      this.modal6 = true;
    },
    querbtn(btnConfig, k) {
      return btnConfig.filter((em) => em.webname == k)[0];
    },
    init() {
      let fromdata = new FormData();
      fromdata.append('table', 'OC_B_REFUND_IN_PRODUCT_ITEM');
      fromdata.append('objid', this.$route.params.itemId);
      fromdata.append('refcolid', 180210);
      fromdata.append(
        'searchdata',
        JSON.stringify({
          column_include_uicontroller: true,
          startindex: 0,
          range: 10,
          fixedcolumns: {},
        })
      );
      service.orderCenter.returnTypeItemquery(fromdata).then((res) => {
        //渲染明细表
        if (res.data.code == 0) {
          let data = res.data.data;
          this.tableConfig.columns = data.tabth.map((item) => {
            //处理表头
            item.key = item.colname;
            item.title = item.name;
            return item;
          });
          this.tableConfig.columns = this.tableConfig.columns.filter(
            (item) => item.colname != 'ID'
          );

          this.tableConfig.data = data.row.map((item, index) => {
            //处理表值
            for (const k in item) {
              item[k] = item[k].val;
            }
            item.index = index + 1;
            return item;
          });
          this.closeTable.columns = JSON.parse(
            JSON.stringify(this.tableConfig.columns)
          );
          this.closeTable.data = JSON.parse(
            JSON.stringify(this.tableConfig.data)
          );
        }
        //获取主表单据状态 决定是否隐藏明细表那三个按钮
        let moduleName = this.$route.meta.moduleName;
        let dnaJuStatus = this.$store.state[
          moduleName
        ].copyDataForReadOnly.addcolums[0].childs.filter(
          (em) => em.colname == 'MATCH_STATUS'
        )[0].valuedata;
        if (dnaJuStatus == '2') {
          this.btnConfig.buttons.forEach((em) => {
            em.isShow = false;
          });
        }
      });
    },
    fnisSku(sku, sukArr) {
      return sukArr.split(',').some((item) => item == sku);
    },
    closeConfirm(data, type) {
      this.type = type;
      let errArr = [];
      if (data) {
        this.tebdata.forEach((item) => {
          this.tableConfig.data.forEach((em, index) => {
            if (item.ID == em.ID) {
              if (type == 2) {
                //判断明细suk是否相等 ---强制匹配
                if (
                  !this.fnisSku(
                    item.PS_C_SKU_ECODE,
                    data.RETURN_ORDER_ITEM_LIST.PS_C_SKU_ECODE
                  )
                ) {
                  em.OC_B_RETURN_ORDER_BILL_NO = data.BILL_NO;
                  item.OC_B_RETURN_ORDER_BILL_NO = data.BILL_NO;

                  em.OC_B_RETURN_ORDER_BILL_NO_ID = data.ID;
                  item.OC_B_RETURN_ORDER_BILL_NO_ID = data.ID;

                  em.OC_B_RETURN_ORDER_ITEM_ID = data.RETURN_ORDER_ITEM_LIST.ID;
                  item.OC_B_RETURN_ORDER_ITEM_ID =
                    data.RETURN_ORDER_ITEM_LIST.ID;

                  em.PS_C_SKU_ECODE_ACTUAL =
                    data.RETURN_ORDER_ITEM_LIST.PS_C_SKU_ECODE;
                  item.PS_C_SKU_ECODE_ACTUAL =
                    data.RETURN_ORDER_ITEM_LIST.PS_C_SKU_ECODE;

                  em._checked = true;
                  item._checked = true; //判断是否新增的
                } else {
                  errArr.push({
                    index: item.index,
                    code: item.PS_C_SKU_ECODE,
                    message: $i18n.t('modalTips.hs'),
                    //"条码一致，请走手工匹配！"
                  });
                }
              } else {
                //判断明细suk是否相等 ---手工匹配
                if (this.fnisSku(item.PS_C_SKU_ECODE, data.PS_C_SKU_ECODE)) {
                  //

                  em.OC_B_RETURN_ORDER_BILL_NO = data.BILL_NO;
                  item.OC_B_RETURN_ORDER_BILL_NO = data.BILL_NO;

                  em.OC_B_RETURN_ORDER_BILL_NO_ID = data.ID;
                  item.OC_B_RETURN_ORDER_BILL_NO_ID = data.ID;

                  em._checked = true;
                  item._checked = true; //判断是否新增的
                } else {
                  errArr.push({
                    index: item.index,
                    code: item.PS_C_SKU_ECODE,
                    message: $i18n.t('modalTips.gu'),
                    //"没有匹配到退货单明细"
                  });
                }
              }
            }
          });
        });
      }
      this.modal6 = false;

      if (errArr.length > 0) {
        //执行错误提示
        this.fnerrtab(errArr, 1);
      }
    },
    fnerrtab(data, type) {
      let columns = [];
      let title = $i18n.t('modalTitle.a7'); //"提示框"
      if (type == 1) {
        //1表示手工和强制的错误信息 2表示清楚的错误信息
        columns = [
          {
            title: $i18n.t('modalTips.gx'), //"失败序号", // '提示信息',
            key: 'index',
          },
          {
            title: $i18n.t('modalTips.gy'), //"失败SKU", // '错误信息',
            key: 'code',
          },
          {
            title: $i18n.t('modalTips.gw'), // "失败原因！", // '错误信息',
            key: 'message',
          },
        ];
        title = $i18n.t('modalTitle.a9'); //"匹配失败提示框"
      } else {
        columns = [
          {
            title: $i18n.t('modalTips.gx'), //"失败序号", // '提示信息',
            key: 'index',
          },
          {
            title: $i18n.t('modalTips.gw'), //"失败原因！", // '错误信息',
            key: 'message',
          },
        ];
        title = $i18n.t('modalTitle.aa'); //"清除失败提示框"
      }

      this.$Modal.confirm({
        title,
        width: 500,
        titleAlign: 'left',
        mask: true,
        className: 'ark-dialog',
        render: (h) => {
          if (data) {
            return h('Table', {
              props: {
                columns,
                data: data,
              },
            });
          }
          return false;
        },
      });
    },
    // 选中某一项时触发
    onSelect(v) {
      this.tebdata = v;
    },
    // 取消选中某一项时触发
    onSelectCancel(v) {
      this.tebdata = v;
    },
    // 点击全选时触发
    onSelectAll(v) {
      console.log(v);
      this.tebdata = v;
    },
    // 点击取消全选时触发
    onSelectAllCancel(v) {
      this.tebdata = v;
    },
    // 单击某一行时触发
    onRowClick(row) {
      console.log(row);
      this.skuEcodes = row.skuEcode;
      this.onRowData = row;
    },
    // 单击某二行时触发
    onRowDblclick() {},
    // 分页change 事件
    pageChange(val) {
      console.log(val);
      this.tableConfig.current = val;
      this.searchGift();
    },
    // 切换分页条数
    pageSizeChange(val) {
      console.log(val);
      this.tableConfig.pageSize = val;
      this.searchGift();
    },
    tableDeleteDetail() {},
  },
  beforeDestroy() {
    window.removeEventListener('customizeClick', this.Save);
  },
};
</script>

<style lang="less"></style>
