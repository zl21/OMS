import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import R3 from '@syman/burgeon-r3';

const { getModuleName } = R3;
export default {
  components: {
    businessForm,
    jordanBtn,
    businessActionTable,
  },
  props: {},
  computed: {
    idArr: () => vm.$store.state[getModuleName()].buttons.selectIdArr,
    rowData: () => {
      console.log(this);
      return vm.$store.state[getModuleName()].buttons.selectArr;
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      totalRowCount: 0,
      pageSize: 10,
      pageNum: 1,
      dataEmptyMessage: '数据加载中...', // 无数据的提示
      columns: ['ename'], // 展现的组
      AutoData: [],
      foreignKeyLink: {},
      //
      pid: '',
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            // text: "确定", //按钮文本
            text: window.vmI18n.t('common.determine'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              if (!self.pid) {
                // self.$Message.warning("请选择仓库");
                self.$Message.warning(window.vmI18n.t('modalTips.zi'));
                return false;
              }
              const param = {
                ids: self.idArr[0],
                warehouseId: self.pid,
              };
              const fromdata = new FormData();
              fromdata.append('param', JSON.stringify(param));
              axios({
                url: '/api/cs/vip/distribution/v1/updateBeforeWarehouse',
                method: 'post',
                data: fromdata,
              }).then((res) => {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.$emit('confirmImport');
                } else {
                  self.$Message.warning(res.data.message);
                }
                self.closeActionDialog();
              });
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            // text: "取消", //按钮文本
            text: window.vmI18n.t('common.cancel'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.closeActionDialog();
            }, // 按钮点击事件
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.$store.state[getModuleName()]);
    this.getListData();
  },
  methods: {
    async getListData() {
      const self = this;
      const fromdata = new FormData();
      const rowData = self.rowData;
      const checkId = self.idArr[0];
      let shopId = '';
      rowData.map((item) => {
        const rowId = item.ID.val;
        if (rowId === checkId) {
          shopId = item.CP_C_SHOP_ID.refobjid;
        }
      });
      fromdata.append('shopId', shopId);
      fromdata.append('pageNum', self.pageNum);
      fromdata.append('pageSize', self.pageSize);
      const res = await this.service.common.getWarehourseByShopId(fromdata);
      res.data.data.forEach((element) => {
        element.ecode = {
          val: element.ecode,
        };
        element.ename = {
          val: element.ename,
        };
        element.ID = {
          val: element.id,
        };
      });
      self.foreignKeyLink = {
        start: 0,
        tabth: [
          {
            colname: 'ID',
            name: 'ID',
            show: false,
          },
          {
            colname: 'ename',
            // name: "发货仓库名称",
            name: window.vmI18n.t('table_label.deliveryWarehouse_name'),
            show: true,
          },
          {
            colname: 'ecode',
            // name: "发货仓库编码",
            name: window.vmI18n.t('table_label.deliveryWarehouse_code'),
            show: false,
          },
        ],
        row: res.data.data,
      };
      self.totalRowCount = res.data.count;
    },
    // 分页请求数据
    changePage(value) {
      this.pageNum = value;
    },
    onFkrpSelected(val) {
      this.pid = val[0].ID;
    },
    closeActionDialog() {
      this.$emit('closeActionDialog');
    },
  },
};
