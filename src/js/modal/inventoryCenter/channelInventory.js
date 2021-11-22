export default {
  components: {},
  data() {
    return {
      is_click: false,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            } // 按钮点击事件
          }
        ]
      },
    };
  },
  computed: {
    allFormData() {
      return this.$store.state[`S.${this.$route.params.tableName}.${this.$route.params.tableId}`].formItems.data;
    },
    // 由原来的title替换为webname（优化中文匹配）
    webname() {
      return this.$parent.$parent.objTabActionDialogConfig.webname;
    }
  },
  mounted() {
    console.log(this.$store.state[`S.${this.$route.params.tableName}.${this.$route.params.tableId}`]);
  },
  methods: {
    determine() {
      const self = this;
      if (self.is_click) {
        return false;
      }
      let url = '/p/cs/storage/manualCalcAndSynchChannelProduct';
      if (!this.allFormData.CP_C_SHOP_ID && !this.allFormData.SKU_ID && !this.allFormData.PS_C_SKU_ECODE && !this.allFormData.NUMIID && !this.allFormData.PS_C_PRO_ECODE && !(this.allFormData.STATUS && this.allFormData.STATUS.length) && !(this.allFormData.SYNC_STATUS && this.allFormData.SYNC_STATUS.length) && !this.allFormData.SYNC_FAILED_REASON) {
        this.$Message.warning('查询条件【平台店铺、平台条码ID、平台商品ID、条码编码、商品编码、商品状态、同步状态、同步失败原因】至少选择一个！');
        return;
      }
      // 库存按查询条件同步
      // if (self.$parent.title === $i18n.t('modalTitle.z0')) url = '/p/cs/storage/manualSynchChannelStorageByQuery';
      // // 商品按查询条件同步
      // else if (self.$parent.title === $i18n.t('modalTitle.z1')) url = '/p/cs/storage/manualCalcAndSynchChannelProduct';
      // let paramsObj = self.$parent.$parent.formObj.fixedcolumns;
      // 获取搜索form表单的对象
      const param = {};
      param.cpCShopIdList = this.allFormData.CP_C_SHOP_ID; // 平台店铺
      param.skuId = this.allFormData.SKU_ID;// 平台SKUID
      param.psCSkuEcode = this.allFormData.PS_C_SKU_ECODE;// 条码编码
      param.psCProEcode = this.allFormData.PS_C_PRO_ECODE;// 商品编码(条码编码)
      param.numiid = this.allFormData.NUMIID;// 平台商品id
      param.cpCPlatformIdList = [];
      param.statusList = this.allFormData.STATUS; // 商品状态
      param.syncStatusList = this.allFormData.SYNC_STATUS; // 同步状态
      param.syncFailedReason = this.allFormData.SYNC_FAILED_REASON ? [this.allFormData.SYNC_FAILED_REASON] : []; // 同步失败原因 PS:后端存在多条失败原因,故改为数组格式
      if (this.allFormData.CP_C_PLATFORM_ID) { // 平台类型
        this.allFormData.CP_C_PLATFORM_ID.forEach((item) => {
          const obj = item.toString();
          param.cpCPlatformIdList.push(obj);
        });
      }
      self.is_click = true;
      // 按筛选条件手工同步到页面
      if (this.webname == 'manualCalcSyncPageChannelProduct') {
        url = '/p/cs/storage/manualCalcSyncPageChannelProduct';
      }
      R3.network.post(url, param).then((res) => {
        if (res.data.code === 0) {
          self.$emit('closeActionDialog');
          self.$Message.success(res.data.message);
        } else {
          self.is_click = false;
          self.$emit('closeActionDialog');
          // self.$Message.error(res.data.message);
        }
      });
    }
  }
};
