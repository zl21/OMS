  export default {
    data() {
      return {
        collapse: ['panel_baseInfo', 'panel_businessInfo'],
        btnConfig: {
          btnsite: 'right', // 按钮对齐方式
          typeAll: 'default',
          buttons: [
            {
              webname: 'lookup_save', // 保存
              text: $it('btn.save'), // 保存
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.save();
              },
            },
            {
              webname: 'lookup_return', // 返回
              text: $it('btn.back'),
              btnclick: () => {
                $omsUtils.tabCloseAppoint(this);
                this.$destroy(true);
                this.$store.commit('global/tabOpen', {
                  tableId: 10107,
                  type: 'S',
                  tableName: 'CP_C_PHY_WAREHOUSE',
                  label: '实体仓档案',
                  back: true,
                });
              },
            },
          ],
        },
        formConfig: {
          formData: [
            {
              style: 'input',
              label: $it('fL.du'), // 逻辑仓编码
              value: 'ECODE',
              width: '6',
              disabled: false,
              inputChange: ()=>{
              }
            },
            {
              style: 'input',
              label: $it('fL.dv'), // 逻辑仓名称
              value: 'ENAME',
              width: '6',
              disabled: false,
              inputChange: ()=>{
              }
            },
            {
              version: '1.3',
              colname: 'PS_C_BRAND_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                colid: 166035, // 当前字段的ID
                colname: 'PS_C_BRAND_ID', // 当前字段的名称
                fkdisplay: 'drp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                isuppercase: false, // 是否转大写
                name: $it('fL.dw'), // 所属实体仓 // 赔付类型
                readonly: true, // 是否可编辑，对应input   readonly属性
                reftable: 'PS_C_BRAND', // 对应的表
                reftableid: 166035, // 对应的表ID
                valuedata: '', // 这个是选择的值
                pid: '', // 啥 ？？？
              },
              oneObj: e => {
                console.log(e);
                this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = e.pid;
              },
            },
            {
              colname: 'group_type',
              style: 'select', // 下拉框类型
              label: $it('fL.dx'), // 仓库类型
              width: '6', // 所占宽度宽度
              value: 'STORETYPE', // 输入框的值
              clearable: true,
              selectChange: () => {
                
              },
              options: [
                // 下拉框选项值
                {
                  label: $it('fL.qualityGoods'), // 正品
                  value: '1'
                },
                {
                  label: $it('fL.ungraded'), // 次品
                  value: '2'
                }
              ]
            },
            {
              style: 'textarea',
              label: $it('tL.remarks'), // 备注
              value: 'REMARK',
              width: '24',
              disabled: false,
              inputChange: ()=>{
              }
            },
          ],
          formValue: {
            CP_C_PHY_WAREHOUSE_ID: '', // 所属实体仓
            CP_C_PHY_WAREHOUSE_ECODE: '', // 所属实体仓编码
            CP_C_PHY_WAREHOUSE_ENAME: '', // 所属实体仓名称
            ECODE: '',
            ENAME: '',
            STORETYPE: '1', // 仓库类型
            REMARK: '', // 备注

          },
          ruleValidate: {
            ECODE: [{
              required: true,
              message: ' ',
              trigger: 'blur'
            }],
            ENAME: [{
              required: true,
              message: ' ',
              trigger: 'blur'
            }],
            STORETYPE: [{
              required: true,
              message: ' ',
              trigger: 'blur'
            }],
          }
        },
        businessFormConfig: {
          formData: [
            {
              style: 'checkbox',
              label: $it('fL.dy'), // 主仓
              value: 'IS_MAIN_WAREHOUSE',
              width: '6',
              disabled: false,
            },
            {
              style: 'checkbox',
              label: $it('fL.dz'), // 负库存控制
              value: 'ISNEGATIVE',
              width: '6',
              disabled: false,
              inputChange: ()=>{
                  
              }
            },
           
          ],
          formValue: {
            IS_MAIN_WAREHOUSE: '',
            ISNEGATIVE: ''
          }
        }
      };
    },
    mounted() {
      this.getLogicStore();
    },
    methods: {
      getLogicStore() {
        const self = this;
        self.service.basicData.getById({ id: self.$route.params.customizedModuleId }).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            self.formConfig.formData.forEach(item=>{
              if (item.style == 'popInput' && item.colname == 'PS_C_BRAND_ID') {
                const data = res.data.data;
                item.itemdata.pid = data.ID;
                item.itemdata.valuedata = data.ENAME;
                self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = data.ID;
                self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ECODE = data.ECODE;
                self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = data.ENAME;
              }
            });
          }
        });
      },
      async getSelectOption() {
        const self = this;
        self.formConfig.formData = await $omsUtils.getTypeList('PS_C_PRO_GROUP', ['TYPE'], '基础信息', self.formConfig);
      },
      save() {
        const self = this;
        let data = {};
        data = Object.assign(self.formConfig.formValue, self.businessFormConfig.formValue);
        let str = '';
        if (!data.ECODE) {
          str += `${$it('fL.du')} `; // 逻辑仓编码
        } else if (!data.ENAME) {
          str += `${$it('fL.dv')} `; // 逻辑仓名称
        } else if (!data.CP_C_PHY_WAREHOUSE_ID) {
          str += `${$it('fL.dw')} `; // 所属实体仓
        } else if(!data.STORETYPE){
          str += `${$it('fL.dx')} `; // 仓库类型
        }
        if (str) {
          self.$Message.warning(`${str}不能为空!`);
          return;
        }
        data.ID = -1;
        data.IS_MAIN_WAREHOUSE = Number(data.IS_MAIN_WAREHOUSE);
        data.ISNEGATIVE = Number(data.ISNEGATIVE);
        self.service.basicData.logicStoreSave(data).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            $omsUtils.tabCloseAppoint(this);
              this.$destroy(true);
            // self.$store.commit('global/tabOpen', {
            //   type: 'V',
            //   tableName: 'CP_C_WAREHOUSE',
            //   tableId: '10326',
            //   id: res.data.data.ID
            // });
            $omsUtils.tabCloseAppoint(this);
                this.$destroy(true);
                this.$store.commit('global/tabOpen', {
                  tableId: 10107,
                  type: 'S',
                  tableName: 'CP_C_PHY_WAREHOUSE',
                  label: '实体仓档案',
                  back: true,
                });
          } else {
            self.$Message.error(res.data.message);
          }
        });
      },
    }
  };
