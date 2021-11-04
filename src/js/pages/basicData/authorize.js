import service from '@/service/index'
import businessButton from 'burgeonComponents/businessButton'
import { OmsForm } from 'burgeonComponents'
import R3 from '@syman/burgeon-r3'
import comMethods from 'burgeonConfig/config/commonUtils.js'
export default {
  components: {
    businessButton,
    businessForm,
  },
  data() {
    return {
      vmI18n:$i18n,
      modal1: false,
      shopTitle:$i18n.t('modalTitle.af'),
      shopModal: true,
      panelDefaultValue: 'panel_baseInfo', // 设置默认打开'基本信息'
      plantName: '', // 用户输入的
      active: 0, // 步骤进度
      steps: [
        {
          name:  $i18n.t('form_label.ap'), //'店铺授权',
          icon: 'iconfont icon-qian',
          status: 'finish', // wait、process、finish、error
        },
        {
          name:  $i18n.t('form_label.aq'), //'店铺昵称',
          icon: 'iconfont icon-dingdan',
          status: 'wait',
        },
        {
          name:  $i18n.t('form_label.ar'),//'完善信息',
          icon: 'iconfont icon-weibiaoti-4',
          status: 'wait',
        },
      ],
      defaultColumn: 2,
      btnConfig: {},
      btnConfig1: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'),
            disabled: false, // 按钮禁用控制
            btnclick: this.fnclose,
          },
          {
            text: $i18n.t('btn.next'), //'下一步',
            btnclick: () => {
              this.fnauth()
            },
          },
        ],
      },
      btnConfig2: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'),
            disabled: false, // 按钮禁用控制
            btnclick: this.fnclose,
          },
          {
            text: $i18n.t('btn.previous'),//'上一步',
            btnclick: () => {
              this.fnSteps(1)
            },
          },
          {
            text: $i18n.t('btn.next'),
            btnclick: () => {
              this.fnSteps(3)
              this.relationShip()
              this.formconfig.formValue.CP_C_PLATFORM_ECODE = this.shopdata.no
              this.formconfig.formValue.CP_C_PLATFORM_NAME = this.shopdata.name
            },
          },
        ],
      },
      btnConfig3: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('btn.previous'),//'上一步',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.fnSteps(2)
            },
          },
          {
            text: $i18n.t('common.cancel'),
            btnclick: this.fnclose,
          },
          {
            text: $i18n.t('btn.save'),
            btnclick: this.fnSave,
          },
        ],
      },
      btnConfig4: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'),
            btnclick: this.fnclose,
          },
          {
            text: $i18n.t('btn.save'),
            btnclick: this.fnSave,
          },
        ],
      },
      authoriBtnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('btn.authorityYes'), //'授权成功',
            type: 'default',
            btnclick: this.fnSucceed,
          },
          {
            text: $i18n.t('btn.authorityNo'),//'授权失败',
            btnclick: this.fnFail,
          },
        ],
      },
      formConfig: [],
      formConfig1: [
        {
          item: {
            type: 'Input', // 组件类型
            required: true, // 是否必填
            field: 'CP_C_PLATFORM_NAME',
            label: $i18n.t('form_label.platformType'),
            props: {
              placeholder: '',
              value: '',
              // style: 'width: 300px',
              regularMessage: '请输入平台', // 报错提示
              // regx: /^d+$|^d+[.]?d+$/ // 校验规则
            },
          },
        },
        {
          item: {
            type: 'Input', // 组件类型
            required: true, // 是否必填
            field: 'retrurnNick',
            label: '店铺昵称',
            props: {
              value: '',
              disabled: true,
              // style: 'width: 300px',
              regularMessage: '请输入店铺昵称', // 报错提示
            },
          },
        },
      ],
      formConfig2: [
        {
          item: {
            type: 'Input', // 组件类型
            required: false, // 是否必填
            field: 'AUTHORITY_EXPIRE',
            label: '授权有效时间',
            props: {
              value: '',
              disabled: true,
              style: 'coer:red',
            },
          },
        },
        {
          item: {
            type: 'Input', // 组件类型
            required: false, // 是否必填
            field: 'TOKEN',
            label: 'Token',
            props: {
              value: '',
              disabled: true,
              // style: 'width: 300px'
            },
          },
        },
      ],
      formConfig3: {
        formData: [
          {
            style: 'input',
            label: $i18n.t('table_label.shopName'), // 店铺名称
            value: 'CP_C_SHOP_TITLE',
            colname: 'CP_C_SHOP_TITLE',
            width: '12',
            disabled: false,
          },
          {
            style: 'input',
            label: '卖家姓名',
            value: 'SELLER_NAME',
            colname: 'SELLER_NAME',
            width: '12',
            disabled: false,
            inputChange: () => {},
          },
          {
            style: 'input',
            label: '手机号',
            value: 'SELLER_PHONE',
            colname: 'SELLER_PHONE',
            class: 'beizu',
            width: '12',
            disabled: false,
            inputChange: () => {},
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_PROVINCE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
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
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              const drpArr = ['CP_C_REGION_CITY_ID', 'CP_C_REGION_AREA_ID']
              this.formconfig.formValue.SELLER_PROVINCE = val.valuedata
              this.formconfig.formValue.SELLER_PROVINCE_ID = val.pid
              this.formconfig = this.emptyData(
                this.formconfig,
                'CP_C_REGION_PROVINCE_ID',
                this.modify,
                'CP_C_REGION_PROVINCE_id',
                val,
                drpArr
              )
              this.masterModifyData('CP_C_REGION_PROVINCE_ID', 'master')
              this.masterModifyData('CP_C_REGION_PROVINCE_id', 'master')
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_CITY_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 167077, // 当前字段的ID
              colname: 'CP_C_REGION_CITY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
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
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'CP_C_REGION_PROVINCE_ID',
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              const drpArr = ['CP_C_REGION_AREA_ID']
              this.formconfig.formValue.SELLER_CITY = val.valuedata
              this.formconfig.formValue.SELLER_CITY_ID = val.pid
              this.formconfig = this.emptyData(
                this.formconfig,
                'CP_C_REGION_CITY_ID',
                this.modify,
                'CP_C_REGION_CITY_id',
                val,
                drpArr
              )
              this.masterModifyData('CP_C_REGION_CITY_ID', 'master')
              this.masterModifyData('CP_C_REGION_CITY_id', 'master')
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_AREA_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 167091, // 当前字段的ID
              colname: 'CP_C_REGION_AREA_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '所在区\\县', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_DISTAREA', // 对应的表
              reftableid: 10287, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'CP_C_REGION_CITY_ID',
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              this.formconfig.formValue.SELLER_AREA = val.valuedata
              this.formconfig.formValue.SELLER_AREA_ID = val.pid
              this.masterModifyData('CP_C_REGION_AREA_ID', 'master')
              this.masterModifyData('CP_C_REGION_AREA_id', 'master')
            },
          },
          
          {
            style: 'input',
            label: '卖家地址',
            value: 'SELLER_ADDRESS',
            colname: 'SELLER_ADDRESS',
            class: 'beizu',
            width: '24',
            disabled: false,
            inputChange: () => {},
          },
          
        ],
        // 存储表单得所有值
        formValue: {
          authTips: '',
          CP_C_PLATFORM_NAME: '', // 平台类型  显示的值
          CP_C_PLATFORM_ECODE: '', // 平台类型 传给服务端 otherPlatform  >表示其他平台
          SELLER_NAME: '', // 买家姓名
          SELLER_PHONE: '', // 手机号码
          SHOP_NICK: '', // 店铺昵称
          CP_C_SHOP_TITLE: '', // 店铺名称
          SELLER_PROVINCE_ID: '', // 卖家所在省id
          SELLER_CITY_ID: '', // 卖家所在市id
          SELLER_AREA_ID: '', // 卖家所在区县id
          SELLER_ADDRESS: '', // 卖家详细地址
          SHOP_APP_KEY: '',
          SHOP_SECRET_KEY: '',
          SUPPLIER_ID: '',
          TOKEN: '',
        },
        // 表单非空提示
        ruleValidate: {
          SHOP_APP_KEY: [{ required: true, message: '' }],
          SHOP_SECRET_KEY: [{ required: true, message: '' }],
          SUPPLIER_ID: [{ required: true, message: '' }],
          TOKEN: [{ required: true, message: '' }],
          CP_C_PLATFORM_NAME: [
            {
              required: true,
              message: '',
            },
          ],
          CP_C_PLATFORM_ECODE: [
            {
              required: true,
              message: '',
            },
          ],
          SHOP_NICK: [
            {
              required: true,
              message: ' ',
            },
          ],
          CP_C_SHOP_TITLE: [
            {
              required: true,
              message: ' ',
            },
          ],
        },
      },
      modify: {
        // 监听并暂存修改的信息，便于调保存的时候传给后端
        master: {}, // 修改后的主表信息
        subTable: [], // 修改后的子表信息
      },
      formconfig: {},
      formconfig1: {
        formData: [
          {
            style: 'input',
            label: '平台类型',
            value: 'CP_C_PLATFORM_NAME',
            colname: 'CP_C_PLATFORM_NAME',
            width: '12',
            disabled: true,
            inputChange: () => {},
          },
          {
            style: 'input',
            label: '店铺昵称',
            value: 'SHOP_NICK',
            colname: 'SHOP_NICK',
            width: '12',
            disabled: false,
          },
          {
            style: 'input',
            label: $i18n.t('table_label.shopName'),
            value: 'CP_C_SHOP_TITLE',
            colname: 'CP_C_SHOP_TITLE',
            width: '12',
            disabled: false,
          },
          {
            style: 'input',
            label: '卖家姓名',
            value: 'SELLER_NAME',
            colname: 'SELLER_NAME',
            width: '12',
            disabled: false,
            inputChange: () => {},
          },
          {
            style: 'input',
            label: $i18n.t('form_label.cellPhone_number'),
            value: 'SELLER_PHONE',
            colname: 'SELLER_PHONE',
            class: 'beizu',
            width: '12',
            disabled: false,
            inputChange: () => {},
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_PROVINCE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
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
              pid: '',
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              const drpArr = ['CP_C_REGION_CITY_ID', 'CP_C_REGION_AREA_ID']
              this.formconfig.formValue.SELLER_PROVINCE = val.valuedata
              this.formconfig.formValue.SELLER_PROVINCE_ID = val.pid
              this.formconfig = this.emptyData(
                this.formconfig,
                'CP_C_REGION_PROVINCE_ID',
                this.modify,
                'CP_C_REGION_PROVINCE_id',
                val,
                drpArr
              )
              this.masterModifyData('CP_C_REGION_PROVINCE_ID', 'master')
              this.masterModifyData('CP_C_REGION_PROVINCE_id', 'master')
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_CITY_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 167077, // 当前字段的ID
              colname: 'CP_C_REGION_CITY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
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
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'CP_C_REGION_PROVINCE_ID',
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              const drpArr = ['CP_C_REGION_AREA_ID']
              this.formconfig.formValue.SELLER_CITY = val.valuedata
              this.formconfig.formValue.SELLER_CITY_ID = val.pid
              this.formconfig = this.emptyData(
                this.formconfig,
                'CP_C_REGION_CITY_ID',
                this.modify,
                'CP_C_REGION_CITY_id',
                val,
                drpArr
              )
              this.masterModifyData('CP_C_REGION_CITY_ID', 'master')
              this.masterModifyData('CP_C_REGION_CITY_id', 'master')
            },
          },
          {
            version: '1.4',
            colname: 'CP_C_REGION_AREA_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '12',
            inputList: [],
            itemdata: {
              col: 1,
              colid: 167091, // 当前字段的ID
              colname: 'CP_C_REGION_AREA_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '所在区\\县', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_DISTAREA', // 对应的表
              reftableid: 10287, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '',
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'CP_C_REGION_CITY_ID',
              },
            },
            oneObj: (val) => {
              // 选中触发事件
              console.log('val::', val)
              if (!val.pid) return
              this.formconfig.formValue.SELLER_AREA = val.valuedata
              this.formconfig.formValue.SELLER_AREA_ID = val.pid
              this.masterModifyData('CP_C_REGION_AREA_ID', 'master')
              this.masterModifyData('CP_C_REGION_AREA_id', 'master')
            },
          },

         
          {
            style: 'input',
            label: '卖家地址',
            value: 'SELLER_ADDRESS',
            colname: 'SELLER_ADDRESS',
            class: 'beizu',
            width: '24',
            disabled: false,
            inputChange: () => {},
          },
         
        ],
        // 存储表单得所有值
        formValue: {
          authTips: '',
          CP_C_PLATFORM_NAME: '', // 平台类型  显示的值
          CP_C_PLATFORM_ENAME: '', // 平台昵称
          CP_C_PLATFORM_ECODE: '', // 平台类型 传给服务端 otherPlatform  >表示其他平台
          SELLER_NAME: '', // 买家姓名
          SELLER_PHONE: '', // 手机号码
          SHOP_NICK: '', // 店铺昵称
          CP_C_SHOP_TITLE: '', // 店铺名称
          SELLER_PROVINCE_ID: '', // 卖家所在省id
          SELLER_CITY_ID: '', // 卖家所在市id
          SELLER_AREA_ID: '', // 卖家所在区县id
          SELLER_ADDRESS: '', // 卖家详细地址
          SHOP_APP_KEY: '',
          SHOP_SECRET_KEY: '',
          SUPPLIER_ID: '',
          TOKEN: '',
        },
        // 表单非空提示
        ruleValidate: {
          SHOP_APP_KEY: [{ required: true, message: '' }],
          SHOP_SECRET_KEY: [{ required: true, message: '' }],
          SUPPLIER_ID: [{ required: true, message: '' }],
          TOKEN: [{ required: true, message: '' }],
          CP_C_PLATFORM_NAME: [
            {
              required: true,
              message: '',
            },
          ],
          CP_C_PLATFORM_ECODE: [
            {
              required: true,
              message: '',
            },
          ],
          SHOP_NICK: [
            {
              required: true,
              message: ' ',
            },
          ],
          CP_C_SHOP_TITLE: [
            {
              required: true,
              message: ' ',
            },
          ],
        },
      },
      shopShow: false,
      tabShow: true,
      shopform: true,
      shopdata: {},
      SHOP_NICK: '', // 店铺昵称
      REQUEST_ID: '', // 授权标识，授权之后的店铺在新增时需要带着这个id
      shops: [],
    }
  },
  created() {},
  methods: {
    // 过滤条件
    relationShip() {
      this.querItem('CP_C_REGION_CITY_ID').inputList.push(
        this.querItem('CP_C_REGION_PROVINCE_ID').itemdata
      )
      this.querItem('CP_C_REGION_AREA_ID').inputList.push(
        this.querItem('CP_C_REGION_CITY_ID').itemdata
      )
    },
    querItem(key) {
      // 根据colname遍历查询formData子项
      return this.formconfig.formData.find((item) => item.colname == key)
    },
    querForm(item, key) {
      // 根据colname遍历查询formData子项
      return item.find((item) => item.item.field == key)
    },
    /**
     * 记录主表修改信息方法
     * @ecode 记录字段
     * @obj 修改值暂存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) {
      const self = this
      self.modify[obj][ecode] = self.formconfig.formValue[ecode]
    },
    /**
     * 清空省市区（eg.国家变了之后，清空省市区）
     * @key 变更字段
     * @drpArr 待清空的drp类型
     * * 仅适用于新增，因为没有监听初始化的值
     */
    emptyData(form, key = '', before, beforeKey, val, drpArr = []) {
      const fD = form.formData
      let flag = false
      fD.forEach((element) => {
        if (element.colname == key) {
          if (before.master[beforeKey] && val.pid == before.master[beforeKey]) {
            flag = true
          }
        }
        if (!flag && drpArr.includes(element.colname)) {
          element.itemdata.valuedata = ''
          element.itemdata.pid = ''
        }
      })
      form.formData = fD
      return form
    },
    keyDown(v) {
      console.log(v)
    },
    fnclose() {
      this.shopShow = false
      this.active = 0
      this.btnConfig = []
      this.formConfig = []
      this.formconfig = {}
      this.shopdata = ''
      let item = this.querForm(this.formConfig1, 'retrurnNick')
      item.item.props.value = ''
      this.REQUEST_ID = ''
    },
    fnMessage(msg) {
      this.$Message.error($i18n.t('pHolder.enter')+`${msg}!`)
    },
    fnSave() {
      let str = ''
      this.formconfig.formData.forEach((em) => {
        let ruleValidate = this.formconfig.ruleValidate
        let formValue = this.formconfig.formValue
        for (const key in ruleValidate) {
          if (key == em.colname) {
            if (!formValue[key]) {
              str += `${em.label} `
              return
            }
          }
        }
      })
      if (str) {
        this.fnMessage(str)
        return
      }

      let {
        SELLER_ADDRESS,
        SELLER_AREA,
        SELLER_CITY,
        SELLER_PROVINCE,
        SELLER_AREA_ID,
        CP_C_PLATFORM_ECODE,
        CP_C_PLATFORM_ENAME,
        CP_C_SHOP_TITLE,
        SHOP_NICK,
        SELLER_PHONE,
        SELLER_NAME,
        SELLER_PROVINCE_ID,
        SELLER_CITY_ID,
        CP_C_PLATFORM_NAME,
      } = this.formconfig.formValue
      let data = {
        CP_C_PLATFORM_ECODE, //平台编码  --
        CP_C_PLATFORM_ENAME: CP_C_PLATFORM_NAME || '', //平台名称
        CP_C_SHOP_TITLE, //店铺名称
        SHOP_NICK, //店铺昵称  ---
        SELLER_PHONE, //卖家手机号
        SELLER_NAME, //卖家姓名
        SELLER_PROVINCE_ID, //卖家所在省id
        SELLER_CITY_ID, //卖家所在市id
        SELLER_AREA_ID, //卖家所在区县id
        SELLER_PROVINCE, //卖家所在省名称
        SELLER_CITY, //卖家所在市名称
        SELLER_AREA, //卖家所在区县名称
        REQUEST_ID: this.REQUEST_ID, //如果进行了授权，将获取授权URL接口返回的requestId传入新增接口
        SELLER_ADDRESS, //卖家详细地址
      }
      data.ID = '-1' //表示新增

      if (this.shopdata.authKeywords) {
        let authKeywords = this.shopdata.authKeywords
        for (const key in authKeywords) {
          data[key] = this.formconfig.formValue[key]
        }
      }

      service.basicData.shopSave(data).then((res) => {
        if (res.data.code != 0) {
          this.$Message.error(res.data.message)
          return
        }
        this.$Message.success(res.data.message)
        this.back()
        this.fnclose()
      })
    },
    fnauth() {
      // 跳转平台授权页面
      let item = this.querForm(this.formConfig1, 'retrurnNick')
      console.log('retrurnNick:>>>', this.shopdata.retrurnNick)
      if (this.shopdata.retrurnNick != 'Y') {
        if (!item.item.props.value) {
          this.$Message.error($i18n.t('modalTips.gz') )
          return
        }
      }

      let data = {
        PLANT_NO: this.shopdata.no,
        SELLER_NICK: item.item.props.value,
      }
      service.basicData.isauthorize(data).then((res) => {
        if (res.data.code != 0) {
          return
        }
        // 授权URL   授权标识，授权之后的店铺在新增时需要带着这个id
        let { AUTHORIZATION_URL, REQUEST_ID } = res.data.data
        window.open(AUTHORIZATION_URL)
        this.modal1 = true
        this.REQUEST_ID = REQUEST_ID
      })
    },
    fnopen(res) {
      // 打开某个平台
      if (res.type == 'tapOpen') {
        R3.store.commit('global/tabOpen', {
          type: 'V',
          tableName: 'V_CP_C_SHOP',
          tableId: 10571,
          id: 'New',
        })
      } else if (res.type == 'otherPlatform') {
        this.fnSteps(4)
        this.formconfig.formValue.CP_C_PLATFORM_ECODE = 'otherPlatform'
        this.formconfig.formValue.CP_C_PLATFORM_NAME = $i18n.t('modalTitle.ai') //'其他平台'
      } else {
        let data = {
          params: {
            plantNo: res.no,
          },
        }
        service.basicData.basicLogos(data).then((res) => {
          this.shopdata = res.data.data.plantInfo

          if (this.shopdata.isEmpower != 'Y') {
            this.fnSteps(4)

            let formObj = this.shopdata.authKeywords
            if (this.shopdata.authTips) {
              let obj = {
                style: 'formCompile',
                label:  $i18n.t('form_label.ay') ,//'授权指引',
                colname: 'authTips',
                slotName: 'formCompile',
                class: 'beizu',
                width: '24',
                disabled: false,
                inputChange: () => {},
              }
              this.formconfig.formData.push(obj)
            }

            for (const k in formObj) {
              let obj = {
                style: 'input',
                label: formObj[k],
                value: k,
                colname: k,
                width: '12',
                disabled: false,
                inputChange: () => {},
              }
              this.formconfig.formData.push(obj)
              this.formconfig.formValue[k] = ''
            }

            this.formconfig.formValue.authTips = this.shopdata.authTips
            this.formconfig.formValue.CP_C_PLATFORM_ECODE = this.shopdata.no
            this.formconfig.formValue.CP_C_PLATFORM_NAME = this.shopdata.name
          } else {
            // 判断店铺昵称是否可以编辑
            if (this.shopdata.retrurnNick != 'Y') {
              let item = this.querForm(this.formConfig1, 'retrurnNick')
              item.item.props.disabled = false
            } else {
              let item = this.querForm(this.formConfig1, 'retrurnNick')
              item.item.props.disabled = true
            }

            let item = this.querForm(this.formConfig1, 'CP_C_PLATFORM_NAME')
            item.item.props.value = this.shopdata.name
            this.fnSteps(1)
          }
        })
      }
    },
    fnSucceed() {
      // 授权成功按钮，调用查询授权结果

      let data = {
        REQUEST_ID: this.REQUEST_ID,
      }
      service.basicData.isaothorSucceed(data).then((res) => {
        let list = res.data.data
        let item = this.querForm(this.formConfig1, 'retrurnNick')

        item.item.props.value = list.SHOP_NICK || ''

        this.formConfig3.formValue.SHOP_NICK = list.SHOP_NICK || ''
        let fitem = this.querForm(this.formConfig2, 'AUTHORITY_EXPIRE')
        let titem = this.querForm(this.formConfig2, 'TOKEN')

        fitem.item.props.value = list.AUTHORITY_EXPIRE || ''
        titem.item.props.value = list.TOKEN

        // his.formconfig3.formValue.CP_C_SHOP_TITLE = list.SHOP_NICK;
        // this.formconfig.formValue.CP_C_PLATFORM_ECODE = 'otherPlatform'
        this.fnSteps(2)
      })
    },
    fnFail() {
      this.modal1 = false
    },
    init(e) {
      let plantName = ''
      if (e) {
        if (e.type) {
          plantName = this.plantName
        } else {
          plantName = e
        }
      }

      let data = {
        params: {
          plantNo: '',
          plantName,
        },
      }
      service.basicData.basicLogos(data).then((res) => {
        let subShopLogo = [
          {
            show: res.data.data.subShopLogo,
            type: 'tapOpen',
            plantLogo: [
              {
                URL: require('assetsImg/u1105.png') ,
              },
            ],
          },
          {
            show: true,
            type: 'otherPlatform',
            plantLogo: [
              {
                URL:  require('assetsImg/u48690.png') ,
              },
            ],
          },
        ]
        res.data.data.plantInfos.forEach((em) => {
          em.show = true
          em.plantLogo = em.plantLogo ? JSON.parse(em.plantLogo) : [{ URL: '' }]
        })
        this.shops = res.data.data.plantInfos.concat(subShopLogo)
      })
    },

    fnSteps(index) {
      // 当前组件进行到第几步，共4种情况
      if (index == 1) {
        this.shopShow = true // 隐藏logo墙
        this.tabShow = true // 展示步骤条
        this.shopform = true
        this.active = 0 // 切换步骤样式
        this.btnConfig = this.btnConfig1
        this.formConfig = this.formConfig1
      } else if (index == 2) {
        this.modal1 = false // 关闭授权成功或者失败弹窗
        this.active = 1 // 切换步骤样式
        this.btnConfig = this.btnConfig2
        this.formConfig = this.formConfig2
        this.shopShow = true // 隐藏logo墙
        this.tabShow = true // 展示步骤条
        this.shopform = true
      } else if (index == 3) {
        this.shopShow = true // 隐藏logo墙
        this.tabShow = true // 展示步骤条
        this.shopform = false
        this.active = 2 // 切换步骤样式
        this.btnConfig = this.btnConfig3

        this.formconfig = comMethods.deepClone(this.formConfig3)
      } else if (index == 4) {
        this.shopShow = true
        this.tabShow = false
        this.shopform = false
        this.formconfig = comMethods.deepClone(this.formconfig1)
        this.btnConfig = this.btnConfig4
        this.relationShip()
      }
    },
    // 返回
    back() {
      $omsUtils.tabCloseAppoint(this)
      this.$destroy(true)
      this.$store.commit('global/tabOpen', {
        tableId: 10348,
        type: 'S',
        tableName: 'CP_C_SHOP',
        back: true,
      })
    },
  },
  mounted() {
    this.init()
  },
}
