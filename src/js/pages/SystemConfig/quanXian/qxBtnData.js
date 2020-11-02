export default {
  data() {
    return {
      normal: { // 正常
        buttons: [{
            text: '保存',
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
        ],
      },
    };
  },
  methods: {
    refresh() {
      this.$refs.quanXianTable.refreshTable();
      let self = this;
      let obj = {};
      console.log(self.searchFormConfig.defaultconfig);
      self.searchFormConfig.defaultconfig.map(item => {
        if (item.item.value) {
          obj[item.item.field] = item.item.value;
        }
      });
      self.getTableData(obj, true);
      this.isChange = false;
    },
    async saveQuanXian() {
      this.getSaveData();
      if (this.saveTableArr.length === 0) {
        this.$Message.info('没有更改');
        return;
      };

      let url, params;
      if (this.permissionType === "sensitive") {
        this.saveTableArr.map(item => item.CP_C_GROUPS_ID = this.groupId);
        // console.log(this.saveTableArr);
        url = '/p/cs/objectSave';
        params = {
          table: 'CP_C_GROUPCOLUMN',
          objid: 2997,
          data: {
            "CP_C_GROUPS_ID": this.groupId,
            "CP_C_GROUPCOLUMN": this.saveTableArr
          }
        };
      } else {
        url = '/p/cs/permission/v1/saveDataPermission';
        params = {
          permissionType: this.permissionType,
          objid: this.groupId,
          data: {}
        };
        params.data[`${this.permissionTable}`] = this.saveTableArr;
      }
      this.spinShow = true;
      // 接口
      const res = await this.service.systemConfig.objectSave(url,urlSearchParams(params))
      if(res){
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
      if (this.permissionType === "sensitive") {
        this.tableArr.rows.forEach((item, index) => {
          if (item.ID === null || (item.ID === this.oldTableArr[index].ID &&
              (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
            this.saveTableArr.push({
              ISREAD: item.IS_READ ? "Y" : "N",
              ISMODIFY: item.IS_WRITE ? "Y" : "N",
              CP_C_COLUMN_ID: item.CP_C_COLUMN_ID,
              ID: item.ID === null ? -1 : item.ID,
              CP_C_GROUPS_ID: item.CP_C_GROUPS_ID,
            })
          }
        });
      } else {
        this.tableArr.rows.forEach((item, index) => {
          if (item.ID === null || (item.ID === this.oldTableArr[index].ID &&
              (item.IS_READ !== this.oldTableArr[index].IS_READ || item.IS_WRITE !== this.oldTableArr[index].IS_WRITE))) {
            let saveTableItem = {
              IS_READ: item.IS_READ ? "Y" : "N",
              IS_WRITE: item.IS_WRITE ? "Y" : "N",
              ID: item.ID === null ? -1 : item.ID,
              GROUPS_ID: item.GROUPS_ID ? item.GROUPS_ID : this.groupId,
            };
            saveTableItem[`${this.permissionKeyColumn}`] = item[this.permissionKeyColumn];
            this.saveTableArr.push(saveTableItem)
          }
        });
      }
    }, // 获得保存的数据
    copyQuanXian() {},
    refreshQuanXian() {},

  }
};