import { OmsButton } from 'burgeonComponents'
import { OmsForm } from 'burgeonComponents';
// import loading from 'burgeonComponents/loading';
import businessLabel from 'burgeonComponents/businessLabel';
import switchList from 'burgeonComponents/switchList';
import dateUtil from '@/assets/js/__utils__/date.js';
import subTable from 'burgeonComponents/subTable';

import axios from 'axios';
import service from '@/service/index';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';
import { OmsTable } from 'burgeonComponents'

export default {
  name: 'specialLogistics',
  components: {
    OmsButton,
    businessLabel,
    businessForm,
    switchList,
    OmsTable,
    subTable
  },
  mixins: [new modifycurrentLabel()],
  watch: {
    'formConfig.formValue': {
      //监听主表
      handler(val) {
        //页面加载完成后执行
        val && this.changeCount++;
        console.log(this.changeCount);
      },
      deep: true
    },
    dataCity: {
      //监听省市
      handler(val) {
        val && this.changeCount++;
        console.log(this.changeCount);
      },
      deep: true
    },
    'switchListdata.list': {
      //监听包裹属性
      handler(val) {
        val && this.changeCount++;
        // console.log(this.changeCount);
      },
      deep: true
    },
    "tableConfig3.data": {
      //监听指定商品
      handler(val) {
        val && this.changeCount++;
        // console.log(this.changeCount);
      },
      deep: true
    },
    'this.tableConfig2.businessFormConfig.formValue': {
      //监听仓库物流
      handler(val) {
        val && this.changeCount++;
        // console.log(this.changeCount);
      },
      deep: true
    }
  },

  data() {
    return {
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      baseInformation:$i18n.t('common.baseInformation'),
      meet_conditions:$i18n.t('form_label.meet_conditions'),
      increase:$i18n.t('btn.increase'),
      cancel:$i18n.t('common.cancel'),
      // tab切换配置
      labelList: [
        {
          label: $i18n.t("panel_label.ae"), // 执行动作
          value: 'PROPERTY'
        },
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'ST_SPECIAL_ASSIGN_LOGISTICS_LOG'
        }
      ],
      labelDefaultValue: 'PROPERTY', // 设置tab默认值，默认展示'自定义属性'

      changeCount: 0, //判断数据是否修改过
      force: 0,
      loading: false,
      id: '',
      value9: '',
      switch1: false,
      modal2: false,
      modal3: false,
      panelDefaultValue2: "panel_baseInfo2",
      panelDefaultValue: 'panel_baseInfo', // 设置默认打开'基本信息'
      panelDefaultValue1: 'panel_baseInfo1', // 设置默认打开'基本信息'
      labelDefaultValue: 'PROPERTY', // 设置tab默认值，默认展示'自定义属性'
      btnConfig: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.save'), // 保存
            size: '', // 按钮大小
            isShow: false,
            webname: this.$route.params.customizedModuleName + "_save",
            disabled: false, // 按钮禁用控制
            btnclick: this.fnSave
          },
          {
            isShow: false,
            webname: this.$route.params.customizedModuleName + "_back",
            text: $i18n.t('btn.back'),
            btnclick: this.back
          }
        ]
      },
      btnConfig2: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            type: 'primary',
            text: $i18n.t('btn.increase'),//'添加',
            disabled: false,
            btnclick: this.fntableAdd
          },
          {
            type: 'warning',
            text: $i18n.t('common.cancel'), // 取消
            disabled: false,
            btnclick: this.fncancel
          }
        ]
      },
     
      formConfig: {
        formData: [

          {
            version: '1.4',
            colname: 'cpCShopTitle',
            style: 'popInput', // 输入框弹框单多选
            label: $i18n.t('table_label.shopName'), // 店铺名称
            width: '10',
            itemdata: {
              col: 1,
              colid: 172126, // 当前字段的ID
              colname: 'cpCShopTitle', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('table_label.shopName'), // 店铺名称
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
              reftableid: 10285, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '' // 啥 ？？？
            },
            oneObj: val => {
              // 选中触发事件
              this.formConfig.formValue.cpCShopIds = val.pid;
            }
          },
          {
            style: 'checkbox',
            colname: 'billType',
            label: '单据类型',
            width: '24',
            checkboxChange: val => {
              console.log(val);
              val.forEach(em => {
                if (em == 0) {
                  this.formConfig.formValue.billType = ['0', '1', '32', '16'];
                }
              });
            },
            options: [
              {
                label: '全部',
                value: '0'
              },
              {
                label: '普通订单',
                value: '1'
              },
              {
                label: '预售订单',
                value: '32'
              },
              {
                label: '货到付款订单',
                value: '16'
              }
            ]
          },

          {
            style: 'radio',
            label: '日期类型',
            value: 'dateType',
            colname: 'dateType',
            width: '6',
            disabled: false,
            options: [
              {
                label: '下单日期',
                value: 1
              }
            ]
          },
          {
            style: 'date',
            type: 'datetimerange',
            label: '时间范围',
            colname: 'Time',
            value: '',
            width: '12',
            disabled: false,
            onChange: () => {
              this.formConfig.formValue.Time[0] && (this.formConfig.formValue.beginTime = dateUtil.getFormatDate(this.formConfig.formValue.Time[0], 'yyyy-MM-dd HH:mm:ss'))
              this.formConfig.formValue.Time[1] && (this.formConfig.formValue.endTime = dateUtil.getFormatDate(this.formConfig.formValue.Time[1], 'yyyy-MM-dd') + " 23:59:59")
            }
          },
          {
            style: 'input',
            label: '优先级',
            colname: 'priority',
            width: '10',
            regx: /^[0-9]*$/,
            disabled: false,
            maxlength: 11,
            inputChange: () => { }
          },

          {
            style: 'radio',
            label: '指定地址',
            colname: 'specifyAddressType',
            width: '24',
            options: [
              {
                label: '包含',
                value: 1
              },
              {
                label: '排除',
                value: 2
              }
            ],
            inputChange: () => { }
          },

        ],
        formValue: {

          billType: [], //单据类""
          cpCShopIds: '', //店铺id
          dateType: 1, //日期类型
          beginTime: '', //开始时间
          endTime: '', //结束时间
          priority: '9', //优先级
          Time: [],
          specifyAddressType: '' //指向地址
        },
        ruleValidate: {
          billType: [{ required: true, message: '' }],
          dateType: [{ required: true, message: '' }],
          priority: [{ required: true, message: '' }],
          Time: [{ required: true, message: '' }]
        }
      },
      formConfighead: {
        formData: [
          {
            style: null,
            label: $i18n.t('form_label.bc'), // 策略ID
            colname: 'ecode',
            width: '6',
            disabled: true,
            inputChange: () => { }
          },
          {
            style: 'input',
            label: $i18n.t('form_label.bd'), // 策略名称
            value: 'ename',
            colname: 'ename',
            width: '6',
            maxlength: 200,
            disabled: false,
            inputChange: () => { }
          },
          {
            style: 'date',
            type: 'datetime',
            label: $i18n.t('form_label.be'), // 生效开始时间
            colname: 'validTime',
            width: '6',
            disabled: false,
            onChange: () => {
              this.formConfighead.formValue.validTime = dateUtil.getFormatDate(this.formConfighead.formValue.validTime, 'yyyy-MM-dd HH:mm:ss')

            }
          },
          {
            style: 'date',
            type: 'datetime',
            label: $i18n.t('form_label.bf'), // 生效结束时间
            colname: 'invalidTime',
            value: '',
            width: '6',
            disabled: false,
            onChange: () => {

              this.formConfighead.formValue.invalidTime = $omsUtils.defaultEndTime(this.formConfighead.formValue.invalidTime, this.formConfighead.formValue.invalidTime)

            }
          },
        ],
        formValue: {
          ecode: '',

          validTime: '', //生效开始时间
          invalidTime: '', // 生效结束时间
          ename: '', //方案名称
        },
        ruleValidate: {
          validTime: [{ required: true, message: '' }],
          invalidTime: [{ required: true, message: '' }],
          ecode: [{ required: true, message: '' }],
          ename: [{ required: true, message: '' }],
        }
      },
      // formConfig1: {
      //   formData: [
      //     {
      //       version: '1.4',
      //       colname: 'cpCPhyWarehouseEname',
      //       style: 'popInput', // 输入框弹框单多选
      //       width: '10',
      //       itemdata: {
      //         col: 1,
      //         colid: 172127, // 当前字段的ID
      //         colname: 'cpCPhyWarehouseEname', // 当前字段的名称
      //         datelimit: 'all',
      //         display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
      //         fkdisplay: 'mrp', // 外键关联类型
      //         isfk: true, // 是否有fk键
      //         isnotnull: false, // 是否必填
      //         isuppercase: false, // 是否转大写
      //         length: 65535, // 最大长度是多少
      //         name: '仓库名称', // 赔付类型
      //         readonly: false, // 是否可编辑，对应input   readonly属性
      //         reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
      //         reftableid: 10285, // 对应的表ID
      //         row: 1,
      //         statsize: -1,
      //         type: 'STRING', // 这个是后台用的
      //         valuedata: '', // 这个是选择的值
      //         isBackRowItem: true,
      //         pid: '' // 啥 ？？？
      //       },
      //       oneObj: val => {
      //         val[0] && this.cpCPhyWarehousedata.push(val[0]);
      //         this.WarehouseItemListobj.cpCPhyWarehouseEname = this.tableConfig2.businessFormConfig.formData[0].itemdata.pid;

      //         // 选中触发事件
      //       }
      //     },
      //     {
      //       version: '1.4',
      //       colname: 'cpCPhyWarehouseEname',
      //       style: 'popInput', // 输入框弹框单多选
      //       width: '10',
      //       itemdata: {
      //         col: 1,
      //         colid: 172128, // 当前字段的ID
      //         colname: 'cpCPhyWarehouseEname', // 当前字段的名称
      //         datelimit: 'all',
      //         display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
      //         fkdisplay: 'mrp', // 外键关联类型
      //         isfk: true, // 是否有fk键
      //         isnotnull: false, // 是否必填
      //         isuppercase: false, // 是否转大写
      //         length: 65535, // 最大长度是多少
      //         name: '物流公司', // 赔付类型
      //         readonly: false, // 是否可编辑，对应input   readonly属性
      //         reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
      //         reftableid: 10285, // 对应的表ID
      //         row: 1,
      //         statsize: -1,
      //         type: 'STRING', // 这个是后台用的
      //         valuedata: '', // 这个是选择的值
      //         isBackRowItem: true,
      //         pid: '' // 啥 ？？？
      //       },
      //       oneObj: val => {

      //         val[0] && this.cpCLogisticsdata.push(val[0]);
      //         // 选中触发事件
      //         this.WarehouseItemListobj.cpCLogisticsEname = this.tableConfig2.businessFormConfig.formData[1].itemdata.pid;
      //         this.cpCLogisticsdataname = this.tableConfig2.businessFormConfig.formData[1].itemdata.valuedata;
      //       }
      //     }
      //   ],
      //   formValue: {},
      //   ruleValidate: {}
      // },
      cpCPhyWarehousedata: [],
      cpCLogisticsdata: [],
      cpCLogisticsdataname: '',
      formConfig2: {
        formData: [
          {
            version: '1.4',
            colname: 'CP_C_REGION_PROVINCE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            itemdata: {
              col: 1,
              colid: 166974, // 当前字段的ID
              colname: 'CP_C_REGION_PROVINCE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '所在省', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PROVINCE', // 对应的表
              reftableid: 10286, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: ''
            },
            oneObj: val => {
              this.formConfig2.formValue.cpCRegionProvinceEname = val.valuedata;
              this.formConfig2.formValue.cpCRegionProvinceId = val.pid;
              this.formConfig2.formValue.cpCRegionCityEname = ""
              this.formConfig2.formValue.cpCRegionCityId = ""

            }
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_CITY',
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 167077, // 当前字段的ID
              colname: 'CP_C_REGION_CITY', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '所在市', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_CITY', // 对应的表
              reftableid: 10285, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
              isBackRowItem: true, //f
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'CP_C_REGION_PROVINCE_ID'
              }
            },
            oneObj: val => {
              val.forEach(em => {
                let obj = {};
                for (const key in em) {
                  obj[key] = em[key].val;
                }
                this.cityArrData.push(obj);
              });

              this.formConfig2.formValue.cpCRegionCityEname = this.querItem('CP_C_REGION_CITY').itemdata.valuedata;
              this.formConfig2.formValue.cpCRegionCityId = this.querItem('CP_C_REGION_CITY').itemdata.pid;
            }
          }
        ],
        formValue: {
          cpCRegionProvinceEname: '',
          cpCRegionProvinceId: '',
          cpCRegionCityEname: '',
          cpCRegionCityId: ''
        },
        ruleValidate: {}
      },
      columns2: [
        {
          title: $i18n.t('table_label.serialNo'), // 序号
          key: 'index'
        },
        {
          title: $i18n.t('table_label.itemNo01'), // SPU编码
          key: 'psCProEcode'
        },
        {
          title: 'SKU编码',
          key: 'psCSkuEcode'
        },
        {
          title: $i18n.t("table_label.itemNo02"), // SPU名称
          key: 'psCProEname'
        },
        {
          title: $i18n.t('form_label.skuName'), // SKU名称
          key: 'psCSkuEname'
        },
        {
          title: $i18n.t('table_label.operation'), // 操作
          key: 'action',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteSku(params.row.id);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      data3: [],
      switchListdata: {
        label: '包裹属性',
        list: [
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            name: '商品数量',
            symbol: '至',
            pkgAttributeType: 1,
            regx: /^[1-9]\d*$/,
            regx2: /^[1-9]\d*$/,
            maxlength: 18,
            type: '件'
          },
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            name: '单据金额',
            pkgAttributeType: 2,
            symbol: '至',
            regx: /^\d+(\.\d{0,2})?$/,
            regx2: /^\d+(\.\d{0,2})?$/,
            maxlength: 18,
            type: '元'
          },
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            pkgAttributeType: 3,
            name: '包裹重量',
            symbol: '至',
            regx: /^\d+(\.\d{0,2})?$/,
            regx2: /^\d+(\.\d{0,2})?$/,
            maxlength: 18,
            type: 'kg'
          }
        ]
      },
      tableConfig: {
        ECODE: '', // 编码查询条件
        ENAME: '', // 名称查询条件
        pageShow: true,
        total: 10,
        pageSize: 10,
        current: 1,
        isShowSelection: true,
        indexColumn: true, // 是否展示序号列
        updateData: [],
        columns: [],
        data: []
      },
      tableConfig2: {
        businessFormConfig: {
          formData: [
            {
              version: '1.4',
              colname: 'cpCPhyWarehouseEname',
              style: 'popInput', // 输入框弹框单多选
              width: '10',
              itemdata: {
                col: 1,
                colid: 172127, // 当前字段的ID
                colname: 'cpCPhyWarehouseEname', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'mrp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '仓库名称', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
                reftableid: 10285, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                isBackRowItem: true,
                pid: '' // 啥 ？？？
              },
              oneObj: val => {
                val[0] && this.cpCPhyWarehousedata.push(val[0]);
                this.WarehouseItemListobj.cpCPhyWarehouseEname = this.tableConfig2.businessFormConfig.formData[0].itemdata.pid;
  
                // 选中触发事件
              }
            },
            {
              version: '1.4',
              colname: 'cpCPhyWarehouseEname',
              style: 'popInput', // 输入框弹框单多选
              width: '10',
              itemdata: {
                col: 1,
                colid: 172128, // 当前字段的ID
                colname: 'cpCPhyWarehouseEname', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'mrp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '物流公司', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
                reftableid: 10285, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                isBackRowItem: true,
                pid: '' // 啥 ？？？
              },
              oneObj: val => {
  
                val[0] && this.cpCLogisticsdata.push(val[0]);
                // 选中触发事件
                this.WarehouseItemListobj.cpCLogisticsEname = this.tableConfig2.businessFormConfig.formData[1].itemdata.pid;
                this.cpCLogisticsdataname = this.tableConfig2.businessFormConfig.formData[1].itemdata.valuedata;
              }
            }
          ],
          formValue: {},
          ruleValidate: {}
        },
        businessButtonConfig:{
            typeAll: 'default',
            buttons: [
              {
                type: 'primary',
                text: $i18n.t('btn.increase'),//'添加',
                disabled: false,
                btnclick: this.foottable
              },
              {
                type: 'warning',
                text: $i18n.t('btn.delete'), // 删除
                disabled: false,
                btnclick: this.deleteLogistics
              }
            ]
        },
        indexColumn: false,
        isShowSelection: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: $i18n.t('table_label.serialNo'), // 序号
            key: 'index'
          },
          {
            title: '仓库名称',
            key: 'cpCPhyWarehouseEname'
          },
          {
            title: '物流公司',
            key: 'cpCLogisticsEname'
          }
        ],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: false, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        current: 1,
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      tableConfig3: {
        indexColumn: false,
        isShowSelection: false,
        columns: [
          {
            title: $i18n.t('table_label.serialNo'), // 序号
            key: 'index'
          },
          {
            title: $i18n.t('table_label.itemNo01'), // SPU编码
            key: 'psCProEcode'
          },
          {
            title: 'SKU编码',
            key: 'psCSkuEcode'
          },
          {
            title: $i18n.t("table_label.itemNo02"), // SPU名称
            key: 'psCProEname'
          },
          {
            title: $i18n.t('form_label.skuName'), // SKU名称
            key: 'psCSkuEname'
          },
          {
            title: $i18n.t('table_label.operation'), // 操作
            key: 'action',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.deleteSku(params.row.id);
                      }
                    }
                  },
                  '删除'
                )
              ]);
            }
          }
        ],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: false, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        current: 1,
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      columnsCity: [
        {
          title: '省',
          key: 'cpCRegionProvinceEname'
        },
        {
          title: '城市',
          key: 'cpCRegionCityEname'
        },
        {
          title: $i18n.t('table_label.operation'), // 操作
          key: 'action',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteAddress(params.row.cpCRegionProvinceId);
                    }
                  }
                },
                $i18n.t('btn.delete')//'删除'
              )
            ]);
          }
        }
      ],
      dataCity: [],
      specialAssignLogistics: {}, //主表数据
      specialAssignLogisticsAddressItemList: [], //指定地址
      specialAssignLogisticsPkgItemList: [], //包裹属性
      specialAssignLogisticsProItemList: [], //商品信息
      specialAssignLogisticsWarehouseItemList: [], //仓库物流入参
      WarehouseItemListobj: {
        cpCLogisticsEname: '',
        cpCPhyWarehouseEname: ''
      },
      customizedModuleName: '',
      tableCURRENT: 1,
      tableSIZE: 10,
      // tableCURRENT2: 1,
      // tableSIZE2: 10,
      total1: 10,
      total2: 10,
      isactive: '',
      cityArrData: [],
      inputvalue: "",
      inputvalue2: "",
      table4Data: [] //仓库物流选中的数据
    };
  },
  mounted() {
    this.init()
    this.getBtns()
  },
  methods: {
    getBtns() {
      $OMS2.omsUtils.getPermissions(this, '', { table: this.$route.params.customizedModuleName, type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res
        this.btnConfig.buttons.forEach(x => {
          ACTIONS.some(y => y.webname == x.webname) && (x.isShow = true)
        })

      })
    },
    init() {
      this.relationShip();
      let { customizedModuleId, customizedModuleName } = this.$route.params;
      this.customizedModuleName = customizedModuleName;
      if (customizedModuleId == 'New') {
        this.id = '-1';
      } else {
        this.id = customizedModuleId;

        this.querfrom(this.formConfighead.formData, 'ecode').style = 'input';
        this.queryById();
        this.queryAddressPages();
        this.queryProPages();
        this.queryLogisticsWarehousePages();

      }
    },
    fnreadonly(type) {
      if (type == 'Y') {
        //禁用主表数据
        this.formConfig.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.readonly = true;
          } else if (item.options) {
            item.options.forEach(em => {
              em.disabled = true;
            });
          } else {
            item.disabled = true;
          }
        });

        this.formConfighead.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.readonly = true;
          } else if (item.options) {
            item.options.forEach(em => {
              em.disabled = true;
            });
          } else {
            item.disabled = true;
          }
        });


        //禁用包裹属性
        this.switchListdata.list.forEach(em => {
          em.disabled = true;
        });
        //禁用仓库物流 
        this.tableConfig2.businessFormConfig.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.readonly = true;
          }
        });

        this.tableConfig2.businessButtonConfig.buttons.forEach(item => {
          item.disabled = true
        });
      } else {
        // this.querbtn(this.btnConfig.buttons, '停用').disabled = true

        //禁用主表数据
        this.formConfig.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.readonly = false;
          } else if (item.options) {
            item.options.forEach(em => {
              em.disabled = false;
            });
          } else {
            if (item.colname == 'ecode') {
              item.disabled = true;
            } else {
              item.disabled = false;
            }
          }
        });

        //禁用包裹属性
        this.switchListdata.list.forEach(em => {
          em.disabled = false;
        });
        //禁用仓库物流
        this.tableConfig2.businessFormConfig.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.readonly = false;
          }
        });
        this.tableConfig2.businessButtonConfig.buttons.forEach(item => {
          item.disabled = false
        });
      }
    },

    //仓库物流明细删除
    deleteLogistics() {

      if (this.table4Data.length > 0) {
        let arrid = [];
        this.table4Data.forEach(em => {
          arrid.push(em.cpCPhyWarehouseId);
        });
        let data = {
          ID: this.id,
          WAREHOUSE_IDS: arrid.join(',')
        };
        service.strategyPlatform.deleteLogistics(data).then(res => {
          this.$Message.success(res.data.message);
          this.queryLogisticsWarehousePages();
        });
      } else {
        this.$Message.warning( $i18n.t('modalTips.ja'));
      }
    },
    //商品属性删除
    deleteSku(id) {
      if (this.isactive == 'Y') {
        this.$Message.warning($i18n.t('modalTips.jb'));
        return;
      }
      if (this.id == "-1") {
        for (var i = 0; i < this.tableConfig3.data.length; i++) {
          if (this.tableConfig3.data[i].id == id) {
            this.tableConfig3.data.splice(i, 1);
          }
        }
        return
      }
      let data = {
        ID: this.id,
        SUB_IDS: id
      };
      service.strategyPlatform.deleteSku(data).then(res => {
        this.$Message.success(res.data.message);
        this.queryProPages();
      });
    },
    //删除省市
    deleteAddress(id) {
      if (this.isactive == 'Y') {
        this.$Message.warning($i18n.t('modalTips.jb'));
        return;
      }
      let data = {
        ID: this.id,
        PROVINCE_IDS: id
      };
      service.strategyPlatform.deleteAddress(data).then(res => {
        this.$Message.success(res.data.message);
        this.queryAddressPages();
      });
    },
    data1select(v) {
      this.table4Data = v;
    },
    tablepageA(v) {
      console.log(v);
      this.tableConfig3.current = v;
      this.queryProPages();
    },
    tablesizeA(v) {
      console.log(v);
      this.tableConfig3.pageSize = v;
      this.queryProPages();
    },
    tablepageB(v) {
      console.log(v);
      this.tableConfig2.current = v;
      this.queryLogisticsWarehousePages();
    },
    tablesizeB(v) {
      console.log(v);
      this.tableConfig2.pageSize = v;
      this.queryLogisticsWarehousePages();
    },

    queryById() {
      //物流策略-特殊物流方案-主表信息查询
      let data = {
        ID: this.id
      };
      service.strategyPlatform.specialAssignLogisticsqueryById(data).then(res => {
        if (res.data.code == 0) {
          let { specialAssignLogistics, specialAssignLogisticsPkgItemList, shopNames } = res.data.data;
          this.querfrom(this.formConfig.formData, 'cpCShopTitle').itemdata.valuedata = shopNames;

          this.isactive = specialAssignLogistics.isactive;

          //判断如果启用，就禁止编辑
          this.fnreadonly(this.isactive);

          //渲染主表
          let timearr = [];
          for (const v in this.formConfig.formValue) {
            for (const key in specialAssignLogistics) {
              if (v == key) {
                if (v == 'beginTime') {
                  timearr.push(new Date(specialAssignLogistics[key]));
                } else if (v == 'endTime') {
                  timearr.push(new Date(specialAssignLogistics[key]));
                } else if (v == 'billType') {
                  let len = this.querfrom(this.formConfig.formData, 'billType').options.length - 1;
                  let billTypearr = specialAssignLogistics[key].split(',');

                  if (billTypearr.length == len) {
                    billTypearr.push('0');
                    this.formConfig.formValue.billType = billTypearr;
                  } else {
                    this.formConfig.formValue.billType = billTypearr;
                  }
                } else if (v == 'cpCShopIds') {
                  this.querfrom(this.formConfig.formData, 'cpCShopTitle').itemdata.pid = specialAssignLogistics[key];
                } else {
                  this.formConfig.formValue[v] = specialAssignLogistics[key];
                }

              }
            }
          }
          this.formConfig.formValue.Time = timearr;

          for (const v in this.formConfighead.formValue) {
            for (const key in specialAssignLogistics) {
              if (v == key) {
                if (v == 'validTime') {
                  this.formConfighead.formValue[v] = new Date(specialAssignLogistics[key]);
                } else if (v == 'invalidTime') {
                  this.formConfighead.formValue[v] = new Date(specialAssignLogistics[key]);
                } else {
                  this.formConfighead.formValue[v] = specialAssignLogistics[key];
                }

              }
            }
          }

          //遍历包裹属性的数据
          specialAssignLogisticsPkgItemList.forEach(em => {
            this.switchListdata.list.forEach(item => {
              if (em.pkgAttributeType == item.pkgAttributeType) {
                item.val = em.isEnable == 1 ? true : false;
                item.value = em.beginVal;
                item.value2 = em.endVal;
                item.id = em.id
              }
            });
          });
        }
      });
    },
    queryProPages() {
      let data = {
        ID: this.id,
        CURRENT: this.tableConfig3.current,
        SIZE: this.tableConfig3.pageSize
      };
      //物流策略-特殊物流方案-商品属性明细分页查询
      service.strategyPlatform.queryProPages(data).then(res => {
        if (res.data.code == 0) {
          this.tableConfig3.data = res.data.data.records.map((em, index) => {
            em.index = index + 1 + (this.tableConfig3.current - 1) * this.tableConfig3.pageSize;
            return em;
          });
          this.tableConfig3.total = res.data.data.total;
        }
      });
    },
    queryLogisticsWarehousePages() {
      //物流策略-特殊物流方案-仓库物流明细分页查询
      let data = {
        ID: this.id,
        CURRENT: this.tableConfig2.current,
        SIZE: this.tableConfig2.pageSize
      };

      service.strategyPlatform.queryLogisticsWarehousePages(data).then(res => {
        if (res.data.code == 0) {
          this.tableConfig2.data = res.data.data.records.map((em, index) => {
            em.index = index + 1;
            return em;
          });
          this.tableConfig2.total = res.data.data.total;
        }
      });
    },
    //查询省市
    queryAddressPages() {
      let data = {
        ID: this.id,
        CURRENT: 1,
        SIZE: 10
      };
      service.strategyPlatform.queryAddressPages(data).then(res => {
        if (res.data.code == 0) {
          this.dataCity = res.data.data.records;
        }
      });
    },
    fncancelcity() {
      this.querItem('CP_C_REGION_CITY').itemdata.valuedata = '';
      this.querItem('CP_C_REGION_CITY').itemdata.pid = '';
      this.querItem('CP_C_REGION_PROVINCE_ID').itemdata.valuedata = '';
      this.querItem('CP_C_REGION_PROVINCE_ID').itemdata.pid = '';
    },
    fnok() {
      let CityID = this.formConfig2.formValue.cpCRegionCityId.split(',');
      this.cityArrData.forEach(em => {
        CityID.forEach(item => {
          if (item == em.ID) {
            let obj = {
              id: '-1',
              cpCRegionCityId: em.ID,
              cpCRegionCityEname: em.ENAME,
              cpCRegionCityEcode: em.ECODE,
              cpCRegionProvinceId: this.formConfig2.formValue.cpCRegionProvinceId,
              cpCRegionProvinceEname: this.formConfig2.formValue.cpCRegionProvinceEname
            };
            this.specialAssignLogisticsAddressItemList.push(obj);
          }
        });
      });
      if (CityID == "") {
        this.specialAssignLogisticsAddressItemList.push({
          id: "-1",
          cpCRegionProvinceEname: this.formConfig2.formValue.cpCRegionProvinceEname,
          cpCRegionProvinceId: this.formConfig2.formValue.cpCRegionProvinceId
        });
      }

      if (this.id != '-1') {
        this.fnSave(1);
      } else {
        console.log(this.specialAssignLogisticsAddressItemList);
        this.dataCity = this.specialAssignLogisticsAddressItemList;
      }
      this.querItem('CP_C_REGION_CITY').itemdata.valuedata = '';
      this.querItem('CP_C_REGION_CITY').itemdata.pid = '';
      this.querItem('CP_C_REGION_PROVINCE_ID').itemdata.valuedata = '';
      this.querItem('CP_C_REGION_PROVINCE_ID').itemdata.pid = '';
    },
    fnSave(type) {
      //type  1,2,3   1表示保存省市  2.表示商品保存  3.表示添加仓库物流
      //校验主表
      let keyarr = this.formConfig.ruleValidate;
      for (let key in keyarr) {
        for (let y in this.formConfig.formValue) {
          if (key == y) {
            if (!this.formConfig.formValue[key] && this.querfrom(this.formConfig.formData, key).style != null) {
              this.$Message.warning($i18n.t('modalTips.hg') + this.querfrom(this.formConfig.formData, key).label + '!');
              return;
            }
          }
        }
      }

      let formConfighead = this.formConfighead.ruleValidate;
      for (let key in formConfighead) {
        for (let y in this.formConfighead.formValue) {
          if (key == y) {
            if (!this.formConfighead.formValue[key] && this.querfrom(this.formConfighead.formData, key).style != null) {
              this.$Message.warning( $i18n.t('modalTips.hg') + this.querfrom(this.formConfighead.formData, key).label + '!');
              return;
            }
          }
        }
      }

      if (this.formConfig.formValue.billType.length == 0) {
        this.$Message.warning( $i18n.t('modalTips.jc'));
        return;
      }

      if (!this.formConfig.formValue.Time[0]) {
        this.$Message.warning($i18n.t('modalTips.jd'));
        return;
      }
      
      //校验包裹属性
      let listdata = this.switchListdata.list;
      for (let v of listdata) {
        if (v.val) {
          if (!v.value || !v.value2) {
            this.$Message.warning($i18n.t('modalTips.je'));
            return;
          }
          if (v.value2 < v.value) {
            this.$Message.warning( $i18n.t('modalTips.jf'));
            return;
          }
        }
      }

      //入参
      let data = {};
      if (type == 1) {
        data.specialAssignLogistics = { id: this.id };
        data.specialAssignLogisticsAddressItemList = this.specialAssignLogisticsAddressItemList;
      } else if (type == 2) {
        data.specialAssignLogistics = { id: this.id };
        this.specialAssignLogisticsProItemList = []
        //商品传参
        this.tableConfig.selectionData.forEach(em => {
          let { psCProId, psCProEcode, psCProEname, psCSkuId, psCSkuEcode, psCSkuEname } = em;
          let obj = {
            id: '-1',
            psCProId,
            psCProEcode,
            psCProEname,
            psCSkuId,
            psCSkuEcode,
            psCSkuEname
          };
          this.specialAssignLogisticsProItemList.push(obj);
        });
        data.specialAssignLogisticsProItemList = this.specialAssignLogisticsProItemList;
        this.tableConfig.selectionData = []

      } else if (type == 3) {
        data.specialAssignLogistics = { id: this.id };
        data.specialAssignLogisticsWarehouseItemList = this.specialAssignLogisticsWarehouseItemList;
      } else {
        //主表传参
        let { billType, cpCShopIds, dateType, beginTime, endTime, priority, specifyAddressType } = this.formConfig.formValue;
        let { ename, validTime, invalidTime, } = this.formConfighead.formValue;

        this.specialAssignLogistics = {
          id: this.id,
          validTime,
          invalidTime,
          ename,
          billType: billType.join(','),
          cpCShopIds,
          dateType,
          beginTime,
          endTime,
          priority,
          specifyAddressType
        };
        if (this.tableConfig) {
          if (this.tableConfig.selectionData) {
            //商品传参
            this.tableConfig.selectionData.forEach(em => {
              let { psCProId, psCProEcode, psCProEname, psCSkuId, psCSkuEcode, psCSkuEname } = em;
              let obj = {
                id: '-1',
                psCProId,
                psCProEcode,
                psCProEname,
                psCSkuId,
                psCSkuEcode,
                psCSkuEname
              };
              this.specialAssignLogisticsProItemList.push(obj);
            });
          }
        }

        //包裹属性
        this.switchListdata.list.forEach(item => {
          let obj = {
            id: item.id || "-1",
            pkgAttributeType: item.pkgAttributeType,
            isEnable: item.val ? 1 : 0,
            beginVal: item.value,
            endVal: item.value2
          };
          this.specialAssignLogisticsPkgItemList.push(obj);
        });

        data = {
          specialAssignLogistics: this.specialAssignLogistics,
          specialAssignLogisticsAddressItemList: this.specialAssignLogisticsAddressItemList,
          specialAssignLogisticsPkgItemList: this.specialAssignLogisticsPkgItemList,
          specialAssignLogisticsProItemList: this.specialAssignLogisticsProItemList,
          specialAssignLogisticsWarehouseItemList: this.specialAssignLogisticsWarehouseItemList
        };
      }

      service.strategyPlatform.specialAssignLogisticssave(data).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(res.data.message);
          if (type == 1) {
            this.queryAddressPages(); //查询省市
          } else if (type == 2) {
            this.queryProPages();
          } else if (type == 3) {
            this.WarehouseItemListobj = {
              cpCLogisticsEname: '',
              cpCPhyWarehouseEname: ''
            }
            this.queryLogisticsWarehousePages();
          } else {
            if (this.id == '-1') {
              this.init()
              this.$store.commit('global/tabOpen', {
                type: 'C',
                url: `/CUSTOMIZED/${this.customizedModuleName}/${res.data.data.objId}`,
                label:$i18n.t('panel_label.an'), //"特殊物流方案新增",
                customizedModuleName: this.customizedModuleName,
                customizedModuleId: res.data.data.objId
              })

            } else {
              this.pageback();
            }
          }

        }
      });
    },
    foottable() {
      //添加仓库物流
      for (const key in this.WarehouseItemListobj) {
        if (this.WarehouseItemListobj[key] == '') {
          this.$Message.warning($i18n.t('modalTips.jg'));
          return;
        }
      }
      this.WarehouseItemListobj.id = '-1';
      this.specialAssignLogisticsWarehouseItemList = this.WarehouseItemListobj


      if (this.id != '-1') {
        this.fnSave(3);
      } else {
        let ckArr = [];
        this.tableConfig2.data = [];
        if (this.cpCPhyWarehousedata.length > 0) {
          this.cpCPhyWarehousedata.forEach((em, index) => {
            let wareidarr = this.WarehouseItemListobj.cpCPhyWarehouseEname.split(',');
            wareidarr.forEach(id => {
              if (em.ID.val == id) {
                let obj = {
                  index: index + 1,
                  cpCPhyWarehouseEname: em.ENAME.val,
                  cpCPhyWarehouseId: em.ID.val,
                  cpCLogisticsId: this.WarehouseItemListobj.cpCLogisticsEname,
                  cpCLogisticsEname: this.cpCLogisticsdataname
                };
                ckArr.push(obj);
              }
            });
          });
        }
        this.tableConfig2.data = ckArr;
      }

      this.tableConfig2.businessFormConfig.formData[0].itemdata.pid = '';
      this.tableConfig2.businessFormConfig.formData[0].itemdata.valuedata = '';
      this.tableConfig2.businessFormConfig.formData[1].itemdata.pid = '';
      this.tableConfig2.businessFormConfig.formData[1].itemdata.valuedata = '';
    },
    // 过滤条件
    relationShip() {
      this.querItem('CP_C_REGION_CITY').inputList.push(this.querItem('CP_C_REGION_PROVINCE_ID').itemdata);
    },
    querfrom(form, key) {
      return form.find(item => item.colname == key);
    },
    // querbtn(form, key) {
    //   return form.find(item => item.text == key);
    // },
    querItem(key) {
      // 根据colname遍历查询formData子项
      return this.formConfig2.formData.find(item => item.colname == key);
    },
    /* --------------- 表格事件 --------------- */
    fntableAdd() {
      //添加商品
      if (this.tableConfig.selectionData && this.tableConfig.selectionData.length > 0) {
        if (this.id != '-1') {
          this.fnSave(2);
        } else {
          let arr = this.tableConfig3.data.concat(this.tableConfig.selectionData)
          var obj = {}
          var newArr = arr.reduce((cur, next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
          }, [])
          this.tableConfig3.data = newArr.map((em, index) => {
            em.index = index + 1
            return em
          })
        }
        this.modal3 = false;
      } else {
        this.$Message.warning($i18n.t('modalTips.jh') );
      }



    },
    onSelectAllA(e) {
      console.log(e);
      this.table4Data = e;
    },
    onSelectAllCancelA() {
      this.table4Data = [];
    },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.tableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.tableConfig.selectionData = e;
    },
    onSelectAll(e) {
      console.log(e);
      this.tableConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.tableConfig.selectionData = [];
    },
    pageChange(e) {
      this.tableConfig.pageIndex = e;
      this.fntable();
    },
    pageSizeChange(e) {
      this.tableConfig.pageSize = e;
      this.fntable();
    },
    fncancel() {
      this.tableConfig.ECODE = "" // 编码查询条件
      this.tableConfig.ENAME = "" // 名称查询条件
      this.modal3 = false;
    },
    fnkeyup(v, dom) {

      this.tableConfig.ECODE = dom.currentValue;
      this.fntable();
    },
    fnkeyup1(v, dom) {
      this.tableConfig.ENAME = dom.currentValue;
      this.fntable();
    },
    fnseek() {
      this.tableConfig.ECODE = '' // 编码查询条件
      this.tableConfig.ENAME = ''// 名称查询条件
      this.tableConfig.pageIndex = 1
      this.tableConfig.pageSize = 10
      this.fntable();
    },
    fntable() {
      if (this.isactive == 'Y') {
        this.$Message.warning($i18n.t('modalTips.ji'));
        return;
      }
      this.modal3 = true;
      axios({
        method: 'post',
        url: '/r3-ps/p/cs/ps/sku/v1/querySkuSpuPages',
        data: {
          SIZE: this.tableConfig.pageSize || 10, // 每页多少条
          CURRENT: this.tableConfig.pageIndex || 1, // 第几页
          ECODE: this.tableConfig.ECODE, // 编码查询条件
          ENAME: this.tableConfig.ENAME // 名称查询条件
        }
      }).then(res => {
        this.tableConfig.columns = res.data.data.columns;
        this.tableConfig.data = res.data.data.data;
        this.tableConfig.total = res.data.data.pageInfo.total;
      });
    },
    fnselect() {
      if (this.isactive == 'Y') {
        this.$Message.warning( $i18n.t('modalTips.ji'))
          //'启用状态，不可编辑！');
        return;
      }
      this.specialAssignLogisticsAddressItemList = []
      this.modal2 = true;
    },
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'PROPERTY') return;
      this.subTableConfig = {
        centerName: 'strategyPlatform',
        tablename: this.labelDefaultValue,
        pageShow: true,
        objid: this.id
      };
    },
    change(v) {
      console.log(v);
    },
    // 返回
    back() {
      if (this.id == '-1') {
        if (this.changeCount > 1) {
          this.$Modal.info({
            className: 'ark-dialog',
            title: $i18n.t('modalTitle.tips'), // 提示
            content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
            mask: true,
            showCancel: true,
            okText: $i18n.t('common.determine'), // 确定
            cancelText: $i18n.t('common.cancel'), // 取消
            onOk: () => {
              this.pageback();
            }
          });
        } else {
          this.pageback();
        }
      } else {
        if (this.changeCount > 8) {
          this.$Modal.info({
            className: 'ark-dialog',
            title: $i18n.t('modalTitle.tips'), // 提示
            content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
            mask: true,
            showCancel: true,
            okText: $i18n.t('common.determine'), // 确定
            cancelText: $i18n.t('common.cancel'), // 取消
            onOk: () => {
              this.pageback();
            }
          });
        } else {
          this.pageback();
        }
      }
    },
    pageback() {
      $omsUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10672,
        type: 'S',
        tableName: 'V_ST_C_SPECIAL_LOGISTICS',
        back: true
      });
    },
    keyDown(v) {
      console.log(v);
    }
  }
};
