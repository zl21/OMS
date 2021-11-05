<template>
  <div class="batchModify customized-modal">
    <p>已选中批量修改记录数: {{ idArray.length }}条</p>
    <div class="body">
      <div class="title">
        <p>订单正向:</p>
        <p>订单逆向:</p>
        <p>平台特殊:</p>
      </div>
      <div class="batch_form">
        <OmsForm :form-config="formConfig" />
      </div>
    </div>
    <div class="batch_button">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <Modal v-model="modal" :mask="true" @on-ok="determine">
      <p>未勾选记录,将批量更新所有查询结果(共计{{ idArray.length }}行,是否确定继续操作</p>
    </Modal>
  </div>
</template>

<script>
import { OmsForm } from 'burgeonComponents';
import { OmsButton } from 'burgeonComponents'

export default {
  components: {
    businessForm,
    businessButton
  },
  props: {
    idArray: {
      type: Array,
      default: []
    }
  },
  async mounted() {
    //   this.formConfig.formData = await this.$OMS2.omsUtils.getTypeList('ST_C_SHOP_STRATEGY', ['INVENTORY_MODE_STATUS'], '订单正向', this.formConfig);
  },
  data() {
    return {
      vmI18n: $i18n,
      modal: false,
      formConfig: {
        formData: [
          {
            colname: 'DEFAULT_SPARE_CP_C_STORE_ID',
            style: 'popInput',
            version: '1.4',
            isActive: true,
            width: 8,
            itemdata: {
              colid: 171494,
              colname: 'DEFAULT_SPARE_CP_C_STORE_ID',
              fkdisplay: 'drp',
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '默认发货逻辑仓',
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: '',
              valuedata: '',
            },
            oneObj: (val) => {
              console.log(val);
              this.formConfig.formValue.DEFAULT_SPARE_CP_C_STORE_ID = val.pid;
            }
          },
          {
            colname: 'INVENTORY_MODE_STATUS',
            style: 'select',
            width: 8,
            value: 'INVENTORY_MODE_STATUS',
            label: '占库存方法',
            options: [
              {
                label: '整单占',
                value: '1'
              },
              {
                label: '部分占',
                value: '2'
              }
            ]
          },
          {
            colname: 'ORDER_URL_SCHEME_TYPE',
            style: 'select',
            width: 8,
            value: 'ORDER_URL_SCHEME_TYPE',
            label: '订单路由方案',
            options: [
              {
                label: '就近判断',
                value: '1'
              },
              {
                label: '就全+就近判断',
                value: '2'
              }
            ]
          },
          {
            colname: 'IS_AUTO_SPLIT',
            style: 'checkbox',
            width: 8,
            value: 'IS_AUTO_SPLIT',
            label: '缺货自动拆单'
          },
          {
            colname: 'CP_C_WAREHOUSE_DEF_ID',
            style: 'popInput',
            version: '1.4',
            isActive: true,
            width: 8,
            itemdata: {
              colid: 169224,
              colname: 'CP_C_WAREHOUSE_DEF_ID',
              fkdisplay: 'drp',
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '默认退货实体仓',
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: '',
              valuedata: '',
            },
            oneObj: (val) => {
              console.log(val);
              this.formConfig.formValue.CP_C_WAREHOUSE_DEF_ID = val.pid;
            }
          },
          {
            colname: 'IS_AG',
            style: 'checkbox',
            width: 8,
            value: 'IS_AG',
            label: '启用GA(SA)'
          },
          {
            colname: 'CONSIGN_SELL_CP_C_STORE_ID',
            style: 'popInput',
            version: '1.4',
            isActive: true,
            width: 8,
            itemdata: {
              colid: 171231,
              colname: 'CONSIGN_SELL_CP_C_STORE_ID',
              fkdisplay: 'drp',
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: '寄售逻辑仓',
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: '',
              valuedata: '',
            },
            oneObj: (val) => {
              console.log(val);
              this.formConfig.formValue.CONSIGN_SELL_CP_C_STORE_ID = val.pid;
            }
          },
          {
            colname: 'SEPARATE_WAREHOUSE_MODE',
            style: 'select',
            width: 8,
            value: 'SEPARATE_WAREHOUSE_MODE',
            label: '分仓模式',
            options: [
              {
                label: '按仓库库存就全',
                value: '1'
              },
              {
                label: '按仓库优先级',
                value: '2'
              }
            ]
          },
          {
            colname: 'AUTO_RELEASE_TIME',
            style: 'input',
            width: 8,
            value: 'AUTO_RELEASE_TIME',
            label: '时效单释放时长'
          }
        ],
        formValue: {
          DEFAULT_SPARE_CP_C_STORE_ID: '', // 默认发货逻辑仓
          INVENTORY_MODE_STATUS: '', // 占库存方法
          IS_AUTO_SPLIT: '', // 缺货自动占单
          ORDER_URL_SCHEME_TYPE:'',//订单路由方案
          CP_C_WAREHOUSE_DEF_ID: '', // 默认退货实体仓
          IS_AG: '', // 启用AG(SA)
          SEPARATE_WAREHOUSE_MODE: '', // 分仓模式
          CONSIGN_SELL_CP_C_STORE_ID: '', // 寄售逻辑仓
          AUTO_RELEASE_TIME: '', // 时效单释放时长
        }
      },
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消,
            btnclick: () => {
              this.$parent.close();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.save();
            },
          },
        ]
      }
    };
  },
  methods: {
    save() {
      const self = this;
      // 提醒数据全量
      if (self.idArray.length) {
        self.determine();
      } else {
        self.modal = true;
      }
    },
    determine() {
      const self = this;
      let data = {};
      let ST_C_SHOP_STRATEGY = {};
      let modifyData = self.formConfig.formValue;

      console.log(self.formConfig.formValue);
      for (const key in modifyData) {
        if (modifyData[key]) {

          ST_C_SHOP_STRATEGY[key] = modifyData[key];
        }
      }
      if (JSON.stringify(ST_C_SHOP_STRATEGY) == '{}') {
        self.$OMS2.omsUtils.msgTips(self, 'warning', '未修改任何参数!', 0);
        return;
      }
      // if (data.IS_AUTO_SPLIT) {
      //   data.IS_AUTO_SPLIT = "Y"
      // }
      // data.IS_AUTO_SPLIT = (data.IS_AUTO_SPLIT?"Y":"N")
      ST_C_SHOP_STRATEGY.IS_AG = ST_C_SHOP_STRATEGY.IS_AG ? "1" : "0"
      ST_C_SHOP_STRATEGY.IS_AUTO_SPLIT = ST_C_SHOP_STRATEGY.IS_AUTO_SPLIT ? "Y" : "N"
      data.ST_C_SHOP_STRATEGY = ST_C_SHOP_STRATEGY

      data.IDS = self.idArray;
      self.service.strategyPlatform.batchSave(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          this.$parent.close();
        } else {
          let data = res.data.data;
          self.$Modal.confirm({
            title: res.data.message,
            width: 500,
            mask: true,
            render: h => {
              if (data) {
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title: $i18n.t('modalTitle.a6'), // '提示信息',
                        key: 'message'
                      }
                    ],
                    data
                  }
                });
              }
              return false;
            }
          });
          self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.batchModify {
  width: 800px;
  .body {
    display: flex;
    .batch_form {
      flex: 0.9;
    }
    .title {
      flex: 0.1;
      p {
        font-weight: 600;
        text-align: right;
        margin-top: 12px;
        line-height: 31px;
        height: 31px;
      }
    }
  }
}
</style>
