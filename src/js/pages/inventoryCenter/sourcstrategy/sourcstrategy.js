// import comUtils from '@/assets/js/__utils__/common';
import isFavoriteMixin from "@/assets/js/mixins/isFavorite";


export default {
  mixins: [isFavoriteMixin],
  data() {
    return {
      customizedModuleName: this.$route.params.customizedModuleName,
      customizedModuleId: this.$route.params.customizedModuleId,
      agTableConfig: {
        isIndex: false,
        agLoading: false,
        columnDefs: [], // 表头
        rowData: [],
        renderArr: {}, // 表格内处理
        tableHeight: '560px',
        pagenation: $Utils.pageConfig
      },
      selection: [],
      formConfig: {
        formData: [
          {
            colname: 'CP_C_PHY_WAREHOUSE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 1700825948, // 当前字段的ID
              colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '平台店铺',
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 24486, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = e.pid;
            }
          },
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: [],
        }
      }, // 基本信息
    };
  },
  watch: {},
  computed: {
    btnConfig() {
      return {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_xunyuancelue',
            type: 'posdefault',
            text: window.vmI18n.t('btn.find'), // 查找
            btnclick: () => {
              this.getTableData();
            }
          },
          {
            webname: 'Newlyadded_xunyuancelue',
            type: 'default',
            text: window.vmI18n.t('btn.add'), // 新增
            btnclick: () => {
              this.$store.commit('customize/TabHref', {
                id: 'New', // id
                type: 'action', // 类型action
                name: 'SOURCSTRATEGYDETAIL', // 文件名
                label: '寻源策略表', //  tab中文名
              });
            }
          },
          {
            webname: 'submit_xunyuancelue',
            type: 'default',
            text: '提交',
            btnclick: () => {
            }
          },
          {
            webname: 'jiean_xunyuancelue',
            text: '结案',
            btnclick: () => {
            },
          },
          {
            webname: 'jiean_xunyuancelue',
            text: window.vmI18n.t('btn.void'), // 作废
            btnclick: () => {
            },
          },
          {
            icon: `iconfont ${this.isFavorite ? 'iconbj_alrcol' : 'iconbj_col'} font-size-12`, // 按钮图标
            size: 'small', // 按钮大小
            name: window.vmI18n.t('btn.collection'), // 收藏
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.setFavorite2();
            } // 按钮点击事件
          }

        ]

      }
    }
  },
  mounted() {
    this.getTableData();
  },
  activated() {
    this.agTableConfig.pagenation.current = 1;
    // 计算高度 通过设置节点 'totalHeight'
    $Utils.setTableHeight(this, 65);
    // 检测屏幕变化 设置高度 重新渲染agTabe
    $Utils.onresizes(this, 0);
  },
  methods: {
    /**
     * 获取表格信息
     */
    getTableData() {
      this.selection = [];
      this.agTableConfig.agLoading = true;
      const params = new FormData();
      const searchdata = {
        table: "SG_C_STORE_SCORE_STRATEGY",
        startindex: (this.agTableConfig.pagenation.current - 1) * this.agTableConfig.pagenation.pageSize, // 起始下标
        range: this.agTableConfig.pagenation.pageSize,
        fixedcolumns: {},
        column_include_uicontroller: true,
        isolr: false
      }
      const CP_C_PHY_WAREHOUSE_ID = this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID
      if (CP_C_PHY_WAREHOUSE_ID.length) {
        searchdata.fixedcolumns = {CP_C_PHY_WAREHOUSE_ID: CP_C_PHY_WAREHOUSE_ID}
      }
      params.append('searchdata', JSON.stringify(searchdata));
      this.service.common.QueryList(params).then(({data: res}) => {
        this.agTableConfig.agLoading = false;
        if (res.code === 0) {
          const data = res.datas || {};
          const tabth = data.tabth
          const row = data.row
          const columnDefs = tabth.map((item) => {
            return {
              field: item.colname,
              headerName: item.name,
              // filter: 'agTextColumnFilter',
            }
          });
          columnDefs.push({
            field: "CP_C_PHY_WAREHOUSE_ID",
            headerName: '总计',
          })
          // 表头赋值
          this.agTableConfig.columnDefs = columnDefs

          const rowData = []
          row.forEach((obj) => {
            const newObj = {}
            for (let key in obj) {
              newObj[key] = obj[key].val
            }
            rowData.push(newObj)
          })
          // 表格赋值
          this.agTableConfig.rowData = rowData
          this.agTableConfig.pagenation.total = data.totalRowCount;
          this.$refs.agGridChild.agGridTable(this.agTableConfig.columnDefs, this.agTableConfig.rowData);
        }
      });
    },

    // 单击某二行时触发
    onRowDblclick(row) {
      this.$store.commit('customize/TabHref', {
        id: row.id, // id
        type: 'action', // 类型action
        name: 'SOURCSTRATEGYDETAIL', // 文件名
        label: '寻源策略表', //  tab中文名
      });
    },
    // 分页change 事件
    pageChange(val) {
      this.agTableConfig.pagenation.current = val;
      this.getTableData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.agTableConfig.pagenation.pageSize = val;
      this.getTableData();
    },
  }
};
