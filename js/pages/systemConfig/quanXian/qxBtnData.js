export default {
  data() {
    return {
      vmI18n: $i18n,
      normal: {
        // 正常
        buttons: [
          {
            text: $i18n.t('btn.save'), // 保存
            icon: '',
            btnClick: () => {
              this.saveQuanXian();
            }
          },
          // {
          //   text: '复制',
          //   icon: '',
          //   btnClick: () => {
          //     this.copyModal = true;
          //   }
          // },
          {
            text: '刷新',
            icon: '',
            btnClick: () => {
              this.refresh();
            }
          }
        ]
      }
    };
  },
  methods: {
    refresh() {
      this.$refs.quanXianTable.refreshTable();
      const self = this;
      const obj = {};
      console.log(self.searchFormConfig.defaultconfig);
      self.searchFormConfig.defaultconfig.map(item => {
        if (item.item.value) {
          obj[item.item.field] = item.item.value;
        }
        return true;
      });
      self.getTableData(obj, true);
      this.isChange = false;
    },
    async saveQuanXian() {

      this.getSaveData();
      if (this.saveTableArr.length === 0) {
        this.$Message.info('没有更改');
        return;
      }

      let url;
      let params;
  
      url = '/p/cs/permission/v1/saveDataPermission';

      let permissionTable = this.permissionTable
      let Arrdata = this.saveTableArr

      let formdata = new FormData()
      formdata.append("permissionType", this.permissionType)
      formdata.append("groupId", this.groupId)
      formdata.append("data", JSON.stringify({
        [permissionTable]: Arrdata
      }))

      this.spinShow = true;
      // 接口
      const res = await this.service.systemConfig.objectSave(url, formdata);
      this.spinShow =false
      if (res) {
        this.spinShow = false;
        this.$Modal.fcSuccess({
          title: '成功',
          content: res.data.message
        });
        this.getTableData();
        this.isChange = false;
      }
      // this.$network.post(url, this.$urlSearchParams(params))
      //   .then((res) => {
      //     this.spinShow = false;
      //     this.$Modal.fcSuccess({
      //       title: '成功',
      //       content: res.data.message
      //     });
      //     this.getTableData();
      //     this.isChange = false;
      //   });
    },
    getSaveData() {
  
      this.saveTableArr = [];

      // if (this.permissionType === 'sensitive') {
      //   this.tableArr.rows.forEach((item, index) => {
      //     if (item.ID === null || (item.ID === this.oldTableArr[index].ID && (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
      //       this.saveTableArr.push({
      //         ISREAD: item.IS_READ ? 'Y' : 'N',
      //         ISMODIFY: item.IS_WRITE ? 'Y' : 'N',
      //         CP_C_COLUMN_ID: item.CP_C_COLUMN_ID,
      //         ID: item.ID === null ? -1 : item.ID,
      //         CP_C_GROUPS_ID: item.CP_C_GROUPS_ID
      //       });
      //     }
      //   });
      // } else {
      if (this.permissionType === 'brand') {
        this.tableArr.rows.forEach((item, index) => {
          if (item.ID === null || (item.ID === this.oldTableArr[index].ID && (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
            const saveTableItem = {
              IS_READ: item.IS_READ ? 'Y' : 'N',
              IS_WRITE: item.IS_WRITE ? 'Y' : 'N',
              ID: item.ID === null ? -1 : item.ID,
              PS_C_BRAND_ID: item.PS_C_BRAND_ID,
              GROUPS_ID: item.GROUPS_ID ? item.GROUPS_ID : this.groupId
            };
            saveTableItem[`${this.permissionKeyColumn}`] = item[this.permissionKeyColumn];
            this.saveTableArr.push(saveTableItem);
          }
        });
      } else if (this.permissionType === 'warehouse') {
        this.tableArr.rows.forEach((item, index) => {
          if (item.ID === null || (item.ID === this.oldTableArr[index].ID && (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
            const saveTableItem = {
              IS_READ: item.IS_READ ? 'Y' : 'N',
              IS_WRITE: item.IS_WRITE ? 'Y' : 'N',
              ID: item.ID === null ? -1 : item.ID,
              CP_C_WAREHOUSE_ID: item.CP_C_WAREHOUSE_ID,
              CP_C_WAREHOUSE_ECODE: item.CP_C_WAREHOUSE_ECODE,
              CP_C_WAREHOUSE_ENAME: item.CP_C_WAREHOUSE_ENAME,
              GROUPS_ID: item.GROUPS_ID ? item.GROUPS_ID : this.groupId
            };
            saveTableItem[`${this.permissionKeyColumn}`] = item[this.permissionKeyColumn];
            this.saveTableArr.push(saveTableItem);
          }
        });

      } else if (this.permissionType === 'saleschannel') {
        this.tableArr.rows.forEach((item, index) => {
          if (item.ID === null || (item.ID === this.oldTableArr[index].ID && (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
            const saveTableItem = {
              IS_READ: item.IS_READ ? 'Y' : 'N',
              IS_WRITE: item.IS_WRITE ? 'Y' : 'N',
              ID: item.ID === null ? -1 : item.ID,
              CP_C_SHOP_PERMISSION_ID:item.CP_C_SHOP_PERMISSION_ID,
              CP_C_SHOP_TITLE:item.CP_C_SHOP_TITLE,
              CP_C_PLATFORM_ID:item.CP_C_PLATFORM_ID,
              CP_C_PLATFORM_ECODE:item.CP_C_PLATFORM_ECODE,
              CP_C_PLATFORM_ENAME:item.CP_C_PLATFORM_ENAME,
              GROUPS_ID: item.GROUPS_ID ? item.GROUPS_ID : this.groupId
            };
            saveTableItem[`${this.permissionKeyColumn}`] = item[this.permissionKeyColumn];
            this.saveTableArr.push(saveTableItem);
          }
        });
      }

      //}
    }, // 获得保存的数据
    copyQuanXian() { },
    refreshQuanXian() { }
  }
};
