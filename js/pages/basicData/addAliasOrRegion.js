import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";
import loading from 'professionalComponents/loading';

export default {
  name: "addAliasOrRegion",
  components: {
    businessButton,
    businessForm,
    loading,
  },
  data() {
    return {
      vmI18n: $i18n,
      ID:
        this.$route.params.customizedModuleId &&
          this.$route.params.customizedModuleId != "New"
          ? this.$route.params.customizedModuleId
          : "-1", // 记录主界面传入的ID
      panelDefaultValue: "panel_baseInfo", // 设置默认打开'基本信息'
      backable: false,
      loading: false,
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      before: {
        // 暂存上一次的数据
        master: {},
      },
      btnConfig: {
        typeAll: "default",
        buttons: [
          {
            text: $i18n.t("btn.save"),
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              if (this.customizedModuleName == "ADDALIAS") {
                this.saveAlias();
              } else {
                this.saveRegion();
              }
            },
          },
          {
            text: $i18n.t("btn.back"),
            btnclick: () => {
              this.back();
            },
          },
        ],
      },
      formConfig: {},
      // 新增别名
      AliasFormConfig: {
        formData: [
          {
            style: "input",
            label: $i18n.t('form_label.de'), // 别名名称
            value: "CPCREGIONALIAS",
            colname: "CPCREGIONALIAS",
            width: "6",
            disabled: false,
            inputChange: () => {
              this.masterModifyData("CPCREGIONALIAS", "master");
            },
          },
          {
            style: "radio",
            label: $i18n.t('form_label.df'), // 区域类型
            value: "REGION_TYPE", // 输入框的值
            colname: "REGION_TYPE", // 输入框的值
            width: "18", // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              {
                label: $i18n.t('form_label.dg'), // 国家
                value: "0",
              },
              {
                label: $i18n.t('form_label.dh'), // 省份
                value: "1",
              },
              {
                label: $i18n.t('form_label.di'), // 市级
                value: "2",
              },
              {
                label: $i18n.t('form_label.dj'), // 区级
                value: "3",
              },
            ],
            radioChange: () => {
              this.masterModifyData("REGION_TYPE", "master");
              const val = this.formConfig.formValue.REGION_TYPE;
              let beforeArr = [];
              let afterArr = [];
              switch (val) {
                case "0":
                  // 选国家时，仅国家
                  beforeArr = ["CP_C_REGION_COUNTRY_ID"];
                  afterArr = [
                    "CP_C_REGION_PROVINCE_ID",
                    "CP_C_REGION_CITY_ID",
                    "CP_C_REGION_AREA_ID",
                  ];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case "1":
                  beforeArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                  ];
                  afterArr = ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case "2":
                  beforeArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                    "CP_C_REGION_CITY_ID",
                  ];
                  afterArr = ["CP_C_REGION_AREA_ID"];
                  this.changeInput(beforeArr, afterArr);
                  break;
                /* case '3':
                  beforeArr = ['CP_C_REGION_COUNTRY_ID', 'CP_C_REGION_PROVINCE_ID', 'CP_C_REGION_CITY_ID'];
                  afterArr = ['CP_C_REGION_AREA_ID'];
                  this.changeInput(beforeArr, afterArr);
                  break; */
                default:
                  beforeArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                    "CP_C_REGION_CITY_ID",
                    "CP_C_REGION_AREA_ID",
                  ];
                  afterArr = [];
                  this.changeInput(beforeArr, afterArr);
                  break;
              }
            },
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_COUNTRY_ID",
            style: "popInput", // 输入框弹框单多选
            width: "6",
            itemdata: {
              colid: 168556, // 当前字段的ID
              colname: "CP_C_REGION_COUNTRY_ID", // 当前字段的名称
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dm'), // 关联国家
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              const drpArr = [
                "CP_C_REGION_PROVINCE_ID",
                "CP_C_REGION_CITY_ID",
                "CP_C_REGION_AREA_ID",
              ];
              this.formConfig.formValue.CP_C_REGION_COUNTRY_ID = val;
              this.formConfig.formValue.CP_C_REGION_COUNTRY_id = val.pid;
              this.formConfig = this.emptyData(this.formConfig, "CP_C_REGION_COUNTRY_ID", this.modify, "CP_C_REGION_COUNTRY_id", val, drpArr);
              this.masterModifyData("CP_C_REGION_COUNTRY_ID", "master");
              this.masterModifyData("CP_C_REGION_COUNTRY_id", "master");
            },
            InputEnter: (val) => {
              const drpArr = [
                "CP_C_REGION_PROVINCE_ID",
                "CP_C_REGION_CITY_ID",
                "CP_C_REGION_AREA_ID",
              ];
              this.formConfig.formValue.CP_C_REGION_COUNTRY_ID = val;
              this.formConfig.formValue.CP_C_REGION_COUNTRY_id = val.pid;
              this.formConfig = this.emptyData(this.formConfig, "CP_C_REGION_COUNTRY_ID", this.modify, "CP_C_REGION_COUNTRY_id", val, drpArr);
              this.masterModifyData("CP_C_REGION_COUNTRY_ID", "master");
              this.masterModifyData("CP_C_REGION_COUNTRY_id", "master");
            }
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_PROVINCE_ID",
            style: "popInput", // 输入框弹框单多选
            width: "6",
            inputList: [],
            itemdata: {
              colid: 166974, // 当前字段的ID
              colname: "CP_C_REGION_PROVINCE_ID",
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dk'), // 关联省
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_COUNTRY_ID",
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              const drpArr = ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"];
              this.formConfig.formValue.CP_C_REGION_PROVINCE_ID = val;
              this.formConfig.formValue.CP_C_REGION_PROVINCE_id = val.pid;
              this.formConfig = this.emptyData(this.formConfig, "CP_C_REGION_PROVINCE_ID", this.modify, "CP_C_REGION_PROVINCE_id", val, drpArr);
              this.masterModifyData("CP_C_REGION_PROVINCE_ID", "master");
              this.masterModifyData("CP_C_REGION_PROVINCE_id", "master");
            },
            InputEnter: (val) => {
              const drpArr = ["CP_C_REGION_CITY_ID", "CP_C_REGION_AREA_ID"];
              this.formConfig.formValue.CP_C_REGION_PROVINCE_ID = val;
              this.formConfig.formValue.CP_C_REGION_PROVINCE_id = val.pid;
              this.formConfig = this.emptyData(this.formConfig, "CP_C_REGION_PROVINCE_ID", this.modify, "CP_C_REGION_PROVINCE_id", val, drpArr);
              this.masterModifyData("CP_C_REGION_PROVINCE_ID", "master");
              this.masterModifyData("CP_C_REGION_PROVINCE_id", "master");
            }
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_CITY_ID",
            style: "popInput", // 输入框弹框单多选
            width: "6",
            inputList: [],
            itemdata: {
              colid: 167077, // 当前字段的ID
              colname: "CP_C_REGION_CITY_ID",
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dl'), // 关联市
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_PROVINCE_ID",
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              const drpArr = ["CP_C_REGION_AREA_ID"];
              this.formConfig.formValue.CP_C_REGION_CITY_ID = val;
              this.formConfig.formValue.CP_C_REGION_CITY_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_CITY_ID",
                this.modify,
                "CP_C_REGION_CITY_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_CITY_ID", "master");
              this.masterModifyData("CP_C_REGION_CITY_id", "master");
            },
            InputEnter: (val) => {
              const drpArr = ["CP_C_REGION_AREA_ID"];
              this.formConfig.formValue.CP_C_REGION_CITY_ID = val;
              this.formConfig.formValue.CP_C_REGION_CITY_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_CITY_ID",
                this.modify,
                "CP_C_REGION_CITY_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_CITY_ID", "master");
              this.masterModifyData("CP_C_REGION_CITY_id", "master");
            }
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_AREA_ID",
            style: "popInput", // 输入框弹框单多选
            width: "6",
            inputList: [],
            itemdata: {
              colid: 167091, // 当前字段的ID
              colname: "CP_C_REGION_AREA_ID", // 当前字段的名称
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dn'), // 关联区县
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_CITY_ID",
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              this.formConfig.formValue.CP_C_REGION_AREA_ID = val;
              this.masterModifyData("CP_C_REGION_AREA_ID", "master");
              this.masterModifyData("CP_C_REGION_AREA_id", "master");
            },
            InputEnter: (val) => {
              this.formConfig.formValue.CP_C_REGION_AREA_ID = val;
              this.masterModifyData("CP_C_REGION_AREA_ID", "master");
              this.masterModifyData("CP_C_REGION_AREA_id", "master");
            }
          },
        ],
        formValue: {
          CPCREGIONALIAS: "",
          REGION_TYPE: "",
        },
        ruleValidate: {
          CPCREGIONALIAS: [
            {
              required: true,
              message: " ",
            },
          ],
          REGION_TYPE: [
            {
              required: true,
              message: " ",
            },
          ],
        },
      },
      // 新增区域
      RegionFormConfig: {
        formData: [
          {
            style: "input",
            label: $i18n.t('form_label.dc'), // 区域编码
            value: "CP_C_REGION_ADD_ECODE",
            colname: "CP_C_REGION_ADD_ECODE",
            width: "8",
            disabled: false,
            regx: /^(\s*|\d+)$/,
            placeholder: "Only numbers",
            inputChange: () => {
              this.masterModifyData("CP_C_REGION_ADD_ECODE", "master");
            },
          },
          {
            style: "input",
            label: $i18n.t('form_label.dd'), // 区域名称
            value: "CP_C_REGION_ADD_ENAME",
            colname: "CP_C_REGION_ADD_ENAME",
            width: "8",
            disabled: false,
            inputChange: () => {
              this.masterModifyData("CP_C_REGION_ADD_ENAME", "master");
            },
          },
          {
            style: "radio",
            label: $i18n.t('form_label.df'), // 区域类型
            value: "REGION_TYPE", // 输入框的值
            colname: "REGION_TYPE", // 输入框的值
            width: "18", // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              {
                label: $i18n.t('form_label.dg'), // 国家
                value: "0",
              },
              {
                label: $i18n.t('form_label.dh'), // 省份
                value: "1",
              },
              {
                label: $i18n.t('form_label.di'), // 市级
                value: "2",
              },
              {
                label: $i18n.t('form_label.dj'), // 区级
                value: "3",
              },
            ],
            radioChange: () => {
              const val = this.formConfig.formValue.REGION_TYPE;
              this.masterModifyData("REGION_TYPE", "master");
              let beforeArr = [];
              let afterArr = [];
              switch (val) {
                case "0":
                  // 选国家，都不可编辑，且清空
                  beforeArr = [];
                  afterArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                    "CP_C_REGION_CITY_ID",
                  ];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case "1":
                  // 选省份，仅展示国家
                  beforeArr = ["CP_C_REGION_COUNTRY_ID"];
                  afterArr = ["CP_C_REGION_PROVINCE_ID", "CP_C_REGION_CITY_ID"];
                  this.changeInput(beforeArr, afterArr);
                  break;
                case "2":
                  // 勾选市级时，则只展示“国家、关联省”
                  beforeArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                  ];
                  afterArr = ["CP_C_REGION_CITY_ID"];
                  this.changeInput(beforeArr, afterArr);
                  break;
                default:
                  // 勾选区级时，则只展示“国家、关联省、关联市”
                  beforeArr = [
                    "CP_C_REGION_COUNTRY_ID",
                    "CP_C_REGION_PROVINCE_ID",
                    "CP_C_REGION_CITY_ID",
                  ];
                  afterArr = [];
                  this.changeInput(beforeArr, afterArr);
                  break;
              }
            },
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_COUNTRY_ID",
            style: "popInput", // 输入框弹框单多选
            width: "8",
            itemdata: {
              colid: 168556, // 当前字段的ID
              colname: "CP_C_REGION_COUNTRY_ID", // 当前字段的名称
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: $i18n.t('form_label.dg'), // 国家
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              const drpArr = ["CP_C_REGION_PROVINCE_ID", "CP_C_REGION_CITY_ID"];
              this.formConfig.formValue.CP_C_REGION_COUNTRY_ID = val;
              this.formConfig.formValue.CP_C_REGION_COUNTRY_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_COUNTRY_ID",
                this.modify,
                "CP_C_REGION_COUNTRY_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_COUNTRY_ID", "master");
              this.masterModifyData("CP_C_REGION_COUNTRY_id", "master");
            },
            InputEnter: (val) => {
              const drpArr = ["CP_C_REGION_PROVINCE_ID", "CP_C_REGION_CITY_ID"];
              this.formConfig.formValue.CP_C_REGION_COUNTRY_ID = val;
              this.formConfig.formValue.CP_C_REGION_COUNTRY_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_COUNTRY_ID",
                this.modify,
                "CP_C_REGION_COUNTRY_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_COUNTRY_ID", "master");
              this.masterModifyData("CP_C_REGION_COUNTRY_id", "master");
            }
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_PROVINCE_ID",
            style: "popInput", // 输入框弹框单多选
            width: "8",
            inputList: [],
            itemdata: {
              colid: 166974, // 当前字段的ID
              colname: "CP_C_REGION_PROVINCE_ID", // 当前字段的名称
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dk'), // 关联省
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_COUNTRY_ID",
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              const drpArr = ["CP_C_REGION_CITY_ID"];
              this.formConfig.formValue.CP_C_REGION_PROVINCE_ID = val;
              this.formConfig.formValue.CP_C_REGION_PROVINCE_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_PROVINCE_ID",
                this.modify,
                "CP_C_REGION_PROVINCE_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_PROVINCE_ID", "master");
              this.masterModifyData("CP_C_REGION_PROVINCE_id", "master");
            },
            InputEnter: (val) => {
              const drpArr = ["CP_C_REGION_CITY_ID"];
              this.formConfig.formValue.CP_C_REGION_PROVINCE_ID = val;
              this.formConfig.formValue.CP_C_REGION_PROVINCE_id = val.pid;
              this.formConfig = this.emptyData(
                this.formConfig,
                "CP_C_REGION_PROVINCE_ID",
                this.modify,
                "CP_C_REGION_PROVINCE_id",
                val,
                drpArr
              );
              this.masterModifyData("CP_C_REGION_PROVINCE_ID", "master");
              this.masterModifyData("CP_C_REGION_PROVINCE_id", "master");
            }
          },
          {
            version: "1.4",
            colname: "CP_C_REGION_CITY_ID",
            style: "popInput", // 输入框弹框单多选
            width: "8",
            inputList: [],
            itemdata: {
              colid: 167077, // 当前字段的ID
              colname: "CP_C_REGION_CITY_ID", // 当前字段的名称
              fkdisplay: "drp", // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              name: $i18n.t('form_label.dl'), // 关联市
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: "", // 这个是选择的值
              pid: "",
              refcolval: {
                fixcolumn: "C_UP_ID",
                expre: "equal",
                srccol: "CP_C_REGION_PROVINCE_ID",
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log("val::", val);
              // if (!val.pid) return;
              this.formConfig.formValue.CP_C_REGION_CITY_ID = val;
              this.masterModifyData("CP_C_REGION_CITY_ID", "master");
              this.masterModifyData("CP_C_REGION_CITY_id", "master");
            },
            InputEnter: (val) => {
              this.formConfig.formValue.CP_C_REGION_CITY_ID = val;
              this.masterModifyData("CP_C_REGION_CITY_ID", "master");
              this.masterModifyData("CP_C_REGION_CITY_id", "master");
            }
          },
        ],
        formValue: {
          CP_C_REGION_ADD_ECODE: "",
          CP_C_REGION_ADD_ENAME: "",
          REGION_TYPE: "",
          CP_C_REGION_COUNTRY_ID: {},
          CP_C_REGION_PROVINCE_ID: {},
          CP_C_REGION_CITY_ID: {},
        },
        ruleValidate: {
          CP_C_REGION_ADD_ECODE: [
            {
              required: true,
              message: " ",
            },
          ],
          CP_C_REGION_ADD_ENAME: [
            {
              required: true,
              message: " ",
            },
          ],
          REGION_TYPE: [
            {
              required: true,
              message: " ",
            },
          ],
        },
      },
    };
  },
  watch: {},
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
  },
  async mounted() {
    const self = this;
  },
  created() {
    this.$nextTick(() => {
      const self = this;
      if (self.customizedModuleName == "ADDALIAS") {
        self.formConfig = self.AliasFormConfig;
      } else {
        self.formConfig = self.RegionFormConfig;
      }
      self.relationShip();
    });
  },
  methods: {
    // 新增别名-保存
    async saveAlias() {
      const self = this;
      /* =========== 保存校验 start =========== */
      let valueArr = ["CPCREGIONALIAS", "REGION_TYPE"];
      let drpArr = [];
      switch (self.formConfig.formValue.REGION_TYPE) {
        case "0":
          drpArr.push("CP_C_REGION_COUNTRY_ID");
          break;
        case "1":
          drpArr.push("CP_C_REGION_COUNTRY_ID", "CP_C_REGION_PROVINCE_ID");
          break;
        case "2":
          drpArr.push(
            "CP_C_REGION_COUNTRY_ID",
            "CP_C_REGION_PROVINCE_ID",
            "CP_C_REGION_CITY_ID"
          );
          break;
        case "3":
          drpArr.push(
            "CP_C_REGION_COUNTRY_ID",
            "CP_C_REGION_PROVINCE_ID",
            "CP_C_REGION_CITY_ID",
            "CP_C_REGION_AREA_ID"
          );
          break;
        default:
          break;
      }
      const mes = $omsUtils.validatorNotEmpty(
        self.formConfig,
        valueArr,
        drpArr
      );
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      const CPCREGIONALIAS = self.formConfig.formValue.CPCREGIONALIAS;
      const REGIONTYPE = self.formConfig.formValue.REGION_TYPE;
      let C_UP_ID = "";
      switch (REGIONTYPE) {
        case "1":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.pid;
          break;
        case "2":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.pid;
          break;
        case "3":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_CITY_ID.pid;
          break;
        default:
          C_UP_ID = null;
          break;
      }
      let param = {
        CPCREGIONALIAS, // 别名
        REGIONTYPE, // 区域类型
        CP_C_REGION_COUNTRY_ID: self.formConfig.formValue.CP_C_REGION_COUNTRY_ID
          ? self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.pid
          : "",
        CP_C_REGION_PROVINCE_ID: self.formConfig.formValue
          .CP_C_REGION_PROVINCE_ID
          ? self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.pid
          : "",
        CP_C_REGION_CITY_ID: self.formConfig.formValue.CP_C_REGION_CITY_ID
          ? self.formConfig.formValue.CP_C_REGION_CITY_ID.pid
          : "",
        CP_C_REGION_AREA_ID: self.formConfig.formValue.CP_C_REGION_AREA_ID
          ? self.formConfig.formValue.CP_C_REGION_AREA_ID.pid
          : "",
      };
      if (C_UP_ID) {
        param.C_UP_ID = C_UP_ID; // 上级
      }
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.basicData.saveAlias(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        self.backable = true;
        self.$Message.success(message || $i18n.t("modalTips.z9"));
        this.$comUtils.tabCloseAppoint(this);
        this.$store.commit("customize/TabOpen", {
          id: data,
          type: "action",
          name: "NATIONALPROVINCIALMUNICIPALEDIT",
          label: $i18n.t('menu.a5'), // 国家省市区编辑
        });
      }
    },
    // 新增区域-保存
    async saveRegion() {
      const self = this;
      /* =========== 保存校验 start =========== */
      let valueArr = [
        "CP_C_REGION_ADD_ECODE",
        "CP_C_REGION_ADD_ENAME",
        "REGION_TYPE",
      ];
      let drpArr = [];
      if (self.formConfig.formValue.REGION_TYPE == "1") {
        drpArr.push("CP_C_REGION_COUNTRY_ID");
      }
      if (self.formConfig.formValue.REGION_TYPE == "2") {
        drpArr.push("CP_C_REGION_COUNTRY_ID", "CP_C_REGION_PROVINCE_ID");
      }
      if (self.formConfig.formValue.REGION_TYPE == "3") {
        drpArr.push(
          "CP_C_REGION_COUNTRY_ID",
          "CP_C_REGION_PROVINCE_ID",
          "CP_C_REGION_CITY_ID"
        );
      }
      const mes = $omsUtils.validatorNotEmpty(
        self.formConfig,
        valueArr,
        drpArr
      );
      if (mes) {
        this.$message.error(mes);
        return false;
      }
      /* =========== 保存校验 end =========== */
      const CP_C_REGION_ADD_ECODE =
        self.formConfig.formValue.CP_C_REGION_ADD_ECODE;
      const CP_C_REGION_ADD_ENAME =
        self.formConfig.formValue.CP_C_REGION_ADD_ENAME;
      const REGION_TYPE = self.formConfig.formValue.REGION_TYPE;
      let C_UP_ID = "";
      switch (REGION_TYPE) {
        case "1":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.pid;
          break;
        case "2":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.pid;
          break;
        case "3":
          C_UP_ID = self.formConfig.formValue.CP_C_REGION_CITY_ID.pid;
          break;
        default:
          C_UP_ID = null;
          break;
      }
      const CP_C_REGION_COUNTRY_ID =
        self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.pid; // 国家ID
      const CP_C_REGION_COUNTRY_ENAME =
        self.formConfig.formValue.CP_C_REGION_COUNTRY_ID.valuedata; //
      const CP_C_REGION_PROVINCE_ID =
        self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.pid; // 省ID
      const CP_C_REGION_PROVINCE_ENAME =
        self.formConfig.formValue.CP_C_REGION_PROVINCE_ID.valuedata; //
      const CP_C_REGION_CITY_ID =
        self.formConfig.formValue.CP_C_REGION_CITY_ID.pid; // 市ID
      const CP_C_REGION_CITY_ENAME =
        self.formConfig.formValue.CP_C_REGION_CITY_ID.valuedata; //
      let param = {
        CP_C_REGION_ADD_ECODE, // 区域编码
        CP_C_REGION_ADD_ENAME, // 区域名称
        REGION_TYPE, // 省市区类型
      };
      if (C_UP_ID) {
        param.C_UP_ID = C_UP_ID; // 上级
      }
      if (CP_C_REGION_COUNTRY_ID) {
        param.CP_C_REGION_COUNTRY_ID = CP_C_REGION_COUNTRY_ID;
        param.CP_C_REGION_COUNTRY_ENAME = CP_C_REGION_COUNTRY_ENAME;
      }
      if (CP_C_REGION_PROVINCE_ID) {
        param.CP_C_REGION_PROVINCE_ID = CP_C_REGION_PROVINCE_ID;
        param.CP_C_REGION_PROVINCE_ENAME = CP_C_REGION_PROVINCE_ENAME;
      }
      if (CP_C_REGION_CITY_ID) {
        param.CP_C_REGION_CITY_ID = CP_C_REGION_CITY_ID;
        param.CP_C_REGION_CITY_ENAME = CP_C_REGION_CITY_ENAME;
      }
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.basicData
        .saveRegion({ V_CP_C_REGION_ALIAS: param, OBJID: "-1" })
        .catch(() => {
          this.loading = false;
        });
      this.loading = false;
      if (code === 0) {
        self.backable = true;
        self.$Message.success(message || $i18n.t("modalTips.z9"));
        this.$comUtils.tabCloseAppoint(this);
        this.$store.commit("customize/TabOpen", {
          id: data,
          type: "action",
          name: "NATIONALPROVINCIALMUNICIPALEDIT",
          label: $i18n.t('menu.a5'), // 国家省市区编辑
        });
      }
    },

    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
      }
      const masterArr = Object.keys(self.modify.master);
      if (masterArr.length) {
        this.$Modal.info({
          className: 'ark-dialog',
          title: $i18n.t("modalTitle.tips"), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
          mask: true,
          showCancel: true,
          okText: $i18n.t("common.determine"), // 确定
          cancelText: $i18n.t("common.cancel"), // 取消
          onOk: () => {
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      this.$comUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit("global/tabOpen", {
        tableId: 10288,
        type: "S",
        tableName: "V_CP_C_REGION_ALIAS",
        label: $i18n.t('menu.b4'), // 国家省市区
        back: true,
      });
    },
    /* --------------------- 工具函数： --------------------- */
    // 过滤条件
    relationShip() {
      if (this.customizedModuleName == "ADDALIAS") {
        this.querItem("CP_C_REGION_AREA_ID").inputList.push(
          this.querItem("CP_C_REGION_CITY_ID").itemdata
        );
        this.querItem("CP_C_REGION_CITY_ID").inputList.push(
          this.querItem("CP_C_REGION_PROVINCE_ID").itemdata
        );
        this.querItem("CP_C_REGION_PROVINCE_ID").inputList.push(
          this.querItem("CP_C_REGION_COUNTRY_ID").itemdata
        );
      } else {
        this.querItem("CP_C_REGION_CITY_ID").inputList.push(
          this.querItem("CP_C_REGION_PROVINCE_ID").itemdata
        );
        this.querItem("CP_C_REGION_PROVINCE_ID").inputList.push(
          this.querItem("CP_C_REGION_COUNTRY_ID").itemdata
        );
      }
    },
    querItem(key) {
      // 根据colname遍历查询formData子项
      return this.formConfig.formData.find((item) => item.colname == key);
    },
    keyDown(e) {
      // console.log(e);
    },
    // 控制单选展示下拉项，且清空afterArr的value
    changeInput(beforeArr, afterArr) {
      this.formConfig.formData.forEach((item) => {
        if (afterArr.includes(item.colname)) {
          item.itemdata.readonly = true;
          item.itemdata.isnotnull = false;
          item.itemdata.valuedata = "";
        }
        if (beforeArr.includes(item.colname)) {
          item.itemdata.readonly = false;
          item.itemdata.isnotnull = true;
        }
      });
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) {
      const self = this;
      self.modify[obj][ecode] = self.formConfig.formValue[ecode];
    },
    /**
     * 清空省市区（eg.国家变了之后，清空省市区）
     * @key 变更字段
     * @drpArr 待清空的drp类型
     * * 仅适用于新增，因为没有监听初始化的值
     */
    emptyData(form, key = "", before, beforeKey, val, drpArr = []) {
      const fD = form.formData;
      let flag = false;
      fD.forEach((element) => {
        if (element.colname == key) {
          if (before.master[beforeKey] && val.pid == before.master[beforeKey]) {
            flag = true;
          }
        }
        if (!flag && drpArr.includes(element.colname)) {
          element.itemdata.valuedata = "";
          element.itemdata.pid = "";
        }
      });
      form.formData = fD;
      return form;
    },
  },
};
