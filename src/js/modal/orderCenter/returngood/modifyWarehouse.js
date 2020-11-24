import businessForm from 'professionalComponents/businessForm';
import businessBtn from 'professionalComponents/businessButton';

export default {
  data() {
    return {
      formConfig: {
        formValue: {},
        ruleValidate: {},
        formData: [{
          style: 'popInput',
          width: '24',
          value: 'CP_C_LOGISTICS_ID',
          itemdata: {
            col: 1,
            colid: 176316,
            colname: 'CP_C_PHY_WAREHOUSE_IN_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'drp', // 外键关联类型
            fkdesc: '实体仓档案',
            inputname: 'CP_C_PHY_WAREHOUSE_IN_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 20, // 最大长度是多少
            name: '入库实体仓库', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
            reftableid: 24486, // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            pid: '',
            valuedata: '' // 这个是选择的值
          }
        }]
      },
      btnConfig: {
        typeAll: 'error',
        btnsite: 'right',
        buttons: [
          {
            text: '确定',
            btnclick: () => {
              const _this = this;
              _this.okClick();
            }
          },
          {
            text: '取消',
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }
          }
        ]
      }
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  components: {
    businessForm,
    businessBtn,
  },
  methods: {
    async okClick() {
      const _this = this;
      if (!_this.formConfig.formData[0].itemdata.pid || _this.formConfig.formData[0].itemdata.pid === undefined) {
        _this.$Message.error('入库实体仓库必填！');
        return;
      }
      const fromdata = new FormData();
      const param = {
        IDS: _this.componentData.ids,
        CP_C_PHY_WAREHOUSE_IN_ID: _this.formConfig.formData[0].itemdata.pid
      };
      fromdata.append('param', JSON.stringify(param));
      const res = await this.service.orderCenter.modifyReturnOrderWarehouse(fromdata);
      if (res.data.code === 0) {
        _this.$Message.success(res.data.message);
        _this.$parent.$parent.$parent.getList(_this.componentData.status);
        _this.$parent.$parent.closeConfirm();
      } else {
        _this.$Message.error(res.data.message);
      }
    }
  }
};
