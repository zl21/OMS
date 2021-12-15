
const { getModuleName } = R3;

export default {
  data() {
    return {
      tablename: '',
      tableList: {},
    };
  },
  components: {},
  props: {
    objList: {
      type: Array,
      defalut: () => []
    },
    idArray: {
      type: Array,
      defalut: () => []
    },
    webid: {
      type: Number
    },
    // tablename: {
    //   type: String,
    // },
    selectRowData: {
      type: Array,
      defalut: () => []
    }
  },
  created() {
    const self = this;
    self.$Modal.info({
      className: 'ark-dialog',
      title: '警告',
      // content: '当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出?',
      render: (h) => {
        return h('div', {
          style: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            lineHeight: 1.5,
            padding: '10px 6px 0',
          },
        }, [
          h('Icon', {style: {color: '#fd6442', 'font-size': '28px', 'margin-right': '6px'}, props: {type: 'ios-alert-outline'}}),
          h('div', {style: {}}, '当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出?'),
        ])
      },
      mask: true,
      iconClass: 'ios-alert-outline',
      showCancel: true,
      okText: $it('com.determine'), // 确定
      cancelText: $it('com.cancel'), // 取消
      onOk: () => {
        self.getBatchNumber();
      },
      onCancel: () => {
        self.$emit('closeActionDialog', false);
      },
    })
  },
  methods: {
    getBatchNumber() {
      const self = this;
      // 获取搜索的数据
      const fixedcolumns = self.$parent.$parent.$parent.formItems.data;
      // console.log('fixedcolumns',fixedcolumns);
      const tableMark = self.$route.params.tableName;
      // console.log('tableMark',tableMark);
      self.tableList = this.service.reportCenter.rcOrderReportExportApiObj();
      const url = self.tableList[tableMark].url;
      // let attrArr = self.$attrs.StopOrEnabled.split('&');
      let type = '';
      // 获取主表的所有信息
      const tableInfo = this.$store.state[getModuleName()].buttons;
      // this.tablename = '';
      // 获取table的Name和主表名
      console.log(tableInfo.tableName);
      if (tableInfo.tabledesc || tableInfo.tabledesc !== undefined) {
        type = tableInfo.tabledesc;
        this.tablename = tableInfo.tableName;
      }
      const searchdata = {
        table: tableMark,
        column_include_uicontroller: true,
        fixedcolumns,
        type
      };
      const fromdata = new FormData();
      fromdata.append('searchdata', JSON.stringify(searchdata));
      fromdata.append('filename', self.tableList[tableMark].filename);
      fromdata.append('filetype', ' .xlsx');
      fromdata.append('showColumnName', true);
      fromdata.append('menu', self.tableList[tableMark].menu);
      this.service.common.publicUrlParams(url, fromdata).then((res) => {
        console.log(res);
        self.$emit('closeActionDialog');
        if (res.data.code === 0) {
          const mes = res.data.message || '导出成功！';
          self.$Message.success(mes);
          self.$store.commit('TabOpen', {
            id: res.data.data,
            type: 'singleView',
            name: 'singleView',
            label: '我的任务',
            query: {
              id: res.data.data,
              pid: '10010',
              ptitle: '我的任务',
              ptype: 'table',
              tabTitle: '我的任务',
              tableName: 'CP_C_TASK'
            }
          });
          $utils.downloadUrlFile(res.data.data);
        } else {
          // const err = res.data.message || '失败！';
          // self.$Message.error(err);
        }
      });
    }
  }
};
