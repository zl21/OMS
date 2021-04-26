import TableSku from 'professionalComponents/tableSku';

export default {
  name: 'detailtable',
  components: {
    TableSku
  },
  props: {
    tColumns: {
      type: Array
    },
    tData: {
      type: Array
    },
    itemdata: {
      type: Object,
      default: () => ({
        col: 1,
        colid: 138222,
        colname: 'PS_C_PRO_ID',
        datelimit: 'all',
        display: 'text',
        fkdesc: '门店档案',
        fkdisplay: 'mop',
        inputname: 'PS_C_PRO_ID:ECODE',
        isfk: true,
        isnotnull: false,
        isuppercase: true,
        length: 65535,
        name: '',
        readonly: false,
        reftable: 'PS_C_PRO',
        reftableid: 23281,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '',
        isOneData: true
      })
    },
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  watch: {
    tColumns() {
      this.columns = this.getColumns();
    }
  },
  data() {
    return {
      columns: [],
      pageShow: true,
      styles: {
        'min-width': '24px',
        height: '24px',
        'line-height': '22px'
      }
    };
  },
  computed: {
    colkeys() {
      const cols = this.tColumns.map(col => col.key);
      return cols;
    },
    pageSizeOpts() {
      return [10, 20, 30];
    },
    height() {
      if (this.pageSize === 10) {
        return '340';
      }
      if (this.pageSize === 20) {
        return '640';
      }
      if (this.pageSize === 30) {
        return '940';
      }
    }
  },
  methods: {
    getColumns() {
      // 获取列头
      const self = this;
      self.tColumns.forEach(column => {
        const key = column.key || '';
        if (!column.align) column.align = 'center';
        if (key === 'ECODE') {
          column.width = 310;
        }
        if (key === 'OPERATE') {
          column.width = 120;
          column.render = (h, params) => h(
              'Button',
              {
                on: {
                  click: event => {
                    self.deleteRow(event, params);
                  }
                },
                style: {
                  color: 'rgb(236, 110, 78)'
                }
              },
              '删除'
            );
        }
        if (key === 'NUM' || key === 'SUM') {
          column.render = (h, params) => h('input', {
              domProps: {
                value: params.row[key]
              },
              on: {
                blur: event => {
                  params.row[key] = event.target.value == '' || Number.isNaN(event.target.value) ? '' : Number(event.target.value);
                  this.alertRowData(params.index, key, params.row[key], params.row);
                },
                keyup: event => {
                  if (key === 'SUM') {
                    event.target.value = event.target.value.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
                    event.target.value = event.target.value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
                    event.target.value = event.target.value
                      .replace('.', '$#$')
                      .replace(/\./g, '')
                      .replace('$#$', '.');
                    event.target.value = event.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                  } else {
                    event.target.value = event.target.value.replace(/[^0-9]+/, '');
                  }
                  return event.target.value;
                }
              }
            });
        }
        if (key === 'ORDER') {
          column.render = (h, params) => h('input', {
              domProps: {
                value: params.row[key] === '' ? params.row._index + 1 : params.row[key]
              },
              on: {
                blur: event => {
                  params.row[key] = event.target.value == '' || Number.isNaN(event.target.value) ? params.row._index + 1 : Number(event.target.value);
                  event.target.value = event.target.value !== params.row[key] ? params.row[key] : '';
                  this.alertRowData(params.index, key, params.row[key], params.row);
                },
                keyup: event => {
                  event.target.value = event.target.value.match(/^[1-9]\d*$/) ? event.target.value.match(/^[1-9]\d*$/)[0] : '';
                }
              }
            });
        }
      });
      return self.tColumns;
    },
    deleteRow(event, params) {
      const current = this.current || 1;
      const pageSize = this.pageSize || 10;
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.deleteOneTableRowData(params.row, current, pageSize);
      else this.$emit('deleteRowData', params.row, current, pageSize);

      // let index = params.row._index;
      // if (index >= 0) {
      //   this.tData.splice(index, 1);
      // }
    },
    alertRowData(index, key, value, row) {
      // this.tData[index][key] = value;
      const current = this.current || 1;
      const pageSize = this.pageSize || 10;
      if (row && this.itemdata && this.itemdata.isSimulation) {
        row.ALLSUM = Number(row.SUM * row.NUM).toFixed(2) || 0;
      }
      this.copy_row = JSON.parse(JSON.stringify(row));
      this.tData[row._index] = row;
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.alertOneTableRowData(this.copy_row, current, pageSize, true);
      else this.$emit('alertRowData', this.copy_row, current, pageSize, true);
    },
    /**
     *  表格支持商品模糊选中
     * @item 商品信息
     * @row 行信息
     */
    getFilterChooseItem(item, row) {
      row.ENAME = item.PS_C_PRO_ENAME || '';
      row.ECODE = item.PS_C_SKU_ECODE || '';
      row.ID = item.ID || '';
      if (this.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
        row.SKU_ID = item.SKU_ID || '';
        if (this.itemdata.isSimulation) {
          row.SUM = Number(item.PRICE) || 0;
          row.ALLSUM = Number(row.SUM * row.NUM, 2).toFixed(2) || 0;
          row.PRO_ECODE = item.PS_C_PRO_ECODE;
          row.SG_PRO_ID = item.NUMIID;
        }
      } 
      const current = this.current || 1;
      const pageSize = this.pageSize || 10;
      this.copy_row = JSON.parse(JSON.stringify(row));
      // add by wdq  20200409  这边不能使用行副本去更新真实数据,否则不会引发表格重新渲染导致表格错位问题；因此还是要更新真实数据
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.alertOneTableRowData(this.copy_row, current, pageSize, true);
      else this.$emit('alertRowData', this.copy_row, current, pageSize, true);
    },
    /**
     *  清空表格行信息中的商品信息
     *  特殊情况下不能如此清空
     */
    clearFilterChooseItem(row) {
      if (row.ID) row.ID = '';
      if (this.itemdata.reftable === 'SG_B_CHANNEL_PRODUCT') {
        if (row.ENAME) row.ENAME = '';
        if (row.ECODE) row.ECODE = '';
        if (row.SKU_ID) row.SKU_ID = '';
        if (row.SUM) row.SUM = '';
        if (row.ALLSUM) row.ALLSUM = '';
      } else if (this.itemdata.reftable === 'IP_C_TAOBAO_PRODUCT') {
        if (row.ENAME) row.PS_C_PRO_ENAME = '';
        if (row.ECODE) row.PS_C_SKU_ECODE = '';
      } else if (this.itemdata.reftable === 'PS_C_PRO') {
        if (row.ENAME) row.PS_C_PRO_ENAME = '';
        if (row.ECODE) row.PS_C_PRO_ECODE = '';
      } else {
        if (row.ENAME) row.ENAME = '';
        if (row.ECODE) row.ECODE = '';
      }
      const current = this.current || 1;
      const pageSize = this.pageSize || 10;
      this.copy_row = JSON.parse(JSON.stringify(row));
      // add by wdq  20200409  这边不能使用行副本去更新真实数据,否则不会引发表格重新渲染导致表格错位问题；因此还是要更新真实数据
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.alertOneTableRowData(this.copy_row, current, pageSize, true);
      else this.$emit('alertRowData', this.copy_row, current, pageSize, true);
    },
    pageChange(val) {
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.onePageChange(val);
      else this.$emit('on-page-change', val);
    },
    onPageSizeChange(val) {
      if (this.$parent.$el.className === 'tablists') this.$parent.$parent.onOnePageSizeChange(val);
      else this.$emit('on-page-size-change', val);
    },
    handleScroll() {}
  },
  mounted() {
    this.columns = this.getColumns();
    document.addEventListener('scroll', this.handleScroll, true);
  }
};
