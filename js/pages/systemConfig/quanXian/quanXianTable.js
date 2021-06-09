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
  },
  data() {
    return {
      vmI18n: $i18n,
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
    refreshTable() {
      this.$refs.scrollTable.scrollTop = 0;
    },
    setTableHeight() {
      const contentHeight = document.getElementsByClassName(
        'SearchForm_Table'
      )[0].clientHeight;
      const scrollTableHeight = contentHeight - 200;
      this.scrollTableHeight.height = `${scrollTableHeight}px`;
    },
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
      } else if (column.key === 'IS_READ') {
        this.tableArr.isReadValue = val;
        if (!val) {
          this.tableArr.isWriteValue = val;
          this.tableArr.isWriteValueTotal = 0;
          this.tableArr.isReadValueTotal = 0;
        } else {
          this.tableArr.isReadValueTotal = this.rows.length;
        }
      }

      setTimeout(() => {
        if (column.key === 'IS_WRITE') {
          this.rows.forEach((item) => {
            item.IS_WRITE = val;
            if (val && item.IS_READ !== val) {
              item.IS_READ = val;
            }
          });
        } else if (column.key === 'IS_READ') {
          this.rows.forEach((item) => {
            item.IS_READ = val;
            if (!val && item.IS_WRITE !== val) {
              item.IS_WRITE = val;
            }
          });
        }
        this.$forceUpdate();
      }, 0);
    },
    rowCheckboxChange(val, rowIndex, column) {
      this.$emit('isChangeFun', true);
      if (column.key === 'IS_WRITE') {
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
      }
      if (column.key === 'IS_READ') {
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
      }
      this.tableArr.isReadValue = this.tableArr.isReadValueTotal === this.rows.length;
      this.tableArr.isWriteValue = this.tableArr.isWriteValueTotal === this.rows.length;
    },
  },
};
