/*
 * @Author: your name
 * @Date: 2021-06-02 19:17:14
 * @LastEditTime: 2021-06-03 14:15:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/orderCenter/modifyWarehouse.js
 */
import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import { forEach } from 'lodash';

export default {
  components: {
    businessForm,
    businessButton,
  },
  props: {
    componentData:{
      type:Object,
      default:{}
    }
  },
  computed: {
  },
  data() {
    return {
      vmI18n:$i18n,
      formConfig: {
        formValue: {},
        ruleValidate: {},
        formData: [{
          style: 'popInput',
          width: '24',
          version:'1.4',
          itemdata: {
            col: 1,
            colid: 179536,
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
            name: '仓库名称', // '入库实体仓库'
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
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类
            // text: "", //按钮文本
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  mounted() {
    
  },
  methods: {
    confirm(){
      let self = this;
      if(!self.formConfig.formData[0].itemdata.pid){
        self.$OMS2.omsUtils.msgTips(self, 'warning', '物流公司不能为空!', 0)
        return;
      }
      let ids = self.componentData.row.map(item=>{
        return {
          ID:item.ID,
          BILL_NO:item.BILL_NO
        }
      });
      self.service.orderCenter.updateWarehouse({
        ID_AND_BILL_NO_LIST:ids,
        CP_C_PHY_WAREHOUSE_ID: self.formConfig.formData[0].itemdata.pid,
      }).then(res=>{
        console.log(res);
        if(res.data.code == 0){
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
        }else {
          this.$Modal.confirm({
            title: res.data.message,
            width: 400,
            mask: true,
            render: (h) => {
              if (res.data.data) {
                res.data.data.forEach((item , index)=>{
                  item['index'] = index +1;
                })
                return h('Table', {
                  props: {
                    columns: [
                      {
                        title:'序号',
                        key:'index'
                      },
                      {
                        title: '单据编号', // '提示信息',
                        key: 'objno',
                      },
                      {
                        title:'失败原因',
                        key: 'message'
                      }
                    ],
                    data: res.data.data,
                  },
                })
              }else {
                return h('p' , {} , res.data.message)
              }
            },
          })
        }
        this.$parent.$parent.$parent.query();
        this.$parent.$parent.closeConfirm();
      })
    }
  }
};
