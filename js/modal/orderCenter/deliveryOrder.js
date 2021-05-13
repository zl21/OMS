import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';

export default {
  props: {
    idArray: {
      type: Array,
      defalut: () => []
    },
    selectRowData: {
      type: Array,
      defalut: () => []
    },
  },
  components: {
    businessForm,
    businessButton,
  },
  data() {
    return {
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog');
            },
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.comfirmBtn();
            },
          }
        ],
      },
      deliver_id: '',
      delivery_no: '',
      datas: {
        start: 0,
        range: 10,
        row: [],
      },
      columns: [],
      columnsKey: ['OUTSTORAGE_CODE'],
      hidecolumns: [],
      pageSize: 10,
      pageNum: 1,
      totalRowCount: 10,
      autoData: [],
      dataEmptyMessage: '数据加载中...',
      formConfig: {
        formValue: {},
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            isActive: true,
            isdisabled: false,
            inputList: [
              {
                childs: [
                  {
                    colname: 'OC_B_VIPCOM_DELIVERY_ID',
                    refobjid: 0,
                    valuedata: 2,
                  },
                ],
              },
            ],
            itemdata: {
              col: 1,
              colid: 173684,
              colname: 'OC_B_VIPCOM_DELIVERY_ID', // 当前字段的名称
              datelimit: 'all',
              refcolval: {
                fixcolumn: 'STATUS',
                expre: 'equal',
                srccol: 'OC_B_VIPCOM_DELIVERY_ID',
              },
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '出仓单',
              inputname: 'OC_B_VIPCOM_DELIVERY_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('panel_label.warehouse_receipt'), // 出仓单
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'OC_B_VIPCOM_DELIVERY', // 对应的表
              reftableid: 24652, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '', // 这个是选择的值
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const selected = this.selectRowData[0];
      const query = {
        distributionId: selected.ID.val,
        // deprecated
        // cpCShopTitle: selected.CP_C_SHOP_ID.val,
        // cpCPhyWarehouseName: selected.CP_C_PHY_WAREHOUSE_ID.val,
        // warehouseName: selected.WAREHOUSE_CODE.val,
        // jitTypeName: selected.BILL_TYPE.val,
        // PO_NO: selected.PO_NO.val,
        // pageNum: this.pageNum,
        // pageSize: this.pageSize,
      };
      const res = await this.service.orderCenter.deliveryV1List(query);
      if (res.data.code == 0) {
        const tabth = res.data.data.headers.map(item => {
          item.name = item.label;
          item.inputname = item.prop;
          item.colname = item.prop;
          item.isak = item.inputname === 'OUTSTORAGE_CODE';
          return item;
        });
        const row = res.data.data.records.map(item => {
          item.ID = {
            val: item.ID
          };
          item.OUTSTORAGE_CODE = {
            val: item.OUTSTORAGE_CODE
          };
          item.WAREHOUSE_NAME = {
            val: item.WAREHOUSE_NAME
          };
          item.CP_C_PHY_WAREHOUSE_ENAME = {
            val: item.CP_C_PHY_WAREHOUSE_ENAME
          };
          return item;
        });
        // console.log('tabth', tabth);
        // console.log('row', row);
        // this.datas.tabth = tabth;
        // this.datas.row = row;
        this.datas = {
          start: (res.data.data.current - 1) * this.pageSize,
          tabth,
          row,
        };
        this.totalRowCount = res.data.data.total;
        const records0 = JSON.parse(JSON.stringify(res.data.data.records[0] || []));
        if (!records0.length) {
          this.dataEmptyMessage = $i18n.t('other.noDataAvailable'); // '暂无数据!';
        } else {
          this.dataEmptyMessage = $i18n.t('modalTips.du'); // '数据加载中...';
        }
        const hideColumns = [];
        for (const key in records0) {
          if (!['ID', 'OUTSTORAGE_CODE', 'WAREHOUSE_NAME', 'CP_C_PHY_WAREHOUSE_ENAME'].includes(key)) {
            hideColumns.push(key);
          }
        }
        // console.log('hideColumns', hideColumns);
        this.hidecolumns = hideColumns;
      } else {
        // this.$emit('closeActionDialog');
      }
    },
    onPoperShow() {
      this.getData();
    },
    onPageChange(val) {
      this.pageNum = val;
      this.getData();
    },
    fkrpSelected(val) {
      console.log(val);
      this.deliver_id = val[0].ID;
      this.delivery_no = val[0].Label;
    },
    async inputValueChange(e) {
      // const formdata = new FormData();
      // formdata.append('ak', e);
      // formdata.append('colid', 173684);
      // formdata.append('fixedcolumns', JSON.stringify({ whereKeys: { STATUS: '=0' } }));
      // this.service.common.fuzzyquerybyak(formdata).then(res=>{
      //   console.log(res);
      //   if (res.data.code === 0) {
      //     this.autoData = res.data.data;
      //   }
      // });

      // new
      const selected = this.selectRowData[0];
      const query = {
        keyword: e,
        cpCShopTitle: selected.CP_C_SHOP_ID.val,
        cpCPhyWarehouseName: selected.CP_C_PHY_WAREHOUSE_ID.val,
        warehouseCode: selected.WAREHOUSE_CODE.val,
        jitTypeName: selected.BILL_TYPE.val,
        PO_NO: selected.PO_NO.val,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      const res = await this.service.orderCenter.deliveryV1List(query);
      if (res.data.code === 0) {
        this.autoData = res.data.data.records;
      }
    },
    async comfirmBtn() {
      const self = this;
      const param = {
        deliver_id: this.deliver_id,
        delivery_no: this.delivery_no,
        ids: self.$store.state[R3.getModuleName()].buttons.selectIdArr,
      };
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      console.log(formdata);
      if (param.delivery_id === '' || param.delivery_no === '') {
        // self.$Message.warning("出仓单不能为空");
        self.$Message.warning($i18n.t('modalTips.zj'));
        return false;
      }
      const res = await this.service.orderCenter.matchingDelivery(formdata);
      if (res.data.code === 0) {
        self.$Message.success(res.data.message);
        // self.$emit('confirmImport');
        self.$emit('closeActionDialog');
      } else {
        const moduleComponentName = `S.${this.$route.params.tableName}.${this.$route.params.tableId}`;// 当前模块名称
        self.$emit('closeActionDialog', true, res.data.data, moduleComponentName); // 关闭弹框
        // this.$emit('uploadError', res.data.data);
      }
    }
  }
};
