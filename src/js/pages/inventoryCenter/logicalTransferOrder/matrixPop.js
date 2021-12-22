import R3 from '@syman/burgeon-r3';
// import chineseDiction from 'framework/assets/js/ChineseDictionary.js';
import port from '@/config/config/orderDetailConnector.js';

const {store} = R3;

export default {
  props: {
    activeObj: {
      type: Object,
      default: () => ({})
    }, // 商品编码
    proEcodeFlag: { // 矩阵框商品新增时,接受父组件组件matrixInput传输标记,itemInputEnter方法需要用的标记
      type: Object,
    },
    encode: {
      type: String,
      default: ''
    }, // 商品编码
    reveal: {
      type: Boolean,
      default: false
    }, // true: 启动纯展示表格
    edit: {
      type: Boolean,
      default: false
    }, // true: 启动纯编辑表格
    general: {
      type: Boolean,
      default: false
    }, // true: 启动通用表格界面
    selectItem: {}, // 表数据
    objid: {}, // 表ID
    inputList: {
      type: Array,
      default: () => []
    }, // objitem数据
    tablename: {
      /* type: String,
      required: true */
    }, // 主表名
    objList: {}, // 配销中心信息
    loading: {
      type: Boolean,
      default: false
    }, // 用于获取数据
    matchTableData: {
      type: Object,
      default: () => ({})
    }, // 用于匹配编辑的库存和再用
    isdisabled: {
      type: Boolean,
      default: false
    }, // 用来禁用input框的
    isActive: Boolean, // 用来禁用input框的
    save: {},
    editsave: Boolean, // 判断编辑的时候主表是否保存完毕
    stopsave: Boolean,
    // distribIds: ,
    isStockBtn: Boolean,// 控制匹配在库&匹配可用按钮是否显示
    // returnType:
  },
  data() {
    return {
      hideInStock: port[this.tablename].hideInStock, // 是否隐藏在库（发货在库、收货在库）
      stockUrl: '/p/cs/sg/storage/queryCommonStorageByPro', // 获取库存接口
      shippingStock: port[this.tablename].shippingStock, // 查发货仓库存 - 自定义
      receivingStock: port[this.tablename].receivingStock, // 查收货仓库存 - 自定义
      shareStoreidKey: port[this.tablename].shareStoreidKey, // shareStoreid 查询库存时 对应取值
      shareidKey: port[this.tablename].shareidKey, // shareid 查询库存时 对应取值
      /* lists: {
        color: [
          {
            ID: 232,
            ENAME: '白色'
          },
          {
            ID: 233,
            ENAME: '黑色'
          }
        ],
        size: [
          {
            ID: 1,
            ENAME: 'M'
          },
          {
            ID: 2,
            ENAME: 'L'
          },
          {
            ID: 3,
            ENAME: 'XL'
          },
          {
            ID: 4,
            ENAME: 'XXL'
          },
        ],
        sku: [
          {
            color: 232,
            size: 1,
            ecode: '7w506',
            id: 88,
            stock: 22,
            qty: 99,
            usable: 99
          },
          {
            color: 233,
            size: 1,
            ecode: '7t506',
            id: 66,
            stock: 44,
            qty: 33,
            usable: 6
          }
        ]
      }, */
      isStoreFlag: true,
      saveLoading: false, // 保存loading
      store: '', // 店仓名字
      tHead: [
        /* 'M','L','XL','XXL' */
      ], // 码数集合
      tColor: [], // color集合
      tBody: {
        /* '白色': [
          {
            stock: 2555,//在库
            usable: 682,//可用
            count: 0,//可编辑
            total: 0,//总计
            disabled: false,//true: 表示不可编辑 false:表示可编辑
          },
          {
            stock: 2555,//在库
            usable: 682,//可用
            count: 0,//可编辑
            total: 0,//总计
            disabled: true,//true: 表示不可编辑 false:表示可编辑
          },
          {
            stock: 2555,//在库
            usable: 682,//可用
            count: 0,//可编辑
            total: 0,//总计
            disabled: true,//true: 表示不可编辑 false:表示可编辑
          },
          {
            stock: 2555,//在库
            usable: 682,//可用
            count: 0,//可编辑
            total: 0,//总计
            disabled: true,//true: 表示不可编辑 false:表示可编辑
          }
        ] */
      }, // 内容
      stock: false, // 控制在库
      usable: false, // 控制可用
      chinese: $R3_CPS.components.ChineseDictionary, // 字段集合
      tally: 0, // 记录改变次数并且用来刷新数据的参数
      focusList: [], // 聚焦列表
      focusIndex: 0, // 聚焦的下标
      pickerR: 0, // 纯展示单选
      amendObj: {}, // 用于保存修改了的矩阵数据
      oldData: {}, // 用来做对比的老数据
      stockData: [], // 通用矩阵在库库存数据
      distribId: '', // 配销中心ID
      cp_c_phy_warehouse_id: '', // add by  wdq 20190521   实体仓逻辑
      hasStock: true, // 默认调取库存接口
      isFooter: false, // 是否显示提示
      SKUID: [], // 获取skuid集合
      control: {}, // 控制提示显示与否
      getStock: '', // 获取库存接口
      deliverStock: '', // 发货店仓
      takeStock: '', // 收货店仓
      matchData: {}, // 匹配的一些参数
      evenPoint: false, // 防止连点
      paramsObj: '', // 保存用的参数
      hasReceiving: false, // 显示收货在库和可用
      receivingData: [], // 通用矩阵收货在库可用数据
      stockReceiving: false, // 控制收货在库
      usableReceiving: false // 控制收货可用
    };
  },
  methods: {
    empty() {
      this.tally += 1; // 每次改变记录加1
      Object.keys(this.tBody).forEach((obj) => {
        Object.keys(this.tBody[obj]).forEach((data) => {
          if (
            this.tBody[obj][data].disabled
            || this.tBody[obj][data].count === ''
          ) {
            return;
          } // 不可编辑的或者本来就为空的直接跳过
          this.tBody[obj][data].count = ''; // 清空数据
          if (this.oldData[obj][data].count === this.tBody[obj][data].count) {
            // 无变化删除
            if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) {
              this.$delete(this.amendObj, this.tBody[obj][data].TAG);
            }
          } else if (
            this.oldData[obj][data].count != ''
            || this.tBody[obj][data].count != 0
          ) {
            this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
              {},
              this.tBody[obj][data]
            );
          }
        });
      });
    }, // 清空
    matchStock() {
      if (!this.hasStock) return; // 不存在库存这些的
      this.tally += 1; // 每次改变记录加1
      Object.keys(this.tBody).forEach((obj) => {
        Object.keys(this.tBody[obj]).forEach((data) => {
          if (
            !this.tBody[obj][data].disabled
            && this.tBody[obj][data].count != this.tBody[obj][data].stock
            && this.tBody[obj][data].stock > 0
          ) {
            this.tBody[obj][data].count = this.tBody[obj][data].stock;
            if (this.oldData[obj][data].count == this.tBody[obj][data].count) {
              // 无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) {
                this.$delete(this.amendObj, this.tBody[obj][data].TAG);
              }
            } else if (
              this.oldData[obj][data].count != ''
              || this.tBody[obj][data].count != 0
            ) {
              this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                {},
                this.tBody[obj][data]
              );
            }
          }
        });
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj); // 向上传递改变的数据
    }, // 匹配在库
    matchUsable() {
      if (!this.hasStock) return; // 不存在库存这些的
      this.tally += 1; // 每次改变记录加1
      Object.keys(this.tBody).forEach((obj) => {
        Object.keys(this.tBody[obj]).forEach((data) => {
          if (
            !this.tBody[obj][data].disabled
            && this.tBody[obj][data].count != this.tBody[obj][data].usable
            && this.tBody[obj][data].usable > 0
          ) {
            this.tBody[obj][data].count = this.tBody[obj][data].usable;
            if (this.oldData[obj][data].count == this.tBody[obj][data].count) {
              // 无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) {
                this.$delete(this.amendObj, this.tBody[obj][data].TAG);
              }
            } else if (
              this.oldData[obj][data].count != ''
              || this.tBody[obj][data].count != 0
            ) {
              this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                {},
                this.tBody[obj][data]
              );
            }
          }
        });
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj);
    }, // 匹配可用
    calculateTotal(tally) {
      let total = 0;
      Object.keys(this.tBody).forEach((obj) => {
        Object.keys(this.tBody[obj]).forEach((data) => {
          if (this.tBody[obj][data].count === '-') {
            total += Number(this.oldData[obj][data].count);
          } else {
            total += Number(this.tBody[obj][data].count);
          }
        });
      });
      return total;
    }, // 计算总和
    inputBlur(val) {
      this.$set(this.control, [val], false);
    }, // 失焦提示关闭
    countChange(event, key, list, val) {
      this.tally += 1; // 每次改变记录加1
      const value = event.target.value;
      if (
        this.tablename !== 'DL_B_PAND'
        && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
        && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
        && this.tablename !== 'DL_B_PUR_REQ'
        && this.tablename !== 'DL_B_PUR_ORDER'
        && this.tablename !== 'DL_B_PUR_TMPIN'
          ? /^-/.test(value)
          ? value.length > 8
          : value.length > 7
          : value.length > 7
      ) {
        this.control[val] = true;
        setTimeout(() => {
          if (this.control === undefined) return;
          this.control[val] = false;
        }, 1500);
      }
      const isNum = this.tablename !== 'DL_B_PAND'
      && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
      && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
      && this.tablename !== 'DL_B_PUR_REQ'
      && this.tablename !== 'DL_B_PUR_ORDER'
      && this.tablename !== 'DL_B_PUR_TMPIN'
        ? /^-?[0-9]*$/.test(value)
        : /^[0-9]*$/.test(value);
      /* const isNum = /^[0-9]*$/.test(value);//判断输入的是否是数字(isNum && Number(value) !== 0) */
      this.$set(
        this.tBody[key][list.name],
        'count',
        (event.target.value = isNum
          ? this.tablename !== 'DL_B_PAND'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
          && this.tablename !== 'DL_B_PUR_REQ'
          && this.tablename !== 'DL_B_PUR_ORDER'
          && this.tablename !== 'DL_B_PUR_TMPIN'
            ? /^-/.test(value)
              ? value.slice(0, 8)
              : value.slice(0, 7)
            : Number(value.slice(0, 7))
          : '')
      );
      if (value === '-') return;
      if (
        this.tBody[key][list.name].count === this.oldData[key][list.name].count
      ) {
        // 没有变化，删除amendObj中的这个数据
        if (this.amendObj[this.tBody[key][list.name].TAG] !== undefined) {
          this.$delete(this.amendObj, this.tBody[key][list.name].TAG);
        }
      } else {
        this.amendObj[this.tBody[key][list.name].TAG] = Object.assign(
          {},
          this.tBody[key][list.name]
        );
        /* if (this.general) {
          if (this.oldData[key][list.name].count == '' && this.tBody[key][list.name].count == 0) {
            if (this.amendObj[this.tBody[key][list.name].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[key][list.name].TAG);
          } else {
            this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({}, this.tBody[key][list.name]);
          }
          /!*if(this.oldData[key][list.name].count != '' || this.tBody[key][list.name].count != 0) {
            this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({},this.tBody[key][list.name]);
          }else {
            if(this.amendObj[this.tBody[key][list.name].TAG] !== undefined)this.$delete(this.amendObj,this.tBody[key][list.name].TAG);
          }*!/
        } else {
          this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({}, this.tBody[key][list.name]);
        } */
      }
      this.$emit('amendData', this.amendObj);
    }, // 数量改变
    calculateRow(val, tally, key) {
      let total = 0;
      Object.keys(val).map((obj) => {
        if (val[obj].count === '-') {
          total += Number(this.oldData[key][obj].count);
        } else {
          total += Number(val[obj].count);
        }
      });
      return total;
    }, // 计算行总计
    calculateLine(val, tally) {
      let total = 0;
      Object.keys(this.tBody).map((obj) => {
        if (this.tBody[obj][val.name].count === '-') {
          total += Number(this.oldData[obj][val.name].count);
        } else {
          total += Number(this.tBody[obj][val.name].count);
        }
      });
      return total;
    }, // 计算列总计
    confirm() {
      // 订单管理矩阵特殊处理
      if (this.tablename === 'OC_B_ORDER') {
        this.$emit('confirmOk', this.amendObj);
        return;
      }
      if (this.tablename === 'OC_B_RETURN_ORDER') {
        if (this.returnType === '1') this.$emit('confirmOk', this.amendObj, 1);
        else this.$emit('confirmOk', this.amendObj, 2);
        return;
      }
      // 触发这个页面的保存事件并传递数据
      if (this.evenPoint) return;
      this.evenPoint = true;
      if (Object.keys(this.amendObj).length === 0) {
        return this.$emit('refreshData', {
          status: false,
          clear: true // 是否清空input数据
        });
      } // 更新数据并关闭弹框//无变化
      const data = {};
      // data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`] = [];
      data[
        `${this.tablename === 'DL_B_TRAN_OUT'
        || this.tablename === 'DL_B_TRAN_OUT_POS'
          ? port[this.tablename].special
          : port[this.tablename].tableName
        }`
        ] = [];
      Object.keys(this.amendObj).map((keys) => {
        const obj = this.amendObj[keys];
        const tableObj = {
          ID: obj.ID === undefined ? -1 : obj.ID, // 明细ID = 子表ID
          PS_C_PRO_ECODE: this.encode, // 商品编码
          PS_C_SKU_ECODE: obj.PS_C_SKU_ECODE, // SKU编码
          PS_C_SKU_ID: obj.PS_C_SKU_ID // SKUID
        };
        if (this.tablename === 'DL_B_TRAN_PLAN') {
          tableObj.QTY_EXEC_PLAN = obj.count === '' ? 0 : obj.count; // 数量
        } else {
          tableObj.QTY = obj.count === '' ? 0 : obj.count; // 数量
        }
        if (obj.MATRIX_DATA) {
          if (obj.MATRIX_DATA.OLD_QTY_BILL !== undefined) {
            tableObj.OLD_QTY_BILL = obj.MATRIX_DATA.OLD_QTY_BILL;
          }
        }
        // data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`].push(tableObj)
        data[
          `${this.tablename === 'DL_B_TRAN_OUT'
          || this.tablename === 'DL_B_TRAN_OUT_POS'
            ? port[this.tablename].special
            : port[this.tablename].tableName
          }`
          ].push(tableObj);
      });
      const index = this.inputList.findIndex(
        n => n.cusurl === 'custompage/matrix'
      );
      if (this.objid == -1) {
        if (index !== -1) {
          this.$set(this.inputList[index], 'matrix', Object.assign({}, data));
          this.$emit('itemInputEnter', this.proEcodeFlag); // 条码或者箱的标识
          this.$emit('refreshData', {
            status: false,
            clear: false // 是否清空input数据
          }); // 新增不做刷新
        } else {
          this.$emit('newLySave', data);
          this.$emit('customize', JSON.parse(JSON.stringify(data)));
          this.$emit('refreshData', {
            status: false,
            clear: true // 是否清空input数据
          });
          setTimeout(() => {
            this.evenPoint = false;
          }, 2000);
        }
      } else {
        this.saveLoading = true;
        this.$set(this, 'paramsObj', data);
        this.$emit('objectEdit', data);
        this.$emit('refreshData', {
          status: false,
          clear: true // 是否清空input数据
        });
      }
    }, // 确认
    async waitObjSave() {
      // matrixApi
      const param = {
        table:
          this.tablename === 'DL_B_TRAN_OUT_POS'
            ? this.tablename.replace('_POS', '')
            : this.tablename, // 表名
        objid: this.objid, // 主表ID
        data: JSON.stringify(this.paramsObj)
      };
      try {
        // 已修改未验证
        const {data: {code, data, message}} = await this.service.common.publicUrlParams(port[this.tablename].amendBody, param);
        this.$set(this, 'paramsObj', ''); // 初始化
        if (code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        } else {
          let errorData;
          if (data) {
            errorData = data;
            errorData.unshift({
              message
            });
            store.commit('errorDialog', {
              // 其它报错
              message: {
                data: errorData
              }
            });
          } else {
            store.commit('errorDialog', {
              // 其它报错
              message
            });
          }
        }
        // 任何结果都关闭窗口
        this.saveLoading = false;
        this.$emit('changeEditSave');
        this.$emit('refreshData', {
          status: true,
          clear: true // 是否清空input数据
        }); // 更新数据并关闭弹框
      } catch (error) {
        // 任何结果都关闭窗口
        this.saveLoading = false;
        this.$emit('changeEditSave');
        this.$emit('refreshData', {
          status: true,
          clear: true // 是否清空input数据
        }); // 更新数据并关闭弹框
      }
    }, // 确认保存
    cancel() {
      this.$emit('refreshData', {
        status: false,
        clear: true // 是否清空input数据
      }); // 关闭弹框
    }, // 取消
    processData(val = [], label) {
      /* this.$set(this, 'tBody', {}); */
      this.isFooter = false;
      this.tColor.map((obj, index) => {
        this.$set(this.tBody, [obj.name], {});
        /* let arr = this.stockData.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//库存在用数据中获取出这个颜色的所有sku;//在用库存
        let arrVal = val.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//sku数据中获取出这个颜色的所有sku
        let skuids = this.SKUID.filter(id => id.PS_C_CLR_ID === obj.id);//获取这个颜色对应的所有SKUid */
        // 找不到返回空数组
        this.tHead.map((data, sub) => {
          if (this.reveal) {
            // 纯展示
            const stock = this.stockData.find(
              n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
            ); // 在用库存找出和这个尺寸对应的sku
            this.tBody[obj.name][data.name] = Object.assign(
              {},
              {
                /* stock: stock === undefined? 0: stock['QTY_STORAGE'],//库存
              usable: stock === undefined? 0: stock['QTY_AVAILABLE'],//可用 */
                count: stock === undefined ? 0 : stock[label], // 默认显示库存数量
                TAG: `${index}-${sub}` // 唯一标识符
              }
            );
          } else if (this.edit || this.general) {
            const skuObj = this.SKUID.find(
              n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
            ); // 找出颜色尺寸ID对牢的sku
            if (skuObj === undefined) {
              this.tBody[obj.name][data.name] = Object.assign(
                {
                  ID: -1 // 新增ID
                },
                {
                  // 表示黑掉
                  disabled: true, // 不可编辑
                  stock: 0, // 库存
                  usable: 0, // 可用
                  stockReceiving: 0, // 收货库存
                  usableReceiving: 0, // 收货可用
                  count: '', // 数量
                  TAG: `${index}-${sub}` // 唯一标识符
                }
              );
              this.isFooter = true;
            } else if (skuObj.ISACTIVE === 'N') {
              const valObj = val.find(
                n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
              ); // 矩阵数据中查出完全匹配颜色尺寸ID的数据
              const stock = this.stockData.find(
                n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
              ); // 在用库存找出和这个尺寸对应的sku
              /* 收货在用库存找出和这个尺寸对应的sku */
              const receivingData = this.hasReceiving
                ? this.receivingData.find(
                  n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                )
                : {};
              this.tBody[obj.name][data.name] = Object.assign(
                {
                  ID: -1 // 新增ID
                },
                {
                  // 表示黑掉
                  disabled: true, // 不可编辑
                  stock: this.hasStock ? stock === undefined ? 0 : stock.QTY_STORAGE : 0, // 库存
                  usable: this.hasStock ? stock === undefined ? 0 : stock.QTY_AVAILABLE : 0, // 可用
                  stockReceiving: this.hasReceiving ? receivingData === undefined ? 0 : receivingData.QTY_STORAGE : 0, // 收货在库
                  usableReceiving: this.hasReceiving ? receivingData === undefined ? 0 : receivingData.QTY_AVAILABLE : 0, // 收货可用
                  count: valObj === undefined ? '' : valObj.MATRIX_DATA.QTY, // 数量
                  TAG: `${index}-${sub}` // 唯一标识符
                }
              );
              this.isFooter = true;
            } else {
              this.$set(this.control, [`${index}-${sub}`], false);
              const valObj = val.find(
                n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
              ); // 矩阵数据中查出完全匹配颜色尺寸ID的数据
              // let stock = this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //在用库存找出和这个尺寸对应的sku
              const stock = this.stockData.find( n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id );
              /* 收货在用库存找出和这个尺寸对应的sku */
              const receivingData = this.hasReceiving ? this.receivingData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id) : {};
              this.tBody[obj.name][data.name] = valObj === undefined
                ? Object.assign(
                  {},
                  skuObj,
                  {
                    stock: this.hasStock ? stock === undefined ? 0 : stock.QTY_STORAGE : 0, // 在库
                    usable: this.hasStock ? stock === undefined ? 0 : stock.QTY_AVAILABLE : 0, // 可用
                    stockReceiving: this.hasReceiving ? receivingData === undefined ? 0 : receivingData.QTY_STORAGE : 0, // 收货在库
                    usableReceiving: this.hasReceiving ? receivingData === undefined ? 0 : receivingData.QTY_AVAILABLE : 0, // 收货可用
                    count: valObj === undefined ? '' : valObj.MATRIX_DATA.QTY, // 数量
                    control: false, // 控制提示框
                    TAG: `${index}-${sub}`, // 唯一标识符
                    disabled: false // true: 表示不可编辑 false:表示可编辑
                  },
                  data,
                  {
                    ID: -1 // 新增ID
                  }
                )
                : Object.assign({}, valObj, skuObj, {
                  stock: this.hasStock
                    ? stock === undefined
                      ? 0
                      : stock.QTY_STORAGE
                    : 0, // 在库
                  usable: this.hasStock
                    ? stock === undefined
                      ? 0
                      : stock.QTY_AVAILABLE
                    : 0, // 可用
                  stockReceiving: this.hasReceiving
                    ? receivingData === undefined
                      ? 0
                      : receivingData.QTY_STORAGE
                    : 0, // 收货在库
                  usableReceiving: this.hasReceiving ? receivingData === undefined ? 0 : receivingData.QTY_AVAILABLE : 0, // 收货可用
                  TAG: `${index}-${sub}`, // 唯一标识符
                  control: false, // 控制提示框
                  count: valObj.MATRIX_DATA.QTY, // 可编辑(通用都为空，只有纯展示和编辑的时候用后台返回的)
                  disabled: false // true: 表示不可编辑 false:表示可编辑
                });
            }
          }
        });
        /* let sku_id = skuids.find((n) => n['PS_C_SIZE_ID'] === data.id);//找到这个对应尺寸颜色的skuid
        if(!data.status || !obj.status) {//只要有一个禁用就全部禁用
          this.tBody[obj.name][data.name] = Object.assign({
            ID: -1,//新增ID
          },{//status  = false表示黑掉
            disabled: true,//不可编辑
            stock: 0,//库存
            usable: 0,//可用
            count: '',//数量
            TAG: `${index}-${sub}`//唯一标识符
          })
        }else {
          let stock = arr.find((n) => n['PS_C_SIZE_ID'] === data.id);//在用库存找出和这个尺寸对应的sku
          let skuArr = arrVal.find((n) => n['PS_C_SIZE_ID'] === data.id);//sku数据找出和这个尺寸对应的sku
          this.tBody[obj.name][data.name] = skuArr === undefined? Object.assign({},sku_id,{
              stock: this.hasStock?(stock === undefined? 0: stock['QTY_STORAGE']) : 0,//在库
              usable: this.hasStock?(stock === undefined? 0: stock['QTY_AVAILABLE']) : 0,//可用
              count: '',//数量
              TAG: `${index}-${sub}`,//唯一标识符
              disabled: false,//true: 表示不可编辑 false:表示可编辑
            },data,{
            ID: -1,//新增ID
          }) : Object.assign({},skuArr,{
            stock: this.hasStock?(stock === undefined? 0: stock['QTY_STORAGE']) : 0,//在库
            usable: this.hasStock?(stock === undefined? 0: stock['QTY_AVAILABLE']) : 0,//可用
            TAG: `${index}-${sub}`,//唯一标识符
            count: skuArr['MATRIX_DATA']['QTY_BILL'],//可编辑(通用都为空，只有纯展示和编辑的时候用后台返回的)
            disabled: false,//true: 表示不可编辑 false:表示可编辑
          })
        } */
        /* if(skuArr === undefined || !data.status) return this.tBody[obj.name][data.name] = {//status  = false表示黑掉
          disabled: true,//不可编辑
          stock: 0,//库存
          usable: 0,//可用
          count: ''//数量
        } */
      });
      if (this.reveal) return; // 不可能会修改的，因为没有输入框或者纯展示页面
      this.oldData = JSON.parse(JSON.stringify(this.tBody)); // 深复制
    }, // 处理数据
    async getHeadData() {
      this.$set(this, 'tBody', {});
      // 修改后已验证
      const params = {
        param: {
          ECODE: this.encode,
          // CP_C_STORE_ID: this.distribId,
          CP_C_PHY_WAREHOUSE_ID: this.cp_c_phy_warehouse_id
        }
        /* 需更改配销中心获取 */
      };
      if (!port[this.tablename].paramsNoStore) {
        params.param.CP_C_STORE_ID = this.distribId
      }
      const res = await this.service.common.publicUrlParamsGet(port.matrix, {params});
      const data = res.data;
      if (data.code === 0) {
        const tHead = data.data.SIZE.map(obj =>
          /* if(!obj['STATUS']) this.isFooter = true; */
          Object.assign(obj, {
            id: obj.ID, // 尺寸id
            name: obj.ENAME // 尺寸名字
            /* status: obj['STATUS']//是否不可编辑状态 */
          }));
        this.tHead = tHead.sort((a, b) => a.MATRIXCOLNO - b.MATRIXCOLNO);
        this.tColor = data.data.COLOR.map(obj =>
          /* if(!obj['STATUS']) this.isFooter = true; */
          Object.assign(obj, {
            id: obj.ID, // 尺寸id
            name: obj.ENAME // 尺寸名字
            /* status: obj['STATUS']//是否不可编辑状态 */
          }));
        /* let tColor = data.data.COLOR.map((obj) => {
          /!*if(!obj['STATUS']) this.isFooter = true;*!/
          return Object.assign(obj, {
            id: obj.ID,//尺寸id
            name: obj.ENAME,//尺寸名字
            /!*status: obj['STATUS']//是否不可编辑状态*!/
          })
        });
        this.tColor = tColor.sort((a, b) => {
          console.log(Number(a.ECODE) - Number(b.ECODE))
          return Number(a.ECODE) - Number(b.ECODE)
        }); */
        // 以上先获取color和size集合
        this.SKUID = data.data.SKU;
      }
      return res;
    }, // 获取头部信息
    async getBodyData() {
      if (this.general) {
        // 通用矩阵
        if (this.hasStock) {
          // 修改后未验证
          console.log('修改后未验证');
          const formdata = new FormData();
          formdata.append('proEcode', this.encode);
          const url = this.shippingStock ? this.shippingStock : this.stockUrl
          if (this.shippingStock) {
            formdata.append('shareStoreid', this[this.shareStoreidKey] ||this.distribId); // 配销仓id
            formdata.append('shareid', this[this.shareidKey] ||this.takeStock); // 聚合仓id
          } else {
            formdata.append('storeId', this.distribId);
            formdata.append('phyWarehouseId', this.cp_c_phy_warehouse_id);
          }


          const res = await this.service.common.publicUrlParams(url, formdata);
          const data = res.data;
          if (data.code === 0) {
            this.stockData = data.data;
          }

        }
        // 获取 收货在库和可用  数据
        if (this.hasReceiving) {
          // 修改后已验证
          const formData = new FormData();
          formData.append('proEcode', this.encode);
          const url = this.receivingStock ? this.receivingStock : this.stockUrl
          const noShareStoreidArr = ['SG_B_SHARE_ALLOCATION'] //  查收货仓库存 时不需要 shareStoreid 入参 的 单子
          if (this.receivingStock) {
            if (this.receivingStock === this.shippingStock) {
              // 配销仓调拨单的发货收获仓 都是查配销仓库存 则不用传  shareid
              formData.append('shareStoreid', this[this.shareStoreidKey] || this.takeStock);
              formData.append('shareid', -1);
            } else {
              formData.append('shareStoreid', this[this.shareStoreidKey] || this.distribId); // 配销仓id
              formData.append('shareid', this[this.shareidKey] || this.takeStock); // 聚合仓id
            }
          } else {
            this.takeStock ? formData.append('storeId', this.takeStock) : this.takeStock = '';
          }
           this.service.common.publicUrlParams(url, formData).then((res) => {
            const {data: {code, data}} = res
            if (code === 0) {
              this.receivingData = data;
            }
          })
        }
        const paramObj = {PS_C_PRO_ECODE: this.encode};
        if (this.returnType) {
          paramObj.detailTableName = this.returnType === '1'
            ? 'OC_B_RETURN_ORDER_REFUND'
            : this.returnType === '2'
              ? 'OC_B_RETURN_ORDER_EXCHANGE'
              : '';
        }
        //  判断是否是OMS--------- 库存走Post请求 OMS走Get请求
        // if (port[this.tablename].getBody != '/p/cs/sg/getMatrixData') {
        //   const formData = new FormData();
        //   const obj = {
        //     objid: this.objid, // 主表ID
        //     table:
        //       this.tablename === 'DL_B_TRAN_OUT_POS'
        //         ? this.tablename.replace('_POS', '')
        //         : this.tablename, // 表名
        //     fixcolumn: paramObj,
        //     flag: 0 // 箱标识
        //   };
        //   formData.append('param', JSON.stringify(obj));
        //   // 修改后未验证（没有逻辑）
        //   return this.service.common.publicUrlParams(port[this.tablename].getBody, formData);
        // }
        // 修改后已验证
        const params = {
          param: {
            objid: this.objid, // 主表ID
            table:
              this.tablename === 'DL_B_TRAN_OUT_POS'
                ? this.tablename.replace('_POS', '')
                : this.tablename, // 表名
            fixcolumn: paramObj
          }
        };
        return this.service.common.publicUrlParamsGet(port[this.tablename].getBody, {params});
        // 不同页面不同接口  ------------------------------乔丹使用get请求,千百度改为post 这块代码暂时弃用
      }
      if (this.edit && port[this.tablename]) {
        // 可编辑矩阵(不同页面不同接口)
        const paramObj = {PS_C_PRO_ECODE: this.encode};
        if (this.returnType) {
          paramObj.detailTableName = this.returnType === '1'
            ? 'OC_B_RETURN_ORDER_REFUND'
            : this.returnType === '2'
              ? 'OC_B_RETURN_ORDER_EXCHANGE'
              : '';
        }
        // 修改后未验证（和上面写法一样）
        const params = {
          param: {
            objid: this.objid, // 主表ID
            table:
              this.tablename === 'DL_B_TRAN_OUT_POS'
                ? this.tablename.replace('_POS', '')
                : this.tablename, // 表名
            fixcolumn: paramObj
          }
        };
        console.log('可编辑：', port[this.tablename].getBody);
        return this.service.common.publicUrlParamsGet(port[this.tablename].getBody, {params});
        //
      }
      if (this.reveal) {
        // 纯展示的是库存
        const formdata = new FormData();
        formdata.append('proEcode', this.encode);
        const url = this.shippingStock ? this.shippingStock : this.stockUrl
        if (this.shippingStock) {
          formdata.append('shareStoreid', this[this.shareStoreidKey] || this.distribId); // 配销仓id
          formdata.append('shareid', this[this.shareidKey] || this.takeStock); // 聚合仓id
        } else {
          formdata.append('storeId', this.takeStock);
        }
        this.service.common.publicUrlParams(url, formdata).then(res => {
          const {data} = res;
          if (data.code === 0) {
            this.stockData = data.data;
          }
        });


      }
    }, // 获取内容信息
    keydown(e) {
      if (e.keyCode === 9) {
        // 循环切换
        if (this.focusList.length === 0) return;
        this.focusIndex === this.focusList.length - 1
          ? this.focusList[(this.focusIndex = 0)].focus()
          : this.focusList[(this.focusIndex += 1)].focus();
        e.preventDefault(); // 阻止默认事件
        e.stopPropagation(); // 防止事件冒泡
      }
      if (e.keyCode === 38) {
        // 上
        const arr = this.focusList[this.focusIndex].dataset.id.split('-'); // 当前行  第几个
        const index = this.focusList.findIndex((n) => {
          const data = n.dataset.id.split('-');
          return data[1] === arr[1] && arr[0] - 1 == data[0]; // 行不相同列相同
        }); // 找出下一行 第几个
        if (index === -1) return;
        this.focusIndex = index;
        this.focusList[this.focusIndex].focus();
      }
      if (e.keyCode === 40) {
        // 下
        const arr = this.focusList[this.focusIndex].dataset.id.split('-'); // 当前行  第几个
        const index = this.focusList.findIndex((n) => {
          const data = n.dataset.id.split('-');
          return data[1] === arr[1] && Number.parseInt(arr[0]) + 1 == data[0]; // 行不相同列相同
        }); // 找出下一行 第几个
        if (index === -1) return;
        this.focusIndex = index;
        this.focusList[this.focusIndex].focus();
      }
      if (e.keyCode === 37) {
        // 左
        this.focusIndex === 0
          ? ''
          : this.focusList[(this.focusIndex -= 1)].focus();
      }
      if (e.keyCode === 39) {
        // 右
        this.focusIndex === this.focusList.length - 1
          ? ''
          : this.focusList[(this.focusIndex += 1)].focus();
      }
    }, // 键盘事件
    matching() {
      this.$emit('match', JSON.parse(JSON.stringify(this.tBody)));
    }, // 纯展示匹配按钮

    findId() {
      if (Object.prototype.toString.call(this.objList) === '[object Array]') {
        let id = '';
        let istrue = false; // 判断修改的值是否相同
        const deliverStockNameArr = ['SENDER_STORE_ID', 'CP_C_STORE_ID', 'CP_C_ORIG_ID'] // 发货
        const takeStockNameArr = ['RECEIVER_STORE_ID', 'CP_C_DEST_ID'] // 收货
        const leftDataStoreId = port[this.tablename].leftDataStoreId || '' // 收货店仓取左侧列表里当前行的数据
        this.objList.forEach((obj) => {
          if (obj.childs) {
            for (const data of obj.childs) {
              if (deliverStockNameArr.indexOf(data.colname) !== -1 || data.name === '发货逻辑仓' || data.colname === port[this.tablename].shippingWarehouse) {
                id = data.refobjid || data.pid
                this.store = data.valuedata;
                this.deliverStock = data.refobjid || data.pid; // 发货店仓
              }
              if (takeStockNameArr.indexOf(data.colname) !== -1 || data.name === '收货逻辑仓' || data.colname === port[this.tablename].receivingWarehouse) {
                this.takeStock = data.refobjid || data.pid; // 收货店仓 id
              } else if (leftDataStoreId) {
                this.takeStock = this.activeObj[leftDataStoreId]; // 收货店仓 id
              }
              if (data.colname === 'CP_C_PHY_WAREHOUSE_ID') {
                this.cp_c_phy_warehouse_id = data.pid; // 实体仓逻辑
              }
            }
          }
        });
        istrue = this.distribId === id;
        this.distribId = id;
        if (!this.distribId) { // 新增时,直接去formData 里面拿
          const str = this.$route.path.split('/');
          const r3StoreState = R3.store.state[`${str[3]}.${str[4]}.${str[5]}.${str[6]}`].updateData[this.tablename];
          const formData = document.querySelector(`#${str[4]}-${str[5]}-${str[6]}`).__vue__.formData
          this.distribId = formData.SENDER_STORE_ID || formData.CP_C_DEST_ID || formData.CP_C_ORIG_ID || formData[this.shippingWarehouse];
          this.cp_c_phy_warehouse_id = formData.CP_C_PHY_WAREHOUSE_ID || ''
          deliverStockNameArr.forEach((item) => {
            if (formData[item]) {
              this.store = r3StoreState.changeData[item][0].Label; // 发货逻辑仓 名称
              this.deliverStock = formData[item]; // 发货逻辑仓 ID
            }
          })
          takeStockNameArr.forEach((item) => {
            if (formData[item]) {
              this.takeStock = formData[item]; // 收货店仓 ID
            }
          })
        }
        this.getStock = `/p/cs/stock/${this.deliverStock === '' ? this.takeStock : this.deliverStock
        }`;
        return istrue;
      }


    }, // 查询店仓ID
    getTableData() {
      this.getHeadData().then(() => {
        // 获取头部信息
        this.getBodyData().then((res) => {
          // 根据条码或编码获取body信息
          if (this.reveal) {
            // 纯展示
            this.processData([], this.matchData.data[this.pickerR].value);
            this.$emit('loadChange'); // 关闭loading
            return;
          }
          const data = res.data;
          if (data.code === 0) {
            this.processData(data.data === undefined ? [] : data.data);
            this.$emit('loadChange'); // 关闭loading
            if (this.edit || this.general) {
              this.$nextTick(() => {
                this.focusList = Array.from(
                  this.$el.querySelectorAll('.ff-matrix--input')
                );
                if (
                  this.focusList.length === 0
                  || this.isdisabled
                  || !this.isActive
                ) {
                  return;
                }
                this.$el.addEventListener('keydown', this.keydown);
                if (!this.edit) {
                  this.$el.querySelectorAll('.ff-matrix--input')[0].focus();
                }
                this.$emit('inputFocus');
              });
            }
          }
        }); // 获取内容信息
      });
    }, // 初始化数据
    inputFocus(event) {
      const id = event.target.dataset.id;
      const index = this.focusList.findIndex(n => n.dataset.id === id);
      this.focusIndex = index;
      setTimeout(() => {
        this.focusList[this.focusIndex].select();
      });
    }, // input聚焦事件
    keyEntry() {
      this.focusIndex === this.focusList.length - 1
        ? this.general
        ? this.confirm()
        : this.edit
          ? this.$emit('enterSave', true)
          : ''
        : this.focusList[(this.focusIndex += 1)].focus();
    } // entry下一个输入框聚焦
  },
  watch: {
    loading(val) {
      if (val) {
        this.control = {};
        this.amendObj = {};
        if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
        this.getTableData();
      }
    }, // 刷新数据
    pickerR(val) {
      if (this.matchData.data[val].port === 1) {
        this.getStock = `/p/cs/stock/${this.deliverStock}`;
      } else {
        this.getStock = `/p/cs/stock/${this.takeStock}`;
      }
      /* if(val === 0) {
        this.getStock = `/p/cs/stock/${this.deliverStock}`;
      }else {
        this.getStock = `/p/cs/stock/${this.takeStock}`;
      } */
      this.getBodyData().then(() => {
        this.processData([], this.matchData.data[val].value);
        /* Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            this.tBody[obj][data].count = this.tBody[obj][data][val];
          })
        }) */
      });
    }, // 显示发货店仓还是收获店仓
    matchTableData(val) {
      if (Object.keys(val).length === 0) return;
      this.tally += 1; // 每次改变记录加1
      Object.keys(this.tBody).forEach((obj) => {
        Object.keys(this.tBody[obj]).forEach((data) => {
          if (
            this.tBody[obj][data].disabled
            || this.tBody[obj][data].count == val[obj][data].count
            || val[obj][data].count < 0
          ) {
            return;
          } // 禁止编辑的不用赋值
          this.$set(this.tBody[obj][data], 'count', val[obj][data].count);
          if (this.oldData[obj][data].count === this.tBody[obj][data].count) {
            // 无变化删除
            if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) {
              this.$delete(this.amendObj, this.tBody[obj][data].TAG);
            }
          } else {
            this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
              {},
              this.tBody[obj][data]
            );
          }
        });
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj);
    }, // 匹配
    objList: {
      handler(val) {
        const isTrue = this.findId();
        if (this.distribId === '' || isTrue) return;
        this.getTableData();
      },
      deep: true
    }, // 处理数据异步的问题
    stock(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, // 在库的高度(已无效)
    usable(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, // 可用的高度(已无效)
    stockReceiving(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, // 收货在库(已无效)
    usableReceiving(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, // 收货可用(已无效)
    editsave(val) {
      if (val) {
        this.waitObjSave();
      }
    }, // 点确定时的保存数据
    stopsave(val) {
      if (val) {
        this.saveLoading = false;
        this.$set(this, 'paramsObj', ''); // 初始化
        this.$emit('changeEditSave'); // 初始化编辑保存
        this.$emit('changeStopSave'); // 初始化主表保存报错
        this.$emit('refreshData', {
          status: false,
          clear: true // 是否清空input数据
        }); // 更新数据并关闭弹框
      }
    } // 关闭矩阵
    /* save (val) {
      if(val && this.general) {
        if(Object.keys(this.amendObj).length === 0) return this.$emit('refreshData',false);//更新数据并关闭弹框//无变化
        let data = {};
        data[`${this.tablename === 'DL_B_TRAN_OUT'? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`] = [];
        Object.keys(this.amendObj).map((keys) => {
          let obj = this.amendObj[keys];
          let tableObj = {
            ID: obj.ID === undefined? -1 : obj.ID,//明细ID = 子表ID
            PS_C_PRO_ECODE: this.encode,//商品编码
            PS_C_SKU_ECODE : obj.PS_C_SKU_ECODE,//SKU编码
            PS_C_SKU_ID: obj.PS_C_SKU_ID,//SKUID
          };
          if(this.tablename === 'DL_B_TRAN_PLAN') {
            tableObj['QTY_EXEC_PLAN'] = obj.count === ''? 0 : obj.count;//数量
          }else {
            tableObj['QTY_BILL'] = obj.count === ''? 0 : obj.count;//数量
          }
          data[`${this.tablename === 'DL_B_TRAN_OUT'? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`].push(tableObj)
        })
        axios({
          url: port[this.tablename].amendBody,
          method: 'post',
          data: {
            table: this.tablename,//表名
            objid: this.objid,//主表ID
            data: JSON.stringify(data)
          }
        }).then((res) => {
          let resData = res.data;
          if(resData.code === 0) {

          }
          //任何结果都关闭窗口
          this.$emit('refreshData', false);//更新数据并关闭弹框
          this.$emit('changeSave', false);
        }).catch(error => {
          //任何结果都关闭窗口
          this.$emit('refreshData', false);//更新数据并关闭弹框
          this.$emit('changeSave', false);
        })
      }
    },//新增的时候保存 */
  },
  mounted() {
    if (this.general && this.hasStock) {
      port[this.tablename].isStock ? (this.stock = true) : (this.usable = true);
    }
    this.findId(); // 查找配销中心
    if (this.tablename === 'OC_B_RETURN_ORDER') this.isStoreFlag = false;
    if (this.distribIds && this.distribIds !== undefined) {
      this.cp_c_phy_warehouse_id = this.distribIds;
    }
    // if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
    this.getTableData();
  },
  created() {
    if (this.tablename === 'OC_B_ORDER') return;
    if (this.tablename === 'OC_B_RETURN_ORDER') return;
    if (port[this.tablename]) {
      this.matchData = port[this.tablename].matchData; // 矩阵匹配数据
      this.hasStock = port[this.tablename].hasStock; // 是否调取库存接口
      this.hasReceiving = !!port[this.tablename].hasReceiving; // 是否显示收货在库和可用
    }
  },
  beforeDestroy() {
    if (this.edit || this.general) {
      if (this.focusList.length === 0 || this.isdisabled || !this.isActive) {
        return;
      }
      this.$el.removeEventListener('keydown', this.keydown);
    }
  }
};
