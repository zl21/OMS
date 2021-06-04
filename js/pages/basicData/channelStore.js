import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import dateUtil from '@/assets/js/__utils__/date.js';
import publicMethodsUtil from '@/assets/js/public/publicMethods.js';
import comUtils from '@/assets/js/__utils__/common.js';
import orderItem from 'professionalComponents/subTable';
import logTable from 'professionalComponents/LogTable';
import businessActionTable from 'professionalComponents/businessActionTable';
import subTable from 'professionalComponents/subTable';

export default {
  name: 'CP_C_ORG_CHANNEL',
  components: {
    orderItem,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    logTable,
    subTable,
    businessActionTable
  },
  data() {
    return {
      vmI18n:$i18n,
      collapse: 'panel_baseInfo',
      labelValue: 'supplyStore',
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_save', // 保存
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.save();
            }
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              if (this.isModify) {
                this.$Modal.fcWarning({
                  title: '提示', // 打印
                  content: '该页面已经修改,是否继续返回?', // 正在打印中，请稍后。。。
                  mask: true,
                  showCancel: true,
                  onOk: () => {
                    comUtils.tabCloseAppoint(this);
                    this.$destroy(true);
                    this.$store.commit('global/tabOpen', {
                      tableId: 10327,
                      type: 'S',
                      tableName: 'CP_C_ORG_CHANNEL',
                      label: '渠道仓档案',
                      back: true,
                    });
                  }
                });
              } else {
                comUtils.tabCloseAppoint(this);
                this.$destroy(true);
                this.$store.commit('global/tabOpen', {
                  tableId: 10327,
                  type: 'S',
                  tableName: 'CP_C_ORG_CHANNEL',
                  label: '渠道仓档案',
                  back: true,
                });
              }
            }
          }
        ]
      },
      formConfig: {
        formData: [
          {
            style: 'input',
            label: '渠道仓编码',
            value: 'ECODE',
            width: '8',
            disabled: false,
            maxlength: 20,
            inputChange: () => {
              this.isModify = true;
            }
          },
          {
            style: 'input',
            label: '渠道仓名称',
            value: 'ENAME',
            width: '8',
            maxlength: 225,
            disabled: false,
            inputChange: () => {
              this.isModify = true;
            }
          }
        ],
        formValue: {
          ECODE: '', // SPU编码
          ENAME: '' // 商品名称
        },
        ruleValidate: {
          ECODE: [
            {
              required: true,
              message: ' '
            }
          ],
          ENAME: [
            {
              required: true,
              message: ' '
            }
          ]
        }
      },
      jordanTableConfig: {
        indexColumn: true,
        isShowSelection:true,
        pageShow: this.id != '-1',
        total: 0, // 设置总条数
        pageSizeOpts: [10, 30, 45, 60], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        currentPage: 1,
        businessButtonConfig: {
          typeAll: 'default',
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              webname: 'order_fund', // 返回
              text: '添加',
              btnclick: () => {
                // 查询逻辑仓,实体仓
                this.logicQuery();
              }
            },
            {
              webname: 'order_fund', // 返回
              text: '删除',
              btnclick: () => {
                this.delete();
              }
            }
          ]
        },
        businessFormConfig: {
          formData: [
            {
              version: '1.4',
              colname: 'CP_C_STORE_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: 168641, // 当前字段的ID
                colname: 'CP_C_STORE_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '商品SPU',
                inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '逻辑仓', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
                reftableid: 10091, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '' // 啥 ？？？
              },
              oneObj: e => {
                console.log(e);
                this.jordanTableConfig.businessFormConfig.formValue.CP_C_STORE_ID = e.pid;
              }
            },
            {
              style: 'input',
              label: '供货比例',
              value: 'RATE',
              disabled: false,
              dataAcessKey: '',
              width: '6',
              regx: /^$|^100$|^(\d|[1-9]\d)(\.\d+)*$/,
              inputenter: () => {
                this.logicQuery();
              }
            },
            {
              style: 'input',
              label: '优先级',
              value: 'SUPPLY_PRIORITY',
              disabled: false,
              dataAcessKey: 'SUPPLY_PRIORITY',
              width: '6',
              maxlength: 4,
              regx: /^$|^[1-9][0-9]{0,}$/,
              inputenter: () => {
                this.logicQuery();
              }
            },
            {
              style: 'checkbox',
              label: '自动分配',
              value: 'IS_AUTO_ASSIGN',
              disabled: false,
              dataAcessKey: 'IS_AUTO_ASSIGN',
              width: '6'
            }
          ],
          formValue: {
            CP_C_STORE_ID: '', // 逻辑仓id
            RATE: '', // 供货比例
            SUPPLY_PRIORITY: '', // 优先级
            IS_AUTO_ASSIGN: '' // 自动分配
          },
          ruleValidate: {
            RATE: [
              {
                required: true,
                message: ' ',
                trigger: 'blur'
              }
            ],
            SUPPLY_PRIORITY: [
              {
                required: true,
                message: ' ',
                trigger: 'blur'
              }
            ]
          }
        },
        columns: [
          {
            title: '逻辑仓',
            key: 'CP_C_STORE_ENAME'
          },
          {
            title: '实体仓',
            key: 'CP_C_PHY_WAREHOUSE_ENAME'
          },
          {
            title: '供货比例',
            key: 'RATE',
            render: (h, params) => h(
                'div',
                {
                  style: {
                    width: '50px'
                  }
                },
                [
                  h('Input', {
                    props: {
                      value: params.row.RATE,
                      placeholder: ' ',
                      regx: /^$|^100$|^(\d|[1-9]\d)(\.\d+)*$/
                    },
                    on: {
                      'on-change': val => {
                        this.isModify = true;
                        console.log(val.target.value);
                        params.row.RATE = val.target.value;
                        this.jordanTableConfig.data[params.index] = params.row;
                      }
                    }
                  }),
                  h('span', {}, '%')
                ]
              )
          },
          {
            title: '自动分配',
            key: 'IS_AUTO_ASSIGN',
            render: (h, params) => h('Checkbox', {
                props: {
                  value: Boolean(params.row.IS_AUTO_ASSIGN)
                },
                on: {
                  'on-change': val => {
                    console.log(val);
                    console.log(params);
                    params.row.IS_AUTO_ASSIGN = Number(val);
                    this.jordanTableConfig.data[params.index] = params.row;
                    this.isModify = true;
                  }
                }
              })
          },
          {
            title: '优先级',
            key: 'SUPPLY_PRIORITY',
            render: (h, params) => h(
              'div',
              {
                style: {
                  width: '50px'
                }
              },
              [
                h('Input', {
                  props: {
                    value: params.row.SUPPLY_PRIORITY,
                    placeholder: ' ',
                    maxlength: 4,
                    regx: /^$|^[1-9][0-9]{0,}$/,
                  },
                  on: {
                    'on-change': val => {
                      this.isModify = true;
                      console.log(val.target.value);
                      params.row.SUPPLY_PRIORITY = val.target.value;
                      this.jordanTableConfig.data[params.index] = params.row;
                    }
                  }
                })
              ]
            )
          }
        ],
        data: []
      },
      selecData: [],
      // tab切换配置
      labelList: [
        {
          label: '供货逻辑仓',
          value: 'supplyStore'
        },
        {
          label: '操作日志',
          value: 'CP_ORG_CHANNEL_LOG'
        }
      ],
      isModify: false,
      labelDefaultValue: 'supplyStore' // 设置tab默认值，默认展示《自定义属性》
    };
  },
  computed: {
    id() {
      return this.$route.params.customizedModuleId == 'New' ? '-1' : this.$route.params.customizedModuleId;
    }
  },

  mounted() {
    this.init();
    this.query();
  },
  created() {
    // 设置默认值
  },
  methods: {
    init() {
      const self = this;
      if (self.id == '-1') {
        self.labelList = [
          {
            label: '供货逻辑仓',
            value: 'supplyStore'
          }
        ];
      }
    },
    pageSizeChange(val) {
      console.log(val);
      this.jordanTableConfig.pageChange = val;
      this.query();
    },
    pageChange(val) {
      console.log(val);
      this.jordanTableConfig.currentPage = val;
      this.query();
    },
    delete() {
      const self = this;
      const ids = [];
      if (!self.selecData.length) {
        self.$Message.warning('请选择需要删除的内容!');
        return;
      }
      if (self.jordanTableConfig.data.length == self.selecData.length) {
        self.$Message.warning('不可全部删除逻辑仓数据，请至少保留一条！');
        return;
      }
      if (self.jordanTableConfig.data.length == 1) {
        self.$Message.warning('明细不能为空!');
        return;
      }
      self.selecData.forEach(item => {
        if (item.ID !== '-1') {
          ids.push(item.ID);
        }
      });
      if (ids.length) {
        // 请求接口,接口成功之后,本地删除选中明细
        self.service.basicData
          .channelDelete({
            IDS: ids
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              self.$Message.success(res.data.message);
              const arr = self.selecData.map(item => item.CP_C_STORE_ID);
              const data = [];
              self.jordanTableConfig.data.forEach(ele => {
                if (!arr.includes(ele.CP_C_STORE_ID)) {
                  data.push(ele);
                }
              });
              self.jordanTableConfig.data = data;
              self.jordanTableConfig.total = self.jordanTableConfig.data.length;
            } else {
              self.$Message.error(res.data.message);
            }
          });
      } else {
        const arr = self.selecData.map(item => item.CP_C_STORE_ID);
        const data = [];
        self.jordanTableConfig.data.forEach(ele => {
          if (!arr.includes(ele.CP_C_STORE_ID)) {
            data.push(ele);
          }
        });
        self.jordanTableConfig.data = data;
      }
    },
    onSelect(selection) {
      this.selecData = selection;
    },
    query() {
      const self = this;
      if (self.id == '-1') return;
      self.service.basicData
        .channelQueryDetail({
          ITEM: {
            ID: self.id
          },
          PAGE_INDEX: self.jordanTableConfig.currentPage,
          PAGE_SIZE: self.jordanTableConfig.pageSize
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            self.setData(res.data.data);
            self.$Message.success(res.data.message);
          } else {
            self.$message.error(res.data.message);
          }
        });
    },
    logicQuery() {
      const self = this;
      self.isModify = true;
      const id = self.jordanTableConfig.businessFormConfig.formValue.CP_C_STORE_ID;
      let str = '';
      if (!id) {
        str += '逻辑仓 ';
      } else if (!self.jordanTableConfig.businessFormConfig.formValue.RATE) {
        str += '供货比例 ';
      } else if (!self.jordanTableConfig.businessFormConfig.formValue.SUPPLY_PRIORITY) {
        str += '优先级 ';
      }
      if (str) {
        self.$Message.warning(`${str}不能为空!`);
        return;
      }
      if (self.jordanTableConfig.data.some(item => item.CP_C_STORE_ID == id)) {
        self.$Message.warning('请勿重复添加!');
        return;
      }
      self.service.basicData
        .queryById({
          ID: id
        })
        .then(res => {
          console.log(res);
          const row = {};
          if (res.data.code == 0) {
            const data = res.data.data;
            // 同一实体仓下的逻辑仓,优先级不能相同
            // 获取所有同一实体仓
            const theSameStore = self.jordanTableConfig.data.filter(item => item.CP_C_PHY_WAREHOUSE_ID == data.CP_C_PHY_WAREHOUSE_ID);
            // 判断该实体仓下是否已存在该优先级
            if (theSameStore.some(item => item.SUPPLY_PRIORITY == self.jordanTableConfig.businessFormConfig.formValue.SUPPLY_PRIORITY)) {
              self.$Message.warning('同一实体仓下优先级不能重复!');
              return;
            }
            // end
            row.CP_C_STORE_ENAME = data.ENAME; // 逻辑仓名称
            row.CP_C_STORE_ECODE = data.ECODE; // 逻辑仓编码
            row.CP_C_STORE_ID = data.ID; // 逻辑仓id
            row.CP_C_PHY_WAREHOUSE_ENAME = data.CP_C_PHY_WAREHOUSE_ENAME; // 实体仓名称
            row.CP_C_PHY_WAREHOUSE_ECODE = data.CP_C_PHY_WAREHOUSE_ECODE; // 实体仓编码
            row.CP_C_PHY_WAREHOUSE_ID = data.CP_C_PHY_WAREHOUSE_ID; // 实体仓id
            row.RATE = self.jordanTableConfig.businessFormConfig.formValue.RATE; // 供货比例
            row.SUPPLY_PRIORITY = self.jordanTableConfig.businessFormConfig.formValue.SUPPLY_PRIORITY; // 优先级
            row.IS_AUTO_ASSIGN = Number(self.jordanTableConfig.businessFormConfig.formValue.IS_AUTO_ASSIGN); // 自动分配
            row.ID = '-1';
            console.log(row);
            self.jordanTableConfig.data.push(row);
            self.jordanTableConfig.total = self.jordanTableConfig.data.length;
            self.jordanTableConfig.businessFormConfig.formValue.RATE = '';
            self.jordanTableConfig.businessFormConfig.formValue.SUPPLY_PRIORITY = '';
            self.jordanTableConfig.businessFormConfig.formValue.IS_AUTO_ASSIGN = false;
            self.jordanTableConfig.businessFormConfig.formData.filter(item => item.colname == 'CP_C_STORE_ID')[0].itemdata.valuedata = '';
            self.jordanTableConfig.businessFormConfig.formData.filter(item => item.colname == 'CP_C_STORE_ID')[0].itemdata.pid = '';
            self.jordanTableConfig.businessFormConfig.formValue.CP_C_STORE_ID = '';
          }
        });
    },
    setData(data) {
      const self = this;
      self.formConfig.formValue.ECODE = data.ITEM.ECODE;
      self.formConfig.formValue.ENAME = data.ITEM.ENAME;
      self.jordanTableConfig.data = data.ITEM.CP_C_ORG_CHANNEL_ITEMS;
      self.jordanTableConfig.total = data.TOTAL_COUNT;
      self.jordanTableConfig.currentPage = data.PAGE_INDEX;
      self.jordanTableConfig.pageSize = data.PAGE_SIZE;
    },
    labelClick(item) {
      console.log(item);
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'supplyStore') return;
      this.subTableConfig = {
        centerName: 'basicData',
        tablename: this.labelDefaultValue,
        pageShow:true,
        objid: this.id
      };
    },
    save() {
      // 保存接口
      const self = this;
      let str = '';
      if (!self.formConfig.formValue.ECODE) {
        str += '渠道仓编码 ';
      } else if (!self.formConfig.formValue.ENAME) {
        str += '渠道仓名称 ';
      }
      if (str) {
        self.$Message.warning(`${str}不能为空!`);
        return;
      }
      if (!self.jordanTableConfig.data.length) {
        self.$Message.warning('请先添加明细!');
        return;
      }
      if (self.jordanTableConfig.data.some(item => item.RATE == '')) {
        self.$Message.warning('供货比例不能为空!');
        return;
      }
      const data = {
        CP_C_ORG_CHANNEL: {
          ID: self.id,
          ECODE: self.formConfig.formValue.ECODE,
          ENAME: self.formConfig.formValue.ENAME
        },
        CP_C_ORG_CHANNEL_ITEMS: self.jordanTableConfig.data
      };
      this.service.basicData.channelSave(data).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.isModify = false;
          self.$Message.success(res.data.message);
          this.$store.commit('customize/TabOpen', {
            id: res.data.data.ID,
            type: 'action',
            name: 'CP_C_ORG_CHANNEL',
            label: '渠道仓编辑' // 额外退款编辑
          });
          // if (self.id != '-1') {
          //   this.init();
          //   this.query();
          // }
        } else {
          self.$Message.error(res.data.message);
        }
      });
    }
  }
};
