export default {
  data() {
    return {
      normal: {
        // 正常
        buttons: [
          {
            text: $it('btn.save'), // 保存
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
            text: $it('btn.refresh'), // 刷新
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
      self.searchFormConfig.defaultconfig.map(item => {
        if (item.item.value) {
          obj[item.item.field] = item.item.value;
        }
        item.item.props.value = [];
        return true;
      });
      this.searchCondition = obj;
      this.dataindex = 1;
      self.getTableData(true);
      this.isChange = false;
    },
    async saveQuanXian() {
      // 处理增量更新的数据
      this.getSaveData();
      console.log(this.saveTableArr);
      
      let fullUpdate = this.isFullUpdate;
      if (!fullUpdate.IS_READ.flag && !fullUpdate.IS_WRITE.flag && !this.saveTableArr.length) {
        this.$Message.info('没有更改');
        return;
      }

      let url;
      let params;
      if (this.permissionType === 'sensitive') {
        this.saveTableArr.map(item => {
          item.CP_C_GROUPS_ID = this.groupId;
          return true;
        });
        url = '/p/cs/objectSave';
        params = {
          table: 'CP_C_GROUPCOLUMN',
          objid: 2997,
          data: {
            CP_C_GROUPS_ID: this.groupId,
            CP_C_GROUPCOLUMN: this.saveTableArr
          }
        };
      } else {
        url = '/p/cs/permission/v1/saveDataPermission';
        params = {
          permissionType: this.permissionType,
          objid: this.groupId,
          data: {
            permissionType: this.permissionType,
            groupId: this.groupId,
            searchCondition: this.searchCondition,
            fullUpdate // 全量更新
          }
        };
        
        // 增量更新
        this.saveTableArr.length && (params.data[`${this.permissionTable}`] = this.saveTableArr)
      }

      this.spinShow = true;
      // 接口
      const res = await this.service.systemConfig.objectSave(url, this.$urlSearchParams(params));
      if (res) {
        this.spinShow = false;
        this.$Modal.fcSuccess({
          title: '成功',
          content: res.data.message
        });
        this.dataindex = 1;
        this.getTableData();
        this.$refs.quanXianTable.refreshTable();
        this.isChange = false;
      }
    },
    /**
     * 数据更新
     * allRead 【查看】全量更新
     * allWrite 【制单】全量更新
     * incr 增量更新
     * @param {*} flag 全量/增量标识，不同标识对应不同判断条件conds[flag]
     * @param {*} item 当前行
     * @param {*} index 当前行索引
     */
    rowModifyData(flag, item, index) {
      const { ID, IS_READ, IS_WRITE } = this.oldTableArr.rows[index] || {};
      const conds = {
        allRead: item.IS_WRITE !== IS_WRITE,
        allWrite: item.IS_READ !== IS_READ,
        incr: item.IS_READ !== IS_READ || item.IS_WRITE !== IS_WRITE
      }
      if (item.ID === null || (item.ID === ID && conds[flag])) {
        const saveTableItem = {
          IS_READ: item.IS_READ ? 'Y' : 'N',
          IS_WRITE: item.IS_WRITE ? 'Y' : 'N',
          ID: item.ID === null ? -1 : item.ID,
          GROUPS_ID: item.GROUPS_ID ? item.GROUPS_ID : this.groupId
        };
        saveTableItem[`${this.permissionKeyColumn}`] = item[this.permissionKeyColumn];
        this.saveTableArr.push(saveTableItem);
      }
    },
    getSaveData() {
      this.saveTableArr = [];
      if (this.permissionType === 'sensitive') {
        this.tableArr.rows.forEach((item, index) => {
          const { ID, IS_READ, IS_WRITE } = this.oldTableArr.rows[index] || {};
          if (item.ID === null || (item.ID === ID && (item.IS_READ !== IS_READ || item.IS_WRITE !== IS_WRITE))) {
            this.saveTableArr.push({
              ISREAD: item.IS_READ ? 'Y' : 'N',
              ISMODIFY: item.IS_WRITE ? 'Y' : 'N',
              CP_C_COLUMN_ID: item.CP_C_COLUMN_ID,
              ID: item.ID === null ? -1 : item.ID,
              CP_C_GROUPS_ID: item.CP_C_GROUPS_ID
            });
          }
        });
      } else {
        const { IS_READ, IS_WRITE } = this.isFullUpdate;
        let isReadFullUpdate = IS_READ.flag;
        let isWriteFullUpdate = IS_WRITE.flag;
        console.log(this.tableArr.rows);
        if (!this.tableArr.theadChange) { //【制单】【查看】增量更新
          this.tableArr.rows.forEach((item, index) => {
            this.rowModifyData('incr', item, index)
          })
        } else if (this.tableArr.theadChange && (!isWriteFullUpdate || !isReadFullUpdate)) {
          this.tableArr.rows.forEach((item, index) => {
            this.rowModifyData('incr', item, index)
          })
        } else {
          if (isWriteFullUpdate && isReadFullUpdate) { //【制单】【查看】全量更新
            this.saveTableArr = [];
          } else {
            if (isReadFullUpdate) { //【查看】全量更新
              this.tableArr.rows.forEach((item, index) => {
                this.rowModifyData('allRead', item, index)
              });
            }
            if (isWriteFullUpdate) { //【制单】全量更新
              this.tableArr.rows.forEach((item, index) => {
                this.rowModifyData('allWrite', item, index)
              });
            }
          }
        }
      }
    } // 获得保存的数据
  }
};
