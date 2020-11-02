import chineseDiction from 'framework/assets/js/ChineseDictionary.js'
import axios from 'framework/__utils__/request'
import port from './connector.js'
export default {
  props: {
    encode: {
      type: String,
      default: ''
    }, //商品编码
    ename: {
      type: String,
      default: ''
    }, //商品编码
    priceList: {
      type: String,
      default: ''
    }, //吊牌价
    reveal: {
      type: Boolean,
      default: false
    }, //true: 启动纯展示表格
    edit: {
      type: Boolean,
      default: false
    }, //true: 启动纯编辑表格
    general: {
      type: Boolean,
      default: false
    }, //true: 启动通用表格界面
    btnFlag: {
      type: Boolean,
      default: true
    }, //true: 按钮展示
    selectItem: {}, //表数据
    objid: {}, //表ID
    inputList: {
      type: Array,
      default: () => []
    }, //objitem数据
    tablename: {
      /*type: String,
      required: true*/
    }, //主表名
    objList: {}, //配销中心信息
    loading: {
      type: Boolean,
      default: false
    }, //用于获取数据
    matchTableData: {
      type: Object,
      default: () => {
        return {}
      }
    }, //用于匹配编辑的库存和再用
    isdisabled: {
      type: Boolean,
      default: false
    }, //用来禁用input框的
    isActive: Boolean, //用来禁用input框的
    save: {},
    editsave: Boolean, //判断编辑的时候主表是否保存完毕
    stopsave: Boolean,
    distribIds: '',
    isStockBtn: { // 控制匹配在库按钮是否显示
      type: Boolean,
      default: true
    },
    isUsefulStockBtn: { // 控制匹配可用按钮是否显示
      type: Boolean,
      default: true
    },
    isStockNoEnoughBtn: { // 控制库存不足按钮是否显示
      type: Boolean,
      default: false
    },
    isDetailMatrix: { // orderDetail控制
      type: Boolean,
      default: false
    },
    returnType: ''
  },
  data() {
    return {
      /*lists: {
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
      },*/
      showDetailStock: false,
      isShow: false,
      noZeroShwoFlag: true,
      isStoreFlag: true,
      saveLoading: false, //保存loading
      store: '杭州店仓', //店仓名字
      saleType: '', //销售类型
      tHead: [ /*'M','L','XL','XXL'*/], //码数集合
      tColor: [], //color集合
      tBody: {
        /*'白色': [
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
        ]*/
      }, //内容
      stock: false, //控制在库
      usable: false, //控制可用
      chinese: chineseDiction, //字段集合
      tally: 0, //记录改变次数并且用来刷新数据的参数
      focusList: [], //聚焦列表
      focusIndex: 0, //聚焦的下标
      pickerR: 0, //纯展示单选
      amendObj: {}, //用于保存修改了的矩阵数据
      oldData: {}, //用来做对比的老数据
      stockData: [], //通用矩阵在库库存数据
      distribId: '', //配销中心ID
      cp_c_phy_warehouse_id: '',  //add by  wdq 20190521   实体仓逻辑
      retailBeginTime: '',  //零售开始时间
      retailEndTime: '',  //零售结束时间
      hasStock: true, //默认调取库存接口
      isFooter: false, //是否显示提示
      SKUID: [], //获取skuid集合
      control: {}, //控制提示显示与否
      getStock: '', //获取库存接口
      deliverStock: '', //发货店仓
      takeStock: '', //收货店仓
      takeStockName: '', //收货店仓名字
      matchData: {}, //匹配的一些参数
      evenPoint: false, //防止连点
      paramsObj: '', //保存用的参数
      hasReceiving: false, //显示收货在库和可用
      hasQtyPrein: false, //显示收货在途
      hasRetail: false, //显零售数量
      receivingData: [], //通用矩阵收货在库可用数据
      stockReceiving: false, //控制收货在库
      usableReceiving: false, //控制收货可用
      retailReceiving: false, //控制零售数量
      preinReceiving: false, //控制收货在途
    }
  },
  methods: {
    empty() {
      this.tally += 1; //每次改变记录加1
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (this.tBody[obj][data].disabled || this.tBody[obj][data].count === '') return; //不可编辑的或者本来就为空的直接跳过
          this.tBody[obj][data].count = ''; //清空数据
          if (this.oldData[obj][data].count === this.tBody[obj][data].count) { //无变化删除
            if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[obj][data].TAG);
          } else {
            if (this.oldData[obj][data].count != '' || this.tBody[obj][data].count != 0) {
              this.amendObj[this.tBody[obj][data].TAG] = Object.assign({}, this.tBody[obj][data]);
            }
          }
        })
      })
    }, //清空
    matchStock() {
      if (!this.hasStock) return; //不存在库存这些的
      this.tally += 1; //每次改变记录加1
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (!this.tBody[obj][data].disabled && this.tBody[obj][data].count != this.tBody[obj][data].stock && this.tBody[obj][data].stock > 0) {
            this.tBody[obj][data].count = this.tBody[obj][data].stock;
            if (this.oldData[obj][data].count == this.tBody[obj][data].count) { //无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[obj][data].TAG);
            } else {
              if (this.oldData[obj][data].count != '' || this.tBody[obj][data].count != 0) {
                this.amendObj[this.tBody[obj][data].TAG] = Object.assign({}, this.tBody[obj][data]);
              }
            }
          }
        })
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj); //向上传递改变的数据
    }, //匹配在库
    matchUsable() {
      if (!this.hasStock) return; //不存在库存这些的
      this.tally += 1; //每次改变记录加1
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (!this.tBody[obj][data].disabled && this.tBody[obj][data].count != this.tBody[obj][data].usable && this.tBody[obj][data].usable > 0) {
            this.tBody[obj][data].count = this.tBody[obj][data].usable;
            if (this.oldData[obj][data].count == this.tBody[obj][data].count) { //无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[obj][data].TAG);
            } else {
              if (this.oldData[obj][data].count != '' || this.tBody[obj][data].count != 0) {
                this.amendObj[this.tBody[obj][data].TAG] = Object.assign({}, this.tBody[obj][data]);
              }
            }
          }
        })
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj);
    }, //匹配可用
    matchNoEnoughUsable() {
      if (!this.isStockNoEnoughBtn) return; //不存在库存这些的
      this.tally += 1; //每次改变记录加1
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (this.tBody[obj][data].usable === "") {
            this.tBody[obj][data].count = "";
          } else if (!this.tBody[obj][data].disabled && this.tBody[obj][data].count > this.tBody[obj][data].usable && this.tBody[obj][data].usable >= 0) {
            this.tBody[obj][data].count = this.tBody[obj][data].usable;
            if (this.oldData[obj][data].count == this.tBody[obj][data].count) { //无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[obj][data].TAG);
            } else {
              if (this.oldData[obj][data].count != '' || this.tBody[obj][data].count != 0) {
                this.amendObj[this.tBody[obj][data].TAG] = Object.assign({}, this.tBody[obj][data]);
              }
            }
          }
        })
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj);
    }, //匹配库存不足
    calculateTotal(tally) {
      let total = 0;
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (this.tBody[obj][data].count === '-') {
            total += Number(this.oldData[obj][data].count);
          } else {
            total += Number(this.tBody[obj][data].count);
          }
        })
      });
      return total
    }, //计算总和
    inputBlur(val) {
      this.$set(this.control, [val], false);
    }, //失焦提示关闭
    countChange(event, key, list, val) {
      this.tally += 1; //每次改变记录加1
      const value = event.target.value;
      if ((this.tablename !== 'DL_B_PAND' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK' && this.tablename !== 'DL_B_PUR_REQ' && this.tablename !== 'DL_B_PUR_ORDER' && this.tablename !== 'DL_B_PUR_TMPIN') ? (/^-/.test(value) ? value.length > 5 : value.length > 4) : value.length > 4) {
        this.control[val] = true;
        setTimeout(() => {
          if (this.control === undefined) return;
          this.control[val] = false;
        }, 1500)
      }
      const isNum = (this.tablename !== 'DL_B_PAND' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK' && this.tablename !== 'DL_B_PUR_REQ' && this.tablename !== 'DL_B_PUR_ORDER' && this.tablename !== 'DL_B_PUR_TMPIN' && this.tablename !== 'SC_B_INVENTORY') ? /^-?[0-9]*$/.test(value) : /^[0-9]*$/.test(value);
      /*const isNum = /^[0-9]*$/.test(value);//判断输入的是否是数字(isNum && Number(value) !== 0)*/
      this.$set(this.tBody[key][list.name], 'count', event.target.value = isNum ? ((this.tablename !== 'DL_B_PAND' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS' && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK' && this.tablename !== 'DL_B_PUR_REQ' && this.tablename !== 'DL_B_PUR_ORDER' && this.tablename !== 'DL_B_PUR_TMPIN') ? (/^-/.test(value) ? value.slice(0, 5) : value.slice(0, 4)) : Number(value.slice(0, 4))) : '');
      if (value === '-') return;
      if (this.tBody[key][list.name].count === this.oldData[key][list.name].count) { //没有变化，删除amendObj中的这个数据
        if (this.amendObj[this.tBody[key][list.name].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[key][list.name].TAG);
      } else {
        this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({}, this.tBody[key][list.name]);
        /*if (this.general) {
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
        }*/
      }
      this.$emit('amendData', this.amendObj);
    }, //数量改变
    calculateRow(val, tally, key) {
      let total = 0;
      Object.keys(val).map((obj) => {
        if (val[obj].count === '-') {
          total += Number(this.oldData[key][obj].count);
        } else {
          total += Number(val[obj].count);
        }
      });
      if (total === 0) {
        total = this.noZeroShwoFlag ? '' : 0;
      }
      return total
    }, //计算行总计
    calculateByType(val, calType) {
      let total = 0;
      if (calType === "stock") {
        Object.keys(val).map((obj) => {
          total += Number(val[obj].stock);
        });
      } else if (calType === "usable") {
        Object.keys(val).map((obj) => {
          total += Number(val[obj].usable);
        });
      } else if (calType === "usableReceiving") {
        Object.keys(val).map((obj) => {
          total += Number(val[obj].usableReceiving);
        });
      } else if (calType === "preinReceiving") {
        Object.keys(val).map((obj) => {
          total += Number(val[obj].preinReceiving);
        });
      } else if (calType === "retailReceiving") {
        Object.keys(val).map((obj) => {
          total += Number(val[obj].retailReceiving);
        });
      }
      if (!total || total === 0) {
        total = this.noZeroShwoFlag ? '' : 0;
      }
      return total
    }, //计算行总计
    calculateLine(val, tally) {
      let total = 0;
      Object.keys(this.tBody).map((obj) => {
        if (this.tBody[obj][val.name].count === '-') {
          total += Number(this.oldData[obj][val.name].count);
        } else {
          total += Number(this.tBody[obj][val.name].count);
        }
      });
      if (total === 0) {
        total = this.noZeroShwoFlag ? '' : 0;
      }
      return total
    }, //计算列总计
    confirm() {
      // 订单管理矩阵特殊处理
      if (this.tableName === 'OC_B_ORDER' || this.tablename === 'OC_B_RETURN_ORDER') {
        let arr = [];
        Object.keys(this.amendObj).map(keys => {
          let obj = this.amendObj[keys];
          arr.push(obj.PS_C_SKU_ECODE.trim());
        });
        if (!arr.length) return this.$Message.error('请输入数量');
      }
      if (this.tablename === 'OC_B_ORDER') {
        this.$emit('confirmOk', this.amendObj);
        return;
      } else if (this.tablename === 'OC_B_RETURN_ORDER') {
        if (this.returnType === '1') this.$emit('confirmOk', this.amendObj, 1)
        else this.$emit('confirmOk', this.amendObj, 2)
        return;
      } else if (this.tablename === 'SC_B_INVENTORY') {
        this.$emit('confirmOk', this.amendObj);
        return;
      }
      //触发这个页面的保存事件并传递数据
      if (this.evenPoint) return;
      this.evenPoint = true;
      if (Object.keys(this.amendObj).length === 0) return this.$emit('refreshData', {
        status: false,
        clear: true //是否清空input数据
      }); //更新数据并关闭弹框//无变化
      let data = {};
      //data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`] = [];
      data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}`] = [];
      Object.keys(this.amendObj).map((keys) => {
        let obj = this.amendObj[keys];
        let tableObj = {
          ID: obj.ID === undefined ? -1 : obj.ID, //明细ID = 子表ID
          // PS_C_PRO_ECODE: this.encode, //商品编码
          PS_C_SKU_ECODE: obj.PS_C_SKU_ECODE, //SKU编码
          PS_C_SKU_ID: obj.PS_C_SKU_ID, //SKUID
        };
        if (this.tablename === 'DL_B_TRAN_PLAN') {
          tableObj['QTY_EXEC_PLAN'] = obj.count === '' ? 0 : obj.count; //数量
        } else {
          tableObj['QTY'] = obj.count === '' ? 0 : obj.count; //数量
        }
        if (obj.MATRIX_DATA) {
          if (obj.MATRIX_DATA.OLD_QTY_BILL !== undefined) {
            tableObj['OLD_QTY_BILL'] = obj.MATRIX_DATA.OLD_QTY_BILL;
          }
        }
        //data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`].push(tableObj)
        data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}`].push(tableObj)
      });
      let index = this.inputList.findIndex(n => n['cusurl'] === 'custompage/matrix');
      if (this.objid == -1) {
        if (index !== -1) {
          this.$set(this.inputList[index], 'matrix', Object.assign({}, data));
          this.$emit('itemInputEnter');
          this.$emit('refreshData', {
            status: false,
            clear: false //是否清空input数据
          }); //新增不做刷新
          return;
        } else {
          this.$emit('newLySave');
          this.$emit('customize', JSON.parse(JSON.stringify(data)));
          this.$emit('refreshData', {
            status: false,
            clear: false //是否清空input数据
          });
          setTimeout(() => {
            this.evenPoint = false;
          }, 2000);
          return;
        }
      } else {
        this.saveLoading = true;
        this.$set(this, 'paramsObj', data);
        if (this.isDetailMatrix) {
          setTimeout(() => {
            this.evenPoint = false;
            this.saveLoading = false;
          }, 200);
          this.$emit('matrixSave');
        } else {
          this.$emit('objectEdit');
        }
      }
    }, //确认
    waitObjSave() {
      axios({
        url: port[this.tablename].amendBody,
        method: 'post',
        data: {
          table: this.tablename === 'DL_B_TRAN_OUT_POS' ? this.tablename.replace('_POS', '') : this.tablename, //表名
          objid: this.objid, //主表ID
          data: JSON.stringify(this.paramsObj)
        }
      }).then((res) => {
        let resData = res.data;
        this.$set(this, 'paramsObj', ''); //初始化
        if (resData.code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        } else {
          let errorData;
          if (resData.data) {
            errorData = resData.data;
            errorData.unshift({
              message: resData.message
            });
            store.commit('errorDialog', { //其它报错
              message: {
                data: errorData
              }
            })
          } else {
            store.commit('errorDialog', { //其它报错
              message: resData.message
            })
          }
        }
        /*else if(resData.message === undefined || (resData.ext && resData.ext.msgtype === 2)) {
                  let matrixData = res.data.data.error || res.data.data;
                  matrixData.unshift({message: res.data.message});
                  store.commit('errorDialog',{ //其它报错
                    message: {data: matrixData}
                  })
                }*/
        //任何结果都关闭窗口
        this.saveLoading = false;
        this.$emit('changeEditSave');
        this.$emit('refreshData', {
          status: true,
          clear: true //是否清空input数据
        }); //更新数据并关闭弹框
      }).catch(error => {
        //任何结果都关闭窗口
        this.saveLoading = false;
        this.$emit('changeEditSave');
        this.$emit('refreshData', {
          status: true,
          clear: true //是否清空input数据
        }); //更新数据并关闭弹框
      })
    }, //确认保存
    cancel() {
      this.$emit('refreshData', {
        status: false,
        clear: true //是否清空input数据
      }); //关闭弹框
    }, //取消
    processData(val = [], label) {
      /*this.$set(this, 'tBody', {});*/
      let _this = this;
      _this.isFooter = false;
      _this.tColor.map((obj, index) => {
        _this.$set(_this.tBody, [obj.name], {});
        /*let arr = this.stockData.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//库存在用数据中获取出这个颜色的所有sku;//在用库存
        let arrVal = val.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//sku数据中获取出这个颜色的所有sku
        let skuids = this.SKUID.filter(id => id.PS_C_CLR_ID === obj.id);//获取这个颜色对应的所有SKUid*/
        //找不到返回空数组
        _this.tHead.map((data, sub) => {
          if (_this.reveal) { //纯展示
            let stock = _this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //在用库存找出和这个尺寸对应的sku
            _this.tBody[obj.name][data.name] = Object.assign({}, {
              /*stock: stock === undefined? 0: stock['QTY_STORAGE'],//库存
              usable: stock === undefined? 0: stock['QTY_AVAILABLE'],//可用*/
              count: stock === undefined ? 0 : stock[label], //默认显示库存数量
              TAG: `${index}-${sub}` //唯一标识符
            });
          } else if (_this.edit || _this.general) {
            let skuObj = _this.SKUID.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //找出颜色尺寸ID对牢的sku
            if (skuObj === undefined) {
              _this.tBody[obj.name][data.name] = Object.assign({
                ID: -1, //新增ID
              }, { //表示黑掉
                disabled: true, //不可编辑
                stock: _this.noZeroShwoFlag ? "" : 0, //库存
                usable: _this.noZeroShwoFlag ? "" : 0, //可用
                stockReceiving: _this.noZeroShwoFlag ? "" : 0, //收货库存
                usableReceiving: _this.noZeroShwoFlag ? "" : 0, //收货可用
                retailReceiving: _this.noZeroShwoFlag ? "" : 0, //零售数量
                preinReceiving: _this.noZeroShwoFlag ? "" : 0, //收货在途
                count: '', //数量
                TAG: `${index}-${sub}` //唯一标识符
              });
              _this.isFooter = true;
            } else if (skuObj.ISACTIVE === 'N') {
              let valObj = val.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //矩阵数据中查出完全匹配颜色尺寸ID的数据
              let stock = _this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //在用库存找出和这个尺寸对应的sku
              /*收货在用库存找出和这个尺寸对应的sku*/
              let receivingData = _this.hasReceiving ? _this.receivingData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id) : {};
              _this.tBody[obj.name][data.name] = Object.assign({
                ID: -1, //新增ID
              }, { //表示黑掉
                disabled: true, //不可编辑
                stock: _this.hasStock ? (stock === undefined ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_STORAGE']) : 0, //库存
                usable: _this.hasStock ? (stock === undefined ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_AVAILABLE']) : 0, //可用
                stockReceiving: _this.hasReceiving ? (receivingData === undefined ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_STORAGE']) : 0, //收货在库
                usableReceiving: _this.hasReceiving ? (receivingData === undefined ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_AVAILABLE']) : 0, //收货可用
                retailReceiving: _this.hasRetail ? (receivingData === undefined ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_RETAIL']) : 0, //零售数量
                preinReceiving: _this.hasQtyPrein ? (receivingData === undefined ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_PREIN']) : 0, //在途数量
                count: valObj === undefined ? '' : valObj['MATRIX_DATA']['QTY'], //数量
                TAG: `${index}-${sub}` //唯一标识符
              });
              _this.isFooter = true;
            } else {
              _this.$set(_this.control, [`${index}-${sub}`], false);
              let valObj = val.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //矩阵数据中查出完全匹配颜色尺寸ID的数据
              //let stock = this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //在用库存找出和这个尺寸对应的sku
              let stock = _this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id);
              /*收货在用库存找出和这个尺寸对应的sku*/
              let receivingData = _this.hasReceiving ? _this.receivingData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id) : {};
              _this.tBody[obj.name][data.name] = valObj === undefined ? Object.assign({}, skuObj, {
                stock: _this.hasStock ? (stock === undefined || stock['QTY_STORAGE'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_STORAGE']) : 0, //在库
                usable: _this.hasStock ? (stock === undefined || stock['QTY_AVAILABLE'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_AVAILABLE']) : 0, //可用
                stockReceiving: _this.hasReceiving ? (receivingData === undefined || receivingData['QTY_STORAGE'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_STORAGE']) : 0, //收货在库
                usableReceiving: _this.hasReceiving ? (receivingData === undefined || receivingData['QTY_AVAILABLE'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_AVAILABLE']) : 0, //收货可用
                retailReceiving: _this.hasRetail ? (receivingData === undefined || receivingData['QTY_RETAIL'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_RETAIL']) : 0, //零售数量
                preinReceiving: _this.hasQtyPrein ? (receivingData === undefined || receivingData['QTY_PREIN'] === 0 ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_PREIN']) : 0, //零售数量
                count: '', //数量
                control: false, //控制提示框
                TAG: `${index}-${sub}`, //唯一标识符
                disabled: false, //true: 表示不可编辑 false:表示可编辑
              }, data, {
                ID: -1, //新增ID
              }) : Object.assign({}, valObj, skuObj, {
                stock: _this.hasStock ? ((stock === undefined || stock['QTY_STORAGE'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_STORAGE']) : 0, //在库
                usable: _this.hasStock ? ((stock === undefined || stock['QTY_AVAILABLE'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : stock['QTY_AVAILABLE']) : 0, //可用
                stockReceiving: _this.hasReceiving ? ((receivingData === undefined || receivingData['QTY_STORAGE'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_STORAGE']) : 0, //收货在库
                usableReceiving: _this.hasReceiving ? ((receivingData === undefined || receivingData['QTY_AVAILABLE'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_AVAILABLE']) : 0, //收货可用
                retailReceiving: _this.hasRetail ? ((receivingData === undefined || receivingData['QTY_RETAIL'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_RETAIL']) : 0, //零售数量
                preinReceiving: _this.hasQtyPrein ? ((receivingData === undefined || receivingData['QTY_PREIN'] === 0) ? (_this.noZeroShwoFlag ? '' : 0) : receivingData['QTY_PREIN']) : 0, //零售数量
                TAG: `${index}-${sub}`, //唯一标识符
                control: false, //控制提示框
                count: valObj['MATRIX_DATA']['QTY'], //可编辑(通用都为空，只有纯展示和编辑的时候用后台返回的)
                disabled: false, //true: 表示不可编辑 false:表示可编辑
              })
            }
          }
        })
        /*let sku_id = skuids.find((n) => n['PS_C_SIZE_ID'] === data.id);//找到这个对应尺寸颜色的skuid
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
        }*/
        /*if(skuArr === undefined || !data.status) return this.tBody[obj.name][data.name] = {//status  = false表示黑掉
          disabled: true,//不可编辑
          stock: 0,//库存
          usable: 0,//可用
          count: ''//数量
        }*/
      });
      if (_this.reveal) return; //不可能会修改的，因为没有输入框或者纯展示页面
      _this.oldData = JSON.parse(JSON.stringify(_this.tBody)); //深复制
    }, //处理数据
    getHeadData() {
      this.$set(this, 'tBody', {});
      return axios({
        url: port.matrix,
        method: 'get',
        params: {
          param: {
            ECODE: this.encode,
            CP_C_STORE_ID: this.distribId,
            CP_C_PHY_WAREHOUSE_ID: this.cp_c_phy_warehouse_id
          }
          /*需更改配销中心获取*/
        }
      }).then((res) => {
        let data = res.data;
        if (data.code === 0) {
          let tHead = data.data.SIZE.map((obj) => {
            /*if(!obj['STATUS']) this.isFooter = true;*/
            return Object.assign(obj, {
              id: obj.ID, //尺寸id
              name: obj.ENAME, //尺寸名字
              /*status: obj['STATUS']//是否不可编辑状态*/
            })
          });
          this.tHead = tHead.sort((a, b) => a.MATRIXCOLNO - b.MATRIXCOLNO);
          this.tColor = data.data.COLOR.map((obj) => {
            /*if(!obj['STATUS']) this.isFooter = true;*/
            return Object.assign(obj, {
              id: obj.ID, //尺寸id
              name: obj.ENAME, //尺寸名字
              /*status: obj['STATUS']//是否不可编辑状态*/
            })
          });
          /*let tColor = data.data.COLOR.map((obj) => {
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
          });*/
          //以上先获取color和size集合
          this.SKUID = data.data['SKU'];
          this.priceList = data.data['PRO_PRICELIST'];
          this.ename = data.data['PRO_NAME'];
        } else {
          if (this.tablename === 'OC_B_RETURN_ORDER' || this.tablename === 'OC_B_ORDER') {
            this.$emit('refreshData', {
              status: false,
              clear: true //是否清空input数据
            }); //关闭弹框
          }
        }
      })
    }, //获取头部信息
    async getBodyData() {
      if (this.general) { //通用矩阵
        if (this.hasStock) {
          await axios({
            //url: this.getStock,
            url: (this.tablename === "OC_B_SALE" && this.saleType === "NOR") ? '/p/cs/oc/v1/sale/queryCommonStorageByPro' : '/p/cs/sg/storage/queryCommonStorageByPro',
            method: 'post',
            data: {
              storeId: this.distribId,
              proEcode: this.encode,
              phyWarehouseId: this.cp_c_phy_warehouse_id,
              objId: this.objid
            }
          }).then((res) => {
            let data = res.data;
            if (data.code === 0) {
              this.stockData = data.data;
            }
          })
        }
        if (this.hasReceiving) {
          await axios({
            //url: `/p/cs/stock/${this.takeStock}`,
            url: '/p/cs/sg/storage/queryCommonStorageByPro',
            method: 'post',
            data: {
              storeId: this.takeStock,
              proEcode: this.encode,
              RETAIL_BEGIN_TIME: this.retailBeginTime,
              RETAIL_END_TIME: this.retailEndTime
            }
          }).then((res) => {
            let data = res.data;
            if (data.code === 0) {
              this.receivingData = data.data;
            }
          })
        }
        let paramObj = { PS_C_PRO_ECODE: this.encode };
        if (this.tablename === 'SC_B_INVENTORY') {
          paramObj = Object.assign(paramObj, { storehouse: this.inputList[0] });
        }
        if (this.returnType) paramObj.detailTableName = this.returnType === '1' ? 'OC_B_RETURN_ORDER_REFUND' : this.returnType === '2' ? 'OC_B_RETURN_ORDER_EXCHANGE' : ''
        return axios({ //不同页面不同接口
          url: port[this.tablename].getBody,
          method: 'get',
          params: {
            param: {
              objid: this.objid, //主表ID
              table: this.tablename === 'DL_B_TRAN_OUT_POS' ? this.tablename.replace('_POS', '') : this.tablename, //表名
              fixcolumn: paramObj,
            }
          }
          /*需更改*/
        })
      } else if (this.edit && port[this.tablename]) { //可编辑矩阵(不同页面不同接口)
        let paramObj = { PS_C_PRO_ECODE: this.encode };
        if (this.tablename === 'SC_B_INVENTORY') {
          paramObj = Object.assign(paramObj, { storehouse: this.commodityCode });
        }
        if (this.returnType) paramObj.detailTableName = this.returnType === '1' ? 'OC_B_RETURN_ORDER_REFUND' : this.returnType === '2' ? 'OC_B_RETURN_ORDER_EXCHANGE' : ''
        return axios({
          url: port[this.tablename].getBody,
          method: 'get',
          params: {
            param: {
              objid: this.objid, //主表ID
              table: this.tablename === 'DL_B_TRAN_OUT_POS' ? this.tablename.replace('_POS', '') : this.tablename, //表名
              fixcolumn: paramObj,
            }
          }
          /*需更改*/
        })
      } else if (this.reveal) { //纯展示的是库存
        return axios({
          //url: this.getStock,
          url: '/p/cs/sg/storage/queryCommonStorageByPro',
          method: 'post',
          data: {
            storeId: this.takeStock,
            proEcode: this.encode
          }
        }).then((res) => {
          let data = res.data;
          if (data.code === 0) {
            this.stockData = data.data;
          }
        })
      }
    }, //获取内容信息
    keydown(e) {
      if (e.keyCode === 9) { //循环切换
        if (this.focusList.length === 0) return;
        this.focusIndex === this.focusList.length - 1 ? this.focusList[this.focusIndex = 0].focus() : this.focusList[this.focusIndex += 1].focus();
        e.preventDefault(); //阻止默认事件
        e.stopPropagation(); //防止事件冒泡
      }
      if (e.keyCode === 38) { //上
        let arr = this.focusList[this.focusIndex].dataset.id.split('-'); //当前行  第几个
        let index = this.focusList.findIndex((n) => {
          let data = n.dataset.id.split('-');
          return data[1] === arr[1] && arr[0] - 1 == data[0]; //行不相同列相同
        }); //找出下一行 第几个
        if (index === -1) return;
        this.focusIndex = index;
        this.focusList[this.focusIndex].focus();
      }
      if (e.keyCode === 40) { //下
        let arr = this.focusList[this.focusIndex].dataset.id.split('-'); //当前行  第几个
        let index = this.focusList.findIndex((n) => {
          let data = n.dataset.id.split('-');
          return data[1] === arr[1] && Number.parseInt(arr[0]) + 1 == data[0]; //行不相同列相同
        }); //找出下一行 第几个
        if (index === -1) return;
        this.focusIndex = index;
        this.focusList[this.focusIndex].focus();
      }
      if (e.keyCode === 37) { //左
        this.focusIndex === 0 ? '' : this.focusList[this.focusIndex -= 1].focus();
      }
      if (e.keyCode === 39) { //右
        this.focusIndex === this.focusList.length - 1 ? '' : this.focusList[this.focusIndex += 1].focus();
      }
    }, //键盘事件
    matching() {
      this.$emit('match', JSON.parse(JSON.stringify(this.tBody)));
    }, //纯展示匹配按钮
    findId() {
      if (Object.prototype.toString.call(this.objList) === "[object Array]") {
        let id = '';
        let istrue = false; //判断修改的值是否相同
        this.objList.map((obj) => {
          if (obj.childs) {
            for (let data of obj.childs) {
              if (data.colname === 'CP_C_STORE_ID' || data.colname === 'CP_C_ORIG_ID') {
                this.store = data.valuedata;
                this.deliverStock = /*data.refobjid || */ data.pid; //发货店仓
              }
              if (data.colname === 'CP_C_STORE_ID') {
                id = data.pid;
              }
              if (data.colname === 'CP_C_DEST_ID') {
                if (id === '') id = data.pid;
                this.takeStock = /*data.refobjid || */ data.pid; //收货店仓
                this.takeStockName = data.valuedata;
              }
              if (id === '' && data.colname === 'CP_C_ORIG_ID') id = data.pid;
              if (data.colname === 'CP_C_PHY_WAREHOUSE_ID') {
                this.cp_c_phy_warehouse_id = data.pid;
                this.store = data.valuedata;
              }
              if (data.colname === 'RETAIL_BEGIN_TIME') {
                this.retailBeginTime = data.valuedata;
              }
              if (data.colname === 'RETAIL_END_TIME') {
                this.retailEndTime = data.valuedata;
              }
              if (this.tablename === "OC_B_SALE" && data.colname === 'SALE_TYPE') {
                this.saleType = data.valuedata;
              }
            }
            /*obj.childs.map((data) => {
              /!*if(data.colname === 'CP_C_STORE_ID') this.distribId = data.refobjid || data.pid;*!/
              /!*if(data.name === '配销中心') this.distribId = data.refobjid;*!/
              if(data.colname === 'CP_C_STORE_ID' || data.colname === 'CP_C_ORIG_ID') {
                this.store = data.valuedata;
                this.deliverStock = /!*data.refobjid || *!/data.pid;//发货店仓
                this.distribId = /!*data.refobjid || *!/data.pid;
              }
              if(data.colname === 'CP_C_DEST_ID') {
                this.takeStock = /!*data.refobjid || *!/data.pid;//收货店仓
              }
            })*/
          }
        });
        istrue = this.distribId === id;
        this.distribId = id;
        this.getStock = `/p/cs/stock/${this.deliverStock === '' ? this.takeStock : this.deliverStock}`;
        return istrue;
      }
    }, //查询店仓ID
    getTableData() {
      this.getHeadData().then(() => { //获取头部信息
        this.getBodyData().then((res) => { //根据条码或编码获取body信息
          if (this.reveal) { //纯展示
            this.processData([], this.matchData.data[this.pickerR].value);
            this.$emit('loadChange'); //关闭loading
            return
          }
          let data = res.data;
          if (data.code === 0) {
            this.processData(data.data === undefined ? [] : data.data);
            this.$emit('loadChange'); //关闭loading
            this.$emit('tableLoadChange'); //关闭tableLoading
            if (this.edit || this.general) {
              this.$nextTick(() => {
                this.focusList = Array.from(this.$el.querySelectorAll('.ff-matrix--input'));
                if (this.focusList.length === 0 || this.isdisabled || !this.isActive) return;
                this.$el.addEventListener('keydown', this.keydown);
                if (!this.edit) this.$el.querySelectorAll('.ff-matrix--input')[0].focus();
                this.$emit('inputFocus');
              })
            }
          }
        }) //获取内容信息
      })
    }, //初始化数据
    inputFocus(event) {
      let id = event.target.dataset.id;
      let index = this.focusList.findIndex(n => n.dataset.id === id);
      this.focusIndex = index;
      setTimeout(() => {
        this.focusList[this.focusIndex].select();
      })
    }, //input聚焦事件
    keyEntry() {
      this.focusIndex === this.focusList.length - 1 ? (this.general ? this.confirm() : (this.edit ? this.$emit('enterSave', true) : '')) : this.focusList[this.focusIndex += 1].focus();
    }, //entry下一个输入框聚焦
  },
  watch: {
    loading(val) {
      if (val) {
        this.control = {};
        this.amendObj = {};
        if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
        this.getTableData();
      }
    }, //刷新数据
    pickerR(val) {
      if (this.matchData.data[val].port === 1) {
        this.getStock = `/p/cs/stock/${this.deliverStock}`;
      } else {
        this.getStock = `/p/cs/stock/${this.takeStock}`;
      }
      /*if(val === 0) {
        this.getStock = `/p/cs/stock/${this.deliverStock}`;
      }else {
        this.getStock = `/p/cs/stock/${this.takeStock}`;
      }*/
      this.getBodyData().then(() => {
        this.processData([], this.matchData.data[val].value);
        /*Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            this.tBody[obj][data].count = this.tBody[obj][data][val];
          })
        })*/
      })
    }, //显示发货店仓还是收获店仓
    matchTableData(val) {
      if (Object.keys(val).length === 0) return;
      this.tally += 1; //每次改变记录加1
      Object.keys(this.tBody).map((obj) => {
        Object.keys(this.tBody[obj]).map((data) => {
          if (this.tBody[obj][data].disabled || this.tBody[obj][data].count == val[obj][data].count || val[obj][data].count < 0) return; //禁止编辑的不用赋值
          this.$set(this.tBody[obj][data], 'count', val[obj][data].count);
          if (this.oldData[obj][data].count === this.tBody[obj][data].count) { //无变化删除
            if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[obj][data].TAG);
          } else {
            this.amendObj[this.tBody[obj][data].TAG] = Object.assign({}, this.tBody[obj][data]);
          }
        })
      });
      this.$message({
        message: '匹配成功',
        type: 'success'
      });
      this.$emit('amendData', this.amendObj);
    }, //匹配
    objList: {
      handler(val) {
        let isTrue = this.findId();
        if (this.distribId === '' || isTrue) return;
        this.getTableData();
      },
      deep: true
    }, //处理数据异步的问题
    stock(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, //在库的高度(已无效)
    usable(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, //可用的高度(已无效)
    stockReceiving(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, //收货在库(已无效)
    usableReceiving(val) {
      this.$emit('changeHeight', {
        judge: val,
        count: Object.keys(this.tBody).length
      });
    }, //收货可用(已无效)
    editsave(val) {
      if (val) {
        this.waitObjSave();
      }
    }, //点确定时的保存数据
    stopsave(val) {
      if (val) {
        this.saveLoading = false;
        this.$set(this, 'paramsObj', ''); //初始化
        this.$emit('changeEditSave'); //初始化编辑保存
        this.$emit('changeStopSave'); //初始化主表保存报错
        this.$emit('refreshData', {
          status: false,
          clear: true //是否清空input数据
        }); //更新数据并关闭弹框
      }
    }, //关闭矩阵
    /*save (val) {
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
    },//新增的时候保存*/
  },

  mounted() {
    if (this.general && this.hasStock) {
      // if(this.isDetailMatrix){
      //   this.usable = true;
      // }else{
      //   port[this.tablename].isStock ? this.stock = true : this.usable = true;
      // }
      if (this.tablename !== "OC_B_ORDER" && this.tablename !== "OC_B_RETURN_ORDER") {
        this.usable = true;
      }
      if (this.tablename === "SC_B_INVENTORY") {
        this.stock = true;
      }
      if (this.tablename === "BRANCH_SC_B_TRANSFER") {
        this.showDetailStock = true;
      }
    }
    this.findId(); //查找配销中心
    if (this.tablename === 'OC_B_RETURN_ORDER') {
      this.isStoreFlag = false;
      this.stock = false;
      this.isShow = true;
    }
    if (this.tablename === 'OC_B_RETURN_ORDER') this.isStoreFlag = false;
    if (this.distribIds && this.distribIds !== undefined) this.cp_c_phy_warehouse_id = this.distribIds;
    if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
    this.getTableData();
  },
  created() {
    if (this.tablename === 'OC_B_ORDER') return;
    if (this.tablename === 'OC_B_RETURN_ORDER') return;
    if (port[this.tablename]) {
      this.matchData = port[this.tablename].matchData; //矩阵匹配数据
      this.hasStock = port[this.tablename].hasStock; //是否调取库存接口
      this.hasReceiving = port[this.tablename].hasReceiving; //是否显示收货在库和可用
      this.hasRetail = port[this.tablename].hasRetail; //是否显示零售数量
      this.hasQtyPrein = port[this.tablename].hasQtyPrein; //是否显示收货在途数量
    }
  },
  beforeDestroy() {
    if (this.edit || this.general) {
      if (this.focusList.length === 0 || this.isdisabled || !this.isActive) return;
      this.$el.removeEventListener('keydown', this.keydown);
    }
  }
}
