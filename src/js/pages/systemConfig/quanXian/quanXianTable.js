/**
 * 【查看】【制单】分别为以下权限：
 * 1️⃣仅查看❎✅
 * 2️⃣可制单可查看✅✅
 * 3️⃣不可制单不可查看❎❎
 */
 export default {
  props: {
    rows: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
    tableArr: {
      type: Object,
      default: () => ({}),
    },
    oldTableArr: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      scrollThead: {
        marginRight: '10px',
      },
      scrollTableHeight: {
        height: '',
      },
    };
  },
  mounted() {
    this.setTableHeight();
  },
  methods: {
    subRoleDisable(row, key) {
      return (row.PARENT_GROUPS_ID 
        && key === 'IS_READ'
        && (row.PARENT_IS_READ === 'N'
        || row.PARENT_ISREAD === 'N'))
        || (key === 'IS_WRITE'
        && (row.PARENT_IS_WRITE === 'N' || row.PARENT_ISMODIFY === 'N')
      )
    },
    handScroll(e){
      let domHeight = e.srcElement.clientHeight 
      let scrollHeight = e.srcElement.scrollHeight
      if (e.srcElement.scrollTop+domHeight==scrollHeight) {
        this.$emit("handScroll",e.srcElement.scrollTop)
      }
    },
    refreshTable() {
      this.$refs.scrollTable.scrollTop = 0;
      console.log(  this.$refs.scrollTable.scrollTop);
    },
    setTableHeight() {
      const contentHeight = document.getElementsByClassName(
        'SearchForm_Table'
      )[0].clientHeight;
      const scrollTableHeight = contentHeight - 200;
      this.scrollTableHeight.height = `${scrollTableHeight}px`;
    },
    /**
     * 权限规则：
     * 1、仅查看
     * 2、制单+查看（既能制单也能查看）
     * 3、无任何权限（既不能查看也不能制单）
     * @param {*} val 
     * @param {*} column 
     */
    theadCheckboxChange(val, column) {
      this.$emit('isChangeFun', true);
      if (column.key === 'IS_WRITE') {
        this.tableArr.isWriteValue = val;
        if (val) {
          this.tableArr.isReadValue = val;
          this.tableArr.isWriteValueTotal = this.rows.length;
          this.tableArr.isReadValueTotal = this.rows.length;
        } else {
          this.tableArr.isWriteValueTotal = 0;
        }
        this.tableArr.theadChange = { ...this.tableArr.theadChange, IS_WRITE: val };
      } else if (column.key === 'IS_READ') {
        this.tableArr.isReadValue = val;
        if (!val) {
          this.tableArr.isWriteValue = val;
          this.tableArr.isWriteValueTotal = 0;
          this.tableArr.isReadValueTotal = 0;
        } else {
          this.tableArr.isReadValueTotal = this.rows.length;
        }
        this.tableArr.theadChange = { ...this.tableArr.theadChange, IS_READ: val };
      }

      setTimeout(() => {
        if (column.key === 'IS_WRITE') {
          this.rows.forEach((item) => {
            /**
             * 全量勾选
             * 1. 父角色全部数据
             * 2. 子角色非禁用数据
             */
            if (!item.hasOwnProperty('PARENT_GROUPS_ID') 
              || (item.hasOwnProperty('PARENT_GROUPS_ID') 
              && !this.subRoleDisable(item, column.key))
            ) {
              item.IS_WRITE = val;
            };
            if (val && item.IS_READ !== val) {
              item.IS_READ = val;
            }
          });
        } else if (column.key === 'IS_READ') {
          this.rows.forEach((item) => {
            if (!item.hasOwnProperty('PARENT_GROUPS_ID') 
              || (item.hasOwnProperty('PARENT_GROUPS_ID') 
              && !this.subRoleDisable(item, column.key))
            ) {
              item.IS_READ = val;
            };
            if (!val && item.IS_WRITE !== val) {
              item.IS_WRITE = val;
            }
          });
        }
        this.$forceUpdate();
      }, 0);
    },
    /**
     * 判断增量操作前是否有全量操作
     * @param {*} key IS_WRITE 制单 IS_READ 查看
     * @param {*} val 
     * @param {*} rowIndex 
     * @returns 
     */
    hasFullUpdateValidate(key, val, rowIndex) {
      let flag = false;
      const { IS_READ, IS_WRITE } = this.$parent.isFullUpdate;
      if (IS_READ.flag || IS_WRITE.flag) {
        this.rows[rowIndex][key] = !val;
        flag = true;
      }
      this.$forceUpdate();
      flag && this.$Message.warning('请先保存当前数据，再进行后续操作!');
      return flag;
    },
    rowCheckboxChange(val, rowIndex, column) {
      this.$emit('isChangeFun', true);

      // 注意：备份，用于下面联动表头勾选状态更新
      let backupRow = JSON.parse(JSON.stringify(this.rows[rowIndex]));
      if (column.key === 'IS_WRITE') {
        setTimeout(() => {
          let valid = this.hasFullUpdateValidate('IS_WRITE', val, rowIndex);
          if (valid) return

          this.rows[rowIndex].IS_WRITE = val;
          if (val) {
            if (this.rows[rowIndex].IS_READ !== val) {
              this.rows[rowIndex].IS_READ = val;
              this.tableArr.isReadValueTotal++;
            }
            this.tableArr.isWriteValueTotal++;
          } else {
            this.tableArr.isWriteValueTotal--;
          }
          this.tableArr.isWriteValue = this.tableArr.isWriteValueTotal === this.oldTableArr.rows.length;
          /**
           * 操作增量【制单】时，表头【查看】勾选状态仅在联动时更新
           * 以下情况下会联动：2️⃣3️⃣
           */
          if ((!backupRow.IS_READ && !!val) || (backupRow.IS_READ && !val)) {
            this.tableArr.isReadValue = this.tableArr.isReadValueTotal === this.oldTableArr.rows.length;
          }
        }, 0);
      }
      if (column.key === 'IS_READ') {
        setTimeout(() => {
          let valid = this.hasFullUpdateValidate('IS_READ', val, rowIndex);
          if (valid) return

          this.rows[rowIndex].IS_READ = val;
          if (!val) {
            if (this.rows[rowIndex].IS_WRITE !== val) {
              this.rows[rowIndex].IS_WRITE = val;
              this.tableArr.isWriteValueTotal--;
            }
            this.tableArr.isReadValueTotal--;
          } else {
            this.tableArr.isReadValueTotal++;
          }

          this.tableArr.isReadValue = this.tableArr.isReadValueTotal === this.oldTableArr.rows.length;
          /**
           * 操作增量【查看】时，表头【制单】勾选状态仅在联动时更新
           * 以下情况下会联动：2️⃣
           */
          if (!val && backupRow.IS_WRITE) {
            this.tableArr.isWriteValue = this.tableArr.isWriteValueTotal === this.oldTableArr.rows.length;
          }
        }, 0);
      }
      console.log(this.tableArr);
    }
  },
};
