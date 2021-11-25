import inventoryCenter from "@/service/modules/inventoryCenter";
import { checkRuleFunMixin } from "@/assets/js/mixins/checkFormRule";


export default {
  components: {},
  mixins: [checkRuleFunMixin],
  data() {
    return {
      idObj: {},
      n: 'field',
      formValueObj: {}, // 字段名动态部分
      formDataArr: [], // 配置数据 动态部分
      storeName: '',
      storeId: '',
      isChange: false,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      collapse: ['baseInfo1', 'baseInfo2'],
      formConfig2: {
        formData: [
          {
            style: 'input', // 输入框类型
            label: '创建人',
            value: 'ownerename', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            disabled: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
          {
            style: 'input', // 输入框类型
            label: '创建时间',
            value: 'creationdate', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            disabled: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
          {
            style: 'input', // 输入框类型
            label: '修改人',
            value: 'modifierename', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            disabled: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
          {
            style: 'input', // 输入框类型
            label: '修改时间',
            value: 'modifieddate', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            disabled: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
        ],
        formValue: {
          ownerename: '',
          creationdate: '',
          modifierename: '',
          modifieddate: '',
        },
      },
    };
  },
  watch: {},
  computed: {
    btnConfig() {
      return {
        typeAll: 'default',
        buttons: [
          {
            webname: 'lookup_dianchangpingfen',
            type: 'posdefault',
            text: window.vmI18n.t('btn.save'), // 保存
            btnclick: () => {
              this.save()
            }
          },
          {
            text: window.vmI18n.t('btn.back'), // 返回
            btnclick: () => {
              $utils.tabCloseAppoint(this);
              this.$store.commit('customize/TabHref', {
                id: 41460458, // id
                type: 'action', // 类型action
                name: 'STORESCORESTRATEGY', // 文件名
                label: '店仓评分设置表', //  tab中文名
              });
              this.$destroy();
            }
          }
        ]

      }
    },
    formConfig() {
      const formConfig = {
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
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '实体店仓',
              inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: '实体店仓',
              readonly: this.ID !== '-1', // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 24486, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: this.storeName, // 这个是选择的值
              pid: ''
            },
            oneObj: e => {
              console.log(e)
              this.isChange = true
              this.storeId = e.pid;
              this.storeName = e.valuedata;
            }
          },
          ...this.formDataArr
        ],
        formValue: {
          CP_C_PHY_WAREHOUSE_ID: this.storeId,
          ...this.formValueObj
        },
        // 表单非空提示
        ruleValidate: {
          CP_C_PHY_WAREHOUSE_ID: [{ required: true, message: '请输入实体店仓', trigger: 'blur' }],
        }
      }
      return formConfig
    }
  },
  mounted() {
    this.queryShareScoreFactor()
    if (this.ID !== '-1') {
      this.queryByPhyWarehouseId()
    }
  },
  activated() {
  },
  methods: {
    /**
     * 保存
     * @param isTrue
     */
    save() {
      const isTrue = this.checkRuleFun('formConfig')
      if (isTrue) {
        const param = {
          saveScoreInfos: [],
          phyWarehouseId: this.storeId //  //实体仓id
        }
        const formValue = this.formConfig.formValue
        for (let key in formValue) {
          if (key !== 'CP_C_PHY_WAREHOUSE_ID') {
            const scoreFactorEcode = key.replace(this.n, '')
            param.saveScoreInfos.push({
              id: this.idObj[key],
              scoreFactorEcode: scoreFactorEcode,      //评分因子code
              score: formValue[key]     //前台输出分数
            })
          }
        }
        this.service.inventoryCenter.ScoreStrategySave(param).then((res) => {
          if (res.data.code === 0) {
            this.$store.commit('customize/TabHref', {
              id: res.data.data, // id
              type: 'action', // 类型action
              name: 'STORESCORESTRATEGYDETAIL', // 文件名
              label: '店仓评分设置表', //  tab中文名
            });
            this.$Message.success(window.vmI18n.t('modalTips.z9')); // '保存成功'
          } else {
            // this.$Message.error(res.data.message);
          }

        })
      }

    },
    /**
     * 获取表头数据
     */
    queryShareScoreFactor() {
      this.service.inventoryCenter.queryShareScoreFactor({}).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data
          data.forEach((item) => {
            this.formValueObj[`${this.n}${item.ECODE}`] = ''
            this.formDataArr.push({
              style: 'input', // 输入框类型
              regx: /^\d*\.{0,1}\d{0,2}$/,
              label: item.ENAME,
              value: `${this.n}${item.ECODE}`, // 输入框的值
              width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
              ghost: false, // 是否关闭幽灵按钮，默认开启
              inputChange: () => {
                this.isChange = true;

              },
              setRequired: "required" //必选标识,值不为required时无标识
            })

          })

        }
      })
    },

    /**
     * 获取详情
     */
    queryByPhyWarehouseId() {
      const params = {
        phyWarehouseIds: [this.ID],
        pageNumber: 1, // 起始下标
        pageSize: 99,
      }
      // 查询数据
      this.service.inventoryCenter.queryByPhyWarehouseId(params).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data.list[0]
          for (let key in this.formConfig2.formValue) {
            this.formConfig2.formValue[key] = data[key] ? data[key] : ''
          }
          this.storeId = data.phyWarehouseInfo.cpPhyWarehouseId
          this.storeName = data.phyWarehouseInfo.cpPhyWarehouseEname
          for (let key in data.scoreMap) {
            this.formConfig.formValue[`${this.n}${key}`] = data.scoreMap[key]
            this.idObj[key] = data.idMap[key]
          }
        }
      })
    },
  }
};
