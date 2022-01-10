<template>
  <div class="cus-modal" v-loading="loading">
    <!-- <OmsForm :form-config="formConfig" /> -->
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <!-- 修改聚合仓-->
        <label for>修改聚合仓:</label>
        <DropDownSelectFilter
          :single="true"
          isBackRowItem
          :data="ShareStores.data"
          :z-index="zIndex"
          :total-row-count="ShareStores.totalRowCount"
          :page-size="pageSize"
          :show-colname-key="'show'"
          :data-empty-message="dataEmptyMessage"
          :columns="columns"
          :hidecolumns="hidecolumns"
          @on-page-change="(val) => changePage('ShareStores', val)"
          @on-fkrp-selected="(val) => onFkrpSelected('ShareStores', val)"
        />
      </div>
      <div class="Modal-Form-Item">
        <!-- 修改仓库-->
        <label for>{{ vmI18n.t("btn.modifyWarehouse") }}:</label>
        <DropDownSelectFilter
          :single="true"
          isBackRowItem
          :data="PhyWarehouseStores.data"
          :z-index="zIndex"
          :total-row-count="PhyWarehouseStores.totalRowCount"
          :page-size="pageSize"
          :show-colname-key="'show'"
          :data-empty-message="dataEmptyMessage"
          :columns="columns"
          :hidecolumns="hidecolumns"
          @on-page-change="(val) => changePage('PhyWarehouseStores', val)"
          @on-fkrp-selected="(val) => onFkrpSelected('PhyWarehouseStores', val)"
        />
      </div>
      <div class="Modal-Form-Item">
        <!-- 修改仓库-->
        <label for>{{ vmI18n.t("fL.changeWarehouse_reasons") }}:</label>
        <Select v-model="updateRemark">
          <Option
            v-for="item in updateRemarkOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>
    </div>
    <OmsButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>

<script>
import listeningToKeydownMixin from "@/assets/js/mixins/listeningToKeydown.js";

const changeWarehouse = {
  mixins: [listeningToKeydownMixin],
  components: {},
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      loading: false,
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      pageNum: 1,
      dataEmptyMessage: "数据加载中...", // 无数据的提示
      columns: ["ename"], // 展现的组
      AutoData: [],
      hidecolumns: ["id"],
      foreignKeyLink: {},
      ShareStores: {
        data: {},
        totalRowCount: 0
      },
      PhyWarehouseStores: {
        data: {},
        totalRowCount: 0
      },
      pid: "",
      updateRemark: "",
      updateRemarkOptions: [
        {
          label: $it("other.originalWarehouseOutOfStock_change"), // '原仓缺货改仓',
          value: $it("other.originalWarehouseOutOfStock_change"),
        },
        {
          label: $it("other.sysWrongJudgment_change"), // '系统错判改仓',
          value: $it("other.sysWrongJudgment_change"),
        },
        {
          label: $it("other.sysWrongJudgment_change"), // '新增仓库改仓',
          value: $it("other.newWarehouse_change"),
        },
      ],
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $it("com.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $it("com.determine"), // 确定
            type: 'primary',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine(false);
            }, // 按钮点击事件
          },
        ],
      },
      formValue: {
        shareStoresId: '', // 逻辑仓
        shareStoresEcode: '',
        warehouseId: '', // 实体仓
        warehouseEcode: ''
      },
      formConfig: {
        formData: [
          {
            version: '1.3',
            style: "popInput",
            width: "24",
            colname: "CP_C_PHY_WAREHOUSE_ID",
            inputList: [
              {
                colname: "CP_C_SHOP_ID",
                refobjid: "46",
                valuedata: "_",
                name: "店铺",
              },
            ],
            itemdata: {
              serviceId: 'r3-cp',
              colid: 171251,
              colname: "CP_C_PHY_WAREHOUSE_ID",
              name: "仓库名称",
              valuedata: "",
              pid: "",
              fkdisplay: "drp",
              isfk: true,
              isnotnull: true,
              readonly: false,
              refcolval: {
                fixcolumn: "CP_C_SHOP_ID", // 根据什么查，根据什么字段过滤，根据'店铺'过滤仓库
                expre: "equal",
                srccol: "CP_C_PHY_WAREHOUSE_ID", // 要查什么
              },
            },
            oneObj: (val) => {
              const _this = this;
              // if (!val.pid) return;
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = val.pid;
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME =
                val.valuedata;
            },
          },
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: "", // 发货仓库，Y
          CP_C_PHY_WAREHOUSE_ENAME: "",
        },
      },
    };
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    /* this.$nextTick(() => {
      const _this = this;
      console.log("this.componentData::", _this.componentData);
      if (!_this.componentData.CP_C_SHOP_ID) {
        _this.$Message.warning("no CP_C_SHOP_ID ！");
      }
      _this.querItem("CP_C_PHY_WAREHOUSE_ID").inputList = [
        {
          childs: [
            {
              colname: "CP_C_PHY_WAREHOUSE_ID",
              refobjid: _this.componentData.CP_C_SHOP_ID || "",
              valuedata: _this.componentData.CP_C_SHOP_ENAME || "_",
            },
          ],
        },
      ];
    }); */
    this.zIndex = Number(
      document.getElementsByClassName('ark-modal-wrap')[0].style.zIndex
    ) + 50;
    document.addEventListener('keydown', this.onKeyDown);
    this.getWarehouseList('ShareStores')
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: 'testModal',
        };
      }
      if (e.keyCode == 13) {
        this.determine(false);
      }
    },
    async determine(isOutOfStockFlag) {
      const self = this;
      if (!self.formValue.warehouseId) {
        self.$Message.warning({
          content: $it('tip.zi'), // 请选择仓库
          duration: 5,
          top: 80,
        });
        return false;
      }
      self.isShowFromLoading = true;
      const { shareStoresId, shareStoresEcode, warehouseId, warehouseEcode } = self.formValue
      const fromdata = new FormData();
      fromdata.append('ids', self.componentData.ids);
      fromdata.append('shareStoresId', shareStoresId);
      fromdata.append('shareStoresEcode', shareStoresEcode);
      fromdata.append('warehouseId', warehouseId);
      fromdata.append('warehouseEcode', warehouseEcode);
      fromdata.append('isOutOfStockFlag ', isOutOfStockFlag);
      fromdata.append('updateRemark', self.updateRemark);
      const { data: { data, code, message } } = await self.service.orderCenter.updateWarehouse(fromdata);
      self.isShowFromLoading = false;
      if (code === 0) {
        if (self.$route.params.customizedModuleId == 2627) {
          self.$parent.$parent.$parent.getData();
          if (!data) {
            self.$Message.success(message);
            self.$parent.$parent.closeConfirm();
            self.$parent.$parent.$parent.selection = [];
          } else {
            const isOutOfStockFlag = false; // 由于830不上，所以默认为false，暂注释上面的处理逻辑，之后要加，打开注释即可。
            if (isOutOfStockFlag) {
              self.$Modal.confirm({
                title: $it('mT.tips'), // 提示
                render: h => h('div', {}, [
                  h(
                    'p',
                    {
                      style: {
                        padding: '10px 15px 10px 0px',
                      },
                    },
                    message
                  ),
                  h('Table', {
                    props: {
                      'disabled-hover': true,
                      'highlight-row': false,
                      'no-data-text': $it('other.noDataAvailable'), // 暂无数据
                      columns: data.columns,
                      data: data.prompt_data,
                    },
                  }),
                ]),
                cancelType: true,
                showCancel: true,
                titleAlign: 'left',
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.determine(true);
                },
                onCancel: () => {
                  self.$parent.$parent.closeConfirm();
                },
              });
            } else {
              self.$Modal.error({
                className: 'ark-dialog',
                title: $it('mT.tips'), // 提示
                render: h => h('div', {}, [
                  h(
                    'p',
                    {
                      style: {
                        padding: '10px 15px 10px 0px',
                      },
                    },
                    message
                  ),
                  h('Table', {
                    props: {
                      'disabled-hover': true,
                      'highlight-row': false,
                      'no-data-text': $it('other.noDataAvailable'), // 暂无数据
                      columns: data.columns,
                      data: data.prompt_data,
                    },
                  }),
                ]),
                cancelType: true,
                titleAlign: 'left',
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.$parent.$parent.closeConfirm();
                },
                keyDown: (event) => {
                  if (event.keyCode == 27) {
                    self.$parent.$parent.closeConfirm();
                  } else if (event.keyCode == 13) {
                    self.$parent.$parent.closeConfirm();
                  }
                },
              });
            }
          }
        } else {
          // self.$parent.$parent.$parent.load();
          self.$Message.success(message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.load();
        }
      } else if (code === -1 && !data) {
        self.$Message.error(message);
      } else {
        self.$Modal.error({
          className: 'ark-dialog',
          title: $it('mT.tips'), // 提示
          render: h => h('div', {}, [
            h(
              'p',
              {
                style: {
                  padding: '10px 15px 10px 0px',
                },
              },
              message
            ),
            h('Table', {
              props: {
                'disabled-hover': true,
                'highlight-row': false,
                // "no-data-text": "暂无数据",
                'no-data-text': $it('other.noDataAvailable'),
                columns: data.columns,
                data: data.prompt_data,
              },
            }),
          ]),
          cancelType: true,
          titleAlign: 'left',
          mask: true,
          width: 500,
          draggable: true,
        });
      }
    },
    /**
     * 查询聚合仓、实体仓
     * @param {*} storeKey 仓库
     * @param {*} keyword 模糊搜索关键字
     */
    async getWarehouseList(storeKey, keyword) {
      const self = this;
      const params = {
        shopId: self.componentData.shopId,
        skuIdList: self.componentData.skuIdList,
        sgCShareStoreId: self.formValue.shareStoresId, // 聚合仓查询聚合仓不需要传，查询实体仓时要有值
        includePhyStorage: storeKey == 'PhyWarehouseStores', // false 查询聚合仓 true 查询实体仓
        pageNum: self.pageNum,
        pageSize: 10
      };
      const { data: { code, data } } = await self.service.orderCenter.queryOmsShopStorage(params);
      if (code != 0 || !(storeKey in data)) return
      let result = data[storeKey].map(i => {
        return {
          ecode: { val: i.ecode },
          ename: { val: i.ename },
          ID: { val: i.id }
        }
      });
      this[storeKey].data = {
        start: 0,
        tabth: [
          {
            colname: 'ID',
            name: 'ID',
            show: false,
          },
          {
            colname: 'ename',
            name: $it('tL.deliveryWarehouse_name'), // 发货仓库名称
            show: true,
          },
          {
            colname: 'ecode',
            name: $it('tL.deliveryWarehouse_code'), // 发货仓库编码
            show: false,
          },
        ],
        row: result,
      }
      this[storeKey].totalRowCount = data.count
    },
    // 分页请求数据
    changePage(storeKey, value) {
      this.pageNum = value;
      this.getWarehouseList(storeKey)
    },
    onFkrpSelected(storeKey, val) {
      const { ID, ecode } = val[0].rowItem
      if (storeKey == 'ShareStores') {
        this.formValue.shareStoresId = ID.val
        this.formValue.shareStoresEcode = ecode.val
        document.getElementsByClassName('ark-input')[3].value = ""; //当修改聚合仓重新修改，需要清除修改仓库的值
        this.formValue.warehouseId = '';
        this.formValue.warehouseEcode = '';
        this.getWarehouseList('PhyWarehouseStores')
      } else {
        this.formValue.warehouseId = ID.val
        this.formValue.warehouseEcode = ecode.val
      }
    },
  },
};
export default changeWarehouse
</script>

<style scoped lang='less'>
.semiCustomModal {
  min-height: 100px;
}
</style>
