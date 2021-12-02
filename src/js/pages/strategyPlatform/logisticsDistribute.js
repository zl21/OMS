import service from '@/service/index';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  components: {},
  mixins: [new modifycurrentLabel()],
  data() {
    return {
      modalType: 1,//弹窗类型
      collapse: 'panel_baseInfo',
      changeCount: 0, //判断数据是否修改过
      value: [1, 2],
      baseInformation: $it('common.baseInformation'),
      id: '',
      defaultColumn: 2,
      startindex: 0, //分页
      modalTitle: $it('form_label.za'), //'添加排除区域', // 弹出窗标题！
      modal1: false, // 弹窗开关
      btnSave: $it('btn.save'),
      btnBack: $it('btn.back'),
      btnConfig: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            text: $it('btn.save'),
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_save",
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.getCheckedNodes("1");
            }
          },
          {
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_back",
            text: $it('btn.back'),
            btnclick: this.back
          }
        ]
      },
      btnConfig2: {
        typeAll: 'default',
        buttons: [
          {
            text: $it('common.exclude_region'),
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_addArea",
            disabled: false, // 按钮禁用控制
            btnclick: this.addRegion
          },
          {
            text: '支持省份',
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_support",
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.formconfig2[0].show = true;
              this.formconfig2[1].show = false;
              this.formconfig2[2].show = false;
              this.formconfig2[3].show = false;
              this.modalType = 2
              this.modal1 = true;
            }
          },
          {
            text: '排除省份',
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_exclude",
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              if (this.tableSelectArr.length > 1) {
                this.$Message.warning('只能选择一条数据！');
                return
              } else if (this.tableSelectArr.length == 1) {
                this.formconfig2[0].show = false;
                this.formconfig2[1].show = false;
                this.formconfig2[2].show = true;
                this.formconfig2[3].show = true;
                this.modalType = 3
                this.modal1 = true;
                //回显数据
                this.deliveryAreaqueryLogisticsLevel()
              } else {
                this.formconfig2[0].show = false;
                this.formconfig2[1].show = true;
                this.formconfig2[2].show = false;
                this.formconfig2[3].show = true;
                this.modalType = 3
                this.modal1 = true;
                //物流派送范围获取所有选择省份
                this.queryAllCheckedProvince()
              }

            }
          }, {
            text: '删除区域',
            type: "warning",
            isShow: false,
            webname: "ST_C_DELIVERY_AREA_deleteArea",
            disabled: false, // 按钮禁用控制
            btnclick: this.fndel
          }
        ]
      },
      AliasFormConfig: {
        formData: [
          {
            style: 'radio',
            label: '支持范围', // 输入框前文字
            value: 'REGION_TYPE', // 输入框的值
            colname: 'REGION_TYPE', // 输入框的值
            width: '18', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              {
                disabled: false,
                label: '全国（含港澳台地区）',
                value: '1'
              },
              {
                disabled: false,
                label: '自定义',
                value: '2'
              }
            ],
            radioChange: () => {
              const val = this.formConfig.formValue.REGION_TYPE;
              let item = this.queryForm('排除省份');
              this.tableSelectArr = []

              if (val == 2) {
                this.modalTitle = '添加支持省份';
                this.formconfig2[0].show = true;
                this.tableConfig.columns[2].title = '配送省份';
                item.item.required = false

                this.btnConfig2.buttons[0].isShow = false
                this.btnConfig2.buttons[1].isShow = true
                this.btnConfig2.buttons[2].isShow = true
                this.btnConfig2.buttons[3].isShow = true

              } else {

                item.item.required = true
                this.modalTitle = '添加排除区域';
                this.tableConfig.columns[2].title = '排除省份';
                this.formconfig2[0].show = false;

                this.btnConfig2.buttons[0].isShow = true
                this.btnConfig2.buttons[1].isShow = false
                this.btnConfig2.buttons[2].isShow = false
                this.btnConfig2.buttons[3].isShow = true

              }
              if (this.id != '-1') {
                this.init(this.id, 'select');
              }


            }
          }
        ],
        formValue: {
          REGION_TYPE: '1'
        },
        ruleValidate: {}
      },
      formConfig: {},
      FormConfig: {
        formData: [
          {
            version: '1.4',
            colname: 'CP_C_REGION_PROVINCE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 171215, // 当前字段的ID
              colname: 'CP_C_REGION_PROVINCE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '物流公司', // 赔付类型
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
              this.FormConfig.formValue.cpCLogisticsEname = val.valuedata;
              this.FormConfig.formValue.cpCLogisticsId = val.pid;
              this.checkLogistics(val.pid);
            }
          },
          {
            style: 'input',
            label: $it('table_label.remarks'), // 备注
            value: 'remark',
            colname: 'remark',
            width: '8',
            disabled: false
          },
          {
            style: '',
            label: $it('form_label.bg'), // 启用状态
            colname: 'isActive',
            width: '8',
            disabled: true,
            switchChange: () => {

            }
          }
        ],
        formValue: {
          remark: '', //备注
          // cpCLogisticsEcode: '', //物流公司编码
          cpCLogisticsEname: '', //物流公司名称
          cpCLogisticsId: '', // 物流公司id
          isActive: ''
        },
        ruleValidate: {}
      },
      formconfig2: [
        {
          show: false, // 是否显示隐藏
          row: 1, // 行高
          col: 2, // 列宽
          item: {
            type: 'DropMultiSelectFilter', // 组件类型
            required: true, // 是否必填
            field: 'key1',
            label: '支持省份',
            props: {
              placeholder: '支持省份',
              isBackRowItem: true,
              AutoData: [],
              regularMessage: '支持省份', // 报错提示
              data: {
                tabth: [
                  {
                    colname: 'ID',
                    name: 'ID'
                  },
                  {
                    colname: 'ENAME',
                    name: '省份',
                    isak: 'ENAME'
                  }
                ],
                row: [
                  {
                    ENAME: {
                      val: '河北省'
                    },
                    ID: {
                      val: '1'
                    }
                  },
                  {
                    ENAME: {
                      val: '四川省'
                    },
                    ID: {
                      val: '2'
                    }
                  },
                  {
                    ENAME: {
                      val: '江苏省'
                    },
                    ID: {
                      val: '3'
                    }
                  }
                ]
              }
            },
            event: {
              'on-input-value-change': val => {
                let item = this.queryForm('支持省份');
                item.item.props.AutoData = []
                this.InputValueChange(val, item)
              },
              'on-page-change': data => {
                this.startindex = data * 10 - 10;
                this.querList();
              },
              "on-popper-show": () => {
                this.startindex = 0
                this.querList();
              },
              'on-fkrp-selected': v => {
                this.provinceArr = []
                v.map(item => {
                  let obj = {
                    id: '-1',
                    cpCRegionProvinceEcode: item.rowItem && item.rowItem.ECODE.val,
                    cpCRegionProvinceId: item.ID, //省份id
                    cpCRegionProvinceEname: item.Label //省份名称
                  };
                  this.provinceArr.push(obj);
                })
                this.querList(v);
              }
            }
          }
        },
        {
          show: true, // 是否显示隐藏
          row: 1, // 行高
          col: 2, // 列宽
          item: {
            type: 'DropDownSelectFilter', // 组件类型
            required: false, // 是否必填
            field: 'key1',
            label: '排除省份',
            props: {
              placeholder: '排除省份',
              isBackRowItem: true,
              regularMessage: '排除省份', // 报错提示
              totalRowCount: 100,
              AutoData: [],
              data: {
                tabth: [],
                row: []
              }
            },
            event: {
              "on-clear": (v) => {
                this.queryForm('排除地区').item.props.data = []
                this.cpCRegionProvinceId = '';
                this.cpCRegionProvinceEname = '';
              },
              "on-popper-show": () => {
                this.startindex = 0
                this.querList();
              },
              'on-input-value-change': val => {
                let areaRange = this.AliasFormConfig.formValue.REGION_TYPE;
                let item = this.queryForm('排除省份');
                item.item.props.AutoData = []
                if (areaRange == '1') {
                  this.InputValueChange(val, item)
                }

              },
              'on-page-change': data => {
                this.startindex = data * 10 - 10;
                this.querList();

              },
              'on-fkrp-selected': v => {
                this.fnprovince(v, 1);
              }
            }
          }
        },
        {
          show: false, // 是否显示隐藏
          item: {
            type: 'Input', // 组件类型
            required: true, // 是否必填
            field: 'key1',
            label: ' 排除省份',
            props: {
              value: '',
              disabled: true
            }
          }
        },
        {
          show: true, // 是否显示隐藏
          row: 2, // 行高
          col: 2, // 列宽
          item: {
            type: 'Tree', // 组件类型
            required: false, // 是否必填
            label: '排除地区',
            props: {
              data: [],
              nodeInteraction: false,
              showCheckbox: true
            },
            event: {
              'on-select-change': v => {
                console.log(v);
              },
              'on-check-change': v => {
                if (this.modalType = 4) {
                  this.chuliList(v)
                }

                if (v.length > 0) {
                  v.forEach(item => {
                    if (item.C_UP_ID && item.children.length == 0) {
                      this.querArea(item);
                    }
                  });
                }

                let res = this.queryForm('排除地区').item.props.data;
                res.forEach(em => {
                  if (em.children.length > 0) {
                    em.children.forEach(item => {
                      item.isProhibit = true;
                    });
                  }
                });

                if (v.length >= 1) {
                  v.forEach(em => {
                    em.isProhibit = false;
                  });
                }
              }
            }
          }
        }
      ],
      tableConfig: {
        indexColumn: false,
        isShowSelection: false,
        columns: [{
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: $it('table_label.serialNo'), // 序号
          key: 'index'
        },
        {
          title: '排除省份',
          key: 'cpCRegionProvinceEname'
        },
        {
          title: '排除区域',
          key: 'beyondArea'
        },
        {
          title: '排除具体区域',
          key: 'beyondAddressArea'
        },
        {
          title: '修改人',
          key: 'modifiername'
        },
        {
          title: '修改时间',
          key: 'modifieddate'
        }],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: false, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        current: 1,
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      // tableColumns: [],
      tableData: [],
      SIZE: 10,
      CURRENT: 1,
      // 排除地区公用render
      inputRender: (h, { root, node, data }) => {

        return h('span', [
          h('span', {}, data.title),
          h('Input', {
            style: {
              marginLeft: '20px'
            },
            props: {
              disabled: data.isProhibit,
              value: data.val,
              type: 'text'
            },
            on: {
              'on-change': function (v) {
                data.val = v.target.value;
              }
            }
          })
        ])
      },
      cpCRegionProvinceId: '', //省份id
      cpCRegionProvinceEname: '', //省份名称
      cpCRegionProvinceEcode: '',
      tableSelectArr: [],
      tableshow: true, //表格是否显示
      stCDeliveryAreaRegionItemList: [],
      labelDefaultValue: 'jiben', // 设置tab默认值
      // tab切换配置
      labelList: [
        {
          label: $it('form_label.e9'),//'基本信息',
          value: 'jiben'
        },
        {
          label: $it('panel_label.operationLog'), // 操作日志
          value: 'ST_DELIVERY_AREA_LOG'
        }
      ],
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
    };
  },
  watch: {
    'FormConfig.formValue': {
      //监听主表
      handler(val) {
        //页面加载完成后执行
        val && this.changeCount++;
        console.log(this.changeCount);
      },
      deep: true
    }
  },
  created() {
    this.$nextTick(() => {
      const self = this;
      self.formConfig = self.AliasFormConfig;
    });
  },
  mounted() {

    let { customizedModuleId, customizedModuleName } = this.$route.params;
    if (customizedModuleId == 'New') {

      this.id = '-1';
      this.tableshow = true;
      this.labelList = [{
        label: $it('form_label.e9'),//'基本信息',
        value: 'jiben'
      },]
    } else {
      let areaRange = this.AliasFormConfig.formValue.REGION_TYPE;
      let item = this.queryForm('排除省份');
      if (areaRange == 1) {
        item.item.required = true
      } else {
        item.item.required = false
      }
      this.tableshow = true;
      this.id = customizedModuleId;
      this.FormConfig.formData[0].itemdata.readonly = true;
      this.init();

    }


    this.getBtns()

  },
  methods: {
    chuliList(data) {
      console.log(data);
    },
    queryAllCheckedProvince() {
      let data = {
        ID: this.$route.params.customizedModuleId == "New" ? "-1" : this.$route.params.customizedModuleId,
        AREA_RANGE_TYPE: this.AliasFormConfig.formValue.REGION_TYPE
      }
      service.strategyPlatform.queryAllCheckedProvince(data).then(res => {
        if (res.data.code == 0) {
          this.fixedcolumns = res.data.data.join(",")
        }

      })
    },
    deliveryAreaqueryLogisticsLevel() {
      this.cpCRegionProvinceId = this.tableSelectArr[0].cpCRegionProvinceId
      this.cpCRegionProvinceEname = this.tableSelectArr[0].cpCRegionProvinceEname
      this.cpCRegionProvinceEcode = this.tableSelectArr[0].cpCRegionProvinceEcode

      let data = {
        ID: this.tableSelectArr[0].id,
        PROVINCE_ID: this.tableSelectArr[0].cpCRegionProvinceId,
        AREA_RANGE_TYPE: this.AliasFormConfig.formValue.REGION_TYPE
      }
      service.strategyPlatform.deliveryAreaqueryLogisticsLevel(data).then(res => {
        if (res.data.code == 0) {
          this.modalType = 4 //表示在排除回显的情况

          let data = res.data.data
          let item = this.queryForm(' 排除省份');
          item.item.props.value = data.title

          let cityitem = this.queryForm('排除地区');
          cityitem.item.props.data = data.children
          data.children.forEach(item => {
            if (item.children.length > 0) {
              item.children.forEach(em => {
                em.val = em.address
                em.isProhibit = em.address ? false : true
                em.render = this.inputRender
              })
            }
          })

        }

      })

    },
    getBtns() {
      $OMS2.omsUtils.getPermissions(this, '', { table: 'ST_C_DELIVERY_AREA', type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res
        this.btnConfig.buttons.forEach(x => {
          ACTIONS.some(y => y.webname == x.webname) && (x.isShow = true)
        })

        this.btnConfig2.buttons.forEach(x => {
          SUB_ACTIONS.some(y => y.webname == x.webname) && (x.isShow = true)
        })
        //初始化判断支持范围是啥，确认按钮展现形式
        let areaRange = this.AliasFormConfig.formValue.REGION_TYPE;
        if (areaRange == 1) {
          this.btnConfig2.buttons[1].isShow = false
          this.btnConfig2.buttons[2].isShow = false
        } else {
          this.btnConfig2.buttons[0].isShow = false
        }

      })
    },
    labelClick(e) {
      // tab明细切换
      this.labelDefaultValue = e.value;
      if (this.labelDefaultValue == 'ST_DELIVERY_AREA_LOG') {
        this.subTableConfig = {
          centerName: 'strategyPlatform',
          tablename: "ST_DELIVERY_AREA_LOG",
          pageShow: true,
          objid: this.id
        };
      }
    },
    async InputValueChange(v, item) { //模糊查询

      const formData = new FormData()
      formData.append('ak', v)
      formData.append('colid', 166974)
      const { data: { data } } = await service.common.fuzzyquerybyak(formData)

      item.item.props.AutoData = data
      console.log(item.item.props.AutoData);

    },
    checkLogistics(id) {
      service.strategyPlatform.checkLogistics({ ID: id }).then(res => {
        console.log(res);
      });
    },
    fnSize(v) {
      this.tableConfig.pageSize = v;
      this.init(this.id);
    },
    fnchange(v) {
      this.tableConfig.current = v;
      this.init(this.id);
    },
    fnempty() {
      let item = this.queryForm('排除地区');
      item.item.props.data = [];
    },
    fndel() {
      let idArr = [];
      this.tableSelectArr.forEach(em => {
        idArr.push(em.cpCRegionProvinceId);
      });
      if (idArr.length == 0) {
        this.$Message.error("请选择要删除的明细！");
        return
      }
      let data = {
        ID: this.id,
        PROVINCE_IDS: idArr.join(',')
      };
      service.strategyPlatform.deliveryDeleteItems(data).then(res => {
        this.$Message.success(res.data.message);
        this.init();
      });
    },
    fnselect(v) {
      this.tableSelectArr = v;
    },
    fncancel(v) {
      this.tableSelectArr = v;
    },
    init(objid, type) {
      //type表示是切换支持范围来的查询
      //初始化查询接口deliveryQueryById
      let data = {
        ID: objid ? objid : this.id,
        SIZE: this.tableConfig.pageSize,
        CURRENT: this.tableConfig.current
      };
      if (this.AliasFormConfig.formValue.REGION_TYPE && type) {
        data.AREARANGE = this.AliasFormConfig.formValue.REGION_TYPE;
      }

      service.strategyPlatform.deliveryQueryById(data).then(roult => {
        let { stCDeliveryArea, stCDeliveryAreaRegionItemList } = roult.data.data;

        this.FormConfig.formData[0].itemdata.readonly = true;
        if (!type) {
          this.AliasFormConfig.formValue.REGION_TYPE = stCDeliveryArea.areaRange + '';
        }
        if (this.AliasFormConfig.formValue.REGION_TYPE == 2) {
          this.modalTitle = '添加支持省份';
          this.formconfig2[0].show = true;
          this.tableConfig.columns[2].title = '配送省份';

          this.btnConfig2.buttons[0].isShow = false
          this.btnConfig2.buttons[1].isShow = true
          this.btnConfig2.buttons[2].isShow = true
          this.btnConfig2.buttons[3].isShow = true

        } else {
          this.modalTitle = '添加排除区域';
          this.tableConfig.columns[2].title = '排除省份';
          this.formconfig2[0].show = false;

          this.btnConfig2.buttons[0].isShow = true
          this.btnConfig2.buttons[1].isShow = false
          this.btnConfig2.buttons[2].isShow = false
          this.btnConfig2.buttons[3].isShow = true
        }


        this.FormConfig.formData[0].itemdata.valuedata = stCDeliveryArea.cpCLogisticsEname;
        this.FormConfig.formData[0].itemdata.pid = stCDeliveryArea.cpCLogisticsId;
        this.FormConfig.formValue.cpCLogisticsEname = stCDeliveryArea.cpCLogisticsEname; //物流公司名称
        this.FormConfig.formValue.cpCLogisticsId = stCDeliveryArea.cpCLogisticsId; //物流公司id
        this.FormConfig.formValue.remark = stCDeliveryArea.remark; //备注
        this.tableConfig.total = stCDeliveryAreaRegionItemList.total;
        this.FormConfig.formData[2].style = 'input'
        //isactive 根据主表这个字段来控制是否可以编辑 Y不能编辑 N可以编辑

        if (stCDeliveryArea.isactive == 'Y') {
          this.FormConfig.formValue.isActive = "启用"
          this.FormConfig.formData[1].disabled = true;
          this.AliasFormConfig.formData[0].options.forEach(em => {
            em.disabled = true;
          });
          this.btnConfig2.buttons.forEach(em => {
            em.disabled = true;
          });
        } else {
          this.FormConfig.formValue.isActive = '停用'
        }
        //渲染明细表
        stCDeliveryAreaRegionItemList.records.forEach((item, index) => {
          item.index = index + 1;
          item.modifieddate = $utils.getFormatDate(new Date(item.modifieddate), 'yyyy-MM-dd');
        });
        this.tableConfig.data = stCDeliveryAreaRegionItemList.records;
      });
    },
    // 返回
    back() {
      if (this.id == '-1') {
        if (this.changeCount > 0) {
          this.$Modal.info({
            className: 'ark-dialog',
            title: $it('modalTitle.tips'), // 提示
            content: $it('modalTips.hu'), // 当前修改未保存，确定返回？
            mask: true,
            showCancel: true,
            okText: $it('common.determine'), // 确定
            cancelText: $it('common.cancel'), // 取消
            onOk: () => {
              this.pageback();
            }
          });
        } else {
          this.pageback();
        }
      } else if (this.changeCount > 1) {
        this.$Modal.info({
          className: 'ark-dialog',
          title: $it('modalTitle.tips'), // 提示
          content: $it('modalTips.hu'), // 当前修改未保存，确定返回？
          mask: true,
          showCancel: true,
          okText: $it('common.determine'), // 确定
          cancelText: $it('common.cancel'), // 取消
          onOk: () => {
            this.pageback();
          }
        });
      } else {
        this.pageback();
      }

    },
    pageback() {
      $omsUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 10642,
        type: 'S',
        tableName: 'ST_C_DELIVERY_AREA',
        back: true
      });
    },
    getCheckedNodes(type) {
      if (!this.FormConfig.formData[0].itemdata.valuedata) {
        this.$Message.error('请选择物流公司！');
        return;
      }
      this.stCDeliveryAreaRegionItemList = []
      let city = this.formconfig2[3].item.props.data;

      for (const v of city) {
        let cpCRegionCityId = v.id; //城市id
        let cpCRegionCityEname = v.title; // 城市名称
        let cpCRegionCityEcode = v.ECODE; //城市编码

        if (v.checked) {
          let obj = {
            cpCRegionProvinceId: this.cpCRegionProvinceId,
            cpCRegionProvinceEname: this.cpCRegionProvinceEname,
            cpCRegionProvinceEcode: this.cpCRegionProvinceEcode,
            cpCRegionCityId, //城市id
            cpCRegionCityEname, // 城市名称
            cpCRegionCityEcode, //城市编码
            id: '-1'
          };
          this.stCDeliveryAreaRegionItemList.push(obj);
        }

        if (v.children.length > 0) {
          for (const k of v.children) {
            if (k.checked) {
              let obj = {
                cpCRegionProvinceId: this.cpCRegionProvinceId,
                cpCRegionProvinceEname: this.cpCRegionProvinceEname,
                cpCRegionProvinceEcode: this.cpCRegionProvinceEcode,
                cpCRegionCityId, //城市id
                cpCRegionCityEname, // 城市名称
                cpCRegionCityEcode, //城市编码
                cpCRegionAreaId: k.id, //区域id
                cpCRegionAreaEname: k.title, //区域名称
                cpCRegionAreaEcode: k.code, //区域编码
                addressArea: k.val, //具体区域
                id: '-1'
              };
              this.stCDeliveryAreaRegionItemList.push(obj);
            }
          }
        }

      }

      if (this.modalType == 1) {
        if (this.stCDeliveryAreaRegionItemList.length == 0) {
          let obj = {
            cpCRegionProvinceId: this.cpCRegionProvinceId,
            cpCRegionProvinceEname: this.cpCRegionProvinceEname,
            cpCRegionProvinceEcode: this.cpCRegionProvinceEcode,
            id: '-1'
          };
          this.stCDeliveryAreaRegionItemList.push(obj);
        }

      }

      if (this.modalType == 2) {
        if (this.provinceArr) {
          this.stCDeliveryAreaRegionItemList = this.stCDeliveryAreaRegionItemList.concat(this.provinceArr);
        }
      }


      this.fnSave(type);
    },
    querArea(itemda) {

      let id = itemda.id;
      var formdata = new FormData();
      formdata.append('searchdata', JSON.stringify({ isdroplistsearch: true, refcolid: 167091, fixedcolumns: { C_UP_ID: `=${id}` }, startindex: this.startindex, range: 10 }));
      service.common.QueryList(formdata).then(res => {
        let item = this.queryForm('排除地区');
        item.item.props.data.forEach(item => {
          if (item.id == id) {
            res.data.data.row.forEach(em => {
              let obj = {
                title: em.ENAME.val,
                id: em.ID.val,
                code: em.ECODE.val,
                val: '',
                isProhibit: true,
                render: this.inputRender,
                expand: false
              };
              item.children.push(obj);
            });
          }
        });
      });
    },
    fnselectAll(v) {

      this.tableSelectArr = v
    },
    querList(data, fixedcolumnsData) {
      let fixedcolumns = {};

      if (this.modalType == 3) {
        if (this.fixedcolumns) {
          fixedcolumns = {
            ID: `in (${this.fixedcolumns})`
          }
        }
      }

      var formdata = new FormData();
      formdata.append('searchdata', JSON.stringify({ isdroplistsearch: true, refcolid: 166974, fixedcolumns, startindex: this.startindex, range: 10 }));
      service.common.QueryList(formdata).then(res => {
        let item = this.queryForm('排除省份');
        let prodata = this.queryForm('支持省份');
        item.item.props.totalRowCount = res.data.data.totalRowCount;
        item.item.props.data = {
          tabth: res.data.data.tabth,
          row: res.data.data.row
        };

        if (!data) {
          prodata.item.props.totalRowCount = res.data.data.totalRowCount;
          prodata.item.props.data = {
            tabth: res.data.data.tabth,
            row: res.data.data.row
          };
        }
      });
    },
    addRegion() {
      if (this.tableSelectArr.length > 1) {
        this.$Message.warning('只能选择一条数据！');
        return
      } else if (this.tableSelectArr.length == 1) {
        this.formconfig2[0].show = false;
        this.formconfig2[1].show = false;
        this.formconfig2[2].show = true;
        this.formconfig2[3].show = true;
        this.modalType = 3
        this.modal1 = true;
        //回显数据
        this.deliveryAreaqueryLogisticsLevel()
      } else {
        this.formconfig2[0].show = false;
        this.formconfig2[1].show = true;
        this.formconfig2[2].show = false;
        this.formconfig2[3].show = true;

        this.modal1 = true;
        this.modalType = 1
        //添加区域
        this.querList();
      }

    },
    fnprovince(v, type) {
      //根据排除省份获取排市
      this.cpCRegionProvinceId = v[0].ID;
      this.cpCRegionProvinceEname = v[0].Label;
      v[0].rowItem.ECODE && (this.cpCRegionProvinceEcode = v[0].rowItem.ECODE.val);
      let citId = v[0].ID;

      let cityitem = this.queryForm('排除地区');
      var formdata = new FormData();
      formdata.append('searchdata', JSON.stringify({ isdroplistsearch: true, refcolid: 167077, fixedcolumns: { C_UP_ID: `=${citId}` }, startindex: 0, range: 100 }));
      service.common.QueryList(formdata).then(res => {
        let citarr = res.data.data.row;
        cityitem.item.props.data = [];
        citarr.forEach((item, index) => {
          let obj = {
            title: item.ENAME.val,
            id: item.ID.val,
            ECODE: item.ECODE.val,
            index,
            C_UP_ID: item.C_UP_ID.val,
            expand: false,
            children: []
          };
          cityitem.item.props.data.push(obj);
        });
      });
    },
    queryForm(label) {
      let data = this.formconfig2.find(item => item.item.label == label);
      return data;
    },

    keyDown(e) {
      console.log(e);
    },
    fnSave(type) {
      let areaRange = this.AliasFormConfig.formValue.REGION_TYPE;
      let { cpCLogisticsEname, cpCLogisticsId, remark } = this.FormConfig.formValue;
      if (type != 1) {
        if (this.id != "-1") {


          if (this.modalType == 1) {
            if (this.stCDeliveryAreaRegionItemList[0].cpCRegionProvinceId == "") {
              this.$Message.warning('请选择排除省份！');
              return
            }
          } else if (this.modalType == 2) {
            // if (!this.fixedcolumns) {
            //   this.$Message.warning('请选择支持省份！');
            //   return
            // }
          }

        }
      }



      this.modal1 = false;

      let data = {
        stCDeliveryArea: {
          areaRange, //支持范围
          //cpCLogisticsEcode: '', //物流公司编码
          cpCLogisticsEname, //物流公司名称
          cpCLogisticsId, //物流公司id
          id: this.id, // ID，新增传-1
          remark //备注
        },
        stCDeliveryAreaRegionItemList: this.stCDeliveryAreaRegionItemList
      };
      //this.ID != -1 && (data.stCDeliveryArea.isActive = (this.FormConfig.formValue.isActive ? "Y" : "N"))
      service.strategyPlatform.deliveryAreaSave(data).then(res => {
        this.fnempty();
        this.$Message.success(res.data.message);
        if (this.id != '-1' && this.id != 'New') {
          this.init(res.data.data.objId);
          if (type == "1") {
            this.pageback();
          }

        } else {
          this.$store.commit('global/tabOpen', {
            type: 'C',
            label: '物流派送范围编辑',
            customizedModuleName: 'ST_C_DELIVERY_AREA',
            customizedModuleId: res.data.data.objId,
          })
        }
      });
    },
    fnCancel() {
      this.fnempty();
      this.modal1 = false;
    }
  }
};
