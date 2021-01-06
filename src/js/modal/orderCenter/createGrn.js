import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessButton
  },
  props: {
    idArray: {
      default: []
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      isError: false,
      errorMessage: '',
      transportStyle: {
        text: '',
        value: ''
      },
      autoData: [],
      columns: ['ENAME', 'value'],
      defaultSelected: [],
      selectData: [],
      list: [],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        }
        ],
      },
      datas: {
        start: 0,
        tabth: [
          {
            colname: 'ID',
            name: 'ID',
            show: false
          },
          {
            colname: 'ENAME',
            name: '日程归属名称',
            show: true,
            isak: true
          },
        ],
        row: []
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    determine() {
      const formdata = new FormData();
      if (!this.selectData.length && !this.defaultSelected.length) {
        this.$Message.warning('档案日程归属不能为空!');
        return;
      }
      const obj = {
        ids: this.idArray,
        ascriptionId: this.selectData[0].ID || this.defaultSelected[0].ID,
        deliveryMethod: this.transportStyle.value
      };
      formdata.append('param', JSON.stringify(obj));
      this.service.orderCenter.distributionCreateDelivery(formdata)
        .then(res=>{
          console.log(res);
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            this.$emit('closeActionDialog');
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    init() {
      const formdata = new FormData();
      formdata.append('param', JSON.stringify({ ids: this.idArray }));
      this.service.orderCenter.checkBeforeCreateVipDelivery(formdata).then(res=>{
        console.log(res);
        if (res.data.code === 0) {
          const def = res.data.data.filter(item => item.SELECTED == 1)[0];
          this.transportStyle.text = def.DELIVERY_METHOD_NAME;
          this.transportStyle.value = def.DELIVERY_METHOD;
          this.defaultSelected = [{ ID: def.ID, Label: def.ENAME }];
          this.selectData = this.defaultSelected;
          this.btnConfig.buttons.push({
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          });
          this.list = JSON.parse(JSON.stringify(res.data.data));
          this.datas.row = this.getData(res.data.data);
        } else {
          this.isError = true;
          this.$Message.error(res.data.message);
        }
      });
    },
    getData(row) {
      const arr = [];
      row.forEach(item=>{
        const obj = {};
        for (const key in item) {
          const val = {};
          val.val = item[key];
          obj[key] = val;
        }
        arr.push(obj);
      });
      return arr;
    },
    fkrpSelected(e) {
      this.selectData = e;
      this.getDeliveryMethod(e);
    },
    clear() {
      this.defaultSelected = [];
      this.selectData = [];
      this.transportStyle.value = '';
      this.transportStyle.text = '';
    },
    getDeliveryMethod(e) {
      const val = this.list.filter(item => item.ID == e[0].ID)[0];
      this.transportStyle.value = val.DELIVERY_METHOD;
      this.transportStyle.text = val.DELIVERY_METHOD_NAME;
    }
  }
};
